import { ChatOption, Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { 
  Car, Home, HeartPulse, Heart, Building2, 
  Briefcase, GraduationCap, FileText,
  Building, Phone, MessageCircle, Check,
  Truck, Bike, Tractor
} from 'lucide-react';

// PNG imports for special vehicles
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

// Icon map
const iconMap: Record<string, React.ElementType | string> = {
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
  voiture: Car,
  camion: Truck,
  moto: Bike,
  tracteur: Tractor,
  camion_petit: Truck,
  trottinette: trottinetteIcon,
  pickup: pickupIcon,
  camion_grand: camionGrandIcon,
  triporteur: triporteurIcon,
};

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

  // ⚡ FIX: define isTimeSlot at the top
  const isTimeSlot = options.length === 8 && options.every(o => /^\d{2}:\d{2}–\d{2}:\d{2}$/.test(o.label));

  const handleClick = (id: string) => {
    if (multiSelect) {
      setSelected(prev =>
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      );
    } else {
      onSelect(id);
    }
  };

  const handleConfirm = () => {
    if (multiSelect && onMultiSelect && selected.length > 0) {
      onMultiSelect(selected);
    }
  };

  const getIcon = (id: string) => {
    const icon = iconMap[id];
    if (!icon) return null;
    if (typeof icon === 'string') {
      return <img src={icon} alt={id} className="w-6 h-6 object-contain" />;
    } else {
      const IconComponent = icon;
      return <IconComponent className="w-6 h-6 text-primary" />;
    }
  };

  const gridCols = columns === 2 ? 'grid-cols-2'
    : columns === 3 ? 'grid-cols-2 md:grid-cols-3'
    : 'grid-cols-2 md:grid-cols-4';

  return (
    <div className={cn("w-full animate-fade-in-up", isRtl ? "font-arabic" : "")} dir={isRtl ? "rtl" : "ltr"}>
      <div className={cn("grid gap-2", gridCols)}>
        {options.map((option, index) => {
          const isSelected = selected.includes(option.id);
          const isFeatured = featuredOptions.includes(option.id);

          return (
            <button
              key={option.id}
              onClick={() => handleClick(option.id)}
              className={cn(
                "relative min-h-[55px] rounded-lg p-2 text-center border-2 transition-all duration-300 active:scale-95 animate-scale-in",
                isFeatured && !isSelected
                  ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-lg hover:shadow-xl hover:from-green-100 hover:to-emerald-100 hover:border-green-500 ring-2 ring-green-300 ring-opacity-50"
                  : !isSelected
                    ? "bg-white hover:shadow-md hover:border-blue-300 border-gray-200 shadow-sm"
                    : "border-blue-600 shadow-md bg-blue-50",
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

              {!isTimeSlot && (
                <div className={cn("flex items-center justify-center mx-auto mb-1 w-8 h-8 rounded-full bg-blue-50", isSelected && "bg-blue-100")}>
                  {getIcon(option.id)}
                </div>
              )}

              <div className={cn("font-semibold text-primary text-[10px] sm:text-xs whitespace-pre-line", isRtl && "font-arabic")}>
                {option.label}
              </div>
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
