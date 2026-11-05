import { useEffect, useRef, useState } from 'react';
import { Language } from '@/types/chatbot';
import { useChatbot } from '@/hooks/useChatbot';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import OptionCards from './OptionCards';
import ChatInput from './ChatInput';
import ChatFooter from './ChatFooter';
import { cn } from '@/lib/utils';
import { getPhaseIndex, PHASES } from '@/lib/chatProgress';
import { MapPin, RotateCcw, Check, Bot } from 'lucide-react';

interface ChatContainerProps {
  language: Language;
  onReset: () => void;
}

const ChatContainer = ({ language, onReset }: ChatContainerProps) => {
  const { state, initialize, handleOptionSelect, handleMultiSelect, handleTextInput } = useChatbot(language);
  const scrollRef = useRef<HTMLElement>(null);
  const [showFooter, setShowFooter] = useState(false);
  const isRtl = language === 'ar';
  const phases = PHASES[language];
  const phaseIndex = getPhaseIndex(state.step);
  const isDone = state.step === 'confirmation' || state.step === 'vie_bureau';

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Keep the latest message in view, inside the chat panel only (the page itself does not jump)
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [state.messages, state.isTyping, state.currentOptions, state.currentInputType]);

  useEffect(() => {
    if (isDone) setShowFooter(true);
  }, [isDone]);

  // Size the chat panel to the screen space left under the site header (measured at the top of the page)
  const [headerHeight, setHeaderHeight] = useState(120);
  useEffect(() => {
    const measure = () => {
      const header = document.querySelector('header');
      if (header && window.scrollY < 20) setHeaderHeight(header.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

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

  const hasActions = (state.currentOptions?.length ?? 0) > 0 || !!state.currentInputType || isDone;

  return (
    <section
      id="assistant"
      aria-label={isRtl ? 'المساعد الرقمي' : 'Assistant digital'}
      className="flex flex-col touch-pan-y py-3"
      style={{
        background: 'linear-gradient(170deg, #e8edf5 0%, #edf1f8 25%, #f0f4f9 50%, #eef2f7 75%, #e8eef6 100%)',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-3xl mx-auto w-full px-3 sm:px-4">
        <div
          className="rounded-3xl flex flex-col overflow-hidden"
          style={{
            height: `calc(100dvh - ${Math.round(headerHeight)}px - 1.5rem)`,
            minHeight: '480px',
            maxHeight: '860px',
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 20px 60px rgba(30, 58, 138, 0.08), 0 4px 16px rgba(0,0,0,0.04)',
            border: '1px solid rgba(30, 58, 138, 0.06)',
          }}
        >
          {/* Chat header: identity, status, restart + progress */}
          <div
            className="flex-shrink-0 px-4 sm:px-5 pt-3 pb-3"
            style={{
              background: 'rgba(255,255,255,0.92)',
              borderBottom: '1px solid rgba(30, 58, 138, 0.06)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #2a4a7f 0%, #1a2f5a 100%)',
                    boxShadow: '0 4px 12px rgba(30, 58, 138, 0.2)',
                  }}
                >
                  <Bot className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span
                  className="absolute -bottom-0.5 -end-0.5 w-3 h-3 rounded-full bg-green-500"
                  style={{ boxShadow: '0 0 0 2px #ffffff' }}
                  aria-hidden="true"
                />
              </div>
              <div className={cn('flex-1 min-w-0', isRtl && 'font-arabic')}>
                <p className="font-semibold text-[15px] leading-tight truncate" style={{ color: '#1a2947' }}>
                  {isRtl ? 'مساعد الأطلسية للتأمينات' : 'Assistant Al Atlassia'}
                </p>
                <p className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: '#64748b' }}>
                  {isRtl ? 'متصل · رد فوري' : 'En ligne · réponse immédiate'}
                </p>
              </div>
              <button
                type="button"
                onClick={onReset}
                className="icon-btn"
                aria-label={isRtl ? 'البدء من جديد' : 'Recommencer'}
                title={isRtl ? 'البدء من جديد' : 'Recommencer'}
              >
                <RotateCcw className="w-[18px] h-[18px]" />
              </button>
            </div>

            {/* Progress */}
            <ol className={cn('mt-3 grid grid-cols-4 gap-1.5', isRtl && 'font-arabic')} aria-label={isRtl ? 'مراحل الطلب' : 'Étapes de la demande'}>
              {phases.map((label, i) => {
                const done = i < phaseIndex || isDone;
                const current = i === phaseIndex && !isDone;
                return (
                  <li key={label} className="flex flex-col gap-1" aria-current={current ? 'step' : undefined}>
                    <span
                      className="h-1 rounded-full transition-colors duration-500"
                      style={{ background: done || current ? '#1e3a6f' : 'rgba(30, 58, 138, 0.1)', opacity: current ? 0.55 : 1 }}
                    />
                    <span
                      className="text-[10px] sm:text-[11px] font-medium truncate"
                      style={{ color: done || current ? '#1e3a6f' : '#94a3b8' }}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Messages */}
          <main
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto chat-scroll overscroll-contain overflow-x-hidden"
            style={{ background: 'linear-gradient(180deg, #ffffff 0%, #fafbfd 100%)' }}
          >
            <div
              className="max-w-2xl mx-auto px-3 sm:px-5 pt-4 pb-2"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
            >
              {state.messages.map((message, index) => {
                const prev = state.messages[index - 1];
                const next = state.messages[index + 1];
                return (
                  <ChatMessage
                    key={message.id}
                    type={message.type}
                    content={message.content}
                    language={language}
                    createdAt={message.createdAt}
                    isFirstInGroup={prev?.type !== message.type}
                    isLastInGroup={next?.type !== message.type && !(state.isTyping && message.type === 'bot' && !next)}
                  />
                );
              })}

              {state.isTyping && <TypingIndicator language={language} />}
            </div>

            {showFooter && <ChatFooter language={language} />}
          </main>

          {/* Actions: options, input, end of conversation */}
          {hasActions && (
            <div
              className="safe-bottom flex-shrink-0 max-h-[50%] flex flex-col"
              style={{
                borderTop: '1px solid rgba(30, 58, 138, 0.06)',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.03)',
              }}
            >
              <div className="max-w-2xl w-full mx-auto px-3 sm:px-5 py-3 sm:py-4 flex flex-col min-h-0">
                {state.currentOptions && state.currentOptions.length > 0 && !state.isTyping && (
                  <OptionCards
                    key={state.messages.length}
                    options={state.currentOptions}
                    onSelect={onOptionSelect}
                    language={language}
                    multiSelect={state.currentMultiSelect}
                    onMultiSelect={onMultiSelect}
                    columns={state.currentOptions.length <= 4 ? 2 : 3}
                    preSelected={state.preSelectedOptions}
                  />
                )}

                {state.currentInputType && !state.isTyping && (
                  <ChatInput
                    key={state.messages.length}
                    onSubmit={handleTextInput}
                    language={language}
                    type={state.currentInputType}
                    placeholder={state.currentInputPlaceholder}
                  />
                )}

                {state.step === 'confirmation' && (
                  <div className={cn('flex flex-col items-center text-center gap-3 py-2 animate-fade-in-up', isRtl && 'font-arabic')}>
                    <span
                      className="w-12 h-12 rounded-full flex items-center justify-center animate-scale-in"
                      style={{
                        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                        boxShadow: '0 4px 14px rgba(22, 163, 74, 0.15)',
                        border: '1px solid rgba(22, 163, 74, 0.15)',
                      }}
                    >
                      <Check className="w-6 h-6 text-green-600" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold" style={{ color: '#15803d' }}>
                        {isRtl ? 'تم إرسال طلبك بنجاح' : 'Votre demande a été envoyée'}
                      </p>
                      <p className="text-sm mt-0.5" style={{ color: '#64748b' }}>
                        {isRtl ? 'سيتصل بك مستشارنا في الموعد الذي اخترته.' : 'Un conseiller vous recontactera au créneau choisi.'}
                      </p>
                    </div>
                    <button type="button" onClick={onReset} className="btn-ghost mt-1">
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      {isRtl ? 'طلب جديد' : 'Nouvelle demande'}
                    </button>
                  </div>
                )}

                {state.step === 'vie_bureau' && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 py-1 animate-fade-in-up">
                    <a
                      href={
                        isRtl
                          ? 'https://maps.google.com/?q=35.00274163192203,-5.910795861057443'
                          : 'https://maps.google.com/?q=Hay+Marche+Verte+Ksar+El+Kebir+Morocco'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full sm:w-auto"
                    >
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                      {isRtl ? 'عرض على الخريطة' : 'Voir sur la carte'}
                    </a>
                    <button type="button" onClick={onReset} className="btn-ghost w-full sm:w-auto">
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      {isRtl ? 'طلب جديد' : 'Nouvelle demande'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatContainer;
