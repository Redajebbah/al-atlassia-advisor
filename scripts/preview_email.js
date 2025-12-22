import fs from 'fs';

function translateInsuranceType(type, lang) {
  const translations = {
    automobile: { fr: 'Assurance Automobile', ar: 'تأمين السيارات' },
    habitation: { fr: 'Assurance Habitation', ar: 'تأمين السكن' },
    sante: { fr: 'Assurance Santé', ar: 'التأمين الصحي' },
    vie: { fr: 'Assurance Vie', ar: 'التأمين على الحياة' },
    entreprises: { fr: 'Assurance Entreprises', ar: 'تأمين الشركات' },
    professionnels: { fr: 'Assurance Professionnels', ar: 'التأمين المهني' },
    scolaire: { fr: 'Assurance Scolaire', ar: 'التأمين المدرسي' },
    autres: { fr: 'Autres Assurances', ar: 'تأمينات أخرى' },
    transport_public: { fr: 'Assurance Transport Public des Utilisateurs', ar: 'تأمين النقل العمومي للمستخدمين' },
  };
  return (translations[type] && translations[type][lang]) || type;
}

function formatInsuranceDetails(type, data, lang) {
  const details = [];
  if (type === 'entreprises') {
    if (data.activityType) {
      details.push(`${lang === 'fr' ? "Type d' activité" : 'نشاط الشركة'}: ${data.activityType}`);
    }
    if (data.insuranceTypes && data.insuranceTypes.length > 0) {
      details.push(`${lang === 'fr' ? "Types d'assurance" : 'أنواع التأمين المختارة:'} ` + data.insuranceTypes.join('\n'));
    }
  } else {
    // fallback: join other keys
    for (const k in data) {
      if (data[k]) details.push(`${k}: ${data[k]}`);
    }
  }
  return details.join('\n');
}

function formatContactPreference(pref, lang) {
  const prefs = { whatsapp: { fr: 'WhatsApp', ar: 'واتساب' }, appel: { fr: 'Appel téléphonique', ar: 'مكالمة هاتفية' } };
  return (prefs[pref] && prefs[pref][lang]) || pref;
}

function generateEmailHTML(emailData) {
  const { selectedInsurance, insuranceData, clientInfo, language } = emailData;
  const dateString = new Date().toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const langLabel = language === 'fr' ? 'Français (FR)' : 'العربية (AR)';

  return `<!doctype html>
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
        ${insuranceData.activityType ? `نشاط الشركة: ${insuranceData.activityType}<br/><br/>` : ''}
        ${formatInsuranceDetails(selectedInsurance, insuranceData, language).split('\n').map(line => line ? `${line}<br/>` : '').join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">👤 Informations Client</div>
      <div class="muted">Nom complet: ${clientInfo.fullName || 'N/A'}</div>
      <div class="muted" style="margin-top:8px;">Téléphone: ${clientInfo.phone || 'N/A'}</div>
      <div class="muted" style="margin-top:8px;">Ville: ${clientInfo.city || 'N/A'}</div>
      <div class="muted" style="margin-top:8px;">Moyen de contact préféré: ${formatContactPreference(clientInfo.contactPreference, language)}</div>
      <div class="muted" style="margin-top:8px;">اليوم المفضل للتواصل: ${clientInfo.preferredDay || 'N/A'}</div>
      <div class="muted" style="margin-top:8px;">الساعة المفضلة للتواصل: ${clientInfo.preferredHour || 'N/A'}</div>
    </div>

    <div class="section">
      <div class="muted">⏰ Date de demande: ${dateString}</div>
    </div>

    <div class="footer">© 2024 Atlas Assurances - Système automatisé</div>
  </div>
</body>
</html>`;
}

const sample = {
  selectedInsurance: 'entreprises',
  insuranceData: {
    activityType: 'Hosting',
    insuranceTypes: [
      'تأمين السيارات، الشاحنات، الآليات',
      'تأمين السلع المنقولة لحساب الخاص أو لحساب الغير',
      'المسؤولية المدنية للنقل',
      'تأمين متعدد المخاطر الأوراش',
      'تأمين متعدد المخاطر'
    ]
  },
  clientInfo: {
    fullName: 'Reda jebbah',
    phone: '0695151313',
    city: 'Kser el kbir',
    contactPreference: 'whatsapp',
    preferredDay: 'Mardi',
    preferredHour: '10h'
  },
  language: 'ar'
};

const html = generateEmailHTML(sample);
fs.writeFileSync('scripts/preview_email.html', html, 'utf8');
console.log('Preview written to scripts/preview_email.html');
