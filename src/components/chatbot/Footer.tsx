import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  Smartphone,
  MessageCircle,
  Globe,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import logoAlAtlassia from '@/assets/logo-al-atlassia-cropped.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad-cropped.png';

interface FooterProps {
  language: Language;
}

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/alatlassia.assurance', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/alatlassia_assurances', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/al-atlassia-assurances', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@alatlassiaassurances', label: 'YouTube' },
];

const MAPS_URL = 'https://maps.google.com/?q=35.00274163192203,-5.910795861057443';

const Footer = ({ language }: FooterProps) => {
  const isRtl = language === 'ar';
  const year = new Date().getFullYear();

  const contacts = [
    { icon: Mail, label: isRtl ? 'البريد الإلكتروني' : 'E-mail', value: 'aalatlassia@gmail.com', href: 'mailto:aalatlassia@gmail.com' },
    { icon: Phone, label: isRtl ? 'الهاتف الثابت' : 'Téléphone fixe', value: '05 39 91 93 54', href: 'tel:+212539919354' },
    { icon: Smartphone, label: isRtl ? 'واتساب / الهاتف المحمول' : 'WhatsApp / Mobile', value: '06 62 15 37 57', href: 'tel:+212662153757' },
    { icon: MessageCircle, label: isRtl ? 'واتساب' : 'WhatsApp', value: '06 66 22 84 37', href: 'https://wa.me/212666228437', external: true },
  ];

  const emergencies = [
    { name: 'Atlanta Sanad Assistance', number: '05 22 46 46 44' },
    { name: 'Assistance Taxi', number: '05 22 95 75 39' },
  ];

  return (
    <footer
      id="a-propos"
      dir={isRtl ? 'rtl' : 'ltr'}
      className={cn('relative text-white', isRtl && 'font-arabic')}
      style={{ background: 'linear-gradient(180deg, #1e3a6f 0%, #1a2f5a 100%)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="footer-logo"><img src={logoAlAtlassia} alt="" className="w-[84%] h-[84%] object-contain" /></span>
              <span className="footer-logo"><img src={logoAtlantaSanad} alt="Atlanta Sanad" className="w-[80%] h-[80%] object-contain" /></span>
            </div>
            <p className="mt-4 text-lg font-semibold">{isRtl ? 'الأطلسية للتأمينات' : 'Al Atlassia Assurances'}</p>
            <p className="text-sm footer-muted">{isRtl ? 'طريقة جديدة في التأمين' : 'Une nouvelle approche de l’assurance'}</p>
            <p className="mt-4 text-sm leading-relaxed footer-muted max-w-sm">
              {isRtl
                ? 'الأطلسية للتأمينات، نقدم حلول تأمين شاملة لحماية عائلتك وممتلكاتك وأعمالك.'
                : "Al Atlassia Assurances, société leader dans le secteur de l'assurance au Maroc, offrant des solutions complètes pour protéger votre famille, vos biens et vos entreprises."}
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="footer-social">
                  <s.icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div id="contact" className="scroll-mt-24">
            <h3 className="footer-title">{isRtl ? 'اتصل بنا' : 'Contactez-nous'}</h3>
            <ul className="space-y-1">
              {contacts.map(c => (
                <li key={c.value}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="footer-row"
                  >
                    <c.icon className="footer-row__icon" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-xs footer-muted">{c.label}</span>
                      <span className="block text-sm font-medium" dir="ltr">{c.value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Agency */}
          <div>
            <h3 className="footer-title">{isRtl ? 'وكالتنا' : 'Notre agence'}</h3>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="footer-row items-start">
              <MapPin className="footer-row__icon mt-0.5" aria-hidden="true" />
              <span className="text-sm leading-relaxed">
                {isRtl
                  ? 'حي السوق الأخضر (عطاء الله)، المجموعة د، الشارع 1، رقم 33، القصر الكبير 92150'
                  : 'Hay Marche Verte (AtaaLLAH), Gr D Rue 1 N° 33, Ksar El Kebir 92150'}
                <span className="mt-1.5 flex items-center gap-1 text-xs font-medium" style={{ color: 'rgba(191, 219, 254, 0.95)' }}>
                  {isRtl ? 'عرض على الخريطة' : 'Voir l’itinéraire'}
                  <ArrowUpRight className="w-3.5 h-3.5 rtl:-scale-x-100" aria-hidden="true" />
                </span>
              </span>
            </a>
            <a href="https://www.alatlassia-assurances.com" target="_blank" rel="noopener noreferrer" className="footer-row">
              <Globe className="footer-row__icon" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-xs footer-muted">{isRtl ? 'الموقع الإلكتروني' : 'Site web'}</span>
                <span className="block text-sm font-medium" dir="ltr">www.alatlassia-assurances.com</span>
              </span>
            </a>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="footer-title">{isRtl ? 'المساعدة الطارئة' : 'Assistance d’urgence'}</h3>
            <div className="footer-emergency">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <span className="w-2 h-2 rounded-full" style={{ background: '#f87171' }} aria-hidden="true" />
                {isRtl ? 'متاح 24/7' : 'Disponible 24h/24, 7j/7'}
              </p>
              <p className="mt-1 text-xs footer-muted">{isRtl ? 'في حالة عطب أو حادث' : 'En cas de panne ou d’accident'}</p>
              <div className="mt-3 space-y-2">
                {emergencies.map(e => (
                  <a key={e.number} href={`tel:${e.number.replace(/\s/g, '')}`} className="footer-emergency__call">
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-wide footer-muted">{e.name}</span>
                      <span className="block text-base font-semibold" dir="ltr">{e.number}</span>
                    </span>
                    <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#fca5a5' }} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col md:flex-row gap-2 md:items-center md:justify-between text-xs footer-muted" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p>
            © {year} {isRtl ? 'الأطلسية للتأمينات. جميع الحقوق محفوظة' : 'Al Atlassia Assurances. Tous droits réservés'}
          </p>
          <p className="font-arabic" dir="rtl">وسيط تأمين خاضع لمقتضيات القانون رقم 17.99 المتعلق بمدونة التأمينات</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
