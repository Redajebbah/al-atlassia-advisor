import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  type: 'bot' | 'user';
  content: string;
  language: Language;
  isNew?: boolean;
}

const ChatMessage = ({ type, content, language, isNew = false }: ChatMessageProps) => {
  const isRtl = language === 'ar';
  const isBot = type === 'bot';
  const timestamp = new Date().toLocaleTimeString(language === 'ar' ? 'ar-MA' : 'fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div
      className={cn(
        "flex w-full mb-4 gap-3 animate-fade-in-up",
        isBot ? "justify-start" : "justify-end",
        isNew && "animate-slide-in-up"
      )}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Avatar for Bot (left side) */}
      {isBot && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-md">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      )}

      {/* Message Content */}
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[75%] sm:max-w-[70%] md:max-w-[65%]",
          isRtl ? "font-arabic" : ""
        )}
      >
        <div
          className={cn(
            "px-4 py-3 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md",
            isBot 
              ? "bg-white text-gray-800 rounded-tl-sm" 
              : "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm"
          )}
        >
          <p className="text-[15px] sm:text-base leading-relaxed whitespace-pre-line break-words">
            {content}
          </p>
        </div>
        {/* Timestamp */}
        <span 
          className={cn(
            "text-xs text-gray-500 px-2",
            isBot ? "text-left" : "text-right"
          )}
        >
          {timestamp}
        </span>
      </div>

      {/* Avatar for User (right side) */}
      {!isBot && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center shadow-md">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
