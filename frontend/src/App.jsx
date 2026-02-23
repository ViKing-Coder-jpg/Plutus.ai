import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeatureHighlightsSection from './components/FeatureHighlightsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[oklch(0.06_0.02_265)] text-white">
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <HowItWorksSection />
        <FeatureHighlightsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
