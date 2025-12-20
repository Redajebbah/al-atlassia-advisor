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
    <div className="fixed inset-0 z-50 gradient-hero flex items-start justify-center pt-10 pb-6 overflow-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="w-full max-w-md px-4" style={{ paddingTop: 'env(safe-area-inset-top, 1.25rem)', paddingBottom: 'env(safe-area-inset-bottom, 1rem)' }}>
      {/* Logos */}
      <div className="flex items-center gap-4 mb-8 animate-fade-in-up flex-wrap justify-center mt-6">
        <div className="flex items-center justify-center">
          <div className="w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 rounded-xl bg-white shadow-md flex items-center justify-center">
            <img
              src={logoAlAtlassia}
              alt="Al Atlassia Assurances"
              className="max-w-[72%] max-h-[72%] object-contain"
            />
          </div>
        </div>
        <div className="h-12 w-px bg-border" />
        <div className="flex items-center justify-center">
          <div className="w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 rounded-xl bg-white shadow-md flex items-center justify-center">
            <img
              src={logoAtlantaSanad}
              alt="Atlanta Sanad"
              className="max-w-[72%] max-h-[72%] object-contain"
            />
          </div>
        </div>
      </div>

      <div className="text-center mb-8 animate-fade-in-up animation-delay-100">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          Al Atlassia Assurances
        </h1>
        <p className="text-lg text-muted-foreground font-arabic">
          الأطلسية للتأمينات
        </p>
        <p className="mt-2 text-[13px] sm:text-sm md:text-sm text-muted-foreground font-arabic px-4 leading-tight max-w-xl mx-auto">
          وسيط تأمين خاضع لمقتضيات القانون رقم 17.99 المتعلق بمدونة التأمينات
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

      <p className="mt-6 text-xs text-muted-foreground animate-fade-in-up animation-delay-400">
        Choisissez votre langue • اختر لغتك
      </p>
      </div>
    </div>
  );
};

export default LanguageSelection;
