import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad.png';
import { MessageSquare } from 'lucide-react';

interface ChatHeaderProps {
  language: Language;
}

const ChatHeader = ({ language }: ChatHeaderProps) => {
  const isRtl = language === 'ar';
  
  return (
    <header className="bg-[#1e3a6f] text-white shadow-md sticky top-0 z-50 safe-top">
      {/* Main Header Content */}
      <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Left Section: Logos */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Al Atlassia Logo */}
              <div className="partner-wrapper">
                <img
                  src={logoAlAtlassia}
                  alt="Al Atlassia Assurances"
                  className="partner-logo-equal"
                />
              </div>
              
              {/* Divider */}
              <div className="h-10 sm:h-12 w-px bg-white/20" />
              
              {/* Atlanta Sanad Logo */}
              <div className="partner-wrapper">
                <img
                  src={logoAtlantaSanad}
                  alt="Atlanta Sanad"
                  className="partner-logo-equal"
                />
              </div>
            </div>
            
            {/* Right Section: Brand Name */}
            <div className={cn(
              "flex flex-col items-end text-right min-w-0",
              isRtl && "items-start text-left"
            )}>
              {/* Arabic Name */}
              <h1 className="font-arabic text-sm sm:text-base md:text-lg font-semibold leading-tight text-white/95 whitespace-nowrap">
                الأطلسية للتأمينات
              </h1>
              {/* French Name */}
              <p className="text-[10px] sm:text-xs md:text-sm text-white/75 font-light tracking-wide whitespace-nowrap">
                Al Atlassia Assurances
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar: Assistant Badge */}
      <div className="bg-[#1a3461] px-3 sm:px-6 py-2">
        <div className="max-w-4xl mx-auto">
          <div className={cn(
            "flex items-center justify-center gap-2",
            isRtl ? "font-arabic" : ""
          )}>
            <div className="relative">
              <MessageSquare className="w-3.5 h-3.5 text-white/90" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 rounded-full border border-[#1a3461] shadow-sm" />
            </div>
            <span className="text-xs text-white/90 font-medium">
              {isRtl ? 'مساعدك الرقمي المباشر' : 'Votre Assistant Digital'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
