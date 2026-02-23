import { GitBranch, BarChart3, Layers, Gauge, ShieldCheck } from 'lucide-react';

const features = [
    {
        icon: GitBranch,
        title: 'Logistic Regression & Decision Trees',
        description:
            'A dual-model architecture combining the interpretability of logistic regression with the expressivity of tree-based models for robust scoring.',
        span: 'md:col-span-2',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
        hoverBg: 'rgba(59,130,246,0.08)',
        delay: '0s',
    },
    {
        icon: BarChart3,
        title: 'ROC-AUC Optimized Models',
        description:
            'Models are tuned to maximize the ROC-AUC metric, ensuring optimal separation between low- and high-risk borrowers across score thresholds.',
        span: 'md:col-span-1',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
        hoverBg: 'rgba(124,58,237,0.08)',
        delay: '0.15s',
    },
    {
        icon: Layers,
        title: 'Class Imbalance Handling',
        description:
            'SMOTE oversampling and class-weight adjustments ensure the model remains sensitive to rare default events without overfitting.',
        span: 'md:col-span-1',
        iconColor: 'text-cyan-400',
        iconBg: 'bg-cyan-500/10',
        hoverBg: 'rgba(6,182,212,0.08)',
        delay: '0.3s',
    },
    {
        icon: Gauge,
        title: 'Risk Score Conversion Engine',
        description:
            'Raw model probabilities are calibrated and mapped to an industry-standard 300–850 credit score scale for immediate interpretability.',
        span: 'md:col-span-1',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
        hoverBg: 'rgba(245,158,11,0.08)',
        delay: '0.45s',
    },
    {
        icon: ShieldCheck,
        title: 'Decision Support Layer',
        description:
            'An agentic reasoning layer synthesizes score, category, and risk factors into structured lending recommendations with confidence intervals.',
        span: 'md:col-span-2',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
        hoverBg: 'rgba(16,185,129,0.08)',
        delay: '0.6s',
    },
];

export default function FeatureHighlightsSection() {
    return (
        <section className="w-full py-32 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
                style={{ background: 'rgba(124,58,237,0.07)' }}
            />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'rgba(59,130,246,0.07)' }}
            />

            <div className="relative z-10 w-full px-12 lg:px-20">
                {/* Heading */}
                <div className="text-center mb-20 space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                        Under the Hood
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        Engineered for <span className="gradient-text">Precision</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        A modular, production-grade pipeline built on proven statistical methods and modern ML engineering best practices.
                    </p>
                </div>

                {/* Feature bento grid */}
                <div className="grid md:grid-cols-3 gap-5">
                    {features.map(({ icon: Icon, title, description, span, iconColor, iconBg, hoverBg, delay }) => (
                        <div
                            key={title}
                            className={`${span} relative overflow-hidden p-8 flex flex-col gap-5 cursor-default animate-fade-up`}
                            style={{
                                animationDelay: delay,
                                background: 'rgba(255,255,255,0.05)',
                                backdropFilter: 'blur(24px)',
                                WebkitBackdropFilter: 'blur(24px)',
                                border: '1px solid rgba(255,255,255,0.10)',
                                borderRadius: '1rem',
                                transition: 'all 0.3s ease-out',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = `0 24px 60px ${hoverBg}, 0 0 0 1px rgba(255,255,255,0.14)`;
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            }}
                        >
                            {/* Hover radial accent */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                                style={{
                                    background: `radial-gradient(ellipse at top left, ${hoverBg}, transparent 70%)`,
                                    transition: 'opacity 0.3s ease-out',
                                }}
                            />

                            <div className="relative z-10 flex flex-col gap-4">
                                <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-6 h-6 ${iconColor}`} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
