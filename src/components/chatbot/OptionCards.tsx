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
  TramFront,
  Tractor
} from 'lucide-react';
import { 
  FaPersonScooter, 
  FaMotorcycle, 
  FaTruckPickup, 
  FaTruckMoving 
} from 'react-icons/fa';

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
  trottinette: FaPersonScooter,
  triporteur: FaMotorcycle,
  tracteur: Tractor,
  pickup: FaTruckPickup,
  camion_petit: Truck,
  camion_grand: FaTruckMoving,
};

// Special highlighting for featured options
const featuredOptions = ['trottinette'];

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
      <div className={cn("grid gap-2", gridCols[columns])}>
        {options.map((option, index) => {
          const Icon = iconMap[option.id];
          const isSelected = selected.includes(option.id);
          const isFeatured = featuredOptions.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => handleClick(option.id)}
              className={cn(
                "relative min-h-[55px] touch-manipulation",
                "rounded-lg p-2 text-center",
                "border-2 transition-all duration-300",
                "active:scale-95 animate-scale-in",
                isFeatured && !isSelected && "bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-lg hover:shadow-xl hover:from-green-100 hover:to-emerald-100 hover:border-green-500 ring-2 ring-green-300 ring-opacity-50",
                !isFeatured && !isSelected && "bg-white hover:shadow-md hover:border-blue-300 border-gray-200 shadow-sm",
                isSelected && "border-blue-600 shadow-md bg-blue-50"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {isFeatured && !isSelected && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[8px] px-2 py-0.5 rounded-full shadow-md font-semibold animate-pulse">
                  {language === 'ar' ? 'جديد' : 'NEW'}
                </div>
              )}
              {multiSelect && isSelected && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              {Icon ? (
                <div className={cn(
                  "w-6 h-6 mx-auto mb-1 rounded-full flex items-center justify-center transition-all duration-300",
                  isFeatured && !isSelected && "bg-gradient-to-br from-green-500 to-emerald-600 animate-pulse",
                  !isFeatured && isSelected && "bg-gradient-to-br from-blue-600 to-blue-700",
                  !isFeatured && !isSelected && "bg-gray-100"
                )}>
                  <Icon className={cn(
                    "w-3.5 h-3.5 transition-colors",
                    (isFeatured && !isSelected) || isSelected ? "text-white" : "text-gray-600"
                  )} />
                </div>
              ) : option.icon && (
                <span className="text-base mb-1 block">{option.icon}</span>
              )}
              <span className={cn(
                "text-[10px] font-medium transition-colors leading-tight",
                isFeatured && !isSelected && "text-green-700 font-semibold",
                isSelected && "text-blue-700",
                !isFeatured && !isSelected && "text-gray-700"
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
