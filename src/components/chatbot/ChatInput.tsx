import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';
import { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (value: string) => void;
  language: Language;
  placeholder?: string;
  type?: 'text' | 'phone' | 'number' | 'registration';
}

const ChatInput = ({ onSubmit, language, placeholder, type = 'text' }: ChatInputProps) => {
  const [value, setValue] = useState('');
  const [registration, setRegistration] = useState(['', '', '']);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  const isRtl = language === 'ar';

  const handleRegistrationChange = (index: number, val: string) => {
    const newReg = [...registration];

    // Validate based on block
    if (index === 0) { // 5 digits
      if (!/^\d*$/.test(val)) return;
      if (val.length > 5) {
        // Auto-jump to next block if full
        document.getElementById('reg-input-1')?.focus();
        return;
      }
      newReg[0] = val;
      if (val.length === 5) {
        document.getElementById('reg-input-1')?.focus();
      }
    } else if (index === 1) { // 1 letter
      // Allow only letters (Latin or Arabic)
      if (!/^[\u0600-\u06FFa-zA-Z]*$/.test(val)) return;
      if (val.length > 1) {
        document.getElementById('reg-input-2')?.focus();
        return;
      }
      newReg[1] = val.toUpperCase();
      if (val.length === 1) {
        document.getElementById('reg-input-2')?.focus();
      }
    } else if (index === 2) { // 1-2 digits
      if (!/^\d*$/.test(val)) return;
      if (val.length > 2) return;
      newReg[2] = val;
    }

    setRegistration(newReg);
    setError('');
  };

  const handleRegistrationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullReg = `${registration[0]}-${registration[1]}-${registration[2]}`;

    // Strict validation
    // Block 1: exactly 5 digits
    // Block 2: exactly 1 letter (Arabic or Latin)
    // Block 3: 1 or 2 digits
    const isValid = /^\d{1,5}-[\u0600-\u06FFa-zA-Z]-\d{1,2}$/.test(fullReg);

    if (!isValid) {
      setError(t('registrationInvalid' as any, language));
      return;
    }

    onSubmit(fullReg);
    setRegistration(['', '', '']);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;

    if (type === 'phone') {
      // Validate Moroccan phone number on submit — allow prefixes 05, 06, 07 and +2125/6/7
      const normalized = trimmed.replace(/[\s-]/g, '');
      const valid = /^(?:\+212[567]\d{8}|0[567]\d{8})$/.test(normalized);
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

  if (type === 'registration') {
    return (
      <form onSubmit={handleRegistrationSubmit} className="w-full animate-fade-in-up" dir="ltr">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center justify-center bg-white rounded-xl shadow-lg p-3 border border-gray-200">
            {/* Block 1: 5 digits */}
            <input
              id="reg-input-0"
              type="text"
              inputMode="numeric"
              value={registration[0]}
              onChange={(e) => handleRegistrationChange(0, e.target.value)}
              placeholder="12345"
              className="w-20 text-center text-lg font-bold border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none p-1"
              autoFocus
            />
            <span className="text-gray-400 font-bold">-</span>
            {/* Block 2: 1 Letter */}
            <input
              id="reg-input-1"
              type="text"
              value={registration[1]}
              onChange={(e) => handleRegistrationChange(1, e.target.value)}
              placeholder="A"
              className="w-12 text-center text-lg font-bold border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none p-1 uppercase"
            />
            <span className="text-gray-400 font-bold">-</span>
            {/* Block 3: 1-2 digits */}
            <input
              id="reg-input-2"
              type="text"
              inputMode="numeric"
              value={registration[2]}
              onChange={(e) => handleRegistrationChange(2, e.target.value)}
              placeholder="6"
              className="w-12 text-center text-lg font-bold border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none p-1"
            />

            <button
              type="submit"
              className={cn(
                "ml-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full",
                "w-10 h-10 flex-shrink-0",
                "transition-all hover:scale-105 active:scale-95 touch-manipulation shadow-md",
                "flex items-center justify-center"
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          {error && (
            <p className={cn("text-center text-sm text-destructive", language === 'ar' && "font-arabic")}>
              {error}
            </p>
          )}
        </div>
      </form>
    );
  }

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
              const valid = /^(?:\+212[567]\d{8}|0[567]\d{8})$/.test(normalized);
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
              const valid = /^(?:\+212[567]\d{8}|0[567]\d{8})$/.test(normalized);
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