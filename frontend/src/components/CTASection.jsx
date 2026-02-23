import { ArrowRight } from 'lucide-react';

export default function CTASection() {
    return (
        <section className="py-28 relative overflow-hidden">
            {/* Large ambient glow blob */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[700px] h-[400px] bg-gradient-to-r from-blue-600/12 via-violet-700/15 to-blue-600/12 blur-[100px] rounded-full" />
            </div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-10">
                {/* Eyebrow */}
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 animate-fade-up">
                    Get Started Today
                </p>

                {/* Heading */}
                <h2 className="animate-fade-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                    Make Lending Decisions{' '}
                    <span className="gradient-text">Backed by AI,</span>{' '}
                    Not Assumptions.
                </h2>

                <p className="animate-fade-up delay-200 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
                    Integrate Plutus into your lending workflow and replace gut-feel underwriting with explainable, calibrated machine intelligence.
                </p>

                {/* CTA Button */}
                <div className="animate-fade-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        id="start-risk-analysis-btn"
                        className="btn-primary flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold animate-pulse-glow"
                    >
                        Start Risk Analysis
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Trust note */}
                <p className="animate-fade-up delay-400 text-xs text-slate-600 max-w-sm mx-auto">
                    No credit card required. Works with CSV, JSON, or REST API.
                </p>
            </div>
        </section>
    );
}
