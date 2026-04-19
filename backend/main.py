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
scaler = joblib.load('scaler.pkl')

FEATURE_ORDER = [
    'rev_util', 'age', 'late_30_59', 'debt_ratio', 'monthly_inc',
    'open_credit', 'late_90', 'real_estate', 'late_60_89', 'dependents'
]

def run_ml_models(data_dict: dict, high_threshold=0.7, mid_threshold=0.4) -> dict:
    features_df = pd.DataFrame([data_dict])[FEATURE_ORDER]
    features_scaled = scaler.transform(features_df)

    prob_tree = model_tree.predict_proba(features_scaled)[0][1]

    def categorize(p):
        if p >= high_threshold:
            return "High"
        elif p >= mid_threshold:
            return "Medium"
        return "Low"

    return {
        "decision_tree": {
            "probability": float(prob_tree),
            "risk": categorize(prob_tree),
        },
    }

@app.post('/predict')
def predict_single_sample(data_dict: Data):
    return run_ml_models(data_dict.dict())

@app.post('/assess')
def full_lending_assessment(data_dict: Data):
    borrower_data = data_dict.dict()

    ml_results = run_ml_models(borrower_data)

    assessment = run_lending_agent(borrower_data, ml_results)

    return {**assessment, "borrower_data": borrower_data}

@app.post('/chat')
def chat_with_plutus(req: ChatRequest):
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        return {"reply": "GROQ_API_KEY is not set on the server. Please configure it and restart."}

    ml = req.ml_results
    report = req.report
    bd = req.borrower_data

    tree_prob = ml.get("decision_tree", {}).get("probability", 0)
    avg_prob  = tree_prob
    avg_risk  = "High" if avg_prob >= 0.5 else ("Medium" if avg_prob >= 0.2 else "Low")

    context = f"""
BORROWER ASSESSMENT CONTEXT
============================
Borrower Profile:
  Age: {bd.get('age', 'N/A')}
  Monthly Income: ${bd.get('monthly_inc', 0):,.0f}
  Dependents: {bd.get('dependents', 0)}
  Revolving Utilization: {bd.get('rev_util', 0) * 100:.1f}%
  Debt Ratio: {bd.get('debt_ratio', 0):.3f}
  Open Credit Lines: {bd.get('open_credit', 0)}
  Real Estate Loans: {bd.get('real_estate', 0)}
  Times 30-59 Days Late: {bd.get('late_30_59', 0)}
  Times 60-89 Days Late: {bd.get('late_60_89', 0)}
  Times 90+ Days Late: {bd.get('late_90', 0)}

ML Model Results:
  Decision Tree: {tree_prob * 100:.1f}% default probability → {ml.get('decision_tree', {}).get('risk', 'N/A')} Risk
  Risk: {avg_risk} (probability {avg_prob * 100:.1f}%)

AI Report:
  Decision: {report.get('recommended_lending_decision', 'N/A')}
  Profile Summary: {report.get('borrower_profile_summary', 'N/A')}
  Risk Analysis: {report.get('credit_risk_analysis', 'N/A')}
  Mitigation Suggestions: {'; '.join(report.get('risk_mitigation_suggestions', []))}
  Supporting References: {', '.join(report.get('supporting_references', []))}
""".strip()

    system_prompt = f"""You are Plutus, an expert AI lending analyst and financial advisor.
You have already completed a full credit risk assessment for this borrower. Your role now is to answer the borrower's follow-up questions clearly, empathetically, and in plain English.

Rules:
- Base all answers strictly on the borrower's actual data and assessment provided below.
- Be specific — reference their actual numbers (e.g. "your 76.6% utilization", "your 0.80 debt ratio").
- If asked how to improve, give concrete, actionable steps with realistic timelines.
- If a question is completely unrelated to lending, credit, or finance, politely decline and redirect.
- Never hallucinate data. If something isn't in the context, say so.
- Keep responses concise but complete — avoid bullet-point overload, prefer natural paragraphs.

{context}"""

    groq_messages = [{"role": "system", "content": system_prompt}]
    for m in req.chat_history:
        groq_messages.append({"role": m.role, "content": m.content})
    groq_messages.append({"role": "user", "content": req.message})

    try:
        client = Groq(api_key=api_key)
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=groq_messages,
            temperature=0.4,
            max_tokens=600,
        )
        reply = response.choices[0].message.content.strip()
    except Exception as e:
        reply = f"I encountered an error while processing your question: {str(e)}"

    return {"reply": reply}

@app.get('/')
def root():
    return {"status": "Plutus.ai API v2.0 is running"}

@app.head('/')
def health_check():
    return