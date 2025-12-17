import { useState, useCallback } from 'react';
import { 
  Language, 
  InsuranceType, 
  ChatStep, 
  ChatMessage,
  ChatOption,
  VehicleType,
  HousingType,
  HousingStatus,
  HealthCoverage,
  CurrentInsuranceType,
  ContactMethod,
  ContactPreference,
  ClientInfo
} from '@/types/chatbot';
import { 
  t, 
  getInsuranceOptions,
  getVehicleOptions,
  getHousingTypeOptions,
  getHousingStatusOptions,
  getHealthCoverageOptions,
  getYesNoOptions,
  getCurrentInsuranceTypeOptions,
  getContactMethodOptions,
  getEntrepriseInsuranceOptions,
  getProfessionnelInsuranceOptions,
  getContactPreferenceOptions,
  getDayOptions,
  getHourOptions
} from '@/lib/translations';

interface ChatbotState {
  step: ChatStep;
  messages: ChatMessage[];
  selectedInsurance: InsuranceType | null;
  insuranceData: Record<string, any>;
  clientInfo: Partial<ClientInfo>;
  isTyping: boolean;
  currentOptions: ChatOption[];
  currentMultiSelect: boolean;
  currentInputType: 'text' | 'phone' | 'number' | null;
  currentInputPlaceholder: string;
  preSelectedOptions: string[];
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useChatbot = (language: Language) => {
  const [state, setState] = useState<ChatbotState>({
    step: 'welcome',
    messages: [],
    selectedInsurance: null,
    insuranceData: {},
    clientInfo: {},
    isTyping: false,
    currentOptions: [],
    currentMultiSelect: false,
    currentInputType: null,
    currentInputPlaceholder: '',
    preSelectedOptions: [],
  });

  const addBotMessage = useCallback((content: string, options: ChatOption[] = [], multiSelect = false) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, {
        id: generateId(),
        type: 'bot',
        content,
      }],
      currentOptions: options,
      currentMultiSelect: multiSelect,
      currentInputType: null,
      isTyping: false,
    }));
  }, []);

  const addUserMessage = useCallback((content: string) => {
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, {
        id: generateId(),
        type: 'user',
        content,
      }],
      currentOptions: [],
      currentMultiSelect: false,
      currentInputType: null,
    }));
  }, []);

  const setInputMode = useCallback((type: 'text' | 'phone' | 'number', placeholder: string) => {
    setState(prev => ({
      ...prev,
      currentInputType: type,
      currentInputPlaceholder: placeholder,
      currentOptions: [],
    }));
  }, []);

  const showTyping = useCallback(() => {
    setState(prev => ({ ...prev, isTyping: true }));
  }, []);

  const processStep = useCallback((newStep: ChatStep, data?: any) => {
    showTyping();
    
    setTimeout(() => {
      setState(prev => ({ ...prev, step: newStep }));
      
      switch (newStep) {
        case 'welcome':
          addBotMessage(t('welcome', language));
          setTimeout(() => {
            showTyping();
            setTimeout(() => {
              addBotMessage(t('selectInsurance', language), getInsuranceOptions(language));
              setState(prev => ({ ...prev, step: 'select_insurance' }));
            }, 800);
          }, 500);
          break;

        case 'automobile_vehicle':
          addBotMessage(t('vehicleType', language), getVehicleOptions(language));
          break;

        case 'habitation_type':
          addBotMessage(t('housingType', language), getHousingTypeOptions(language));
          break;

        case 'habitation_status':
          addBotMessage(t('housingStatus', language), getHousingStatusOptions(language));
          break;

        case 'habitation_value':
          addBotMessage(t('housingValue', language));
          setInputMode('text', t('valuePlaceholder', language));
          break;

        case 'sante_coverage':
          addBotMessage(t('healthCoverage', language), getHealthCoverageOptions(language));
          break;

        case 'sante_age':
          addBotMessage(t('healthAge', language));
          setInputMode('number', t('agePlaceholder', language));
          break;

        case 'sante_current':
          addBotMessage(t('hasInsurance', language), getYesNoOptions(language));
          break;

        case 'sante_current_type':
          addBotMessage(t('insuranceType', language), getCurrentInsuranceTypeOptions(language));
          break;

        case 'vie_contact':
          addBotMessage(t('vieInfo', language), getContactMethodOptions(language));
          break;

        case 'vie_bureau':
          addBotMessage(t('bureauInfo', language));
          break;

        case 'entreprises_activity':
          addBotMessage(t('activityType', language));
          setInputMode('text', t('activityPlaceholder', language));
          break;

        case 'entreprises_types':
          addBotMessage(t('selectInsuranceTypes', language), getEntrepriseInsuranceOptions(language), true);
          break;

        case 'professionnels_types':
          addBotMessage(t('selectInsuranceTypes', language), getProfessionnelInsuranceOptions(language), true);
          setState(prev => ({ ...prev, preSelectedOptions: ['rc_professionnelle'] }));
          break;

        case 'scolaire_type':
          addBotMessage(t('scolaireInfo', language));
          setTimeout(() => {
            showTyping();
            setTimeout(() => {
              addBotMessage(t('scolaireType', language));
              setInputMode('text', language === 'ar' ? 'نوع التأمين' : 'Type d\'assurance');
            }, 600);
          }, 500);
          break;

        case 'scolaire_institution':
          addBotMessage(t('institutionName', language));
          setInputMode('text', t('institutionPlaceholder', language));
          break;

        case 'client_name':
          addBotMessage(t('clientName', language));
          setInputMode('text', t('namePlaceholder', language));
          break;

        case 'client_phone':
          addBotMessage(t('clientPhone', language));
          setInputMode('phone', t('phonePlaceholder', language));
          break;

        case 'client_city':
          addBotMessage(t('clientCity', language));
          setInputMode('text', t('cityPlaceholder', language));
          break;

        case 'client_contact_preference':
          addBotMessage(t('contactPreference', language), getContactPreferenceOptions(language));
          break;

        case 'client_day':
          addBotMessage(t('preferredDay', language), getDayOptions(language));
          break;

        case 'client_hour':
          addBotMessage(t('preferredHour', language), getHourOptions(language));
          break;

        case 'confirmation':
          addBotMessage(t('confirmation', language));
          break;
      }
    }, 600);
  }, [language, addBotMessage, setInputMode, showTyping]);

  const handleOptionSelect = useCallback((optionId: string, optionLabel: string) => {
    addUserMessage(optionLabel);
    
    switch (state.step) {
      case 'select_insurance':
        setState(prev => ({ ...prev, selectedInsurance: optionId as InsuranceType }));
        switch (optionId) {
          case 'automobile':
            processStep('automobile_vehicle');
            break;
          case 'habitation':
            processStep('habitation_type');
            break;
          case 'sante':
            processStep('sante_coverage');
            break;
          case 'vie':
            processStep('vie_contact');
            break;
          case 'entreprises':
            processStep('entreprises_activity');
            break;
          case 'professionnels':
            processStep('professionnels_types');
            break;
          case 'scolaire':
            processStep('scolaire_type');
            break;
          case 'autres':
            showTyping();
            setTimeout(() => {
              addBotMessage(t('autresInfo', language));
              setTimeout(() => processStep('client_name'), 800);
            }, 600);
            break;
        }
        break;

      case 'automobile_vehicle':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, vehicleType: optionId } }));
        processStep('client_name');
        break;

      case 'habitation_type':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, housingType: optionId } }));
        processStep('habitation_status');
        break;

      case 'habitation_status':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, housingStatus: optionId } }));
        processStep('habitation_value');
        break;

      case 'sante_coverage':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, coverage: optionId } }));
        processStep('sante_age');
        break;

      case 'sante_current':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, hasCurrentInsurance: optionId === 'yes' } }));
        if (optionId === 'yes') {
          processStep('sante_current_type');
        } else {
          processStep('client_name');
        }
        break;

      case 'sante_current_type':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, currentInsuranceType: optionId } }));
        processStep('client_name');
        break;

      case 'vie_contact':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, contactMethod: optionId } }));
        if (optionId === 'bureau') {
          processStep('vie_bureau');
        } else {
          processStep('client_name');
        }
        break;

      case 'client_contact_preference':
        setState(prev => ({ ...prev, clientInfo: { ...prev.clientInfo, contactPreference: optionId as ContactPreference } }));
        processStep('client_day');
        break;

      case 'client_day':
        setState(prev => ({ ...prev, clientInfo: { ...prev.clientInfo, preferredDay: optionId } }));
        processStep('client_hour');
        break;

      case 'client_hour':
        setState(prev => ({ ...prev, clientInfo: { ...prev.clientInfo, preferredHour: optionId } }));
        processStep('confirmation');
        break;
    }
  }, [state.step, processStep, addUserMessage, addBotMessage, showTyping, language]);

  const handleMultiSelect = useCallback((selectedIds: string[], labels: string) => {
    addUserMessage(labels);
    
    switch (state.step) {
      case 'entreprises_types':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, insuranceTypes: selectedIds } }));
        processStep('client_name');
        break;

      case 'professionnels_types':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, insuranceTypes: selectedIds } }));
        processStep('client_name');
        break;
    }
  }, [state.step, processStep, addUserMessage]);

  const handleTextInput = useCallback((value: string) => {
    addUserMessage(value);
    
    switch (state.step) {
      case 'habitation_value':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, value } }));
        processStep('client_name');
        break;

      case 'sante_age':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, age: value } }));
        processStep('sante_current');
        break;

      case 'entreprises_activity':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, activityType: value } }));
        processStep('entreprises_types');
        break;

      case 'scolaire_type':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, scolaireType: value } }));
        processStep('scolaire_institution');
        break;

      case 'scolaire_institution':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, institutionName: value } }));
        processStep('client_name');
        break;

      case 'client_name':
        setState(prev => ({ ...prev, clientInfo: { ...prev.clientInfo, fullName: value } }));
        processStep('client_phone');
        break;

      case 'client_phone':
        setState(prev => ({ ...prev, clientInfo: { ...prev.clientInfo, phone: value } }));
        processStep('client_city');
        break;

      case 'client_city':
        setState(prev => ({ ...prev, clientInfo: { ...prev.clientInfo, city: value } }));
        processStep('client_contact_preference');
        break;
    }
  }, [state.step, processStep, addUserMessage]);

  const initialize = useCallback(() => {
    processStep('welcome');
  }, [processStep]);

  return {
    state,
    initialize,
    handleOptionSelect,
    handleMultiSelect,
    handleTextInput,
  };
};
