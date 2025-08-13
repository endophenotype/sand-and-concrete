import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Products from '@/components/Products';
import Calculator from '@/components/Calculator';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import CallModal from '@/components/CallModal';
import InfoModal from '@/components/InfoModal';
import ScrollToTop from '@/components/ScrollToTop';

const Index = () => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState<'privacy' | 'terms'>('privacy');
  const [showCalculator, setShowCalculator] = useState(false);

  const handleCallClick = () => {
    setIsCallModalOpen(true);
  };

  const handleCalculateClick = () => {
    setShowCalculator(true);
    // Scroll to calculator section
    setTimeout(() => {
      const element = document.getElementById('calculator');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handlePrivacyClick = () => {
    setInfoModalContent('privacy');
    setIsInfoModalOpen(true);
  };

  const handleTermsClick = () => {
    setInfoModalContent('terms');
    setIsInfoModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header onCallClick={handleCallClick} />
      <Hero onCalculateClick={handleCalculateClick} />
      <About />
      <Products />
      {showCalculator && <Calculator />}
      <Reviews />
      <Footer onPrivacyClick={handlePrivacyClick} onTermsClick={handleTermsClick} />
      
      <CallModal 
        isOpen={isCallModalOpen} 
        onClose={() => setIsCallModalOpen(false)} 
      />
      
      <InfoModal 
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        title={infoModalContent === 'privacy' ? 'Политика конфиденциальности' : 'Условия использования'}
        content={infoModalContent}
      />
      
      <ScrollToTop />
    </div>
  );
};

export default Index;
