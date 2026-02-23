# Example: at the end of your .py file

import joblib
import pandas as pd
import sys
from fastapi import FastAPI
import uvicorn as uv

app = FastAPI()

model_logistic = joblib.load('logistic_model.pkl')
model_tree = joblib.load('decision_tree_model.pkl')

def predict_single_sample(data_dict, high_threshold=0.7,mid_threshold=0.4):
    feature_order = [
        'rev_util', 'age', 'late_30_59', 'debt_ratio', 'monthly_inc',
        'open_credit', 'late_90', 'real_estate', 'late_60_89', 'dependents'
    ]
    
    features = pd.DataFrame([data_dict])[feature_order].values
    
    prob_log = model_logistic.predict_proba(features)[0][1]
    prob_tree = model_tree.predict_proba(features)[0][1]
    
    return {
        'logistic': {
            'probability': float(prob_log),
            'risk': 'High' if prob_log >= high_threshold else ('Medium' if high_threshold > prob_log >= mid_threshold else 'Low')
        },
        'decision_tree': {
            'probability': float(prob_tree),
            'risk': 'High' if prob_tree >= high_threshold else  ('Medium' if high_threshold > prob_log >= mid_threshold else 'Low')
        }
    }


@app.get('/')
def root():
    return {'Hello world'},kdfnbksd.kvndsal/ .≤≈v. 

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