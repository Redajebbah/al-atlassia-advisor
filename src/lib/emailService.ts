import emailjs from '@emailjs/browser';
import { InsuranceType, ClientInfo, Language } from '@/types/chatbot';

// EmailJS Configuration
// Get your credentials from https://www.emailjs.com/
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

interface EmailData {
  selectedInsurance: InsuranceType;
  insuranceData: Record<string, any>;
  clientInfo: ClientInfo;
  language: Language;
}

// Translate insurance types
const translateInsuranceType = (type: InsuranceType, lang: Language): string => {
  const translations: Record<InsuranceType, { fr: string; ar: string }> = {
    automobile: { fr: 'Assurance Automobile', ar: 'تأمين السيارات' },
    habitation: { fr: 'Assurance Habitation', ar: 'تأمين السكن' },
    sante: { fr: 'Assurance Santé', ar: 'التأمين الصحي' },
    vie: { fr: 'Assurance Vie', ar: 'التأمين على الحياة' },
    entreprises: { fr: 'Assurance Entreprises', ar: 'تأمين الشركات' },
    professionnels: { fr: 'Assurance Professionnels', ar: 'التأمين المهني' },
    scolaire: { fr: 'Assurance Scolaire', ar: 'التأمين المدرسي' },
    autres: { fr: 'Autres Assurances', ar: 'تأمينات أخرى' },
  };
  return translations[type][lang];
};

// Format insurance details based on type
const formatInsuranceDetails = (
  type: InsuranceType,
  data: Record<string, any>,
  lang: Language
): string => {
  const details: string[] = [];

  switch (type) {
    case 'automobile':
      if (data.vehicleType) {
        details.push(`${lang === 'fr' ? 'Type de véhicule' : 'نوع المركبة'}: ${data.vehicleType}`);
      }
      break;

    case 'habitation':
      if (data.housingType) {
        details.push(`${lang === 'fr' ? 'Type de logement' : 'نوع السكن'}: ${data.housingType}`);
      }
      if (data.status) {
        details.push(`${lang === 'fr' ? 'Statut' : 'الحالة'}: ${data.status}`);
      }
      if (data.value) {
        details.push(`${lang === 'fr' ? 'Valeur' : 'القيمة'}: ${data.value} MAD`);
      }
      break;

    case 'sante':
      if (data.coverage) {
        details.push(`${lang === 'fr' ? 'Couverture' : 'التغطية'}: ${data.coverage}`);
      }
      if (data.age) {
        details.push(`${lang === 'fr' ? 'Âge' : 'العمر'}: ${data.age}`);
      }
      if (data.hasCurrentInsurance !== undefined) {
        details.push(
          `${lang === 'fr' ? 'Assurance actuelle' : 'التأمين الحالي'}: ${
            data.hasCurrentInsurance ? (lang === 'fr' ? 'Oui' : 'نعم') : (lang === 'fr' ? 'Non' : 'لا')
          }`
        );
      }
      if (data.currentInsuranceType) {
        details.push(`${lang === 'fr' ? 'Type d\'assurance actuelle' : 'نوع التأمين الحالي'}: ${data.currentInsuranceType}`);
      }
      break;

    case 'vie':
      if (data.contactMethod) {
        details.push(`${lang === 'fr' ? 'Méthode de contact' : 'طريقة الاتصال'}: ${data.contactMethod}`);
      }
      break;

    case 'entreprises':
      if (data.activityType) {
        details.push(`${lang === 'fr' ? 'Type d\'activité' : 'نوع النشاط'}: ${data.activityType}`);
      }
      if (data.insuranceTypes && data.insuranceTypes.length > 0) {
        details.push(
          `${lang === 'fr' ? 'Types d\'assurance' : 'أنواع التأمين'}: ${data.insuranceTypes.join(', ')}`
        );
      }
      break;

    case 'professionnels':
      if (data.insuranceTypes && data.insuranceTypes.length > 0) {
        details.push(
          `${lang === 'fr' ? 'Types d\'assurance' : 'أنواع التأمين'}: ${data.insuranceTypes.join(', ')}`
        );
      }
      break;

    case 'scolaire':
      if (data.coverageTypes && data.coverageTypes.length > 0) {
        details.push(
          `${lang === 'fr' ? 'Types de couverture' : 'أنواع التغطية'}: ${data.coverageTypes.join(', ')}`
        );
      }
      if (data.institutionName) {
        details.push(`${lang === 'fr' ? 'Nom de l\'établissement' : 'اسم المؤسسة'}: ${data.institutionName}`);
      }
      break;
  }

  return details.length > 0 ? details.join('\n') : (lang === 'fr' ? 'N/A' : 'غير متاح');
};

// Format contact preference in French
const formatContactPreference = (preference: string, lang: Language): string => {
  const prefs: Record<string, { fr: string; ar: string }> = {
    whatsapp: { fr: 'WhatsApp', ar: 'واتساب' },
    appel: { fr: 'Appel téléphonique', ar: 'مكالمة هاتفية' },
  };
  return prefs[preference]?.[lang] || preference;
};

export const sendEmailNotification = async (emailData: EmailData): Promise<boolean> => {
  try {
    const { selectedInsurance, insuranceData, clientInfo, language } = emailData;

    // Format the email template parameters
    const templateParams = {
      // Insurance Information
      insurance_type: translateInsuranceType(selectedInsurance, language),
      insurance_details: formatInsuranceDetails(selectedInsurance, insuranceData, language),
      
      // Client Information
      client_name: clientInfo.fullName || 'N/A',
      client_phone: clientInfo.phone || 'N/A',
      client_city: clientInfo.city || 'N/A',
      contact_preference: formatContactPreference(clientInfo.contactPreference, language),
      preferred_day: clientInfo.preferredDay || 'N/A',
      preferred_hour: clientInfo.preferredHour || 'N/A',
      
      // Additional Info
      language: language === 'fr' ? 'Français' : 'العربية',
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Send email using EmailJS
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Alternative: Format as HTML email body for direct Gmail
export const generateEmailHTML = (emailData: EmailData): string => {
  const { selectedInsurance, insuranceData, clientInfo, language } = emailData;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .section-title {
      color: #1e40af;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #3b82f6;
    }
    .info-row {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid #e5e7eb;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      font-weight: bold;
      min-width: 180px;
      color: #4b5563;
    }
    .info-value {
      color: #111827;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Atlas Assurances</h1>
    <p>${language === 'fr' ? 'Nouvelle demande d\'assurance via chatbot' : 'طلب تأمين جديد عبر الشات بوت'}</p>
  </div>
  
  <div class="content">
    <div class="section">
      <div class="section-title">📋 ${language === 'fr' ? 'Type d\'Assurance' : 'نوع التأمين'}</div>
      <div class="info-row">
        <div class="info-value" style="font-size: 16px; font-weight: bold;">
          ${translateInsuranceType(selectedInsurance, language)}
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">📝 ${language === 'fr' ? 'Détails de la demande' : 'تفاصيل الطلب'}</div>
      <div class="info-value" style="white-space: pre-line;">
        ${formatInsuranceDetails(selectedInsurance, insuranceData, language)}
      </div>
    </div>

    <div class="section">
      <div class="section-title">👤 ${language === 'fr' ? 'Informations Client' : 'معلومات العميل'}</div>
      <div class="info-row">
        <div class="info-label">${language === 'fr' ? 'Nom complet:' : 'الاسم الكامل:'}</div>
        <div class="info-value">${clientInfo.fullName || 'N/A'}</div>
      </div>
      <div class="info-row">
        <div class="info-label">${language === 'fr' ? 'Téléphone:' : 'الهاتف:'}</div>
        <div class="info-value">${clientInfo.phone || 'N/A'}</div>
      </div>
      <div class="info-row">
        <div class="info-label">${language === 'fr' ? 'Ville:' : 'المدينة:'}</div>
        <div class="info-value">${clientInfo.city || 'N/A'}</div>
      </div>
      <div class="info-row">
        <div class="info-label">${language === 'fr' ? 'Moyen de contact préféré:' : 'وسيلة الاتصال المفضلة:'}</div>
        <div class="info-value">${formatContactPreference(clientInfo.contactPreference, language)}</div>
      </div>
      <div class="info-row">
        <div class="info-label">${language === 'fr' ? 'Jour préféré pour contact:' : 'اليوم المفضل للتواصل:'}</div>
        <div class="info-value">${clientInfo.preferredDay || 'N/A'}</div>
      </div>
      <div class="info-row">
        <div class="info-label">${language === 'fr' ? 'Heure préférée:' : 'الوقت المفضل:'}</div>
        <div class="info-value">${clientInfo.preferredHour || 'N/A'}</div>
      </div>
    </div>
  </div>

  <div class="footer">
    <p>${language === 'fr' 
      ? `Demande reçue le ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
      : `تم استلام الطلب في ${new Date().toLocaleDateString('ar-MA')}`
    }</p>
    <p>Al Atlassia Assurances - Agent général Atlanta Sanad - Ksar El Kebir</p>
  </div>
</body>
</html>
  `.trim();
};
