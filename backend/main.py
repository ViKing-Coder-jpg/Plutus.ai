import joblib
import os
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from typing import Optional, List
from groq import Groq

from agent import run_lending_agent

app = FastAPI(title="Plutus.ai API", version="2.0.0")

origins = [
    "https://plutus-ai-snowy.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Data(BaseModel):
    rev_util: float = Field(..., description="Revolving Utilization (0-1)")
    age: int = Field(..., description="Borrower Age")
    late_30_59: int = Field(..., description="Times 30-59 days past due")
    debt_ratio: float = Field(..., description="Debt Ratio")
    monthly_inc: float = Field(..., description="Monthly Income")
    open_credit: int = Field(..., description="Open Credit Lines")
    late_90: int = Field(..., description="Times 90+ days past due")
    real_estate: int = Field(..., description="Real Estate Loans")
    late_60_89: int = Field(..., description="Times 60-89 days past due")
    dependents: int = Field(..., description="Number of Dependents")

class ChatMessage(BaseModel):
    role: str       
    content: str

class ChatRequest(BaseModel):
    message: str                        
    borrower_data: dict = {}           
    ml_results: dict = {}               
    report: dict = {}                   
    chat_history: List[ChatMessage] = []  

model_tree = joblib.load('decision_tree_model.pkl')
scaler=joblib.load('scaler.pkl')

@app.post('/predict')
def predict_single_sample(data_dict: Data, high_threshold=0.7, mid_threshold=0.4):
    feature_order = [
        'rev_util', 'age', 'late_30_59', 'debt_ratio', 'monthly_inc',
        'open_credit', 'late_90', 'real_estate', 'late_60_89', 'dependents'
    ]
    
    # Convert Pydantic model to dictionary and create DataFrame
    data_as_dict = data_dict.dict()
    features_df = pd.DataFrame([data_as_dict])[feature_order]
    
    # Scale features (pass DataFrame to preserve feature names)
    features_scaled = scaler.transform(features_df)
    
    prob_log = model_logistic.predict_proba(features_scaled)[0][1]
    prob_tree = model_tree.predict_proba(features_scaled)[0][1]
    
    return {
        'logistic': {
            'probability': float(prob_log),
            'risk': 'High' if prob_log >= high_threshold else ('Medium' if high_threshold > prob_log >= mid_threshold else 'Low')
        },
        'decision_tree': {
            'probability': float(prob_tree),
            'risk': 'High' if prob_tree >= high_threshold else ('Medium' if high_threshold > prob_tree >= mid_threshold else 'Low')
        }
    }


@app.get('/')
def root():
    return {'Hello world'}

@app.head('/')
def health_check():
    return

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python your_script.py '{\"rev_util\":0.85, \"age\":45, ...}'")
        sys.exit(1)
    
    import json
    try:
        input_data = json.loads(sys.argv[1])
        result = predict_single_sample(input_data)
        print(json.dumps(result, indent=2))
    except Exception as e:
        print(f"Error: {e}")