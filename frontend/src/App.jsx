import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrustSection from './components/TrustSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeatureHighlightsSection from './components/FeatureHighlightsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import CreditRiskPredictor from './components/CreditRiskPredictor';
import { useState } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const navigateToPredict = () => {
    setCurrentView('predict');
    window.scrollTo(0, 0);
  };
    
  const navigateToHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[oklch(0.06_0.02_265)] text-white">
      <Navbar onNavigateHome={navigateToHome} onNavigatePredict={navigateToPredict} currentView={currentView} />
      
      <main>
        {currentView === 'home' ? (
          <>
            <HeroSection onNavigate={navigateToPredict} />
            <TrustSection />
            <HowItWorksSection />
            <FeatureHighlightsSection />
            <CTASection onNavigate={navigateToPredict} />
          </>
        ) : (
          <CreditRiskPredictor />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
