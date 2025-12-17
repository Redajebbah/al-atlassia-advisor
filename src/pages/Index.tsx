import { useState } from 'react';
import { Language } from '@/types/chatbot';
import LanguageSelection from '@/components/chatbot/LanguageSelection';
import ChatContainer from '@/components/chatbot/ChatContainer';
import PartnerCarousel from '@/components/chatbot/PartnerCarousel';
import Footer from '@/components/chatbot/Footer';

const Index = () => {
  const [language, setLanguage] = useState<Language | null>(null);

  const handleReset = () => {
    setLanguage(null);
  };

  if (!language) {
    return <LanguageSelection onSelect={setLanguage} />;
  }

  return (
    <>
      {/* ZONE 1: Chatbot - Fixed full viewport height */}
      <ChatContainer language={language} onReset={handleReset} />
      
      {/* ZONE 2: Page Content - Normal flow below chatbot */}
      <div className="page-content">
        <PartnerCarousel />
        <Footer language={language} />
      </div>
    </>
  );
};

export default Index;
