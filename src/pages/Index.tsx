import { useState } from 'react';
import { Language } from '@/types/chatbot';
import LanguageSelection from '@/components/chatbot/LanguageSelection';
import ChatContainer from '@/components/chatbot/ChatContainer';

const Index = () => {
  const [language, setLanguage] = useState<Language | null>(null);

  if (!language) {
    return <LanguageSelection onSelect={setLanguage} />;
  }

  return <ChatContainer language={language} />;
};

export default Index;
