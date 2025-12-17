import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  type: 'bot' | 'user';
  content: string;
  language: Language;
  isNew?: boolean;
}

const ChatMessage = ({ type, content, language, isNew = false }: ChatMessageProps) => {
  const isRtl = language === 'ar';
  const isBot = type === 'bot';

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isBot ? (isRtl ? "justify-end" : "justify-start") : (isRtl ? "justify-start" : "justify-end"),
        isNew && (isBot ? "animate-slide-in-left" : "animate-slide-in-right")
      )}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div
        className={cn(
          "max-w-[85%] md:max-w-[75%]",
          isBot ? "chat-bubble-bot" : "chat-bubble-user",
          isRtl ? "font-arabic" : ""
        )}
      >
        <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
