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
    <div className="fixed inset-0 z-50 gradient-hero flex items-start justify-center pt-6 pb-6 overflow-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div className="w-full max-w-md px-4" style={{ paddingTop: 'env(safe-area-inset-top, 0.75rem)', paddingBottom: 'env(safe-area-inset-bottom, 0.75rem)' }}>
      {/* Logos */}
      <div className="flex items-center gap-4 mb-6 animate-fade-in-up flex-wrap justify-center mt-4">
        <div className="flex items-center justify-center">
          <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 rounded-xl bg-white shadow-md flex items-center justify-center">
            <img
              src={logoAlAtlassia}
              alt="Al Atlassia Assurances"
              className="max-w-[68%] max-h-[68%] object-contain"
            />
          </div>
        </div>
        <div className="h-10 w-px bg-border" />
        <div className="flex items-center justify-center">
          <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28 rounded-xl bg-white shadow-md flex items-center justify-center">
            <img
              src={logoAtlantaSanad}
              alt="Atlanta Sanad"
              className="max-w-[68%] max-h-[68%] object-contain"
            />
          </div>
        </div>
      </div>

      <div className="text-center mb-6 animate-fade-in-up animation-delay-100">
        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
          Al Atlassia Assurances
        </h1>
        <p className="text-base text-muted-foreground font-arabic">
          الأطلسية للتأمينات
        </p>
        <p className="mt-1 text-sm sm:text-sm md:text-sm text-muted-foreground font-arabic px-4 leading-tight max-w-xl mx-auto">
          وسيط تأمين خاضع لمقتضيات القانون رقم 17.99 المتعلق بمدونة التأمينات
        </p>
      </div>

      {/* Language icon */}
      <div className="mb-4 animate-fade-in-up animation-delay-200">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Globe className="w-6 h-6 text-primary" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={() => onSelect('ar')}
          className={cn(
            "language-card flex-1 animate-fade-in-up animation-delay-200",
            "group hover:border-primary/20 min-h-[100px]"
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
            "group hover:border-primary/20 min-h-[100px]"
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
