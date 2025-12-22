import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad.png';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  MessageCircle, 
  Mail, 
  Phone, 
  Smartphone,
  AlertTriangle,
  MapPin
} from 'lucide-react';

interface ChatFooterProps {
  language: Language;
}

const ChatFooter = ({ language }: ChatFooterProps) => {
  const isRtl = language === 'ar';

  const socialLinks = [
    { icon: Facebook, href: 'https://web.facebook.com/alatlassia.assurance', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/atlassiaassurances/', label: 'Instagram' },
    { icon: Linkedin, href: 'https://ma.linkedin.com/in/al-atlassia-assurances-988817271', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://wa.me/212662153757', label: 'WhatsApp' },
  ];

  const contacts = [
    { icon: Mail, value: 'aalatlassia@gmail.com', href: 'mailto:aalatlassia@gmail.com' },
    { icon: Phone, value: '05 39 91 93 54', href: 'tel:+212539919354' },
    { icon: Smartphone, value: '06 62 15 37 57', href: 'tel:+212662153757' },
    { icon: MessageCircle, value: '06 66 22 84 37', href: 'https://wa.me/212666228437' },
  ];

  const emergencyNumbers = [
    { name: 'ATLANTASANAD ASSISTANCE', number: '05 22 46 46 44' },
    { name: 'ASSISTANCE TAXI', number: '05 22 95 75 39' },
  ];

  return (
    <footer 
      className="bg-card border-t border-border"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Main Footer Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Logos & Description */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="partner-wrapper">
              <img
                src={logoAlAtlassia}
                alt="Al Atlassia Assurances"
                className="partner-logo-equal"
              />
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="partner-wrapper">
              <img
                src={logoAtlantaSanad}
                alt="Atlanta Sanad"
                className="partner-logo-equal"
              />
            </div>
          </div>
          <p className={cn(
            "text-sm text-muted-foreground max-w-md",
            isRtl && "font-arabic"
          )}>
            {isRtl 
              ? 'وكيل عام لشركة التأمين وإعادة التأمين أطلنطا سند، نقدم تأمينات شاملة للأفراد والشركات'
              : "Agent général compagnie d'assurance et réassurance Atlanta Sanad, nous proposons des assurances complètes pour particuliers et entreprises"
            }
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {contacts.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
            >
              <contact.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs text-foreground truncate group-hover:text-primary transition-colors">
                {contact.value}
              </span>
            </a>
          ))}
        </div>

        {/* Emergency Numbers */}
        <div className="bg-accent/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-accent" />
            <span className={cn(
              "font-semibold text-sm text-foreground",
              isRtl && "font-arabic"
            )}>
              {isRtl ? 'أرقام الطوارئ 24/7 - في حالة عطب أو حادث' : 'Numéros d\'Urgence 24/7 - En cas de panne ou accident'}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {emergencyNumbers.map((emergency, index) => (
              <a
                key={index}
                href={`tel:${emergency.number.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-card rounded-xl hover:shadow-insurance-md transition-all"
              >
                <Phone className="w-4 h-4 text-accent" />
                <div className="text-center">
                  <div className="text-xs text-muted-foreground">{emergency.name}</div>
                  <div className="text-sm font-semibold text-foreground">{emergency.number}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
          <MapPin className="w-4 h-4" />
          <span className={isRtl ? "font-arabic" : ""}>
            {isRtl 
              ? 'حي السوق الأخضر (عطاء الله)، المجموعة د، الشارع 1، رقم 33، القصر الكبير 92150'
              : 'Hay Marche Verte (AtaaLLAH), Gr D Rue 1 N° 33, KSAR EL KEBIR 92150'
            }
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border py-4">
        <p className="text-center text-xs text-muted-foreground">
          © 2024 Al Atlassia Assurances - {isRtl ? 'جميع الحقوق محفوظة' : 'Tous droits réservés'}
        </p>
      </div>
    </footer>
  );
};

export default ChatFooter;
