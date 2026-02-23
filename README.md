# 🏦 Plutus – Intelligent Credit Risk Scoring & Agentic Lending Decision Support System

Plutus is an AI-driven credit analytics platform that evaluates borrower credit risk using historical financial data and extends it into an agentic lending recommendation system.

The system predicts Probability of Default (PD), generates a structured Credit Risk Score, and produces explainable lending recommendations to support financial institutions in smarter, data-driven decisions.

---

## 🚀 Project Objective

Design and implement a machine learning system that:

- Predicts borrower credit risk (classification / probability of default)
- Identifies key risk-driving factors
- Converts model output into a structured lending recommendation
- Provides a basic UI for interaction and visualization

This project combines:
- Supervised Machine Learning
- Risk Analytics
- Decision Support Systems
- Explainable AI concepts

---

## 🧠 Key Features

- 📊 Credit Risk Prediction (Logistic Regression, Decision Tree)
- 📈 Probability of Default (PD) estimation
- 🎯 Risk Score Conversion (300–850 scale)
- 🔍 Identification of Key Risk Factors
- 🤖 Agentic Lending Recommendation Engine
- 💻 Interactive Frontend Interface
- 📁 CSV Upload Support

---

## 🏗️ System Architecture
```
Borrower CSV Input
↓
Data Preprocessing
↓
Feature Engineering
↓
Scaling
↓
ML Model (Logistic Regression / Decision Tree)
↓
Probability of Default (PD)
↓
Risk Score Conversion
↓
Agentic Decision Engine
↓
UI Display (Risk Score + Recommendation)
```


---

## 📥 Input Data

The system expects borrower-level data including:

- Annual Income
- Employment Status
- Loan Amount
- Loan Tenure
- Credit History Length
- Past Delinquencies
- Existing Debt
- Credit Utilization
- Historical repayment behavior

---

## 📤 Output

For each borrower, Plutus generates:

- Probability of Default (PD)
- Credit Risk Score
- Risk Category (Low / Medium / High)
- Key Risk Drivers
- Structured Lending Recommendation:
  - Approve
  - Conditional Approval
  - Reject

---

## 📊 Model Evaluation Metrics

The system is evaluated using:

- Accuracy
- Precision
- Recall
- ROC-AUC Score
- Confusion Matrix

Special emphasis is placed on Recall to reduce false approvals (high-risk borrowers incorrectly classified as low-risk).

---

## 🧩 Agentic Decision Logic

The ML model predicts risk.

An additional rule-based decision engine translates predictions into actionable lending recommendations.

Example:

- PD > 0.60 → Reject
- 0.40 < PD ≤ 0.60 → Conditional Approval
- PD ≤ 0.40 → Approve

This bridges predictive analytics with real-world financial decision-making.

---

## 🛠️ Tech Stack

### Backend / ML
- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib

### Frontend
- React
- Tailwind CSS
- Modern Fintech UI Design

---

## 📂 Project Structure
```
Plutus/
│
├── Plutus.ipynb
├── model.pkl
├── Credit Risk Benchmark Dataset.csv
│
├── frontend/
│ ├── Home Page
│ ├── Predict Page
│
└── README.md
```


---

## 💡 Why This Project Matters

Traditional credit assessment relies heavily on:
- Static scorecards
- Manual underwriting
- Opaque decision rules

Plutus introduces:
- Data-driven risk modeling
- Transparent probability estimation
- Structured AI recommendations
- Scalable decision support

This reduces:
- Default risk
- Manual bias
- Decision latency

---

## 🔮 Future Enhancements

- Ensemble Models (Random Forest, XGBoost)
- SHAP Explainability
- Real-time API Deployment
- Threshold Optimization
- Portfolio Risk Analytics
- Regulatory Compliance Layer

---

## 📌 Milestone 1 Deliverables

- Problem Understanding & Use Case
- ML Pipeline Implementation
- Model Evaluation
- Basic UI Interface
- Agentic Recommendation Engine

---


## 📄 License

This project is developed for academic and demonstration purposes.
