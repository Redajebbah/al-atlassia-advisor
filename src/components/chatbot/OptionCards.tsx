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
  const [selected, setSelected] = useState<string[]>(preSelected);

  // Safety check for invalid options
  if (!Array.isArray(options) || options.length === 0) return null;

  const isRtl = language === 'ar';

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
  // Short labels (vehicles, days...) fit 3 per row even on small phones
  const shortLabels = options.length > 4 && options.every(o => o.label.length <= 18);
  const gridCols = isTimeSlot
    ? 'grid-cols-3 sm:grid-cols-4'
    : shortLabels
      ? 'grid-cols-3'
      : columns === 2
      ? 'grid-cols-2'
      : columns === 3
        ? 'grid-cols-2 sm:grid-cols-3'
        : 'grid-cols-2 md:grid-cols-4';

  const getIcon = (optionId: string) => {
    const iconOrPath = iconMap[optionId];

    if (!iconOrPath) return null;

    if (typeof iconOrPath === 'string') {
      return <img src={iconOrPath} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />;
    }
    const IconComponent = iconOrPath;
    return <IconComponent className="w-5 h-5" style={{ color: '#1e3a6f' }} aria-hidden="true" />;
  };

  return (
    <div
      className={cn("w-full flex flex-col min-h-0 animate-fade-in-up", isRtl ? "font-arabic" : "")}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {multiSelect && (
        <p className="text-xs mb-1 px-0.5 flex-shrink-0" style={{ color: '#64748b' }}>
          {isRtl ? 'يمكنك اختيار عدة إجابات' : 'Plusieurs choix possibles'}
        </p>
      )}

      <div className="min-h-0 overflow-y-auto chat-scroll -mx-1 px-1 pt-2 pb-1">
      <div className={cn("grid gap-2", gridCols)} role="group">
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          const isFeatured = featuredOptions.includes(option.id);
          const icon = !isTimeSlot && getIcon(option.id);

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleClick(option.id)}
              aria-pressed={multiSelect ? isSelected : undefined}
              className={cn(
                'option-card animate-scale-in touch-manipulation',
                isTimeSlot ? 'option-card--pill' : 'option-card--tile',
                isSelected && 'is-selected',
                multiSelect && !isTimeSlot && 'has-check',
                isFeatured && !isSelected && 'is-featured',
                isRtl && 'font-arabic',
              )}
            >
              {!isTimeSlot && isFeatured && !isSelected && (
                <span className="option-card__badge">
                  {isRtl ? 'جديد' : 'NEW'}
                </span>
              )}
              {!isTimeSlot && multiSelect && (
                <span className="option-card__check" aria-hidden="true">
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </span>
              )}
              {icon && <span className="option-card__icon">{icon}</span>}
              <span className="option-card__label">{option.label}</span>
            </button>
          );
        })}
      </div>
      </div>

      {multiSelect && (
        <div className="flex-shrink-0 pt-3">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={selected.length === 0}
            className="btn-primary w-full"
          >
            {isRtl ? 'متابعة' : 'Continuer'}
            {selected.length > 0 && <span className="btn-primary__count">{selected.length}</span>}
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionCards;
