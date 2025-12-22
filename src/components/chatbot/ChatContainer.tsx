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
    <div className="flex flex-col bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50 touch-pan-y py-4" style={{ minHeight: 'calc(100dvh - 140px)' }} dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto w-full px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-blue-100 flex flex-col" style={{ height: 'calc(100dvh - 180px)' }}>
          <main className="flex-1 overflow-y-auto chat-scroll overscroll-contain overflow-x-hidden bg-gradient-to-b from-white to-gray-50/50" style={{ maxHeight: '45vh' }}>
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

      <div className="border-t border-blue-100 bg-white/95 backdrop-blur-md safe-bottom shadow-lg flex-shrink-0">
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
              <div className={cn(
                "inline-flex items-center gap-3 bg-green-50 text-green-700 font-medium px-6 py-3 rounded-full shadow-md",
                isRtl && "font-arabic"
              )}>
                <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center animate-pulse-ring">
                  <Check className="w-5 h-5 text-green-600" />
                </span>
                {isRtl ? 'تم إرسال طلبك بنجاح' : 'Votre demande a été envoyée'}
              </div>
              
              <button
                onClick={onReset}
                className="flex items-center gap-2 mx-auto px-6 py-2.5 text-sm bg-white text-gray-700 hover:text-blue-600 transition-all rounded-full shadow-sm hover:shadow-md border border-gray-200"
              >
                <RotateCcw className="w-4 h-4" />
                {isRtl ? 'طلب جديد' : 'Nouvelle demande'}
              </button>
            </div>
          )}
          
          {state.step === 'vie_bureau' && (
            <div className="text-center py-4 space-y-3 animate-fade-in-up">
              <a
                href={isRtl
                  ? 'https://maps.google.com/?q=35.00274163192203,-5.910795861057443'
                  : 'https://maps.google.com/?q=Hay+Marche+Verte+Ksar+El+Kebir+Morocco'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full px-6 py-3 font-medium transition-all hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                {isRtl ? 'عرض على الخريطة' : 'Voir sur la carte'}
              </a>
              
              <button
                onClick={onReset}
                className="flex items-center gap-2 mx-auto px-6 py-2.5 text-sm bg-white text-gray-700 hover:text-blue-600 transition-all rounded-full shadow-sm hover:shadow-md border border-gray-200"
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
