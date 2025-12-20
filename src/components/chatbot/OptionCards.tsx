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
  Tractor
} from 'lucide-react';

// Import custom PNG icons
import trottinetteIcon from '@/assets/vehicle-icons/kick-scooter_6531668.png';
import pickupIcon from '@/assets/vehicle-icons/delivery-truck_16960760.png';
import camionGrandIcon from '@/assets/vehicle-icons/truck.png';
import triporteurIcon from '@/assets/vehicle-icons/tuk-tuk_9766148.png';

interface OptionCardsProps {
  options: ChatOption[];
  onSelect: (id: string) => void;
  language: Language;
  multiSelect?: boolean;
  onMultiSelect?: (ids: string[]) => void;
  columns?: 2 | 3 | 4;
  preSelected?: string[];
}

// Icon map with both Lucide components and PNG paths
const iconMap: Record<string, React.ElementType | string> = {
  // Insurance types
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
  
  // Vehicle types - Lucide icons
  voiture: Car,
  camion: Truck,
  moto: Bike,
  tracteur: Tractor,
  camion_petit: Truck,
  
  // Transport public option
  transport_public: Truck,

  // Vehicle types - Custom PNG icons
  trottinette: trottinetteIcon,
  pickup: pickupIcon,
  camion_grand: camionGrandIcon,
  triporteur: triporteurIcon,
};

// Special highlighting for featured options
const featuredOptions = ['trottinette'];

const OptionCards = ({
  options = [],
  onSelect,
  language,
  multiSelect = false,
  onMultiSelect,
  columns = 2,
  preSelected = []
}: OptionCardsProps) => {
  // Safety check for invalid options
  if (!Array.isArray(options) || options.length === 0) return null;

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

  // Special grid for time slot pills: 3 per row on mobile, 4 per row on desktop
  const isTimeSlot = options.length === 8 && options.every(o => /^\d{2}:\d{2}–\d{2}:\d{2}$/.test(o.label));
  const gridCols = isTimeSlot
    ? 'grid-cols-3 sm:grid-cols-4'
    : columns === 2
      ? 'grid-cols-2'
      : columns === 3
        ? 'grid-cols-2 md:grid-cols-3'
        : 'grid-cols-2 md:grid-cols-4';

  const getIcon = (optionId: string) => {
    const iconOrPath = iconMap[optionId];
    
    if (!iconOrPath) return null;
    
    // Check if it's a string (PNG path) or a component (Lucide icon)
    if (typeof iconOrPath === 'string') {
      // Render PNG image
      return (
        <img 
          src={iconOrPath} 
          alt={optionId}
          className="w-6 h-6 object-contain"
        />
      );
    } else {
      // Render Lucide icon component
      const IconComponent = iconOrPath;
      return <IconComponent className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div 
      className={cn("w-full animate-fade-in-up", isRtl ? "font-arabic" : "")}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className={cn("grid gap-1.5", gridCols)}>
        {options.map((option, index) => {
          const isSelected = selected.includes(option.id);
          const isFeatured = featuredOptions.includes(option.id);
          
          return (
            <button
              key={option.id}
              onClick={() => handleClick(option.id)}
              className={cn(
                isTimeSlot
                  ? [
                      "min-h-0 h-9 px-2.5 sm:px-3 rounded-full border text-sm font-medium flex items-center justify-center transition-all duration-200",
                      "bg-white border-gray-200 text-primary",
                      "active:scale-95 animate-scale-in",
                      isSelected && "border-blue-600 bg-blue-50 text-blue-900 shadow-sm",
                      !isSelected && "hover:border-blue-300 hover:bg-blue-50",
                    ]
                  : [
                      "relative min-h-[48px] touch-manipulation rounded-lg p-1.5 text-center border-2 transition-all duration-300 active:scale-95 animate-scale-in",
                      isFeatured && !isSelected && "bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-lg hover:shadow-xl hover:from-green-100 hover:to-emerald-100 hover:border-green-500 ring-2 ring-green-300 ring-opacity-50",
                      !isFeatured && !isSelected && "bg-white hover:shadow-md hover:border-blue-300 border-gray-200 shadow-sm",
                      isSelected && "border-blue-600 shadow-md bg-blue-50"
                    ],
                isRtl && "font-arabic"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {!isTimeSlot && isFeatured && !isSelected && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[8px] px-2 py-0.5 rounded-full shadow-md font-semibold animate-pulse">
                  {language === 'ar' ? 'جديد' : 'NEW'}
                </div>
              )}
              {!isTimeSlot && multiSelect && isSelected && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              {!isTimeSlot && getIcon(option.id) && (
                <div className={cn(
                  "flex items-center justify-center mx-auto mb-1 w-7 h-7 rounded-full bg-blue-50",
                  isSelected && "bg-blue-100"
                )}>
                  {getIcon(option.id)}
                </div>
              )}
              <div className={cn(
                isTimeSlot
                  ? "text-sm font-semibold text-primary"
                  : "font-semibold text-primary text-[9px] sm:text-[10px] whitespace-pre-line",
                isRtl && "font-arabic"
              )}>{option.label}</div>
            </button>
          );
        })}
      </div>
      
      {multiSelect && selected.length > 0 && (
        <button
          onClick={handleConfirm}
          className="mt-3 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full py-2.5 px-4 font-medium transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.98] shadow-md"
        >
          {isRtl ? 'متابعة' : 'Continuer'}
        </button>
      )}
    </div>
  );
};

export default OptionCards;