import { UploadCloud, PlayCircle, ShieldCheck, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const riskFactors = [
    { label: 'Payment History', value: 'Excellent', color: 'text-emerald-400' },
    { label: 'Credit Utilization', value: '18%', color: 'text-emerald-400' },
    { label: 'Debt-to-Income', value: '0.32', color: 'text-amber-400' },
    { label: 'Account Age', value: '7.2 yrs', color: 'text-emerald-400' },
];

function DashboardMockup() {
    return (
        <div className="relative w-full max-w-sm lg:max-w-md animate-float">
            {/* Ambient glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-violet-600/15 to-transparent rounded-3xl blur-2xl" />

            <div className="relative glass-card p-6 space-y-5 animate-count-up">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-slate-400 font-medium tracking-wide uppercase">Risk Analysis</span>
                    </div>
                    <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-md">Live</span>
                </div>

                {/* Score */}
                <div className="text-center py-4">
                    <div className="text-[72px] font-bold leading-none gradient-text tabular-nums">742</div>
                    <div className="text-slate-400 text-sm mt-1">Credit Risk Score</div>
                </div>

                {/* Category + PD */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/4 rounded-xl p-3">
                        <div className="text-xs text-slate-500 mb-1">Risk Category</div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-semibold text-sm">Low Risk</span>
                        </div>
                    </div>
                    <div className="bg-white/4 rounded-xl p-3">
                        <div className="text-xs text-slate-500 mb-1">Prob. of Default</div>
                        <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-blue-400 font-semibold text-sm">3.2%</span>
                        </div>
                    </div>
                </div>

                {/* Score bar */}
                <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                        <span>0</span>
                        <span className="text-blue-400 font-medium">742 / 850</span>
                        <span>850</span>
                    </div>
                    <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                            style={{ width: '87%', transition: 'width 1.5s ease' }}
                        />
                    </div>
                </div>

                {/* Key Risk Factors */}
                <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Key Risk Factors</div>
                    <div className="space-y-2">
                        {riskFactors.map((f) => (
                            <div key={f.label} className="flex items-center justify-between">
                                <span className="text-xs text-slate-400">{f.label}</span>
                                <span className={`text-xs font-semibold ${f.color}`}>{f.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommendation tag */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-300 font-medium">Recommended: Approve at standard rate</span>
                </div>
            </div>
        </div>
    );
}

export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center overflow-hidden pt-16"
        >
            {/* Background */}
            <div className="absolute inset-0 noise-overlay" />
            <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.06_0.02_265)] via-[#050b1a] to-[oklch(0.06_0.02_265)]" />
            <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-700/8 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* Left – copy */}
                    <div className="space-y-8">
                        {/* Badge */}
                        <div className="animate-fade-up">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-300 tracking-wide">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                AI-Native Credit Intelligence
                            </span>
                        </div>

                        <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-white">
                            AI-Powered Credit Risk Intelligence for{' '}
                            <span className="gradient-text">Smarter Lending</span>{' '}
                            Decisions
                        </h1>

                        <p className="animate-fade-up delay-200 text-lg text-slate-400 leading-relaxed max-w-lg">
                            Predict borrower risk, analyze financial behavior, and generate structured lending recommendations using advanced machine learning.
                        </p>

                        <div className="animate-fade-up delay-300 flex flex-wrap gap-4">
                            <button
                                id="upload-data-btn"
                                className="btn-primary flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm"
                            >
                                <UploadCloud className="w-4 h-4" />
                                Upload Data
                            </button>
                            <button
                                id="view-demo-btn"
                                className="btn-secondary flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm"
                            >
                                <PlayCircle className="w-4 h-4" />
                                View Demo
                            </button>
                        </div>

                        {/* Social proof row */}
                        <div className="animate-fade-up delay-400 flex items-center gap-6 pt-2">
                            {[
                                { value: '99.1%', label: 'Model Accuracy' },
                                { value: '0.94', label: 'ROC-AUC Score' },
                                { value: '<200ms', label: 'Inference Time' },
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs text-slate-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right – Dashboard mockup */}
                    <div className="flex justify-center lg:justify-end animate-fade-in delay-400">
                        <DashboardMockup />
                    </div>
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[oklch(0.06_0.02_265)] to-transparent" />
        </section>
    );
}
