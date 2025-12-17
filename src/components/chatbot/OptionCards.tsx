import { ChatOption, Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface OptionCardsProps {
  options: ChatOption[];
  onSelect: (id: string) => void;
  language: Language;
  multiSelect?: boolean;
  onMultiSelect?: (ids: string[]) => void;
  columns?: 2 | 3 | 4;
  preSelected?: string[];
}

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

  return (
    <div 
      className={cn("w-full animate-fade-in-up", isRtl ? "font-arabic" : "")}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className={cn("grid gap-3", gridCols[columns])}>
        {options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleClick(option.id)}
            className={cn(
              "insurance-card text-center",
              "animate-scale-in",
              selected.includes(option.id) && "selected",
              multiSelect && selected.includes(option.id) && "bg-primary/5"
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {option.icon && (
              <span className="text-2xl mb-2 block">{option.icon}</span>
            )}
            <span className="text-sm font-medium text-foreground">{option.label}</span>
          </button>
        ))}
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
