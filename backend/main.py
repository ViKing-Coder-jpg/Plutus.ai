import joblib
import pandas as pd
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,                    # or ["*"] for development only
    allow_credentials=True,                   # important if you use cookies / Authorization header
    allow_methods=["*"],                      # GET, POST, PUT, DELETE, OPTIONS, etc.
    allow_headers=["*"],                      # Content-Type, Authorization, X-Requested-With, etc.
)

class Data(BaseModel):
    rev_util: float         # Revolving Utilization
    age: int                # Age
    late_30_59: int         # 30-59 days late
    debt_ratio: float       # Debt Ratio
    monthly_inc: float      # Monthly Income
    open_credit: int        # Open Credit Lines
    late_90: int            # 90+ days late
    real_estate: int        # Real Estate Loans
    late_60_89: int         # 60-89 days late
    dependents: int

model_logistic = joblib.load('logistic_model.pkl')
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