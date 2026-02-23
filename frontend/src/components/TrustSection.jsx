import { BrainCircuit, Bot, Lightbulb } from 'lucide-react';

const cards = [
    {
        icon: BrainCircuit,
        title: 'Advanced ML Models',
        description:
            'Logistic regression, decision trees, and gradient boosting trained on real-world credit data with ROC-AUC optimization.',
        glowColor: 'rgba(59, 130, 246, 0.22)',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
        borderHighlight: 'rgba(96, 165, 250, 0.3)',
        delay: '0s',
    },
    {
        icon: Bot,
        title: 'Agentic Lending Recommendations',
        description:
            'An autonomous decision layer generates structured approve, reject, or review recommendations with confidence scores.',
        glowColor: 'rgba(124, 58, 237, 0.22)',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
        borderHighlight: 'rgba(167, 139, 250, 0.3)',
        delay: '0.2s',
    },
    {
        icon: Lightbulb,
        title: 'Explainable Risk Factors',
        description:
            'Every decision comes with interpretable factor weights so your team understands exactly why a score was assigned.',
        glowColor: 'rgba(6, 182, 212, 0.22)',
        iconColor: 'text-cyan-400',
        iconBg: 'bg-cyan-500/10',
        borderHighlight: 'rgba(34, 211, 238, 0.3)',
        delay: '0.4s',
    },
];

export default function TrustSection() {
    return (
        <section className="py-28 relative overflow-hidden">
            {/* Subtle background grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Heading */}
                <div className="text-center mb-16 space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
                        Why Plutus
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                        Institution-Grade Intelligence,{' '}
                        <br className="hidden sm:block" />
                        <span className="gradient-text">Built for Scale</span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Plutus combines rigorous financial modeling with modern machine learning to deliver credit decisions you can trust and explain.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {cards.map(({ icon: Icon, title, description, glowColor, iconColor, iconBg, borderHighlight, delay }) => (
                        <div
                            key={title}
                            className="animate-fade-up group relative rounded-2xl p-px cursor-default"
                            style={{
                                background: `linear-gradient(135deg, ${borderHighlight}, rgba(255,255,255,0.05) 60%, transparent)`,
                                animationDelay: delay,
                            }}
                        >
                            <div
                                className="h-full rounded-2xl p-8 flex flex-col gap-6"
                                style={{
                                    background: 'linear-gradient(150deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                    backdropFilter: 'blur(24px)',
                                    WebkitBackdropFilter: 'blur(24px)',
                                    border: '1px solid rgba(255,255,255,0.10)',
                                    transition: 'all 0.3s ease-out',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = `0 0 50px ${glowColor}, 0 0 100px ${glowColor.replace('0.22', '0.08')}`;
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)';
                                }}
                            >
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center`}>
                                    <Icon className={`w-7 h-7 ${iconColor}`} />
                                </div>

                                {/* Text */}
                                <div className="space-y-2">
                                    <h3 className="text-white font-semibold text-lg">{title}</h3>
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
