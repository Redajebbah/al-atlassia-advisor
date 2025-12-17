# 📧 Guide Rapide - Configuration Email en 5 minutes

## ✅ Ce qui a été ajouté

- ✨ **Service d'envoi d'email** automatique via EmailJS
- 📧 **Template d'email** professionnel avec design Atlas Assurances
- 🔐 **Configuration sécurisée** via variables d'environnement
- 📊 **Email détaillé** avec toutes les informations du client

## 🚀 Setup Rapide (5 minutes)

### 1️⃣ Créer un compte EmailJS (2 min)
- Allez sur https://www.emailjs.com/
- Cliquez sur "Sign Up" (gratuit)
- Confirmez votre email

### 2️⃣ Connecter Gmail (1 min)
- Dans EmailJS: "Email Services" → "Add New Service"
- Choisissez "Gmail"
- Connectez votre compte Gmail
- **Copiez le Service ID** (ex: `service_abc123`)

### 3️⃣ Créer le template (1 min)
- Allez dans "Email Templates" → "Create New Template"
- Copiez-collez le template HTML du fichier `EMAIL_SETUP.md`
- **Subject**: `Nouvelle demande - {{insurance_type}}`
- **To Email**: Votre adresse Gmail
- **Copiez le Template ID** (ex: `template_xyz789`)

### 4️⃣ Récupérer la Public Key (30 sec)
- Allez dans "Account" → "General"
- **Copiez votre Public Key** (ex: `abcdef123456`)

### 5️⃣ Configurer l'application (30 sec)

**En local** - Créez `.env` à la racine:
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdef123456
VITE_RECIPIENT_EMAIL=votre-email@gmail.com
```

**Sur Vercel** - Ajoutez les variables dans Settings → Environment Variables

## 📧 Format de l'email reçu

Quand un client soumet une demande, vous recevrez:

```
┌─────────────────────────────────────┐
│     Atlas Assurances               │
│  Nouvelle demande d'assurance      │
└─────────────────────────────────────┘

📋 Type d'Assurance
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Assurance Entreprises

📝 Détails de la demande
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type d'activité: HOSTING
Types d'assurance: RC Professionnelle, Multirisque

👤 Informations Client
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nom complet:      REDA JEBBAH
Téléphone:        0695151313
Ville:            KSER EL KBIR
Moyen de contact: WhatsApp
Jour préféré:     Mardi
Heure préférée:   14:00-16:00

📅 Demande reçue le 17 décembre 2025
```

## 🎯 Test

```bash
# 1. Démarrer l'app
npm run dev

# 2. Compléter une demande
# 3. Vérifier votre email (et spams)
```

## ⚡ Déploiement Vercel avec Email

```bash
# 1. Push le code
git push origin main

# 2. Sur Vercel:
#    Settings → Environment Variables
#    Ajouter les 4 variables VITE_*

# 3. Redéployer
#    Deployments → ... → Redeploy
```

## 💡 Notes Importantes

- ✅ **Gratuit**: 200 emails/mois avec EmailJS
- 🔒 **Sécurisé**: Vos credentials ne sont jamais exposés
- 📱 **Responsive**: L'email s'affiche bien sur mobile
- 🌍 **Multilingue**: Support Français et Arabe
- ⚡ **Instantané**: Email envoyé immédiatement

## 🆘 Problèmes?

| Problème | Solution |
|----------|----------|
| Pas d'email reçu | Vérifiez vos spams + credentials .env |
| Erreur console | Vérifiez que les 3 variables VITE_* sont définies |
| Email mal formaté | Vérifiez le template dans EmailJS |

## 📚 Documentation Complète

Voir [EMAIL_SETUP.md](./EMAIL_SETUP.md) pour la documentation détaillée.

---

**🎉 C'est prêt!** Chaque demande d'assurance sera maintenant envoyée directement dans votre boîte Gmail.
