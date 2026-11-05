import { Language } from '@/types/chatbot';
import { BotAvatar } from './ChatMessage';

const TypingIndicator = ({ language }: { language: Language }) => {
  return (
    <div
      className="flex justify-start gap-2 sm:gap-2.5 mb-4 animate-fade-in"
      role="status"
      aria-label={language === 'ar' ? 'المساعد يكتب' : "L'assistant écrit"}
    >
      <BotAvatar />
      <div className="chat-bubble-bot rounded-ss-md flex items-center gap-1.5 px-4 py-3.5">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
};

export default TypingIndicator;
