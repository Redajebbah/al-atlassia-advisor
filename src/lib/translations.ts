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
  | 'selectInsuranceTypes'
  | 'accidents_travail'
  | 'rc'
  | 'rc_exploitation'
  | 'multirisques'
  | 'multirisques_chantiers'
  | 'rc_transport'
  | 'marchandises'
  | 'vehicules_engins'
  | 'rc_professionnelle'
  | 'automobile_pro'
  | 'scolaireInfo'
  | 'scolaireType'
  | 'institutionName'
  | 'institutionPlaceholder'
  | 'clientName'
  | 'namePlaceholder'
  | 'clientPhone'
  | 'phonePlaceholder'
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
  | 'submit';

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
    selectInsuranceTypes: 'اختر أنواع التأمين المطلوبة:',
    accidents_travail: 'حوادث الشغل',
    rc: 'المسؤولية المدنية',
    rc_exploitation: 'م.م. الاستغلال',
    multirisques: 'متعدد المخاطر',
    multirisques_chantiers: 'متعدد المخاطر - ورش',
    rc_transport: 'م.م. النقل',
    marchandises: 'البضائع المنقولة',
    vehicules_engins: 'المركبات والآليات',
    rc_professionnelle: 'م.م. المهنية',
    automobile_pro: 'تأمين السيارات',
    scolaireInfo: 'التأمين المدرسي يوفر الحماية لأبنائك خلال العام الدراسي.',
    scolaireType: 'اختر نوع التأمين المدرسي:',
    institutionName: 'ما اسم المؤسسة التعليمية؟',
    institutionPlaceholder: 'أدخل اسم المؤسسة',
    clientName: 'ما اسمك الكامل؟',
    namePlaceholder: 'أدخل اسمك الكامل',
    clientPhone: 'ما رقم هاتفك؟',
    phonePlaceholder: 'أدخل رقم الهاتف',
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
    bureauInfo: 'يسعدنا استقبالكم في مكتبنا:\n\nحي السوق الأخضر (عطاء الله)\nالمجموعة د، الشارع 1، رقم 33\nالقصر الكبير 92150',
    autresInfo: 'لدينا العديد من التأمينات الأخرى. يرجى ترك معلوماتك وسنتواصل معك لمناقشة احتياجاتك.',
    continue: 'متابعة',
    submit: 'إرسال',
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
    selectInsuranceTypes: 'Sélectionnez les types d\'assurance souhaités :',
    accidents_travail: 'Accidents du travail',
    rc: 'Responsabilité civile',
    rc_exploitation: 'RC exploitation',
    multirisques: 'Multirisques',
    multirisques_chantiers: 'Multirisques chantiers',
    rc_transport: 'RC transport',
    marchandises: 'Marchandises transportées',
    vehicules_engins: 'Véhicules et engins',
    rc_professionnelle: 'RC professionnelle',
    automobile_pro: 'Assurance automobile',
    scolaireInfo: 'L\'assurance scolaire protège vos enfants tout au long de l\'année scolaire.',
    scolaireType: 'Choisissez le type d\'assurance scolaire :',
    institutionName: 'Quel est le nom de l\'établissement ?',
    institutionPlaceholder: 'Entrez le nom de l\'établissement',
    clientName: 'Quel est votre nom complet ?',
    namePlaceholder: 'Entrez votre nom complet',
    clientPhone: 'Quel est votre numéro de téléphone ?',
    phonePlaceholder: 'Entrez votre numéro',
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
    autresInfo: 'Nous proposons de nombreuses autres assurances. Laissez vos coordonnées et nous vous contacterons pour discuter de vos besoins.',
    continue: 'Continuer',
    submit: 'Envoyer',
  },
};

export const t = (key: TranslationKey, lang: Language): string => {
  return translations[lang][key] || key;
};

export const getInsuranceOptions = (lang: Language): ChatOption[] => [
  { id: 'automobile', label: t('automobile', lang), icon: '🚗' },
  { id: 'habitation', label: t('habitation', lang), icon: '🏠' },
  { id: 'sante', label: t('sante', lang), icon: '💊' },
  { id: 'vie', label: t('vie', lang), icon: '❤️' },
  { id: 'entreprises', label: t('entreprises', lang), icon: '🏢' },
  { id: 'professionnels', label: t('professionnels', lang), icon: '👨‍💼' },
  { id: 'scolaire', label: t('scolaire', lang), icon: '🎓' },
  { id: 'autres', label: t('autres', lang), icon: '📋' },
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
  { id: 'bureau', label: t('bureau', lang), icon: '🏢' },
  { id: 'appel', label: t('appel', lang), icon: '📞' },
];

export const getEntrepriseInsuranceOptions = (lang: Language): ChatOption[] => [
  { id: 'accidents_travail', label: t('accidents_travail', lang) },
  { id: 'rc', label: t('rc', lang) },
  { id: 'rc_exploitation', label: t('rc_exploitation', lang) },
  { id: 'multirisques', label: t('multirisques', lang) },
  { id: 'multirisques_chantiers', label: t('multirisques_chantiers', lang) },
  { id: 'rc_transport', label: t('rc_transport', lang) },
  { id: 'marchandises', label: t('marchandises', lang) },
  { id: 'vehicules_engins', label: t('vehicules_engins', lang) },
];

export const getProfessionnelInsuranceOptions = (lang: Language): ChatOption[] => [
  { id: 'rc_professionnelle', label: t('rc_professionnelle', lang) },
  { id: 'accidents_travail', label: t('accidents_travail', lang) },
  { id: 'rc', label: t('rc', lang) },
  { id: 'rc_exploitation', label: t('rc_exploitation', lang) },
  { id: 'multirisques', label: t('multirisques', lang) },
  { id: 'automobile_pro', label: t('automobile_pro', lang) },
];

export const getContactPreferenceOptions = (lang: Language): ChatOption[] => [
  { id: 'whatsapp', label: t('whatsapp', lang), icon: '💬' },
  { id: 'appel', label: t('call', lang), icon: '📞' },
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
  { id: 'morning', label: t('morning', lang) },
  { id: 'afternoon', label: t('afternoon', lang) },
  { id: 'evening', label: t('evening', lang) },
];
