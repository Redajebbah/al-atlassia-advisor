# 📧 Configuration Email pour Al Atlassia Advisor

Ce guide vous explique comment configurer l'envoi d'emails automatiques pour recevoir les demandes d'assurance.

## 🚀 Méthode 1: EmailJS (Recommandé - Gratuit)

EmailJS permet d'envoyer des emails directement depuis le navigateur sans backend.

### Étape 1: Créer un compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquez sur **"Sign Up"** et créez un compte gratuit
3. Confirmez votre email

### Étape 2: Ajouter un service email

1. Dans le dashboard EmailJS, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez **Gmail** (ou votre fournisseur email)
4. Connectez votre compte Gmail
5. Notez le **Service ID** (exemple: `service_abc123`)

### Étape 3: Créer un template d'email

1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Utilisez ce template HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>Atlas Assurances</h1>
            <p>Nouvelle demande d'assurance</p>
        </div>
        
        <div style="background: #f9fafb; padding: 30px;">
            <div style="background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
                <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                    📋 Type d'Assurance
                </h2>
                <p style="font-size: 16px; font-weight: bold;">{{insurance_type}}</p>
            </div>

            <div style="background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
                <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                    📝 Détails de la demande
                </h2>
                <p style="white-space: pre-line;">{{insurance_details}}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                    👤 Informations Client
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 10px; font-weight: bold; color: #4b5563;">Nom complet:</td>
                        <td style="padding: 10px;">{{client_name}}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 10px; font-weight: bold; color: #4b5563;">Téléphone:</td>
                        <td style="padding: 10px;">{{client_phone}}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 10px; font-weight: bold; color: #4b5563;">Ville:</td>
                        <td style="padding: 10px;">{{client_city}}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 10px; font-weight: bold; color: #4b5563;">Moyen de contact:</td>
                        <td style="padding: 10px;">{{contact_preference}}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 10px; font-weight: bold; color: #4b5563;">Jour préféré:</td>
                        <td style="padding: 10px;">{{preferred_day}}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; font-weight: bold; color: #4b5563;">Heure préférée:</td>
                        <td style="padding: 10px;">{{preferred_hour}}</td>
                    </tr>
                </table>
            </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
            <p>Demande reçue le {{date}}</p>
            <p>Al Atlassia Assurances - Agent général Atlanta Sanad</p>
        </div>
    </div>
</body>
</html>
```

4. Dans les paramètres du template:
   - **Subject**: `Nouvelle demande d'assurance - {{insurance_type}}`
   - **To Email**: Votre adresse email (ex: `votre-email@gmail.com`)
   - **From Name**: `Al Atlassia Chatbot`

5. Notez le **Template ID** (exemple: `template_xyz789`)

### Étape 4: Obtenir votre Public Key

1. Allez dans **"Account"** → **"General"**
2. Trouvez votre **Public Key** (exemple: `abcdef123456`)

### Étape 5: Configurer les variables d'environnement

1. Créez un fichier `.env` à la racine du projet:

```bash
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcdef123456
VITE_RECIPIENT_EMAIL=votre-email@gmail.com
```

2. Remplacez les valeurs par vos propres identifiants EmailJS

### Étape 6: Configurer Vercel (pour la production)

1. Allez sur votre projet Vercel
2. Allez dans **Settings** → **Environment Variables**
3. Ajoutez les 4 variables:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_RECIPIENT_EMAIL`
4. Redéployez votre application

## 📱 Test de l'envoi d'email

1. Démarrez votre application: `npm run dev`
2. Complétez une demande d'assurance jusqu'à la confirmation
3. Vérifiez votre boîte email - vous devriez recevoir le récapitulatif

## 🔍 Dépannage

### Emails non reçus?

1. **Vérifiez la console du navigateur** pour les erreurs
2. **Vérifiez vos spams/courrier indésirable**
3. **Vérifiez vos credentials EmailJS** dans le fichier `.env`
4. **Limite EmailJS**: Le plan gratuit a une limite de 200 emails/mois

### Erreur CORS?

EmailJS gère automatiquement les CORS, mais assurez-vous que:
- Votre Public Key est correct
- Votre service email est bien connecté
- Votre template existe et est actif

## 📊 Limites du plan gratuit EmailJS

- ✅ 200 emails par mois
- ✅ 2 services email
- ✅ Tous les templates
- ✅ Support de base

Pour plus d'emails, consultez les plans payants sur [emailjs.com](https://www.emailjs.com/pricing)

## 🎨 Personnalisation

Pour modifier le design de l'email, éditez le template dans EmailJS ou modifiez la fonction `generateEmailHTML()` dans `src/lib/emailService.ts`.

## 📝 Format des données envoyées

Chaque email contient:
- **Type d'assurance** demandée
- **Détails spécifiques** selon le type
- **Informations client** complètes
- **Préférences de contact**
- **Date et heure** de la demande

---

✅ **Configuration terminée!** Vos clients peuvent maintenant soumettre des demandes qui vous seront envoyées par email automatiquement.
