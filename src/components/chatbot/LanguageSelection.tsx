import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { t } from '@/lib/translations';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad.png';
import { Globe } from 'lucide-react';

// Inline SVG flags: emoji flags are not rendered on Windows (they show as "MA" / "FR")
const FlagMA = () => (
  <svg viewBox="0 0 90 60" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="90" height="60" fill="#c1272d" />
    <path
      d="M45 17.5 51.47 37.4 34.54 25.1h20.92L38.53 37.4z"
      fill="none"
      stroke="#006233"
      strokeWidth="2.6"
      strokeLinejoin="round"
    />
  </svg>
);

const FlagFR = () => (
  <svg viewBox="0 0 90 60" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <rect width="30" height="60" fill="#0055a4" />
    <rect x="30" width="30" height="60" fill="#ffffff" />
    <rect x="60" width="30" height="60" fill="#ef4135" />
  </svg>
);

const LANGUAGES: {
  code: Language;
  label: string;
  hint: string;
  flag: JSX.Element;
  ribbon: string;
  ribbonShadow: string;
}[] = [
  {
    code: 'ar',
    label: 'العربية',
    hint: 'Arabe',
    flag: <FlagMA />,
    ribbon: 'linear-gradient(135deg, #e94b6f 0%, #f55b7f 100%)',
    ribbonShadow: '0 2px 8px rgba(233, 75, 111, 0.3)',
  },
  {
    code: 'fr',
    label: 'Français',
    hint: 'French',
    flag: <FlagFR />,
    ribbon: 'linear-gradient(135deg, #4a7fc1 0%, #5a8fd1 100%)',
    ribbonShadow: '0 2px 8px rgba(74, 127, 193, 0.3)',
  },
];

interface LanguageSelectionProps {
  onSelect: (language: Language) => void;
}

const LanguageSelection = ({ onSelect }: LanguageSelectionProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-4 pb-6 overflow-auto"
      style={{
        WebkitOverflowScrolling: 'touch',
        background: 'linear-gradient(180deg, #f7f9fc 0%, #f5f7fa 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        className="w-full max-w-md px-4 relative"
        style={{
          paddingTop: 'env(safe-area-inset-top, 0.5rem)',
          paddingBottom: 'env(safe-area-inset-bottom, 0.75rem)',
        }}
      >
        {/* Logos */}
        <div className="flex items-center gap-3 mb-4 animate-fade-in-up flex-wrap justify-center mt-2">
          <div className="flex items-center justify-center">
            <div
              className="w-28 sm:w-32 md:w-40 h-28 sm:h-32 md:h-40 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ease-out"
              style={{
                background: '#ffffff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <img
                src={logoAlAtlassia}
                alt="Al Atlassia Assurances"
                className="max-w-[80%] max-h-[80%] object-contain"
                style={{ width: '80%', height: 'auto' }}
              />
            </div>
          </div>
          <div
            className="h-8 w-px"
            style={{
              background: 'rgba(0, 0, 0, 0.1)',
            }}
          />
          <div className="flex items-center justify-center">
            <div
              className="w-28 sm:w-32 md:w-40 h-28 sm:h-32 md:h-40 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ease-out"
              style={{
                background: '#ffffff',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <img
                src={logoAtlantaSanad}
                alt="Atlanta Sanad"
                className="max-w-[80%] max-h-[80%] object-contain"
                style={{ width: '80%', height: 'auto' }}
              />
            </div>
          </div>
        </div>

        {/* Brand Text */}
        <div className="text-center mb-4 animate-fade-in-up animation-delay-100">
          <h1
            className="text-lg sm:text-xl md:text-2xl font-bold mb-0.5"
            style={{
              color: '#1a2947',
              letterSpacing: '-0.02em',
              fontWeight: 700,
            }}
          >
            Al Atlassia Assurances
          </h1>
          <p
            className="text-sm sm:text-base font-arabic"
            style={{
              color: '#2d4a7c',
              fontWeight: 600,
            }}
          >
            الأطلسية للتأمينات
          </p>
          <p
            className="mt-0.5 text-xs sm:text-sm font-arabic px-3 max-w-xl mx-auto"
            style={{
              color: '#4a5568',
              fontWeight: 400,
              lineHeight: '1.5',
            }}
          >
            وسيط تأمين خاضع لمقتضيات القانون رقم 17.99 المتعلق بمدونة التأمينات
          </p>
        </div>

        {/* Welcome Bubble */}
        <div className="animate-fade-in-up mb-4 px-2 animation-delay-200">
          <div className="relative max-w-md mx-auto">
            <div
              className="rounded-2xl sm:rounded-3xl px-4 py-3 sm:px-5 sm:py-4 transition-all duration-300 ease-out relative overflow-hidden"
              style={{
                background: '#ffffff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              {/* Decorative ribbon - top right corner */}
              <div
                className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none"
                style={{ borderRadius: '0 1rem 0 0' }}
              >
                <div
                  className="absolute transform rotate-45 origin-top-right"
                  style={{
                    width: '110px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #4a7fc1 0%, #5a8fd1 100%)',
                    top: '16px',
                    right: '-38px',
                    boxShadow: '0 2px 8px rgba(74, 127, 193, 0.3)'
                  }}
                />
              </div>

              <p
                className="text-sm sm:text-base mb-1"
                style={{
                  color: '#4a5568',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                {t('welcome', 'fr')}
              </p>
              <p
                className="text-sm sm:text-base font-arabic"
                dir="rtl"
                style={{
                  color: '#1a2947',
                  lineHeight: '1.85',
                  fontWeight: 500,
                }}
              >
                {t('welcome', 'ar')}
              </p>
            </div>
            <div className="absolute -right-2 sm:-right-3 -top-2 sm:-top-3">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 ease-out"
                style={{
                  background: 'linear-gradient(135deg, #2d4a7c 0%, #1e3a6f 100%)',
                  boxShadow: '0 4px 12px rgba(45, 74, 124, 0.3)',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path d="M12 3C7.03 3 3 6.69 3 11c0 2.4 1.27 4.56 3.34 6.03V21l3.05-1.62C11.02 20.52 11.99 21 13 21c4.97 0 9-3.69 9-8s-4.03-9-9-9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Language hint */}
        <div className="mb-3 animate-fade-in-up animation-delay-300 flex items-center justify-center gap-2.5">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
            style={{
              background: 'rgba(45, 74, 124, 0.08)',
            }}
          >
            <Globe className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#2d4a7c' }} />
          </div>
          <p
            className="text-xs sm:text-sm md:text-base"
            style={{
              color: '#4a5568',
              fontWeight: 500,
            }}
          >
            Choisissez votre langue • اختر لغتك
          </p>
        </div>

        {/* Language Cards */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full" role="group" aria-label="Choisissez votre langue • اختر لغتك">
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.code}
              type="button"
              lang={lang.code}
              onClick={() => onSelect(lang.code)}
              className={cn('lang-card animate-fade-in-up', i === 0 ? 'animation-delay-300' : 'animation-delay-400')}
            >
              {/* Decorative ribbon - top right corner */}
              <div
                className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none"
                style={{ borderRadius: '0 0.75rem 0 0' }}
                aria-hidden="true"
              >
                <div
                  className="absolute transform rotate-45 origin-top-right"
                  style={{
                    width: '100px',
                    height: '30px',
                    background: lang.ribbon,
                    top: '15px',
                    right: '-35px',
                    boxShadow: lang.ribbonShadow,
                  }}
                />
              </div>

              <span className="lang-card__flag" aria-hidden="true">{lang.flag}</span>
              <span
                className={cn('text-base font-semibold', lang.code === 'ar' && 'font-arabic')}
                style={{ color: '#2d4a7c' }}
              >
                {lang.label}
              </span>
              <span className="text-xs -mt-1 sm:-mt-2" style={{ color: '#6b7280', fontWeight: 500 }}>
                {lang.hint}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
