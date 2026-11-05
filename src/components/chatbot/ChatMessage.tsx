import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { Bot } from 'lucide-react';

interface ChatMessageProps {
  type: 'bot' | 'user';
  content: string;
  language: Language;
  createdAt?: number;
  /** First message of a consecutive group from the same sender */
  isFirstInGroup?: boolean;
  /** Last message of a consecutive group: carries the timestamp */
  isLastInGroup?: boolean;
}

export const BotAvatar = ({ hidden = false }: { hidden?: boolean }) => (
  <div className={cn('flex-shrink-0 w-8 sm:w-9', hidden && 'invisible')} aria-hidden="true">
    <div
      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #2a4a7f 0%, #1a2f5a 100%)',
        boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)',
      }}
    >
      <Bot className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white" />
    </div>
  </div>
);

const ChatMessage = ({
  type,
  content,
  language,
  createdAt,
  isFirstInGroup = true,
  isLastInGroup = true,
}: ChatMessageProps) => {
  const isRtl = language === 'ar';
  const isBot = type === 'bot';
  const time = new Date(createdAt ?? Date.now()).toLocaleTimeString(isRtl ? 'ar-MA' : 'fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={cn(
        'flex w-full gap-2 sm:gap-2.5 animate-fade-in-up',
        isBot ? 'justify-start' : 'justify-end',
        isLastInGroup ? 'mb-4' : 'mb-1.5',
      )}
    >
      {isBot && <BotAvatar hidden={!isFirstInGroup} />}

      <div
        className={cn(
          'flex flex-col gap-1 max-w-[82%] sm:max-w-[72%] md:max-w-[65%]',
          isBot ? 'items-start' : 'items-end',
          isRtl && 'font-arabic',
        )}
      >
        <div
          className={cn(
            'px-4 py-2.5 sm:py-3 rounded-2xl',
            isBot
              ? isFirstInGroup && 'rounded-ss-md'
              : isFirstInGroup && 'rounded-se-md',
          )}
          style={
            isBot
              ? {
                  background: '#ffffff',
                  color: '#2a3a55',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.04)',
                }
              : {
                  background: 'linear-gradient(135deg, #1e3a6f 0%, #1a2f5a 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(30, 58, 138, 0.2)',
                }
          }
        >
          <p className="text-[15px] sm:text-base leading-relaxed whitespace-pre-line break-words">
            {content}
          </p>
        </div>
        {isLastInGroup && (
          <time className="text-[11px] px-1.5 tabular-nums" style={{ color: '#94a3b8' }}>
            {time}
          </time>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
