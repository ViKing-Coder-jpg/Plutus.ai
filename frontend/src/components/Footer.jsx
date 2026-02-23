import { TrendingUp, Github, ExternalLink } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Predict', href: '#predict' },
    { label: 'Documentation', href: '#docs' },
];

export default function Footer() {
    return (
        <footer className="relative border-t border-white/6 overflow-hidden">
            {/* Background subtlety */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                    {/* Brand */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-white font-semibold text-lg tracking-tight">Plutus</span>
                        </div>
                        <p className="text-xs text-slate-500 tracking-widest uppercase">
                            Intelligent Lending Infrastructure
                        </p>
                    </div>

                    {/* Nav links */}
                    <nav className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-200 font-medium"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* GitHub link */}
                    <a
                        href="https://github.com/ViKing-Coder-jpg/Plutus.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-200 transition-colors duration-200"
                    >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                    </a>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                    <span>© 2026 Plutus. All rights reserved.</span>
                    <span className="flex items-center gap-1">
                        Built with{' '}
                        <span className="gradient-text font-semibold">React + Tailwind CSS</span>
                    </span>
                </div>
            </div>
        </footer>
    );
}
