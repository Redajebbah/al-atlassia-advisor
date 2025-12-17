import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad.png';
import { Shield, MessageSquare } from 'lucide-react';

interface ChatHeaderProps {
  language: Language;
}

const ChatHeader = ({ language }: ChatHeaderProps) => {
  const isRtl = language === 'ar';
  
  return (
    <header className="bg-[#1e3a6f] text-white shadow-lg sticky top-0 z-50 safe-top">
      <div className="px-3 sm:px-4 py-3 sm:py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          {/* Al Atlassia Logo with Text */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <img 
              src={logoAlAtlassia} 
              alt="al atlassia assurances" 
              className="h-12 sm:h-14 md:h-16 w-auto object-contain shrink-0"
            />
            
            {/* Divider */}
            <div className="hidden md:block h-12 w-px bg-white/20 shrink-0" />
            
            {/* Atlanta Sanad Logo */}
            <img 
              src={logoAtlantaSanad} 
              alt="Atlanta Sanad Assurance" 
              className="hidden md:block h-10 sm:h-12 w-auto object-contain shrink-0"
            />
          </div>
          
          {/* Assistant Badge */}
          <div className={cn(
            "flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm shrink-0",
            isRtl ? "font-arabic" : ""
          )}>
            <div className="relative">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full border border-[#1e3a6f]" />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-white hidden sm:inline">
              {isRtl ? 'مساعدك الرقمي' : 'Assistant en ligne'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
