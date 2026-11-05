import { InsuranceType, ClientInfo, Language } from '@/types/chatbot';
import { t, getHourOptions } from '@/lib/translations';

// Email configuration
// EmailJS credentials (kept for compatibility but disabled)
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
// Receiving email for recap of demandes - default
const RECEIVING_EMAIL = import.meta.env.VITE_RECEIVING_EMAIL || 'aalatlassia@gmail.com';
// Web3Forms API key (from Vite env)
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

interface EmailData {
  selectedInsurance: InsuranceType;
  insuranceData: Record<string, any>;
  clientInfo: ClientInfo;
  language: Language;
}

// Escape user input before inserting it into HTML
const escapeHtml = (value: unknown): string =>
  String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

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
    transport_public: { fr: 'Assurance Transport Public des Voyageurs', ar: 'تأمين النقل العمومي للمسافرين' },
    renouvellement: { fr: 'Renouvellement de contrat d\'assurance', ar: 'تجديد عقد تأمين' },
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
        const vehicleLabel = t(data.vehicleType as any, lang) || data.vehicleType;
        details.push(`${lang === 'fr' ? 'Type de véhicule' : 'نوع المركبة'}: ${vehicleLabel}`);
      }
      if (data.registrationNumber) {
        details.push(`${t('registrationLabel', lang)}: ${data.registrationNumber}`);
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
      // For individual coverage
      if (data.coverage === 'individuel' && data.age) {
        details.push(`${lang === 'fr' ? 'Âge' : 'العمر'}: ${data.age}`);
      }
      // For family coverage with new spouse/children structure
      if (data.coverage === 'famille') {
        // Check if we have the new structure (spousesCount/childrenCount)
        if (data.spousesCount !== undefined) {
          details.push(`${lang === 'fr' ? 'Nombre d\'épouses' : 'عدد الزوجات'}: ${data.spousesCount}`);
          
          if (data.spousesAges && data.spousesAges.length > 0) {
            const agesLabel = lang === 'fr' ? 'Âges des épouses' : 'أعمار الزوجات';
            details.push(`${agesLabel}: ${data.spousesAges.join(', ')}`);
          }
        }
        
        if (data.childrenCount !== undefined) {
          details.push(`${lang === 'fr' ? 'Nombre d\'enfants' : 'عدد الأبناء'}: ${data.childrenCount}`);
          
          if (data.childrenAges && data.childrenAges.length > 0) {
            const agesLabel = lang === 'fr' ? 'Âges des enfants' : 'أعمار الأبناء';
            details.push(`${agesLabel}: ${data.childrenAges.join(', ')}`);
          }
        }
        
        // Fallback to old structure for backward compatibility
        if (data.familyMembersCount && data.spousesCount === undefined) {
          details.push(`${lang === 'fr' ? 'Nombre de membres' : 'عدد الأفراد'}: ${data.familyMembersCount}`);
        }
        if (data.familyMembersAges && data.familyMembersAges.length > 0 && data.spousesCount === undefined) {
          const agesLabel = lang === 'fr' 
            ? 'Âges des membres de la famille' 
            : 'أعمار أفراد العائلة';
          details.push(`${agesLabel}: ${data.familyMembersAges.join(', ')}`);
        }
      }
      if (data.hasCurrentInsurance !== undefined) {
        details.push(
          `${lang === 'fr' ? 'Assurance actuelle' : 'التأمين الحالي'}: ${data.hasCurrentInsurance ? (lang === 'fr' ? 'Oui' : 'نعم') : (lang === 'fr' ? 'Non' : 'لا')
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
        const mapped = data.insuranceTypes.map((id: string) => t(id as any, lang) || id);
        details.push(
          `${lang === 'fr' ? 'Types d\'assurance' : 'أنواع التأمين'}: ${mapped.join(', ')}`
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
        const mapped = data.coverageTypes.map((id: string) => t(id as any, lang) || id);
        details.push(
          `${lang === 'fr' ? 'Types de couverture' : 'أنواع التغطية'}: ${mapped.join(', ')}`
        );
      }
      if (data.institutionName) {
        details.push(`${lang === 'fr' ? 'Nom de l\'établissement' : 'اسم المؤسسة'}: ${data.institutionName}`);
      }
      break;

    case 'transport_public':
      if (data.transportMeans) {
        const transportLabel = t(data.transportMeans as any, lang) || data.transportMeans;
        details.push(`${lang === 'fr' ? 'Moyen de transport' : 'وسيلة النقل'}: ${transportLabel}`);
      }
      break;

    case 'renouvellement':
      // Renouvellement has no specific insurance data, just client info
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

// Alternative: Format as HTML email body for direct Gmail
export const generateEmailHTML = (emailData: EmailData): string => {
  const { selectedInsurance, insuranceData, clientInfo, language } = emailData;
  // Build a custom HTML layout matching the requested template
  const dateString = new Date().toLocaleString('fr-FR', {
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  const langLabel = language === 'fr' ? 'Français (FR)' : 'العربية (AR)';

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <style>
    body { font-family: Arial, Helvetica, sans-serif; color: #111827; background: #ffffff; margin:0; padding:20px; }
    .container { max-width:800px; margin:0 auto; }
    .header { text-align:center; background: #16325c; color: #fff; padding:18px; border-radius:6px; }
    h1 { margin:0; font-size:24px; }
    .subtitle { margin-top:6px; color:#cfe0ff; }
    .section { margin-top:18px; }
    .section-title { font-size:18px; margin-bottom:8px; color:#0b3b6f; }
    .muted { color:#374151; }
    pre { white-space: pre-wrap; font-family: inherit; }
    .footer { margin-top:18px; color:#6b7280; font-size:12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Atlas Assurances</h1>
      <div class="subtitle">Nouvelle demande d'assurance via chatbot</div>
    </div>

    <div class="section">
      <div class="section-title">📋 Type d'Assurance</div>
      <div class="muted">${translateInsuranceType(selectedInsurance, language)}</div>
      <div style="margin-top:8px;font-size:13px;">Langue sélectionnée: ${langLabel}</div>
    </div>

    <div class="section">
      <div class="section-title">📝 Détails de la demande</div>
      <div class="muted">
        ${insuranceData.activityType ? `نشاط الشركة: ${escapeHtml(insuranceData.activityType)}<br/><br/>` : ''}
        ${formatInsuranceDetails(selectedInsurance, insuranceData, language).split('\n').map(line => line ? `${escapeHtml(line)}<br/>` : '').join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">👤 Informations Client</div>
      <div class="muted">Nom complet: ${escapeHtml(clientInfo.fullName || 'N/A')}</div>
      <div class="muted" style="margin-top:8px;">Téléphone: ${escapeHtml(clientInfo.phone || 'N/A')}</div>
      <div class="muted" style="margin-top:8px;">Ville: ${escapeHtml(clientInfo.city || 'N/A')}</div>
      <div class="muted" style="margin-top:8px;">Moyen de contact préféré: ${formatContactPreference(clientInfo.contactPreference, language)}</div>
      <div class="muted" style="margin-top:8px;">اليوم المفضل للتواصل: ${clientInfo.preferredDay ? t(clientInfo.preferredDay as any, language) : 'N/A'}</div>
      <div class="muted" style="margin-top:8px;">الساعة المفضلة للتواصل: ${(() => {
      const ph = clientInfo.preferredHour;
      if (!ph) return 'N/A';
      const found = getHourOptions(language).find(h => h.id === ph);
      return found ? found.label : escapeHtml(ph);
    })()}</div>
    </div>

    <div class="section">
      <div class="muted">⏰ Date de demande: ${dateString}</div>
    </div>

    <div class="footer">© 2024 Atlas Assurances - Système automatisé</div>
  </div>
</body>
</html>
`.trim();
};

export const sendEmailNotification = async (emailData: EmailData): Promise<boolean> => {
  try {
    const { selectedInsurance, insuranceData, clientInfo, language } = emailData;

    // Prepare a nicely formatted time string
    const timeString = new Date().toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // HTML message for template (uses the existing generator)
    const htmlMessage = generateEmailHTML(emailData);

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
      preferred_day: clientInfo.preferredDay ? t(clientInfo.preferredDay as any, language) : 'N/A',
      preferred_hour: (() => {
        const hour = clientInfo.preferredHour;
        if (!hour) return 'N/A';
        const found = getHourOptions(language).find(h => h.id === hour);
        return found ? found.label : hour;
      })(),

      // Additional Info
      language: language === 'fr' ? 'Français' : 'العربية',
      date: new Date().toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      // Receiving address for the recap (used by EmailJS template)
      receiver_email: RECEIVING_EMAIL,
      to_email: RECEIVING_EMAIL,
      // Additional template variables matching your EmailJS template
      name: clientInfo.fullName || 'N/A',
      message: htmlMessage,
      time: timeString,
      subject: language === 'fr' ? "Nouvelle demande d'assurance - Chatbot Al Atlassia" : 'طلب تأمين جديد - Chatbot Al Atlassia',
    };

    // Prepare a readable plain-text recap message for fallback (kept for logs)
    const messageText = `Type d'assurance: ${translateInsuranceType(selectedInsurance, language)}\n\nDétails saisis:\n${formatInsuranceDetails(selectedInsurance, insuranceData, language)}\n\nNom client: ${clientInfo.fullName || 'N/A'}\nTéléphone: ${clientInfo.phone || 'N/A'}\nVille: ${clientInfo.city || 'N/A'}\nJour préféré: ${clientInfo.preferredDay ? t(clientInfo.preferredDay as any, language) : 'N/A'}\nHeure préférée: ${templateParams.preferred_hour}\nLangue: ${language === 'fr' ? 'Français' : 'العربية'}`;

    // Build plain-text email content (no HTML tags) for Web3Forms message field
    const detailsLines = formatInsuranceDetails(selectedInsurance, insuranceData, language)
      .split('\n')
      .filter(Boolean)
      .map(line => `- ${line}`)
      .join('\n');

    const dateStr = new Date().toLocaleString('fr-FR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const emailContent = [
      '--------------------------------',
      'Atlas Assurances',
      "Nouvelle demande d'assurance via chatbot",
      '--------------------------------',
      '',
      '📋 TYPE D\'ASSURANCE',
      translateInsuranceType(selectedInsurance, language),
      '',
      '📝 DÉTAILS DE LA DEMANDE',
      insuranceData.activityType ? `- نشاط الشركة: ${insuranceData.activityType}` : '',
      detailsLines,
      '',
      '--------------------------------',
      '',
      '👤 INFORMATIONS CLIENT',
      `- Nom complet : ${clientInfo.fullName || 'N/A'}`,
      `- Téléphone  : ${clientInfo.phone || 'N/A'}`,
      `- Ville      : ${clientInfo.city || 'N/A'}`,
      `- Contact    : ${formatContactPreference(clientInfo.contactPreference, language)}`,
      `- Jour       : ${clientInfo.preferredDay ? t(clientInfo.preferredDay as any, language) : 'N/A'}`,
      `- Heure      : ${templateParams.preferred_hour}`,
      '',
      '--------------------------------',
      '',
      '⏰ DATE DE DEMANDE',
      dateStr,
      '',
      '--------------------------------',
      '© 2024 Atlas Assurances',
      'Système automatisé',
      '--------------------------------'
    ].filter(Boolean).join('\n');

    // Use Web3Forms to send the email. Ensure the access key is present.
    if (!WEB3FORMS_KEY) {
      console.error('VITE_WEB3FORMS_KEY is not set. Email not sent.');
      return false;
    }

    try {
      const trimmedKey = (WEB3FORMS_KEY || '').trim();
      const payload = {
        access_key: trimmedKey,
        to_email: RECEIVING_EMAIL,
        subject: "Nouvelle demande d'assurance - Atlas Assurances",
        message: emailContent,
      };

      // Log payload without exposing full access key (show trimmed)
      const maskedKey = trimmedKey ? `${trimmedKey.slice(0, 4)}...${trimmedKey.slice(-4)}` : 'MISSING';
      console.info('Sending Web3Forms request', { access_key: maskedKey, to_email: RECEIVING_EMAIL, subject: payload.subject });

      const resp = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const respText = await resp.text().catch(() => '');
      let respJson: any = null;
      try { respJson = respText ? JSON.parse(respText) : null; } catch (e) { /* not JSON */ }

      if (!resp.ok) {
        console.error('Web3Forms error response', { status: resp.status, statusText: resp.statusText, body: respJson || respText });
        return false;
      }

      // Web3Forms returns { success: true } on success
      if (respJson && (respJson.success === true || respJson.success === 'true')) {
        console.log('Email sent successfully via Web3Forms');
        return true;
      }

      console.error('Web3Forms response indicates failure', respJson || respText);
      return false;
    } catch (err) {
      console.error('Error sending via Web3Forms:', err);
      return false;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

