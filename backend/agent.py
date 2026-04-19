"""
Plutus.ai - Milestone 2: Agentic Lending Decision Support System
LangGraph Agent with FAISS RAG + Groq LLM
"""

import os
import re
from typing import TypedDict, Optional
from groq import Groq
import numpy as np

try:
    import faiss
    from sentence_transformers import SentenceTransformer
    RAG_AVAILABLE = True
except ImportError:
    RAG_AVAILABLE = False

from langgraph.graph import StateGraph, END

class AgentState(TypedDict):
    borrower_data: dict          
    ml_results: dict             

    retrieved_regulations: str   
    borrower_summary: str        

    report: Optional[dict]       

_rag_index = None
_rag_chunks = []
_embed_model = None

def _build_rag_index():
    """Build FAISS index once from regulations.txt at startup."""
    global _rag_index, _rag_chunks, _embed_model

    if not RAG_AVAILABLE:
        return

    reg_path = os.path.join(os.path.dirname(__file__), "regulations.txt")
    if not os.path.exists(reg_path):
        return

    with open(reg_path, "r") as f:
        raw = f.read()

    chunks = [c.strip() for c in re.split(r'\n##', raw) if c.strip()]
    _rag_chunks = chunks

    _embed_model = SentenceTransformer("all-MiniLM-L6-v2")
    embeddings = _embed_model.encode(chunks, convert_to_numpy=True).astype("float32")

    index = faiss.IndexFlatL2(embeddings.shape[1])
    index.add(embeddings)
    _rag_index = index

def retrieve_regulations(query: str, top_k: int = 4) -> str:
    """Return the top_k most relevant regulation chunks for the query."""
    if not RAG_AVAILABLE or _rag_index is None or _embed_model is None:
        return _fallback_regulations()

    q_emb = _embed_model.encode([query], convert_to_numpy=True).astype("float32")
    _, indices = _rag_index.search(q_emb, top_k)
    results = [_rag_chunks[i] for i in indices[0] if i < len(_rag_chunks)]
    return "\n\n---\n\n".join(results)

def _fallback_regulations() -> str:
    """Return static minimal guidance when FAISS is unavailable."""
    return (
        "Responsible lending requires assessing affordability and repayment capacity. "
        "DTI above 43% is a risk indicator. High revolving utilization (>70%) signals financial stress. "
        "Any 90+ day delinquency is a major risk factor. Lenders must comply with ECOA and FCRA. "
        "AI-driven decisions must be explainable and audited for bias."
    )

def _get_groq_client() -> Groq:
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY environment variable not set.")
    return Groq(api_key=api_key)

def node_retrieve_regulations(state: AgentState) -> AgentState:
    """Node 1: Build a query from borrower risk factors and retrieve regulations via RAG."""
    bd = state["borrower_data"]
    ml = state["ml_results"]

    avg_prob = ml["decision_tree"]["probability"]

    query_parts = []
    if bd.get("late_90", 0) > 0:
        query_parts.append("90 day delinquency default risk")
    if bd.get("late_60_89", 0) > 0:
        query_parts.append("60-89 days past due credit risk")
    if bd.get("late_30_59", 0) > 1:
        query_parts.append("repeated 30-59 day late payments delinquency")
    if bd.get("rev_util", 0) > 0.7:
        query_parts.append("high revolving credit utilization")
    if bd.get("debt_ratio", 0) > 0.43:
        query_parts.append("high debt to income ratio")
    if bd.get("dependents", 0) >= 3:
        query_parts.append("multiple dependents affordability")
    if avg_prob >= 0.5:
        query_parts.append("high risk loan denial mitigation strategies")
    elif avg_prob >= 0.2:
        query_parts.append("medium risk lending guidelines compensating factors")
    else:
        query_parts.append("low risk responsible lending approval standards")

    query = " ".join(query_parts) if query_parts else "credit risk lending guidelines"
    regulations = retrieve_regulations(query)

    return {**state, "retrieved_regulations": regulations}

def node_build_summary(state: AgentState) -> AgentState:
    """Node 2: Assemble a structured borrower summary string for the LLM prompt."""
    bd = state["borrower_data"]
    ml = state["ml_results"]

    tree_prob = ml["decision_tree"]["probability"]
    avg_prob = tree_prob
    avg_risk = (
        "High" if avg_prob >= 0.5
        else ("Medium" if avg_prob >= 0.2 else "Low")
    )

    monthly_inc = bd.get("monthly_inc")
    income_note = ""
    if monthly_inc is None or monthly_inc <= 0:
        monthly_inc = 0
        income_note = " [MISSING/INVALID — treat as unknown]"

    summary = f"""
BORROWER PROFILE:
- Age: {bd.get('age', 'N/A')}
- Monthly Income: ${monthly_inc:,.0f}{income_note}
- Number of Dependents: {bd.get('dependents', 0)}

CREDIT BEHAVIOUR:
- Revolving Utilization: {bd.get('rev_util', 0) * 100:.1f}%
- Debt Ratio: {bd.get('debt_ratio', 0):.3f}
- Open Credit Lines: {bd.get('open_credit', 0)}
- Real Estate Loans: {bd.get('real_estate', 0)}

DELINQUENCY HISTORY:
- Times 30-59 Days Late: {bd.get('late_30_59', 0)}
- Times 60-89 Days Late: {bd.get('late_60_89', 0)}
- Times 90+ Days Late: {bd.get('late_90', 0)}

ML MODEL OUTPUTS:
- Decision Tree:       {tree_prob * 100:.1f}% probability of default → {ml['decision_tree']['risk']} Risk
- Risk Level: {avg_risk} (probability: {avg_prob * 100:.1f}%)
""".strip()

    return {**state, "borrower_summary": summary}

def node_generate_report(state: AgentState) -> AgentState:
    """Node 3: Call Groq LLM to generate the structured lending assessment report."""
    system_prompt = """You are Plutus, an expert AI lending analyst at a regulated financial institution.
Your task is to generate a structured, professional lending assessment report based on borrower data, ML model outputs, and retrieved regulatory guidelines.

You MUST respond with ONLY valid JSON — no markdown, no preamble, no explanation outside the JSON.

The JSON must follow this exact schema:
{
  "borrower_profile_summary": "2-3 sentence plain English summary of who this borrower is financially.",
  "credit_risk_analysis": "3-5 sentences analyzing the key risk factors, what the ML models indicate, and how the borrower compares to industry benchmarks.",
  "recommended_lending_decision": "One of: APPROVE / CONDITIONAL APPROVAL / DECLINE. Followed by 2-3 sentences of justification.",
  "risk_mitigation_suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
  "supporting_references": ["regulation or guideline name 1", "regulation or guideline name 2"],
  "legal_and_ethical_disclaimers": "Standard disclaimer about AI-generated reports, human review requirement, ECOA/FCRA compliance, and non-discrimination."
}"""

    user_prompt = f"""Please generate a lending assessment report for the following borrower.

{state['borrower_summary']}

RELEVANT REGULATORY GUIDELINES RETRIEVED:
{state['retrieved_regulations']}

Generate the JSON lending assessment report now."""

    try:
        client = _get_groq_client()
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
            temperature=0.3,
            max_tokens=1200,
        )

        raw_text = response.choices[0].message.content.strip()

        raw_text = re.sub(r"^```[a-z]*\n?", "", raw_text)
        raw_text = re.sub(r"\n?```$", "", raw_text)
        raw_text = raw_text.strip()

        import json
        report = json.loads(raw_text)
        return {**state, "report": report, "error": None}

    except Exception as e:
        fallback_report = _fallback_report(state, str(e))
        return {**state, "report": fallback_report, "error": str(e)}

def _fallback_report(state: AgentState, error_msg: str) -> dict:
    """Return a minimal valid report if LLM call fails."""
    ml = state["ml_results"]
    avg_prob = ml["decision_tree"]["probability"]
    avg_risk = "High" if avg_prob >= 0.5 else ("Medium" if avg_prob >= 0.2 else "Low")
    decision = "DECLINE" if avg_risk == "High" else ("CONDITIONAL APPROVAL" if avg_risk == "Medium" else "APPROVE")

    return {
        "borrower_profile_summary": "Automated analysis was performed based on the provided financial data.",
        "credit_risk_analysis": (
            f"The ML models indicate a consensus risk level of {avg_risk} "
            f"with an average default probability of {avg_prob * 100:.1f}%. "
            "A detailed AI narrative could not be generated at this time."
        ),
        "recommended_lending_decision": (
            f"{decision}. Based on the model outputs, this borrower presents {avg_risk.lower()} credit risk."
        ),
        "risk_mitigation_suggestions": [
            "Review delinquency history in detail.",
            "Verify income documentation.",
            "Consider requesting a co-signer if borderline."
        ],
        "supporting_references": ["Responsible Lending Principles", "ECOA", "FCRA"],
        "legal_and_ethical_disclaimers": (
            "This report is generated by an AI system and must be reviewed by a qualified human lending officer "
            "before any lending decision is made. This report does not constitute a final credit decision. "
            "All decisions must comply with ECOA, FCRA, and applicable local lending regulations."
        )
    }

def _build_graph() -> StateGraph:
    graph = StateGraph(AgentState)

    graph.add_node("retrieve_regulations", node_retrieve_regulations)
    graph.add_node("build_summary", node_build_summary)
    graph.add_node("generate_report", node_generate_report)

    graph.set_entry_point("retrieve_regulations")
    graph.add_edge("retrieve_regulations", "build_summary")
    graph.add_edge("build_summary", "generate_report")
    graph.add_edge("generate_report", END)

    return graph.compile()

_graph = _build_graph()

def run_lending_agent(borrower_data: dict, ml_results: dict) -> dict:
    """
    Entry point called by FastAPI.
    Returns the full structured lending assessment report dict.
    """
    initial_state: AgentState = {
        "borrower_data": borrower_data,
        "ml_results": ml_results,
        "retrieved_regulations": "",
        "borrower_summary": "",
        "report": None,
        "error": None,
    }

    final_state = _graph.invoke(initial_state)
    return {
        "report": final_state["report"],
        "borrower_summary": final_state["borrower_summary"],
        "ml_results": ml_results,
        "agent_error": final_state.get("error"),
    }

_build_rag_index()