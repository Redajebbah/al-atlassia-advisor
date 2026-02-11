import { useEffect, useRef, useState } from 'react';
import { Language } from '@/types/chatbot';
import { useChatbot } from '@/hooks/useChatbot';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import OptionCards from './OptionCards';
import ChatInput from './ChatInput';
import ChatFooter from './ChatFooter';
import { cn } from '@/lib/utils';
import { MapPin, RotateCcw, Check } from 'lucide-react';

interface ChatContainerProps {
  language: Language;
  onReset: () => void;
}

const ChatContainer = ({ language, onReset }: ChatContainerProps) => {
  const { state, initialize, handleOptionSelect, handleMultiSelect, handleTextInput } = useChatbot(language);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [showFooter, setShowFooter] = useState(false);
  const isRtl = language === 'ar';

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  }, [state.messages, state.isTyping]);

  useEffect(() => {
    if (state.step === 'confirmation' || state.step === 'vie_bureau') {
      setShowFooter(true);
    }
  }, [state.step]);

  const onOptionSelect = (optionId: string) => {
    const option = state.currentOptions?.find(o => o.id === optionId);
    if (option) {
      handleOptionSelect(optionId, option.label);
    }
  };

  const onMultiSelect = (selectedIds: string[]) => {
    const labels = selectedIds
      .map(id => state.currentOptions?.find(o => o.id === id)?.label)
      .filter(Boolean)
      .join(', ');
    handleMultiSelect(selectedIds, labels);
  };

  return (
    <div
      className="flex flex-col touch-pan-y py-4"
      style={{
        minHeight: 'calc(100dvh - 140px)',
        background: 'linear-gradient(170deg, #e8edf5 0%, #edf1f8 25%, #f0f4f9 50%, #eef2f7 75%, #e8eef6 100%)',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-4xl mx-auto w-full px-4">
        <div
          className="rounded-3xl flex flex-col"
          style={{
            height: 'calc(100dvh - 180px)',
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 20px 60px rgba(30, 58, 138, 0.08), 0 4px 16px rgba(0,0,0,0.04)',
            border: '1px solid rgba(30, 58, 138, 0.06)',
          }}
        >
          <main
            className="flex-1 overflow-y-auto chat-scroll overscroll-contain overflow-x-hidden"
            style={{
              maxHeight: '45vh',
              background: 'linear-gradient(180deg, #ffffff 0%, #fafbfd 100%)',
              borderRadius: '1.5rem 1.5rem 0 0',
            }}
          >
            <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4 pb-safe">
              {state.messages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  type={message.type}
                  content={message.content}
                  language={language}
                  isNew={index === state.messages.length - 1}
                />
              ))}

              {state.isTyping && <TypingIndicator />}

              <div ref={chatEndRef} />
            </div>

            {showFooter && <ChatFooter language={language} />}
          </main>

          <div
            className="safe-bottom flex-shrink-0"
            style={{
              borderTop: '1px solid rgba(30, 58, 138, 0.06)',
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 -4px 20px rgba(0,0,0,0.03)',
              borderRadius: '0 0 1.5rem 1.5rem',
            }}
          >
            <div className="max-w-2xl mx-auto px-3 sm:px-4 py-3 sm:py-4 pb-safe">
              {state.currentOptions && state.currentOptions.length > 0 && (
                <OptionCards
                  options={state.currentOptions}
                  onSelect={onOptionSelect}
                  language={language}
                  multiSelect={state.currentMultiSelect}
                  onMultiSelect={onMultiSelect}
                  columns={state.currentOptions.length <= 4 ? 2 : 3}
                  preSelected={state.preSelectedOptions}
                />
              )}

              {state.currentInputType && (
                <ChatInput
                  onSubmit={handleTextInput}
                  language={language}
                  type={state.currentInputType}
                  placeholder={state.currentInputPlaceholder}
                />
              )}

              {state.step === 'confirmation' && (
                <div className="text-center py-4 space-y-4 animate-fade-in-up">
                  <div
                    className={cn(
                      'inline-flex items-center gap-3 font-medium px-6 py-3 rounded-full',
                      isRtl && 'font-arabic',
                    )}
                    style={{
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                      color: '#15803d',
                      boxShadow: '0 4px 14px rgba(22, 163, 74, 0.1)',
                      border: '1px solid rgba(22, 163, 74, 0.1)',
                    }}
                  >
                    <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center animate-pulse-ring">
                      <Check className="w-5 h-5 text-green-600" />
                    </span>
                    {isRtl ? 'تم إرسال طلبك بنجاح' : 'Votre demande a été envoyée'}
                  </div>

                  <button
                    onClick={onReset}
                    className="flex items-center gap-2 mx-auto px-6 py-2.5 text-sm transition-all rounded-full"
                    style={{
                      background: '#ffffff',
                      color: '#4a5568',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    {isRtl ? 'طلب جديد' : 'Nouvelle demande'}
                  </button>
                </div>
              )}

              {state.step === 'vie_bureau' && (
                <div className="text-center py-4 space-y-3 animate-fade-in-up">
                  <a
                    href={
                      isRtl
                        ? 'https://maps.google.com/?q=35.00274163192203,-5.910795861057443'
                        : 'https://maps.google.com/?q=Hay+Marche+Verte+Ksar+El+Kebir+Morocco'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white rounded-full px-6 py-3 font-medium transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #1e3a6f 0%, #1a2f5a 100%)',
                      boxShadow: '0 8px 24px rgba(30, 58, 138, 0.2)',
                    }}
                  >
                    <MapPin className="w-5 h-5" />
                    {isRtl ? 'عرض على الخريطة' : 'Voir sur la carte'}
                  </a>

                  <button
                    onClick={onReset}
                    className="flex items-center gap-2 mx-auto px-6 py-2.5 text-sm transition-all rounded-full"
                    style={{
                      background: '#ffffff',
                      color: '#4a5568',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    {isRtl ? 'طلب جديد' : 'Nouvelle demande'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
