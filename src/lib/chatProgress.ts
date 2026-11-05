import { ChatStep, Language } from '@/types/chatbot';

// The conversation is shown to the user as 4 phases.
export const PHASES: Record<Language, string[]> = {
  fr: ['Besoin', 'Détails', 'Coordonnées', 'Confirmation'],
  ar: ['الحاجة', 'التفاصيل', 'معلوماتك', 'التأكيد'],
};

export const getPhaseIndex = (step: ChatStep): number => {
  if (step === 'welcome' || step === 'select_insurance') return 0;
  if (step === 'confirmation' || step === 'vie_bureau') return 3;
  if (step.startsWith('client_')) return 2;
  return 1;
};
