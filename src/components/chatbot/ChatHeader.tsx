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
    <header className="bg-card border-b border-border shadow-insurance-sm">
      {/* Top accent bar */}
      <div className="h-1 gradient-primary" />
      
      <div className="px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          {/* Logos */}
          <div className="flex items-center gap-3">
            <img 
              src={logoAlAtlassia} 
              alt="Al Atlassia Assurances" 
              className="h-10 md:h-12 w-auto object-contain"
            />
            <div className="hidden sm:block h-8 w-px bg-border" />
            <img 
              src={logoAtlantaSanad} 
              alt="Atlanta Sanad" 
              className="hidden sm:block h-10 md:h-12 w-auto object-contain"
            />
          </div>
          
          {/* Assistant badge */}
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/5 border border-primary/10",
            isRtl ? "font-arabic" : ""
          )}>
            <div className="relative">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-card" />
            </div>
            <span className="text-xs font-medium text-primary hidden sm:inline">
              {isRtl ? 'مساعدك الرقمي' : 'Assistant en ligne'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
