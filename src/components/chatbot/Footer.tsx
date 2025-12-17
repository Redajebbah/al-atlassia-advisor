import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';

interface FooterProps {
  language: Language;
}

const Footer = ({ language }: FooterProps) => {
  const isRtl = language === 'ar';

  return (
    <div className="w-full h-full">
      {/* Footer */}
      <footer className="w-full h-fit bg-black text-white relative bottom-0">
        <div className="w-full mx-auto sm:px-10 px-4 pb-10">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-items-start pt-12">
            {/* col 1 */}
            <div className="mt-4">
              <div className="flex-1 flex justify-between items-center">
                <img 
                  className="sm:w-[10rem] xs:w-[7rem] z-10 bg-white rounded-lg p-2" 
                  src={logoAlAtlassia} 
                  alt="Al Atlassia Assurances" 
                />
              </div>
              <p className={cn("mt-4", isRtl && "font-arabic text-right")} dir={isRtl ? "rtl" : "ltr"}>
                {isRtl 
                  ? 'الأطلسية للتأمينات، شركة رائدة في مجال التأمين بالمغرب، نقدم حلول تأمين شاملة لحماية عائلتك وممتلكاتك وأعمالك بأفضل الأسعار والخدمات.'
                  : "Al Atlassia Assurances, société leader dans le secteur de l'assurance au Maroc, offre des solutions complètes pour protéger votre famille, vos biens et vos entreprises avec les meilleurs prix et services."
                }
              </p>

              {/* Socials */}
              <div className="flex gap-2 items-center text-2xl text-white mt-6">
                <a 
                  href="https://www.facebook.com/alatlassia.assurance" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-indigo-600"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/alatlassia_assurances" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-indigo-600"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/al-atlassia-assurances" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-indigo-600"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.youtube.com/@alatlassiaassurances" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-700 flex justify-center items-center hover:border-indigo-600"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* col - 2 - CONTACT INFORMATION */}
            <div className="mt-4">
              <h2 className={cn("text-white text-3xl font-semibold mb-8", isRtl && "font-arabic text-right")} dir={isRtl ? "rtl" : "ltr"}>
                {isRtl ? 'معلومات الاتصال' : 'Contacts'}
              </h2>
              
              <div className={cn("w-full flex flex-col space-y-6", isRtl && "font-arabic")} dir={isRtl ? "rtl" : "ltr"}>
                {/* Email */}
                <div className="w-full flex flex-col">
                  <h3 className="xs:text-lg text-sm font-semibold mb-2">
                    {isRtl ? 'البريد الإلكتروني' : 'E-mail'}
                  </h3>
                  <a href="mailto:aalatlassia@gmail.com" className="text-gray-300 hover:text-indigo-400 transition-colors">
                    aalatlassia@gmail.com
                  </a>
                </div>

                {/* Fixe */}
                <div className="w-full flex flex-col">
                  <h3 className="xs:text-lg text-sm font-semibold mb-2">
                    {isRtl ? 'الهاتف الثابت' : 'Fixe'}
                  </h3>
                  <a href="tel:0539919354" className="text-gray-300 hover:text-indigo-400 transition-colors">
                    05 39 91 93 54
                  </a>
                </div>

                {/* Portable / WhatsApp */}
                <div className="w-full flex flex-col">
                  <h3 className="xs:text-lg text-sm font-semibold mb-2">
                    {isRtl ? 'الهاتف المحمول / واتساب' : 'Portable / WhatsApp'}
                  </h3>
                  <a href="tel:0662153757" className="text-gray-300 hover:text-indigo-400 transition-colors">
                    06 62 15 37 57
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="w-full flex flex-col">
                  <h3 className="xs:text-lg text-sm font-semibold mb-2">
                    {isRtl ? 'واتساب' : 'WhatsApp'}
                  </h3>
                  <a href="tel:0666228437" className="text-gray-300 hover:text-indigo-400 transition-colors">
                    06 66 22 84 37
                  </a>
                </div>
              </div>
            </div>

            {/* col - 3 - EMERGENCY & ASSISTANCE */}
            <div className="w-full mt-4 lg:pl-6">
              <h4 className={cn("text-white text-3xl font-semibold mb-6", isRtl && "font-arabic text-right")} dir={isRtl ? "rtl" : "ltr"}>
                {isRtl ? 'المساعدة الطارئة' : 'Assistance d\'urgence'}
              </h4>
              
              <div className={cn("text-gray-300 mb-7 space-y-4", isRtl && "font-arabic text-right")} dir={isRtl ? "rtl" : "ltr"}>
                <p className="font-semibold text-white">
                  {isRtl ? 'في حالة عطب أو حادث' : 'En cas de panne ou d\'accident'}
                </p>
                <p>
                  {isRtl ? 'أرقام المساعدة 24/7:' : 'Numéros d\'assistance 24/7 :'}
                </p>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <p className="font-semibold text-white mb-1">ATLANTASANAD ASSISTANCE</p>
                    <a href="tel:0522464644" className="text-gray-300 hover:text-indigo-400 transition-colors text-lg">
                      05 22 46 46 44
                    </a>
                  </div>
                  
                  <div>
                    <p className="font-semibold text-white mb-1">ASSISTANCE TAXI</p>
                    <a href="tel:0522957539" className="text-gray-300 hover:text-indigo-400 transition-colors text-lg">
                      05 22 95 75 39
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="bg-gray mt-14" />

          <div className="w-full flex gap-2 flex-col items-center justify-center py-4">
            <div className={cn(isRtl && "font-arabic")}>
              {isRtl 
                ? 'حقوق النشر © 2024 الأطلسية للتأمينات. جميع الحقوق محفوظة'
                : 'Copyright © 2024 Al Atlassia Assurances. Tous droits réservés'
              }
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
