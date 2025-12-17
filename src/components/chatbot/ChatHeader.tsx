import { Language } from '@/types/chatbot';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad.png';

interface ChatHeaderProps {
  language: Language;
}

const ChatHeader = ({ language }: ChatHeaderProps) => {
  const isRtl = language === 'ar';
  
  return (
    <header className="bg-card border-b border-border px-4 py-3 shadow-insurance-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img 
            src={logoAlAtlassia} 
            alt="Al Atlassia Assurances" 
            className="h-10 w-auto object-contain"
          />
          <div className="h-8 w-px bg-border" />
          <img 
            src={logoAtlantaSanad} 
            alt="Atlanta Sanad" 
            className="h-10 w-auto object-contain"
          />
        </div>
        
        <div className={`text-sm text-muted-foreground ${isRtl ? 'font-arabic' : ''}`}>
          {isRtl ? 'مساعدك الرقمي' : 'Votre assistant digital'}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
