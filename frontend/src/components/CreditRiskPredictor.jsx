import React, { useState } from 'react';

const CreditRiskPredictor = () => {
  const [formData, setFormData] = useState({
    'RevolvingUtilizationOfUnsecuredLines': '',
    'age': '',
    'NumberOfTime30-59DaysPastDueNotWorse': '',
    'DebtRatio': '',
    'MonthlyIncome': '',
    'NumberOfOpenCreditLinesAndLoans': '',
    'NumberOfTimes90DaysLate': '',
    'NumberRealEstateLoansOrLines': '',
    'NumberOfTime60-89DaysPastDueNotWorse': '',
    'NumberOfDependents': ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do not connect backend or add logic, just prevent default
  };

  const fields = [
    { name: 'RevolvingUtilizationOfUnsecuredLines', label: 'Revol. Util. of Unsecured Lines', placeholder: 'e.g., 0.766126' },
    { name: 'age', label: 'Age', placeholder: 'e.g., 45' },
    { name: 'NumberOfTime30-59DaysPastDueNotWorse', label: 'Times 30-59 Days Past Due', placeholder: 'e.g., 2' },
    { name: 'DebtRatio', label: 'Debt Ratio', placeholder: 'e.g., 0.802982' },
    { name: 'MonthlyIncome', label: 'Monthly Income', placeholder: 'e.g., 9120' },
    { name: 'NumberOfOpenCreditLinesAndLoans', label: 'Open Credit Lines & Loans', placeholder: 'e.g., 13' },
    { name: 'NumberOfTimes90DaysLate', label: 'Times 90+ Days Late', placeholder: 'e.g., 0' },
    { name: 'NumberRealEstateLoansOrLines', label: 'Real Estate Loans or Lines', placeholder: 'e.g., 6' },
    { name: 'NumberOfTime60-89DaysPastDueNotWorse', label: 'Times 60-89 Days Past Due', placeholder: 'e.g., 0' },
    { name: 'NumberOfDependents', label: 'Number of Dependents', placeholder: 'e.g., 2' }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 px-6">
      {/* Background styling matching App/Hero */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        style={{ background: 'linear-gradient(160deg, oklch(0.07 0.025 270) 0%, #050c1f 45%, oklch(0.06 0.02 265) 100%)' }}
      />
      <div 
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          top: '-20%', left: '-10%',
          background: 'radial-gradient(ellipse, rgba(109,40,217,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Subtle dot grid */}
      <div
          className="absolute inset-0 pointer-events-none"
          style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
          }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto animate-fade-up">
        {/* Glass Card */}
        <div className="glass-cardp p-8 sm:p-10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Credit Risk Predictor</h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Enter borrower financial details below. Our AI model will estimate the probability of default within the next 2 years.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {fields.map(field => (
                <div key={field.name} className="flex flex-col space-y-1.5">
                  <label htmlFor={field.name} className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type="number"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    step="any"
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/40 transition-all"
                  />
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-center">
              <button 
                type="submit" 
                className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
              >
                Predict Credit Risk
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default CreditRiskPredictor;
