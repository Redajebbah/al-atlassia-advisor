import { ChatOption, Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { 
  Car, 
  Home, 
  HeartPulse, 
  Heart, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  FileText,
  Building,
  Phone,
  MessageCircle,
  Check
} from 'lucide-react';

interface OptionCardsProps {
  options: ChatOption[];
  onSelect: (id: string) => void;
  language: Language;
  multiSelect?: boolean;
  onMultiSelect?: (ids: string[]) => void;
  columns?: 2 | 3 | 4;
  preSelected?: string[];
}

const iconMap: Record<string, React.ElementType> = {
  automobile: Car,
  habitation: Home,
  sante: HeartPulse,
  vie: Heart,
  entreprises: Building2,
  professionnels: Briefcase,
  scolaire: GraduationCap,
  autres: FileText,
  bureau: Building,
  appel: Phone,
  whatsapp: MessageCircle,
};

const OptionCards = ({ 
  options, 
  onSelect, 
  language, 
  multiSelect = false,
  onMultiSelect,
  columns = 2,
  preSelected = []
}: OptionCardsProps) => {
  const isRtl = language === 'ar';
  const [selected, setSelected] = useState<string[]>(preSelected);

  const handleClick = (id: string) => {
    if (multiSelect) {
      const newSelected = selected.includes(id)
        ? selected.filter(s => s !== id)
        : [...selected, id];
      setSelected(newSelected);
    } else {
      onSelect(id);
    }
  };

  const handleConfirm = () => {
    if (multiSelect && onMultiSelect && selected.length > 0) {
      onMultiSelect(selected);
    }
  };

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  const getIcon = (optionId: string) => {
    const IconComponent = iconMap[optionId];
    return IconComponent ? <IconComponent className="w-6 h-6 text-primary mb-2" /> : null;
  };

  return (
    <div 
      className={cn("w-full animate-fade-in-up", isRtl ? "font-arabic" : "")}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className={cn("grid gap-3", gridCols[columns])}>
        {options.map((option, index) => {
          const Icon = iconMap[option.id];
          const isSelected = selected.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => handleClick(option.id)}
              className={cn(
                "insurance-card text-center relative",
                "animate-scale-in",
                isSelected && "selected",
                multiSelect && isSelected && "bg-primary/5"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {multiSelect && isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
              {Icon ? (
                <Icon className={cn(
                  "w-6 h-6 mb-2 mx-auto transition-colors",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )} />
              ) : option.icon && (
                <span className="text-2xl mb-2 block">{option.icon}</span>
              )}
              <span className="text-sm font-medium text-foreground">{option.label}</span>
            </button>
          );
        })}
      </div>
      
      {multiSelect && selected.length > 0 && (
        <button
          onClick={handleConfirm}
          className="mt-4 w-full gradient-primary text-primary-foreground rounded-xl py-3 font-medium transition-all hover:opacity-90 active:scale-[0.98]"
        >
          {isRtl ? 'متابعة' : 'Continuer'}
        </button>
      )}
    </div>
  );
};

export default OptionCards;
