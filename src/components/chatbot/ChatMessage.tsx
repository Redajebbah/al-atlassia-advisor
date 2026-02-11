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
      {/* Avatar for Bot */}
      {isBot && (
        <div className="flex-shrink-0">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #2a4a7f 0%, #1a2f5a 100%)',
              boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)',
            }}
          >
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
          className="px-4 py-3 rounded-2xl transition-all duration-300"
          style={
            isBot
              ? {
                  background: '#ffffff',
                  color: '#2a3a55',
                  borderTopLeftRadius: '0.25rem',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.04)',
                }
              : {
                  background: 'linear-gradient(135deg, #1e3a6f 0%, #1a2f5a 100%)',
                  color: '#ffffff',
                  borderTopRightRadius: '0.25rem',
                  boxShadow: '0 4px 14px rgba(30, 58, 138, 0.2)',
                }
          }
        >
          <p className="text-[15px] sm:text-base leading-relaxed whitespace-pre-line break-words">
            {content}
          </p>
        </div>
        {/* Timestamp */}
        <span
          className={cn(
            "text-xs px-2",
            isBot ? "text-left" : "text-right"
          )}
          style={{ color: '#94a3b8' }}
        >
          {timestamp}
        </span>
      </div>

      {/* Avatar for User */}
      {!isBot && (
        <div className="flex-shrink-0">
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
            }}
          >
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
