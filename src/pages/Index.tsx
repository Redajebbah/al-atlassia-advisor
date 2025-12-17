import { useState } from 'react';
import { Language } from '@/types/chatbot';
import LanguageSelection from '@/components/chatbot/LanguageSelection';
import ChatContainer from '@/components/chatbot/ChatContainer';
import PartnerCarousel from '@/components/chatbot/PartnerCarousel';
import Footer from '@/components/chatbot/Footer';
import Header from '@/components/Header';

const Index = () => {
  const [language, setLanguage] = useState<Language | null>(null);

  const handleReset = () => {
    setLanguage(null);
  };

  if (!language) {
    return <LanguageSelection onSelect={setLanguage} />;
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Professional Header */}
      <Header />
      
      {/* ZONE 1: Chatbot - Separated with padding */}
      <div className="flex-1 overflow-hidden mb-16">
        <ChatContainer language={language} onReset={handleReset} />
      </div>
      
      {/* ZONE 2: Page Content - Clear separation */}
      <div className="mt-20 pt-8 border-t-4 border-blue-200 bg-gradient-to-b from-gray-50 to-white">
        <PartnerCarousel />
        <Footer language={language} />
      </div>
    </div>
  );
};

export default Index;
