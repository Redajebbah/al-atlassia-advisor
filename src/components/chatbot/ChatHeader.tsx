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
    <header className="bg-card border-b border-border shadow-insurance-sm sticky top-0 z-50 safe-top">
      {/* Top accent bar */}
      <div className="h-1 gradient-primary" />
      
      <div className="px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Logos */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img 
              src={logoAlAtlassia} 
              alt="Al Atlassia Assurances" 
              className="h-8 sm:h-10 md:h-12 w-auto object-contain shrink-0"
            />
            <div className="hidden sm:block h-6 sm:h-8 w-px bg-border shrink-0" />
            <img 
              src={logoAtlantaSanad} 
              alt="Atlanta Sanad" 
              className="hidden sm:block h-8 sm:h-10 md:h-12 w-auto object-contain shrink-0"
            />
          </div>
          
          {/* Assistant badge */}
          <div className={cn(
            "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10 shrink-0",
            isRtl ? "font-arabic" : ""
          )}>
            <div className="relative">
              <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full border border-card" />
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-primary hidden sm:inline">
              {isRtl ? 'مساعدك الرقمي' : 'Assistant en ligne'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
