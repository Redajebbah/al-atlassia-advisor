import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';
import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (value: string) => void;
  language: Language;
  placeholder?: string;
  type?: 'text' | 'phone' | 'number';
}

const ChatInput = ({ onSubmit, language, placeholder, type = 'text' }: ChatInputProps) => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const isRtl = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    if (type === 'phone') {
      // Validate Moroccan phone number on submit
      const normalized = trimmed.replace(/[\s-]/g, '');
      const valid = /^(?:\+212[67]\d{8}|0[67]\d{8})$/.test(normalized);
        if (!valid) {
        setTouched(true);
        setError(t('phoneInvalid' as any, language));
        return; // do NOT proceed to next step
      }
    }

    onSubmit(trimmed);
    setValue('');
    setTouched(false);
    setError('');
  };

  const inputType = type === 'phone' ? 'tel' : type === 'number' ? 'number' : 'text';

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full animate-fade-in-up"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex gap-3 items-center bg-white rounded-full shadow-lg px-2 py-2 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <input
          type={inputType}
          value={value}
          onChange={(e) => {
            const v = e.target.value;
            setValue(v);
            // live clear of error if becomes valid; do not block typing
            if (type === 'phone' && (touched || error)) {
              const normalized = v.replace(/[\s-]/g, '');
              const valid = /^(?:\+212[67]\d{8}|0[67]\d{8})$/.test(normalized);
              if (valid) {
                setError('');
              }
            }
          }}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent px-4 py-2",
            "text-[16px] sm:text-base text-foreground placeholder:text-gray-400",
            "focus:outline-none transition-all touch-manipulation",
            isRtl ? "font-arabic text-right" : ""
          )}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          onBlur={() => {
            if (type === 'phone') {
              setTouched(true);
              const normalized = value.trim().replace(/[\s-]/g, '');
              const valid = /^(?:\+212[67]\d{8}|0[67]\d{8})$/.test(normalized);
              if (!valid && value.trim() !== '') {
                setError(t('phoneInvalid' as any, language));
              } else {
                setError('');
              }
            }
          }}
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className={cn(
            "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full",
            "w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0",
            "transition-all hover:scale-105 active:scale-95 touch-manipulation shadow-md hover:shadow-lg",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
            "flex items-center justify-center"
          )}
        >
          <Send className={cn("w-5 h-5", isRtl && "rotate-180")} />
        </button>
      </div>
      {error && (
        <p className={cn("mt-2 text-sm text-destructive", isRtl && "font-arabic")}>{error}</p>
      )}
    </form>
  );
};

export default ChatInput;