import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad.png';
import { Globe } from 'lucide-react';

interface LanguageSelectionProps {
  onSelect: (language: Language) => void;
}

const LanguageSelection = ({ onSelect }: LanguageSelectionProps) => {
  return (
    <div className="fixed inset-0 z-50 gradient-hero flex flex-col items-center justify-center p-6">
      {/* Logos */}
      <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
        <div className="partner-wrapper">
          <img
            src={logoAlAtlassia}
            alt="Al Atlassia Assurances"
            className="partner-logo-equal"
          />
        </div>
        <div className="h-12 w-px bg-border" />
        <div className="partner-wrapper">
          <img
            src={logoAtlantaSanad}
            alt="Atlanta Sanad"
            className="partner-logo-equal"
          />
        </div>
      </div>

      <div className="text-center mb-10 animate-fade-in-up animation-delay-100">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Al Atlassia Assurances
        </h1>
        <p className="text-lg text-muted-foreground font-arabic">
          الأطلسية للتأمينات
        </p>
      </div>

      {/* Language icon */}
      <div className="mb-6 animate-fade-in-up animation-delay-200">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Globe className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <button
          onClick={() => onSelect('ar')}
          className={cn(
            "language-card flex-1 animate-fade-in-up animation-delay-200",
            "group hover:border-primary/20 min-h-[120px]"
          )}
        >
          <span className="text-3xl mb-2">🇲🇦</span>
          <span className="text-lg font-bold text-foreground font-arabic">العربية</span>
          <span className="text-xs text-muted-foreground mt-1">Arabe</span>
        </button>

        <button
          onClick={() => onSelect('fr')}
          className={cn(
            "language-card flex-1 animate-fade-in-up animation-delay-300",
            "group hover:border-primary/20 min-h-[120px]"
          )}
        >
          <span className="text-3xl mb-2">🇫🇷</span>
          <span className="text-lg font-bold text-foreground">Français</span>
          <span className="text-xs text-muted-foreground mt-1">French</span>
        </button>
      </div>

      <p className="mt-8 text-xs text-muted-foreground animate-fade-in-up animation-delay-400">
        Choisissez votre langue • اختر لغتك
      </p>
    </div>
  );
};

export default LanguageSelection;
