import { Language, InsuranceType, VehicleType, HousingType, HousingStatus, HealthCoverage, CurrentInsuranceType, ContactMethod, ContactPreference, ChatOption } from '@/types/chatbot';

type TranslationKey =
  | 'welcome'
  | 'selectInsurance'
  | 'automobile'
  | 'habitation'
  | 'sante'
  | 'vie'
  | 'entreprises'
  | 'professionnels'
  | 'scolaire'
  | 'autres'
  | 'renouvellement'
  | 'transport_public'
  | 'transport_means_question'
  | 'transport_taxi'
  | 'transport_nusers'
  | 'transport_touristic'
  | 'vehicleType'
  | 'voiture'
  | 'camion'
  | 'moto'
  | 'trottinette'
  | 'triporteur'
  | 'tracteur'
  | 'pickup'
  | 'camion_petit'
  | 'camion_grand'
  | 'housingType'
  | 'maison'
  | 'appartement'
  | 'villa'
  | 'housingStatus'
  | 'proprietaire'
  | 'locataire'
  | 'housingValue'
  | 'valuePlaceholder'
  | 'healthCoverage'
  | 'individuel'
  | 'famille'
  | 'healthAge'
  | 'agePlaceholder'
  | 'hasInsurance'
  | 'yes'
  | 'no'
  | 'insuranceType'
  | 'base'
  | 'complementaire'
  | 'base_complementaire'
  | 'vieInfo'
  | 'contactMethod'
  | 'bureau'
  | 'appel'
  | 'activityType'
  | 'activityPlaceholder'
  | 'professionType'
  | 'professionPlaceholder'
  | 'selectInsuranceTypes'
  | 'accidents_travail'
  | 'rc'
  | 'rc_exploitation'
  | 'multirisques'
  | 'multirisques_chantiers'
  | 'rc_transport'
  | 'marchandises'
  | 'autres_assurances'
  | 'vehicules_engins'
  | 'rc_professionnelle'
  | 'automobile_pro'
  | 'scolaireInfo'
  | 'scolaireCoverageQuestion'
  | 'scolaire_rc'
  | 'scolaire_accidents_travail'
  | 'scolaire_multirisques'
  | 'scolaire_vehicules'
  | 'institutionName'
  | 'institutionPlaceholder'
  | 'clientName'
  | 'namePlaceholder'
  | 'clientPhone'
  | 'phonePlaceholder'
  | 'phoneInvalid'
  | 'clientCity'
  | 'cityPlaceholder'
  | 'contactPreference'
  | 'whatsapp'
  | 'call'
  | 'preferredDay'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'preferredHour'
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'confirmation'
  | 'bureauInfo'
  | 'autresInfo'
  | 'continue'
  | 'submit'
  | 'registrationQuestion'
  | 'registrationPlaceholder'
  | 'registrationInvalid'
  | 'registrationLabel';

const translations: Record<Language, Record<TranslationKey, string>> = {
  ar: {
    welcome: 'أنا الأطلسية للتأمينات، مرحبًا بك، كيف يمكنني مساعدتك؟',
    selectInsurance: 'اختر نوع التأمين الذي يناسبك:',
    automobile: 'تأمين السيارات',
    habitation: 'تأمين السكن',
    sante: 'تأمين الصحة',
    vie: 'تأمين الحياة',
    entreprises: 'تأمين الشركات',
    professionnels: 'تأمين المهنيين',
    scolaire: 'التأمين المدرسي',
    autres: 'تأمينات أخرى',
    renouvellement: 'تجديد عقد تأمين',
    transport_public: 'تأمين النقل العمومي للمسافرين',
    transport_means_question: 'ما هي وسيلة النقل المستعملة؟',
    transport_taxi: 'تاكسي',
    transport_nusers: 'نقل المستخدمين',
    transport_touristic: 'نقل سياحي',
    vehicleType: 'ما نوع المركبة؟',
    voiture: 'سيارة',
    camion: 'شاحنة',
    moto: 'دراجة نارية',
    trottinette: 'طروتينيت',
    triporteur: 'تريبورتور',
    tracteur: 'جرار فلاحي',
    pickup: 'بيك أب',
    camion_petit: 'شاحنة < 3.5 طن',
    camion_grand: 'شاحنة > 3.5 طن',
    housingType: 'ما نوع السكن؟',
    maison: 'منزل',
    appartement: 'شقة',
    villa: 'فيلا',
    housingStatus: 'ما وضعك السكني؟',
    proprietaire: 'مالك',
    locataire: 'مستأجر',
    housingValue: 'ما القيمة التقريبية للسكن بالدرهم؟',
    furnitureValue: 'ما هي القيمة التقريبية للأثاث؟',
    valuePlaceholder: 'أدخل القيمة بالدرهم',
    healthCoverage: 'نوع التغطية المطلوبة:',
    individuel: 'فردي',
    famille: 'عائلي',
    healthAge: 'كم عمر المؤمن الرئيسي؟',
    agePlaceholder: 'أدخل العمر',
    hasInsurance: 'هل لديك تأمين حالي؟',
    yes: 'نعم',
    no: 'لا',
    insuranceType: 'ما نوع التأمين الحالي؟',
    base: 'أساسي',
    complementaire: 'تكميلي',
    base_complementaire: 'أساسي + تكميلي',
    vieInfo: 'تأمين الحياة يتطلب شرحًا مفصلاً. كيف تفضل التواصل معنا؟',
    contactMethod: 'اختر طريقة التواصل:',
    bureau: 'زيارة المكتب',
    appel: 'اتصال هاتفي',
    activityType: 'ما نوع نشاط شركتك؟',
    activityPlaceholder: 'أدخل نوع النشاط',
    professionType: 'ما هو نوع المهنة؟',
    professionPlaceholder: 'أدخل نوع المهنة',
    selectInsuranceTypes: 'اختر أنواع التأمين المطلوبة:',
    accidents_travail: 'تأمين حوادث الشغل',
    rc: 'تأمين المسؤولية المدنية',
    rc_exploitation: 'تأمين المسؤولية المدنية الاستغلال',
    multirisques: 'تأمين متعدد المخاطر',
    multirisques_chantiers: 'تأمين متعدد المخاطر للأوراش',
    rc_transport: 'تأمين المسؤولية المدنية للنقل',
    marchandises: 'تأمين البضائع المنقولة',
    vehicules_engins: 'تأمين المركبات والآليات',
    autres_assurances: 'تأمينات أخرى',
    rc_professionnelle: 'تأمين المسؤولية المدنية المهنية',
    automobile_pro: 'تأمين السيارات',
    scolaireInfo: 'التأمين المدرسي الذي يوفر الحماية الشاملة والمتكاملة  خلال العام الدراسي.',
    scolaireCoverageQuestion: 'هذا التأمين يشمل:',
    scolaire_rc: 'تأمين المسؤولية المدنية',
    scolaire_accidents_travail: 'تأمين حوادث الشغل',
    scolaire_multirisques: 'التأمين المتعدد المخاطر',
    scolaire_vehicules: 'التأمين على المركبات',
    institutionName: 'اسم المؤسسة التعليمية',
    institutionPlaceholder: 'أدخل اسم المؤسسة',
    clientName: 'ما اسمك الكامل؟',
    namePlaceholder: 'أدخل اسمك الكامل',
    clientPhone: 'ما رقم هاتفك؟',
    phonePlaceholder: 'أدخل رقم الهاتف',
    phoneInvalid: '⚠️ الرقم  غير صحيح. المرجو إدخال رقم  صالح.',
    clientCity: 'في أي مدينة تقيم؟',
    cityPlaceholder: 'أدخل اسم المدينة',
    contactPreference: 'كيف تفضل أن نتواصل معك؟',
    whatsapp: 'واتساب',
    call: 'اتصال هاتفي',
    preferredDay: 'ما اليوم المفضل للتواصل؟',
    monday: 'الإثنين',
    tuesday: 'الثلاثاء',
    wednesday: 'الأربعاء',
    thursday: 'الخميس',
    friday: 'الجمعة',
    saturday: 'السبت',
    preferredHour: 'ما الوقت المفضل؟',
    morning: 'صباحًا (9-12)',
    afternoon: 'ظهرًا (12-15)',
    evening: 'مساءً (15-18)',
    confirmation: 'شكرًا لثقتكم بنا. سيقوم فريقنا بالتواصل معكم في الموعد المحدد.',
    bureauInfo: 'يسعدنا استقبالكم في مكتبنا:\n\nحي المسيرة الخضراء ( اطاع الله)، المجموعة د ، الزنقة 1، رقم 33، القصر الكبير 92150 ( قرب مصرف المغرب)',
    autresInfo: 'لدينا العديد من التأمينات الأخرى، يرجى ترك معلومات محددة حول التأمين الذي تريده.',
    autresNeedQuestion: 'يرجى وصف احتياجك التأميني بالتفصيل',
    autresNeedPlaceholder: 'اكتب هنا (200 كلمة كحد أقصى)',
    continue: 'متابعة',
    submit: 'إرسال',
    registrationQuestion: 'ما هو رقم تسجيل المركبة؟',
    registrationPlaceholder: '12345 - أ - 6',
    registrationInvalid: 'رقم تسجيل غير صحيح. مثال: 12345 - أ - 6',
    registrationLabel: 'رقم تسجيل المركبة',
  },
  fr: {
    welcome: 'Bienvenue chez Al Atlassia Assurances, je suis votre assistant. Comment puis-je vous aider ?',
    selectInsurance: 'Choisissez le type d\'assurance qui vous convient :',
    automobile: 'Assurance Automobile',
    habitation: 'Assurance Habitation',
    sante: 'Assurance Santé',
    vie: 'Assurance Vie',
    entreprises: 'Assurance Entreprises',
    professionnels: 'Assurance Professionnels',
    scolaire: 'Assurance Scolaire',
    autres: 'Autres Assurances',
    renouvellement: 'Renouvellement de contrat d\'assurance',
    transport_public: 'Assurance Transport Public des Voyageurs',
    transport_means_question: 'Quel moyen de transport utilisez-vous ?',
    transport_taxi: 'Taxi',
    transport_nusers: 'Transport Utilisateurs',
    transport_touristic: 'Transport Touristique',
    vehicleType: 'Quel est le type de véhicule ?',
    voiture: 'Voiture',
    camion: 'Camion',
    moto: 'Moto',
    trottinette: 'Trottinette',
    triporteur: 'Triporteur',
    tracteur: 'Tracteur Agricole',
    pickup: 'Pick-up',
    camion_petit: 'Camion < 3.5 T',
    camion_grand: 'Camion > 3.5 T',
    housingType: 'Quel est le type de logement ?',
    maison: 'Maison',
    appartement: 'Appartement',
    villa: 'Villa',
    housingStatus: 'Quel est votre statut ?',
    proprietaire: 'Propriétaire',
    locataire: 'Locataire',
    housingValue: 'Quelle est la valeur approximative du logement en dirhams ?',
    furnitureValue: 'Quelle est la valeur approximative du mobilier ?',
    valuePlaceholder: 'Entrez la valeur en dirhams',
    healthCoverage: 'Type de couverture souhaitée :',
    individuel: 'Moi seul',
    famille: 'Famille',
    healthAge: 'Quel est l\'âge de l\'assuré principal ?',
    agePlaceholder: 'Entrez l\'âge',
    hasInsurance: 'Avez-vous une assurance actuelle ?',
    yes: 'Oui',
    no: 'Non',
    insuranceType: 'Quel type d\'assurance actuelle ?',
    base: 'Base',
    complementaire: 'Complémentaire',
    base_complementaire: 'Base + Complémentaire',
    vieInfo: 'L\'assurance vie nécessite une explication détaillée. Comment préférez-vous nous contacter ?',
    contactMethod: 'Choisissez le mode de contact :',
    bureau: 'Visite au bureau',
    appel: 'Vous appeler',
    activityType: 'Quel est le type d\'activité de votre entreprise ?',
    activityPlaceholder: 'Entrez le type d\'activité',
    professionType: 'Quel est le type de profession ?',
    professionPlaceholder: 'Entrez le type de profession',
    selectInsuranceTypes: 'Sélectionnez les types d\'assurance souhaités :',
    accidents_travail: 'Assurance Accidents du travail',
    rc: 'Assurance Responsabilité civile',
    rc_exploitation: 'Assurance RC exploitation',
    multirisques: 'Assurance Multirisques',
    multirisques_chantiers: 'Assurance Multirisques chantiers',
    rc_transport: 'Assurance RC transport',
    marchandises: 'Assurance Marchandises transportées',
    vehicules_engins: 'Assurance Véhicules et engins',
    autres_assurances: 'Autres assurances',
    rc_professionnelle: 'Assurance Responsabilité Civile Professionnelle',
    automobile_pro: 'Assurance automobile',
    scolaireInfo: 'L\'assurance scolaire protège vos enfants tout au long de l\'année scolaire.',
    scolaireCoverageQuestion: 'Cette assurance comprend :',
    scolaire_rc: 'Assurance responsabilité civile',
    scolaire_accidents_travail: 'Assurance accidents du travail',
    scolaire_multirisques: 'Assurance multirisque',
    scolaire_vehicules: 'Assurance véhicules',
    institutionName: 'Nom de l\'établissement scolaire',
    institutionPlaceholder: 'Entrez le nom de l\'établissement',
    clientName: 'Quel est votre nom complet ?',
    namePlaceholder: 'Entrez votre nom complet',
    clientPhone: 'Quel est votre numéro de téléphone ?',
    phonePlaceholder: 'Entrez votre numéro',
    phoneInvalid: '⚠️ Le numéro saisi n’est pas valide. Veuillez entrer un numéro valide.',
    clientCity: 'Dans quelle ville résidez-vous ?',
    cityPlaceholder: 'Entrez le nom de la ville',
    contactPreference: 'Comment préférez-vous être contacté ?',
    whatsapp: 'WhatsApp',
    call: 'Appel téléphonique',
    preferredDay: 'Quel jour préférez-vous ?',
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    preferredHour: 'Quelle heure préférez-vous ?',
    morning: 'Matin (9h-12h)',
    afternoon: 'Après-midi (12h-15h)',
    evening: 'Soir (15h-18h)',
    confirmation: 'Merci pour votre confiance. Notre équipe vous contactera à l\'heure convenue.',
    bureauInfo: 'Nous serons ravis de vous accueillir à notre bureau :\n\nHay Marche Verte (AtaaLLAH)\nGr D Rue 1 N° 33\nKSAR EL KEBIR 92150',
    autresInfo: 'Nous proposons plusieurs autres types d’assurances. Merci de laisser des informations précises concernant l’assurance que vous recherchez.',
    autresNeedQuestion: 'Veuillez décrire votre besoin en assurance en détail',
    autresNeedPlaceholder: 'Écrivez ici (200 mots maximum)',
    continue: 'Continuer',
    submit: 'Envoyer',
    registrationQuestion: 'Quel est le numéro d’immatriculation du véhicule ?',
    registrationPlaceholder: '12345 - A - 6',
    registrationInvalid: 'Numéro d’immatriculation invalide. Exemple : 12345 - A - 6',
    registrationLabel: 'Numéro d’immatriculation',
  },
};

export const t = (key: TranslationKey, lang: Language): string => {
  return translations[lang][key] || key;
};

export const getInsuranceOptions = (lang: Language): ChatOption[] => [
  { id: 'automobile', label: t('automobile', lang) },
  { id: 'transport_public', label: t('transport_public', lang) },
  { id: 'habitation', label: t('habitation', lang) },
  { id: 'sante', label: t('sante', lang) },
  { id: 'vie', label: t('vie', lang) },
  { id: 'entreprises', label: t('entreprises', lang) },
  { id: 'professionnels', label: t('professionnels', lang) },
  { id: 'scolaire', label: t('scolaire', lang) },
  { id: 'renouvellement', label: t('renouvellement', lang) },
  { id: 'autres', label: t('autres', lang) },
];

export const getTransportMeansOptions = (lang: Language): ChatOption[] => [
  { id: 'transport_taxi', label: t('transport_taxi', lang) },
  { id: 'transport_nusers', label: t('transport_nusers', lang) },
  { id: 'transport_touristic', label: t('transport_touristic', lang) },
];

export const getVehicleOptions = (lang: Language): ChatOption[] => [
  { id: 'voiture', label: t('voiture', lang) },
  { id: 'camion', label: t('camion', lang) },
  { id: 'moto', label: t('moto', lang) },
  { id: 'trottinette', label: t('trottinette', lang) },
  { id: 'triporteur', label: t('triporteur', lang) },
  { id: 'tracteur', label: t('tracteur', lang) },
  { id: 'pickup', label: t('pickup', lang) },
  { id: 'camion_petit', label: t('camion_petit', lang) },
  { id: 'camion_grand', label: t('camion_grand', lang) },
];

export const getHousingTypeOptions = (lang: Language): ChatOption[] => [
  { id: 'maison', label: t('maison', lang) },
  { id: 'appartement', label: t('appartement', lang) },
  { id: 'villa', label: t('villa', lang) },
];

export const getHousingStatusOptions = (lang: Language): ChatOption[] => [
  { id: 'proprietaire', label: t('proprietaire', lang) },
  { id: 'locataire', label: t('locataire', lang) },
];

export const getHealthCoverageOptions = (lang: Language): ChatOption[] => [
  { id: 'individuel', label: t('individuel', lang) },
  { id: 'famille', label: t('famille', lang) },
];

export const getYesNoOptions = (lang: Language): ChatOption[] => [
  { id: 'yes', label: t('yes', lang) },
  { id: 'no', label: t('no', lang) },
];

export const getCurrentInsuranceTypeOptions = (lang: Language): ChatOption[] => [
  { id: 'base', label: t('base', lang) },
  { id: 'complementaire', label: t('complementaire', lang) },
  { id: 'base_complementaire', label: t('base_complementaire', lang) },
];

export const getContactMethodOptions = (lang: Language): ChatOption[] => [
  { id: 'bureau', label: t('bureau', lang) },
  { id: 'appel', label: t('appel', lang) },
];

export const getEntrepriseInsuranceOptions = (lang: Language): ChatOption[] => [
  { id: 'accidents_travail', label: t('accidents_travail', lang) },
  { id: 'rc', label: t('rc', lang), highlight: true, required: true },
  { id: 'rc_exploitation', label: t('rc_exploitation', lang) },
  { id: 'multirisques', label: t('multirisques', lang) },
  { id: 'multirisques_chantiers', label: t('multirisques_chantiers', lang), highlight: true },
  { id: 'rc_transport', label: t('rc_transport', lang) },
  { id: 'marchandises', label: t('marchandises', lang) },
  { id: 'vehicules_engins', label: t('vehicules_engins', lang) },
  { id: 'autres_assurances', label: t('autres_assurances', lang) },
];

export const getProfessionnelInsuranceOptions = (lang: Language): ChatOption[] => [
  { id: 'rc_professionnelle', label: t('rc_professionnelle', lang), highlight: true, required: true },
  { id: 'accidents_travail', label: t('accidents_travail', lang) },
  { id: 'rc', label: t('rc', lang), highlight: true, required: true },
  { id: 'rc_exploitation', label: t('rc_exploitation', lang) },
  { id: 'multirisques', label: t('multirisques', lang) },
  { id: 'automobile_pro', label: t('automobile_pro', lang) },
  { id: 'autres_assurances', label: t('autres_assurances', lang) },
];

export const getContactPreferenceOptions = (lang: Language): ChatOption[] => [
  { id: 'whatsapp', label: t('whatsapp', lang) },
  { id: 'appel', label: t('call', lang) },
];

export const getDayOptions = (lang: Language): ChatOption[] => [
  { id: 'monday', label: t('monday', lang) },
  { id: 'tuesday', label: t('tuesday', lang) },
  { id: 'wednesday', label: t('wednesday', lang) },
  { id: 'thursday', label: t('thursday', lang) },
  { id: 'friday', label: t('friday', lang) },
  { id: 'saturday', label: t('saturday', lang) },
];

export const getHourOptions = (lang: Language): ChatOption[] => [
  { id: '10-11', label: lang === 'ar' ? '10:00–11:00' : '10:00–11:00' },
  { id: '11-12', label: lang === 'ar' ? '11:00–12:00' : '11:00–12:00' },
  { id: '12-13', label: lang === 'ar' ? '12:00–13:00' : '12:00–13:00' },
  { id: '13-14', label: lang === 'ar' ? '13:00–14:00' : '13:00–14:00' },
  { id: '14-15', label: lang === 'ar' ? '14:00–15:00' : '14:00–15:00' },
  { id: '15-16', label: lang === 'ar' ? '15:00–16:00' : '15:00–16:00' },
  { id: '16-17', label: lang === 'ar' ? '16:00–17:00' : '16:00–17:00' },
  { id: '17-18', label: lang === 'ar' ? '17:00–18:00' : '17:00–18:00' },
];

export const getScolaireCoverageOptions = (lang: Language): ChatOption[] => [
  { id: 'scolaire_rc', label: t('scolaire_rc', lang) },
  { id: 'scolaire_accidents_travail', label: t('scolaire_accidents_travail', lang) },
  { id: 'scolaire_multirisques', label: t('scolaire_multirisques', lang) },
  { id: 'scolaire_vehicules', label: t('scolaire_vehicules', lang) },
];
