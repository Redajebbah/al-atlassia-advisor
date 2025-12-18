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
      <div className="flex gap-3 items-center bg-white rounded-full shadow-lg px-2 py-2 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <input
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
    </form>
  );
};

export default ChatInput;