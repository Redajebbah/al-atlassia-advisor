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
  Check,
  Truck,
  Bike,
  TramFront
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
  // Vehicle types
  voiture: Car,
  camion: Truck,
  moto: Bike,
  trottinette: TramFront,
  triporteur: TramFront,
  tracteur: Truck,
  pickup: Truck,
  camion_petit: Truck,
  camion_grand: Truck,
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
                "relative min-h-[70px] touch-manipulation",
                "bg-white rounded-lg p-3 text-center",
                "border-2 transition-all duration-300",
                "hover:shadow-md hover:border-blue-300",
                "active:scale-95 animate-scale-in",
                isSelected 
                  ? "border-blue-600 shadow-md bg-blue-50" 
                  : "border-gray-200 shadow-sm"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {multiSelect && isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
              {Icon ? (
                <div className={cn(
                  "w-8 h-8 mx-auto mb-1.5 rounded-full flex items-center justify-center transition-all duration-300",
                  isSelected 
                    ? "bg-gradient-to-br from-blue-600 to-blue-700" 
                    : "bg-gray-100"
                )}>
                  <Icon className={cn(
                    "w-4 h-4 transition-colors",
                    isSelected ? "text-white" : "text-gray-600"
                  )} />
                </div>
              ) : option.icon && (
                <span className="text-xl mb-1.5 block">{option.icon}</span>
              )}
              <span className={cn(
                "text-xs font-medium transition-colors leading-tight",
                isSelected ? "text-blue-700" : "text-gray-700"
              )}>{option.label}</span>
            </button>
          );
        })}
      </div>
      
      {multiSelect && selected.length > 0 && (
        <button
          onClick={handleConfirm}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full py-3 px-6 font-medium transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shadow-md"
        >
          {isRtl ? 'متابعة' : 'Continuer'}
        </button>
      )}
    </div>
  );
};

export default OptionCards;
