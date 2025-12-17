import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
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
  const isRtl = language === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');
    }
  };

  const inputType = type === 'phone' ? 'tel' : type === 'number' ? 'number' : 'text';

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full animate-fade-in-up"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="flex gap-2">
        <input
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-card border border-border rounded-xl px-3 sm:px-4 py-3 sm:py-3.5",
            "text-[16px] sm:text-base text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
            "transition-all touch-manipulation",
            isRtl ? "font-arabic text-right" : ""
          )}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className={cn(
            "gradient-primary text-primary-foreground rounded-xl px-3 sm:px-4 min-w-[48px] sm:min-w-[52px]",
            "transition-all hover:opacity-90 active:scale-95 touch-manipulation",
            "disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          )}
        >
          <Send className={cn("w-4 h-4 sm:w-5 sm:h-5", isRtl && "rotate-180")} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
