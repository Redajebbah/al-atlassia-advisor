import { useState } from 'react';
import { Language } from '@/types/chatbot';
import LanguageSelection from '@/components/chatbot/LanguageSelection';
import ChatContainer from '@/components/chatbot/ChatContainer';

const Index = () => {
  const [language, setLanguage] = useState<Language | null>(null);

  const handleReset = () => {
    setLanguage(null);
  };

  if (!language) {
    return <LanguageSelection onSelect={setLanguage} />;
  }

  return <ChatContainer language={language} onReset={handleReset} />;
};

export default Index;
