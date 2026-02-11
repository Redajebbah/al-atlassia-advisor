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
  Tractor,
  RefreshCw
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
  renouvellement: RefreshCw,
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

  // Special grid for time slot pills
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
    
    if (typeof iconOrPath === 'string') {
      return (
        <img 
          src={iconOrPath} 
          alt={optionId}
          className="w-6 h-6 object-contain"
        />
      );
    } else {
      const IconComponent = iconOrPath;
      return <IconComponent className="w-6 h-6" style={{ color: '#1e3a6f' }} />;
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
                      "min-h-0 h-9 px-2.5 sm:px-3 rounded-full text-sm font-medium flex items-center justify-center transition-all duration-200",
                      "active:scale-95 animate-scale-in",
                    ]
                  : [
                      "relative min-h-[48px] touch-manipulation rounded-xl p-1.5 text-center transition-all duration-300 active:scale-95 animate-scale-in",
                    ],
                isRtl && "font-arabic"
              )}
              style={
                isTimeSlot
                  ? {
                      background: isSelected ? 'rgba(30, 58, 138, 0.06)' : '#ffffff',
                      color: '#1e3a6f',
                      border: isSelected ? '1.5px solid #1e3a6f' : '1px solid rgba(0,0,0,0.08)',
                      boxShadow: isSelected ? '0 2px 8px rgba(30,58,138,0.1)' : '0 1px 3px rgba(0,0,0,0.04)',
                    }
                  : isFeatured && !isSelected
                    ? {
                        background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
                        border: '2px solid #86efac',
                        boxShadow: '0 4px 16px rgba(34,197,94,0.1), 0 0 0 3px rgba(34,197,94,0.06)',
                      }
                    : isSelected
                      ? {
                          background: 'rgba(30, 58, 138, 0.04)',
                          border: '2px solid #1e3a6f',
                          boxShadow: '0 4px 14px rgba(30, 58, 138, 0.12)',
                        }
                      : {
                          background: '#ffffff',
                          border: '2px solid rgba(0,0,0,0.06)',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                        }
              }
              onMouseEnter={(e) => {
                if (!isTimeSlot && !isSelected && !isFeatured) {
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(30, 58, 138, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isTimeSlot && !isSelected && !isFeatured) {
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
                }
              }}
            >
              {!isTimeSlot && isFeatured && !isSelected && (
                <div
                  className="absolute -top-2 -right-2 text-white text-[8px] px-2 py-0.5 rounded-full font-semibold animate-pulse"
                  style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    boxShadow: '0 2px 6px rgba(34,197,94,0.3)',
                  }}
                >
                  {language === 'ar' ? 'جديد' : 'NEW'}
                </div>
              )}
              {!isTimeSlot && multiSelect && isSelected && (
                <div
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #1e3a6f 0%, #1a2f5a 100%)',
                    boxShadow: '0 2px 6px rgba(30,58,138,0.25)',
                  }}
                >
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              {!isTimeSlot && getIcon(option.id) && (
                <div
                  className="flex items-center justify-center mx-auto mb-1 w-7 h-7 rounded-full"
                  style={{
                    background: isSelected ? 'rgba(30, 58, 138, 0.08)' : 'rgba(30, 58, 138, 0.04)',
                  }}
                >
                  {getIcon(option.id)}
                </div>
              )}
              <div
                className={cn(
                  isTimeSlot
                    ? "text-sm font-semibold"
                    : "font-semibold text-[9px] sm:text-[10px] whitespace-pre-line",
                  isRtl && "font-arabic"
                )}
                style={{ color: '#1e3a6f' }}
              >
                {option.label}
              </div>
            </button>
          );
        })}
      </div>
      
      {multiSelect && selected.length > 0 && (
        <button
          onClick={handleConfirm}
          className="mt-3 w-full text-white rounded-full py-2.5 px-4 font-medium transition-all hover:scale-[1.01] active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #1e3a6f 0%, #1a2f5a 100%)',
            boxShadow: '0 6px 18px rgba(30, 58, 138, 0.2)',
          }}
        >
          {isRtl ? 'متابعة' : 'Continuer'}
        </button>
      )}
    </div>
  );
};

export default OptionCards;
