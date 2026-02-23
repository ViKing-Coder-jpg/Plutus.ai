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
        accent: 'from-blue-500/8 to-transparent',
    },
    {
        icon: BarChart3,
        title: 'ROC-AUC Optimized Models',
        description:
            'Models are tuned to maximize the ROC-AUC metric, ensuring optimal separation between low- and high-risk borrowers across score thresholds.',
        span: 'md:col-span-1',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
        accent: 'from-violet-500/8 to-transparent',
    },
    {
        icon: Layers,
        title: 'Class Imbalance Handling',
        description:
            'SMOTE oversampling and class-weight adjustments ensure the model remains sensitive to rare default events without overfitting.',
        span: 'md:col-span-1',
        iconColor: 'text-cyan-400',
        iconBg: 'bg-cyan-500/10',
        accent: 'from-cyan-500/8 to-transparent',
    },
    {
        icon: Gauge,
        title: 'Risk Score Conversion Engine',
        description:
            'Raw model probabilities are calibrated and mapped to an industry-standard 300–850 credit score scale for immediate interpretability.',
        span: 'md:col-span-1',
        iconColor: 'text-amber-400',
        iconBg: 'bg-amber-500/10',
        accent: 'from-amber-500/8 to-transparent',
    },
    {
        icon: ShieldCheck,
        title: 'Decision Support Layer',
        description:
            'An agentic reasoning layer synthesizes score, category, and risk factors into structured lending recommendations with confidence intervals.',
        span: 'md:col-span-2',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
        accent: 'from-emerald-500/8 to-transparent',
    },
];

export default function FeatureHighlightsSection() {
    return (
        <section className="py-28 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-700/6 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-700/6 blur-[100px] rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                        Under the Hood
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        Engineered for{' '}
                        <span className="gradient-text">Precision</span>
                    </h2>
                    <p className="text-slate-400 max-w-lg mx-auto">
                        A modular, production-grade pipeline built on proven statistical methods and modern ML engineering best practices.
                    </p>
                </div>

                {/* Feature grid */}
                <div className="grid md:grid-cols-3 gap-5">
                    {features.map(({ icon: Icon, title, description, span, iconColor, iconBg, accent }, i) => (
                        <div
                            key={title}
                            className={`${span} glass-card relative overflow-hidden p-7 flex flex-col gap-5 group cursor-default transition-all duration-400 hover:-translate-y-1 animate-fade-up`}
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            {/* Accent background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col gap-4">
                                <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                                    <Icon className={`w-5 h-5 ${iconColor}`} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-base mb-2">{title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                                </div>
                            </div>

                            {/* Bottom gradient line on hover */}
                            <div className={`absolute bottom-0 inset-x-0 h-px bg-gradient-to-r ${accent.replace('to-transparent', 'to-transparent')} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
