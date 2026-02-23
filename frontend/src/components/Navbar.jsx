import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-[oklch(0.06_0.02_265/0.92)] backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/20'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">Plutus</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Predict', 'Documentation'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#predict"
            className="btn-primary hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm cursor-pointer"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
}
