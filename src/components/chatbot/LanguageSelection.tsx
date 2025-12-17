import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';

interface LanguageSelectionProps {
  onSelect: (language: Language) => void;
}

const LanguageSelection = ({ onSelect }: LanguageSelectionProps) => {
  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Al Atlassia Assurances
        </h1>
        <p className="text-lg text-muted-foreground">
          الأطلسية للتأمينات
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg">
        <button
          onClick={() => onSelect('ar')}
          className={cn(
            "language-card flex-1 animate-fade-in-up animation-delay-100",
            "group hover:border-primary/20"
          )}
        >
          <span className="text-5xl mb-2">🇲🇦</span>
          <span className="text-2xl font-bold text-foreground font-arabic">العربية</span>
          <span className="text-sm text-muted-foreground mt-1">Arabe</span>
        </button>

        <button
          onClick={() => onSelect('fr')}
          className={cn(
            "language-card flex-1 animate-fade-in-up animation-delay-200",
            "group hover:border-primary/20"
          )}
        >
          <span className="text-5xl mb-2">🇫🇷</span>
          <span className="text-2xl font-bold text-foreground">Français</span>
          <span className="text-sm text-muted-foreground mt-1">French</span>
        </button>
      </div>

      <p className="mt-12 text-sm text-muted-foreground animate-fade-in-up animation-delay-300">
        Choisissez votre langue • اختر لغتك
      </p>
    </div>
  );
};

export default LanguageSelection;
