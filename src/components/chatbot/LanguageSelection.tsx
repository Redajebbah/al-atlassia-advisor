import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad.png';
import { Globe } from 'lucide-react';

interface LanguageSelectionProps {
  onSelect: (language: Language) => void;
}

const LanguageSelection = ({ onSelect }: LanguageSelectionProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 pb-6 overflow-auto" style={{ WebkitOverflowScrolling: 'touch', background: 'radial-gradient(1200px 800px at 20% -10%, hsl(210 60% 96% / 0.9), transparent 65%), radial-gradient(900px 700px at 85% 5%, hsl(205 70% 95% / 0.8), transparent 60%), linear-gradient(180deg, hsl(210 40% 97%) 0%, hsl(210 35% 95%) 50%, hsl(210 30% 96%) 100%)' }}>
      <div className="w-full max-w-md px-4" style={{ paddingTop: 'env(safe-area-inset-top, 0.75rem)', paddingBottom: 'env(safe-area-inset-bottom, 0.75rem)' }}>
      {/* Logos */}
      <div className="flex items-center gap-4 mb-6 animate-fade-in-up flex-wrap justify-center mt-4">
        <div className="flex items-center justify-center">
          <div className="w-28 sm:w-32 md:w-40 h-28 sm:h-32 md:h-40 rounded-xl bg-white shadow-md flex items-center justify-center">
            <img
              src={logoAlAtlassia}
              alt="Al Atlassia Assurances"
              className="max-w-[80%] max-h-[80%] object-contain"
              style={{width: '80%', height: 'auto'}}
            />
          </div>
        </div>
        <div className="h-10 w-px bg-border" />
        <div className="flex items-center justify-center">
          <div className="w-28 sm:w-32 md:w-40 h-28 sm:h-32 md:h-40 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.95) 0%, hsl(210 30% 98% / 0.95) 100%)', boxShadow: '0 8px 25px hsl(215 25% 20% / 0.1), 0 3px 10px hsl(215 25% 20% / 0.08)', border: '1px solid hsl(210 20% 88%)' }}>
            <img
              src={logoAtlantaSanad}
              alt="Atlanta Sanad"
              className="max-w-[80%] max-h-[80%] object-contain"
              style={{width: '80%', height: 'auto'}}
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

      {/* Chatbot-style welcome bubble placed under the header text */}
      <div className="animate-fade-in-up mb-6 px-2">
        <div className="relative max-w-md mx-auto">
          <div className="rounded-3xl px-5 py-4 text-foreground" style={{ background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.92) 0%, hsl(210 35% 98% / 0.92) 100%)', boxShadow: '0 12px 28px hsl(215 25% 20% / 0.12), 0 4px 12px hsl(215 25% 20% / 0.08)', border: '1px solid hsl(210 20% 88%)' }}>
            <p className="text-base text-muted-foreground mb-1">{t('welcome', 'fr')}</p>
            <p className="text-base font-arabic text-foreground" dir="rtl">{t('welcome', 'ar')}</p>
          </div>
          <div className="absolute -right-3 -top-3">
            <div className="w-10 h-10 rounded-full bg-primary shadow flex items-center justify-center text-primary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 3C7.03 3 3 6.69 3 11c0 2.4 1.27 4.56 3.34 6.03V21l3.05-1.62C11.02 20.52 11.99 21 13 21c4.97 0 9-3.69 9-8s-4.03-9-9-9z"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Language icon + hint (inline) */}
      <div className="mb-4 animate-fade-in-up animation-delay-200 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Globe className="w-6 h-6 text-primary" />
        </div>
        <p className="text-sm sm:text-base text-muted-foreground">
          Choisissez votre langue • اختر لغتك
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          onClick={() => onSelect('ar')}
          className={cn(
            "animate-fade-in-up animation-delay-200 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 rounded-2xl p-8 gap-4 min-h-[88px]",
            "group hover:border-primary/20"
          )}
          style={{ background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.95) 0%, hsl(210 35% 98% / 0.95) 100%)', boxShadow: '0 8px 20px hsl(215 25% 20% / 0.1), 0 3px 8px hsl(215 25% 20% / 0.06)', border: '1px solid hsl(210 20% 88%)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 32px hsl(215 25% 20% / 0.15), 0 6px 14px hsl(215 25% 20% / 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 8px 20px hsl(215 25% 20% / 0.1), 0 3px 8px hsl(215 25% 20% / 0.06)';
          }}
        >
          <span className="text-2xl mb-1">🇲🇦</span>
          <span className="text-sm font-semibold text-foreground font-arabic">العربية</span>
          <span className="text-[11px] text-muted-foreground mt-1">Arabe</span>
        </button>

        <button
          onClick={() => onSelect('fr')}
          className={cn(
            "animate-fade-in-up animation-delay-300 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 rounded-2xl p-8 gap-4 min-h-[88px]",
            "group hover:border-primary/20"
          )}
          style={{ background: 'linear-gradient(145deg, hsl(0 0% 100% / 0.95) 0%, hsl(210 35% 98% / 0.95) 100%)', boxShadow: '0 8px 20px hsl(215 25% 20% / 0.1), 0 3px 8px hsl(215 25% 20% / 0.06)', border: '1px solid hsl(210 20% 88%)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 32px hsl(215 25% 20% / 0.15), 0 6px 14px hsl(215 25% 20% / 0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 8px 20px hsl(215 25% 20% / 0.1), 0 3px 8px hsl(215 25% 20% / 0.06)';
          }}
        >
          <span className="text-2xl mb-1">🇫🇷</span>
          <span className="text-sm font-semibold text-foreground">Français</span>
          <span className="text-[11px] text-muted-foreground mt-1">French</span>
        </button>
      </div>

      
      </div>
    </div>
  );
};

export default LanguageSelection;
