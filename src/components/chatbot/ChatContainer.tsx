import { useEffect, useRef, useState } from 'react';
import { Language } from '@/types/chatbot';
import { useChatbot } from '@/hooks/useChatbot';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import OptionCards from './OptionCards';
import ChatInput from './ChatInput';
import PartnerCarousel from './PartnerCarousel';
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
  }, [initialize]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.isTyping]);

  useEffect(() => {
    if (state.step === 'confirmation' || state.step === 'vie_bureau') {
      setShowFooter(true);
    }
  }, [state.step]);

  const onOptionSelect = (optionId: string) => {
    const option = state.currentOptions.find(o => o.id === optionId);
    if (option) {
      handleOptionSelect(optionId, option.label);
    }
  };

  const onMultiSelect = (selectedIds: string[]) => {
    const labels = selectedIds
      .map(id => state.currentOptions.find(o => o.id === id)?.label)
      .filter(Boolean)
      .join(', ');
    handleMultiSelect(selectedIds, labels);
  };

  return (
    <div className="h-screen flex flex-col bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      <ChatHeader language={language} />
      
      <main className="flex-1 overflow-y-auto chat-scroll">
        <div className="max-w-2xl mx-auto px-4 py-6">
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

      <div className="border-t border-border bg-card/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {state.currentOptions.length > 0 && (
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
            <div className="text-center py-4 space-y-4">
              <div className={cn(
                "inline-flex items-center gap-2 text-primary font-medium",
                isRtl && "font-arabic"
              )}>
                <span className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-success" />
                </span>
                {isRtl ? 'تم إرسال طلبك بنجاح' : 'Votre demande a été envoyée'}
              </div>
              
              <button
                onClick={onReset}
                className="flex items-center gap-2 mx-auto px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {isRtl ? 'طلب جديد' : 'Nouvelle demande'}
              </button>
            </div>
          )}
          
          {state.step === 'vie_bureau' && (
            <div className="text-center py-4 space-y-3">
              <a
                href="https://maps.google.com/?q=Hay+Marche+Verte+Ksar+El+Kebir+Morocco"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gradient-primary text-primary-foreground rounded-xl px-6 py-3 font-medium transition-all hover:opacity-90 active:scale-[0.98]"
              >
                <MapPin className="w-5 h-5" />
                {isRtl ? 'عرض على الخريطة' : 'Voir sur la carte'}
              </a>
              
              <button
                onClick={onReset}
                className="flex items-center gap-2 mx-auto px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {isRtl ? 'طلب جديد' : 'Nouvelle demande'}
              </button>
            </div>
          )}
        </div>
      </div>

      <PartnerCarousel />
    </div>
  );
};

export default ChatContainer;
