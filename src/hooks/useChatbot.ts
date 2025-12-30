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
  getScolaireCoverageOptions,
  getContactPreferenceOptions,
  getDayOptions,
  getHourOptions
  , getTransportMeansOptions
} from '@/lib/translations';
import { sendEmailNotification } from '@/lib/emailService';

interface ChatbotState {
  step: ChatStep;
  messages: ChatMessage[];
  selectedInsurance: InsuranceType | null;
  insuranceData: Record<string, any>;
  clientInfo: Partial<ClientInfo>;
  isTyping: boolean;
  currentOptions: ChatOption[];
  currentMultiSelect: boolean;
  currentInputType: 'text' | 'phone' | 'number' | 'registration' | null;
  currentInputPlaceholder: string;
  preSelectedOptions: string[];
  stepData?: Record<string, any>;
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
    stepData: {},
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
      // Only clear inputType if we're showing options
      currentInputType: options.length > 0 ? null : prev.currentInputType,
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

  const setInputMode = useCallback((type: 'text' | 'phone' | 'number' | 'registration', placeholder: string) => {
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
      setState(prev => ({ ...prev, step: newStep, stepData: data }));

      switch (newStep) {
        case 'welcome':
          // Greeting then follow-up: 5s for French, 4s for other languages
          const BOT_PAUSE_MS = language === 'fr' ? 5000 : 4000;
          const TYPING_MS = 500; // typing indicator duration before the next message

          addBotMessage(t('welcome', language));
          setTimeout(() => {
            showTyping();
            setTimeout(() => {
              addBotMessage(t('selectInsurance', language), getInsuranceOptions(language));
              setState(prev => ({ ...prev, step: 'select_insurance' }));
            }, TYPING_MS);
          }, BOT_PAUSE_MS - TYPING_MS);
          break;

        case 'automobile_vehicle':
          addBotMessage(t('vehicleType', language), getVehicleOptions(language));
          break;

        case 'automobile_registration':
          setInputMode('registration', t('registrationPlaceholder', language));
          addBotMessage(t('registrationQuestion', language));
          break;

        case 'habitation_type':
          addBotMessage(t('housingType', language), getHousingTypeOptions(language));
          break;

        case 'habitation_status':
          addBotMessage(t('housingStatus', language), getHousingStatusOptions(language));
          break;

        case 'habitation_value':
          setInputMode('number', t('valuePlaceholder', language));
          addBotMessage(t('housingValue', language));
          // Keep the step set to 'habitation_value' so the user's numeric input
          // is handled by the corresponding input handler. Previously the code
          // advanced the step to 'habitation_furniture_value' immediately which
          // caused the user's response to not match any input case and blocked
          // the flow.
          setTimeout(() => {
            setState(prev => ({ ...prev, step: 'habitation_value' }));
          }, 500);
          break;

        case 'habitation_furniture_value':
          setInputMode('number', t('valuePlaceholder', language));
          addBotMessage(t('furnitureValue', language));
          break;

        case 'sante_coverage':
          addBotMessage(t('healthCoverage', language), getHealthCoverageOptions(language));
          break;

        case 'sante_age':
          setInputMode('number', t('agePlaceholder', language));
          addBotMessage(t('healthAge', language));
          break;

        case 'sante_spouse_count':
          setInputMode('number', t('spousesCountPlaceholder', language));
          addBotMessage(t('spousesCount', language));
          break;

        case 'sante_children_count':
          setInputMode('number', t('childrenCountPlaceholder', language));
          addBotMessage(t('childrenCount', language));
          break;

        case 'sante_family_member_ages':
          // Ask for the age of the next family member (spouse or child)
          // Use data if provided (for accurate counts after state update)
          const spousesCount = data?.spousesCount ?? state.insuranceData.spousesCount ?? 0;
          const childrenCount = data?.childrenCount ?? state.insuranceData.childrenCount ?? 0;
          const spousesAges = data?.spousesAges ?? state.insuranceData.spousesAges ?? [];
          const childrenAges = data?.childrenAges ?? state.insuranceData.childrenAges ?? [];
          
          setInputMode('number', t('agePlaceholder', language));
          
          if (spousesAges.length < spousesCount) {
            // Still collecting spouse ages
            const spouseNumber = spousesAges.length + 1;
            const ageLabel = `${t('spouseAge', language)} ${spouseNumber}`;
            addBotMessage(ageLabel);
          } else if (childrenAges.length < childrenCount) {
            // Collecting children ages
            const childNumber = childrenAges.length + 1;
            const ageLabel = `${t('childAge', language)} ${childNumber}`;
            addBotMessage(ageLabel);
          }
          break;

        case 'sante_family_count':
          setInputMode('number', t('familyMembersCountPlaceholder', language));
          addBotMessage(t('familyMembersCount', language));
          break;

        case 'sante_family_ages':
          // Ask for the age of the next family member
          const currentAges = state.insuranceData.familyMembersAges || [];
          const totalMembers = state.insuranceData.familyMembersCount || 0;
          const nextMemberIndex = currentAges.length + 1;
          
          setInputMode('number', t('agePlaceholder', language));
          const ageLabel = language === 'ar' 
            ? `${t('familyMemberAge', language)} ${nextMemberIndex}`
            : `${t('familyMemberAge', language)} ${nextMemberIndex}`;
          addBotMessage(ageLabel);
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

        case 'transport_means':
          addBotMessage(t('transport_means_question', language), getTransportMeansOptions(language));
          break;

        case 'entreprises_activity':
          setInputMode('text', t('activityPlaceholder', language));
          addBotMessage(t('activityType', language));
          break;

        case 'entreprises_types':
          addBotMessage(t('selectInsuranceTypes', language), getEntrepriseInsuranceOptions(language), true);
          break;

        case 'professionnels_types':
          addBotMessage(t('selectInsuranceTypes', language), getProfessionnelInsuranceOptions(language), true);
          setState(prev => ({ ...prev, preSelectedOptions: ['rc_professionnelle'] }));
          break;

        case 'professionnels_profession_type':
          setInputMode('text', t('professionPlaceholder', language));
          addBotMessage(t('professionType', language));
          break;

        case 'scolaire_coverage':
          addBotMessage(t('scolaireInfo', language));
          setTimeout(() => {
            showTyping();
            setTimeout(() => {
              addBotMessage(t('scolaireCoverageQuestion', language), getScolaireCoverageOptions(language), true);
            }, 600);
          }, 500);
          break;

        case 'scolaire_institution':
          setInputMode('text', t('institutionPlaceholder', language));
          addBotMessage(t('institutionName', language));
          break;

        case 'client_name':
          setInputMode('text', t('namePlaceholder', language));
          addBotMessage(t('clientName', language));
          break;

        case 'client_phone':
          setInputMode('phone', t('phonePlaceholder', language));
          addBotMessage(t('clientPhone', language));
          break;

        case 'client_city':
          setInputMode('text', t('cityPlaceholder', language));
          addBotMessage(t('clientCity', language));
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

          // Build a clientInfo object that prefers any data passed into
          // processStep (e.g. preferredHour) — this avoids a race where the
          // local state hasn't yet reflected the latest selection.
          const clientInfoForEmail: ClientInfo = {
            ...(state.clientInfo as ClientInfo),
            ...(data && data.preferredHour ? { preferredHour: data.preferredHour } : {}),
          } as ClientInfo;

          // Send email notification using the merged clientInfo
          if (state.selectedInsurance && clientInfoForEmail.fullName) {
            sendEmailNotification({
              selectedInsurance: state.selectedInsurance,
              insuranceData: state.insuranceData,
              clientInfo: clientInfoForEmail,
              language,
            }).then((success) => {
              if (success) {
                console.log('Email notification sent successfully');
              } else {
                console.error('Failed to send email notification');
              }
            });
          }

          break;
      }
    }, 600);
  }, [language, addBotMessage, setInputMode, showTyping, state.selectedInsurance, state.insuranceData, state.clientInfo]);

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
            processStep('scolaire_coverage');
            break;
          case 'transport_public':
            processStep('transport_means');
            break;
          case 'renouvellement':
            processStep('client_name');
            break;
          case 'autres':
            showTyping();
            setTimeout(() => {
              addBotMessage(t('autresInfo', language));
              setTimeout(() => {
                addBotMessage(t('autresNeedQuestion', language), undefined, false, 'text', t('autresNeedPlaceholder', language));
                setInputMode('text');
                setState(prev => ({ ...prev, step: 'autres_need' }));
              }, 800);
            }, 600);
            break;
          case 'autres_need':
            // Save the user's description (limit to 200 words)
            setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, autresNeed: value } }));
            processStep('client_name');
            break;
        }
        break;

      case 'automobile_vehicle':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, vehicleType: optionId } }));
        if (optionId === 'trottinette' || optionId === 'trotinette') {
          processStep('client_name');
        } else {
          processStep('automobile_registration');
        }
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
        if (optionId === 'famille') {
          processStep('sante_spouse_count');
        } else {
          processStep('sante_age');
        }
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
        // Pass the selected hour along to the confirmation step so the
        // sendEmailNotification uses the freshly-selected value instead
        // of relying on state which may not have been updated yet.
        processStep('confirmation', { preferredHour: optionId });
        break;

      case 'transport_means':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, transportMeans: optionId } }));
        processStep('client_name');
        break;
    }
  }, [state.step, processStep, addUserMessage, addBotMessage, showTyping, language]);

  const handleMultiSelect = useCallback((selectedIds: string[], labels: string) => {
    addUserMessage(labels);

    switch (state.step) {
      case 'scolaire_coverage':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, coverageTypes: selectedIds } }));
        processStep('scolaire_institution');
        break;

      case 'entreprises_types':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, insuranceTypes: selectedIds } }));
        processStep('client_name');
        break;

      case 'professionnels_types':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, insuranceTypes: selectedIds } }));
        processStep('professionnels_profession_type');
        break;
    }
  }, [state.step, processStep, addUserMessage]);

  const handleTextInput = useCallback((value: string) => {
    addUserMessage(value);

    switch (state.step) {
      case 'automobile_registration':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, registrationNumber: value } }));
        processStep('client_name');
        break;

      case 'habitation_value':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, value } }));
        processStep('habitation_furniture_value');
        break;

      case 'habitation_furniture_value':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, furnitureValue: value } }));
        processStep('client_name');
        break;

      case 'sante_age':
        // This is for individual coverage only
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, age: value } }));
        processStep('sante_current');
        break;

      case 'sante_spouse_count':
        // Store the number of spouses (0-4)
        const spousesCount = parseInt(value, 10);
        if (isNaN(spousesCount) || spousesCount < 0 || spousesCount > 4) {
          // Invalid input, ask again
          processStep('sante_spouse_count');
        } else {
          setState(prev => ({ 
            ...prev, 
            insuranceData: { 
              ...prev.insuranceData, 
              spousesCount,
              spousesAges: []
            } 
          }));
          processStep('sante_children_count');
        }
        break;

      case 'sante_children_count':
        // Store the number of children (0-25)
        const childrenCount = parseInt(value, 10);
        if (isNaN(childrenCount) || childrenCount < 0 || childrenCount > 25) {
          // Invalid input, ask again
          processStep('sante_children_count');
        } else {
          const spousesCount = state.insuranceData.spousesCount || 0;
          const spousesAges = state.insuranceData.spousesAges || [];
          
          setState(prev => ({ 
            ...prev, 
            insuranceData: { 
              ...prev.insuranceData, 
              childrenCount,
              childrenAges: []
            } 
          }));
          
          // If there are family members, start collecting ages
          const totalFamilyMembers = spousesCount + childrenCount;
          if (totalFamilyMembers > 0) {
            // Pass the updated data to processStep so it knows the current state
            processStep('sante_family_member_ages', { 
              spousesCount, 
              childrenCount, 
              spousesAges, 
              childrenAges: [] 
            });
          } else {
            // No family members, proceed to current insurance question
            processStep('sante_current');
          }
        }
        break;

      case 'sante_family_member_ages':
        // Collect age for current family member (spouse or child)
        const age = parseInt(value, 10);
        if (isNaN(age) || age < 0 || age > 120) {
          // Invalid age, ask again with current progress
          const spousesCount = state.insuranceData.spousesCount || 0;
          const childrenCount = state.insuranceData.childrenCount || 0;
          const spousesAges = state.insuranceData.spousesAges || [];
          const childrenAges = state.insuranceData.childrenAges || [];
          processStep('sante_family_member_ages', { spousesCount, childrenCount, spousesAges, childrenAges });
        } else {
          const spousesCount = state.insuranceData.spousesCount || 0;
          const childrenCount = state.insuranceData.childrenCount || 0;
          const spousesAges = state.insuranceData.spousesAges || [];
          const childrenAges = state.insuranceData.childrenAges || [];
          
          if (spousesAges.length < spousesCount) {
            // Collecting spouse age
            const updatedSpousesAges = [...spousesAges, value];
            setState(prev => ({ 
              ...prev, 
              insuranceData: { 
                ...prev.insuranceData, 
                spousesAges: updatedSpousesAges 
              } 
            }));
            
            // Check if we still need more spouse ages
            if (updatedSpousesAges.length < spousesCount) {
              processStep('sante_family_member_ages', { spousesCount, childrenCount, spousesAges: updatedSpousesAges, childrenAges });
            } else if (childrenCount > 0) {
              // All spouse ages collected, now collect children ages
              processStep('sante_family_member_ages', { spousesCount, childrenCount, spousesAges: updatedSpousesAges, childrenAges });
            } else {
              // All done
              processStep('sante_current');
            }
          } else if (childrenAges.length < childrenCount) {
            // Collecting child age
            const updatedChildrenAges = [...childrenAges, value];
            setState(prev => ({ 
              ...prev, 
              insuranceData: { 
                ...prev.insuranceData, 
                childrenAges: updatedChildrenAges 
              } 
            }));
            
            // Check if we need more children ages
            if (updatedChildrenAges.length < childrenCount) {
              processStep('sante_family_member_ages', { spousesCount, childrenCount, spousesAges, childrenAges: updatedChildrenAges });
            } else {
              processStep('sante_current');
            }
          }
        }
        break;

      case 'sante_family_count':
        // Store the number of family members
        const count = parseInt(value, 10);
        if (count > 0) {
          setState(prev => ({ 
            ...prev, 
            insuranceData: { 
              ...prev.insuranceData, 
              familyMembersCount: count,
              familyMembersAges: [] // Initialize empty array
            } 
          }));
          processStep('sante_family_ages');
        }
        break;

      case 'sante_family_ages':
        // Collect age for current family member
        const currentAges = state.insuranceData.familyMembersAges || [];
        const updatedAges = [...currentAges, value];
        const totalMembers = state.insuranceData.familyMembersCount || 0;
        
        setState(prev => ({ 
          ...prev, 
          insuranceData: { 
            ...prev.insuranceData, 
            familyMembersAges: updatedAges 
          } 
        }));
        
        // Check if we need to collect more ages
        if (updatedAges.length < totalMembers) {
          processStep('sante_family_ages');
        } else {
          // All ages collected, proceed to current insurance question
          processStep('sante_current');
        }
        break;

      case 'entreprises_activity':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, activityType: value } }));
        processStep('entreprises_types');
        break;

      case 'professionnels_profession_type':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, professionType: value } }));
        processStep('client_name');
        break;

      case 'scolaire_institution':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, institutionName: value } }));
        processStep('client_name');
        break;

      case 'autres_need':
        setState(prev => ({ ...prev, insuranceData: { ...prev.insuranceData, autresNeed: value } }));
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
    if (state.messages.length === 0) {
      // Skip the in-chat welcome (we display it on the language selection screen)
      // and start directly at the insurance selection options so the flow
      // continues immediately after the user picks a language.
      setState(prev => ({ ...prev, step: 'select_insurance' }));
      addBotMessage(t('selectInsurance', language), getInsuranceOptions(language));
    }
  }, [state.messages.length, addBotMessage, language]);

  return {
    state,
    initialize,
    handleOptionSelect,
    handleMultiSelect,
    handleTextInput,
  };
};
