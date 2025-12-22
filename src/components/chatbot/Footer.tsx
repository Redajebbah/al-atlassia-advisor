import { useState, useEffect } from 'react';
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
  Shield,
  Car,
  Home,
  HeartPulse,
  Heart,
  Building2
} from 'lucide-react';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';

interface FooterProps {
  language: Language;
}

const Footer = ({ language }: FooterProps) => {
  const isRtl = language === 'ar';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    { id: 'auto', icon: Car, label: isRtl ? 'تأمين السيارات' : 'Assurance Auto' },
    { id: 'habitation', icon: Home, label: isRtl ? 'تأمين السكن' : 'Assurance Habitation' },
    { id: 'sante', icon: HeartPulse, label: isRtl ? 'تأمين الصحة' : 'Assurance Santé' },
    { id: 'vie', icon: Heart, label: isRtl ? 'تأمين الحياة' : 'Assurance Vie' },
    { id: 'entreprise', icon: Building2, label: isRtl ? 'تأمين الشركات' : 'Assurance Entreprise' },
  ];

  return (
    <div className="w-full h-full">
      {/* Footer */}
      <footer className="w-full h-fit bg-gradient-to-br from-blue-900 to-blue-800 text-white relative overflow-hidden">
        {/* SVG Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className={cn(
          "w-full mx-auto sm:px-10 px-4 pb-10 relative z-10 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 pt-12">
            {/* Column 1: Company */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                <div className="partner-wrapper">
                  <img
                    className="partner-logo-equal"
                    src={logoAlAtlassia}
                    alt="Al Atlassia Assurances"
                  />
                </div>
                <div>
                  <h3 className={cn("text-xl font-bold text-white", isRtl && "font-arabic")} dir={isRtl ? "rtl" : "ltr"}>
                    {isRtl ? 'الأطلسية للتأمينات' : 'Al Atlassia'}
                  </h3>
                  <p className="text-blue-200 text-sm">
                    {isRtl ? 'طريقة جديدة في التأمين' : 'Une nouvelle approche de l’assurance'}
                  </p>
                </div>
              </div>
              
              <p className={cn("text-blue-100 text-sm leading-relaxed animate-fade-in-up", isRtl && "font-arabic text-right")} dir={isRtl ? "rtl" : "ltr"} style={{ animationDelay: '100ms' }}>
                {isRtl 
                  ? 'الأطلسية للتأمينات، شركة رائدة في مجال التأمين بالمغرب، نقدم حلول تأمين شاملة لحماية عائلتك وممتلكاتك وأعمالك.'
                  : "Al Atlassia Assurances, société leader dans le secteur de l'assurance au Maroc, offrant des solutions complètes pour protéger votre famille, vos biens et vos entreprises."
                }
              </p>

              {/* Social Media Icons with Hover Animation */}
              <div className="flex gap-3 pt-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <a 
                  href="https://www.facebook.com/alatlassia.assurance" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800/50 border border-blue-600 flex justify-center items-center hover:scale-110 hover:rotate-3 hover:bg-blue-700 transition-all duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/alatlassia_assurances" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800/50 border border-blue-600 flex justify-center items-center hover:scale-110 hover:rotate-3 hover:bg-blue-700 transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/al-atlassia-assurances" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800/50 border border-blue-600 flex justify-center items-center hover:scale-110 hover:rotate-3 hover:bg-blue-700 transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.youtube.com/@alatlassiaassurances" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-800/50 border border-blue-600 flex justify-center items-center hover:scale-110 hover:rotate-3 hover:bg-blue-700 transition-all duration-300"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: (Services section removed as per instructions) */}

            {/* Column 3: Contact */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h3 className={cn("text-lg font-semibold text-white mb-4", isRtl && "font-arabic")} dir={isRtl ? "rtl" : "ltr"}>
                {isRtl ? 'اتصل بنا' : 'Contactez-nous'}
              </h3>
              
              <div className="space-y-3">
                {/* Email */}
                <a 
                  href="mailto:aalatlassia@gmail.com" 
                  className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800/50 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className={cn("text-xs text-blue-200", isRtl && "font-arabic")}>{isRtl ? 'البريد الإلكتروني' : 'E-mail'}</p>
                    <p className="text-sm text-white">aalatlassia@gmail.com</p>
                  </div>
                </a>

                {/* Fixed Phone */}
                <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800/50 transition-all duration-300">
                  <Phone className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className={cn("text-xs text-blue-200", isRtl && "font-arabic")}>{isRtl ? 'الهاتف الثابت' : 'Téléphone fixe'}</p>
                    <p className="text-sm text-white">05 39 91 93 54</p>
                  </div>
                </div>

                {/* Mobile Phone */}
                <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800/50 transition-all duration-300">
                  <Smartphone className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className={cn("text-xs text-blue-200", isRtl && "font-arabic")}>{isRtl ? 'واتساب/ الهاتف المحمول' : 'WhatsApp / Téléphone mobile'}</p>
                    <p className="text-sm text-white">06 62 15 37 57</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800/50 transition-all duration-300">
                  <MessageCircle className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className={cn("text-xs text-blue-200", isRtl && "font-arabic")}>{isRtl ? 'واتساب' : 'WhatsApp'}</p>
                    <p className="text-sm text-white">06 66 22 84 37</p>
                  </div>
                </div>

                {/* Website link with label, aligned and localized */}
                <div className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-800/50 transition-all duration-300">
                  <Shield className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className={cn("text-xs text-blue-200", isRtl && "font-arabic")}>{isRtl ? 'الموقع الإلكتروني' : 'Site web'}</p>
                    <a href="https://alatlassia-assurances.com" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-300 hover:text-white underline break-all">
                      https://alatlassia-assurances.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Emergency Assistance */}
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
              <h3 className={cn("text-lg font-semibold text-white mb-4", isRtl && "font-arabic")} dir={isRtl ? "rtl" : "ltr"}>
                {isRtl ? 'المساعدة الطارئة' : 'Assistance d\'urgence'}
              </h3>
              
              {/* Emergency Card with Gradient */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative">
                    <span className="flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                  </div>
                  <p className={cn("text-white font-bold text-sm", isRtl && "font-arabic")}>
                    {isRtl ? 'متاح 24/7' : 'Disponible 24/7'}
                  </p>
                </div>
                
                <p className={cn("text-white text-xs mb-4", isRtl && "font-arabic text-right")} dir={isRtl ? "rtl" : "ltr"}>
                  {isRtl ? 'في حالة عطب أو حادث' : 'En cas de panne ou d\'accident'}
                </p>
                
                <div className="space-y-3">
                  <a href="tel:0522464644" className="block">
                    <p className="text-red-100 text-xs mb-1">ATLANTASANAD</p>
                    <p className="text-white font-bold text-lg">05 22 46 46 44</p>
                  </a>
                  
                  <div className="border-t border-red-500 my-2"></div>
                  
                  <a href="tel:0522957539" className="block">
                    <p className="text-red-100 text-xs mb-1">ASSISTANCE TAXI</p>
                    <p className="text-white font-bold text-lg">05 22 95 75 39</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Gradient Line Separator */}
          <div className="mt-12 mb-6 h-px bg-gradient-to-r from-blue-400 via-white to-blue-400 opacity-30 animate-fade-in" style={{ animationDelay: '600ms' }}></div>

          {/* Copyright */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '700ms' }}>
            <p className={cn("text-blue-200 text-sm", isRtl && "font-arabic")}>
              {isRtl 
                ? 'حقوق النشر © 2024 الأطلسية للتأمينات. جميع الحقوق محفوظة'
                : 'Copyright © 2024 Al Atlassia Assurances. Tous droits réservés'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
