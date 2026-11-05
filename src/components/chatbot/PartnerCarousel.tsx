import { Language } from '@/types/chatbot';
import baridCash from '@/assets/partners/barid-cash.png';
import coverEdge from '@/assets/partners/cover-edge.jpg';
import africaFirstAssist from '@/assets/partners/africa-first-assist.png';
import catAssurance from '@/assets/partners/cat-assurance.png';
import marocAssistance from '@/assets/partners/maroc-assistance.png';

const partners = [
  { name: 'Barid Cash', logo: baridCash },
  { name: 'Cover Edge', logo: coverEdge },
  { name: 'Africa First Assist', logo: africaFirstAssist },
  { name: 'CAT Assurance', logo: catAssurance },
  { name: 'Maroc Assistance', logo: marocAssistance },
];

const PartnerCarousel = ({ language }: { language: Language }) => {
  // Duplicated for a seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section
      className="py-8"
      style={{ background: '#ffffff', borderTop: '1px solid rgba(30, 58, 138, 0.06)' }}
      aria-label={language === 'ar' ? 'شركاؤنا' : 'Nos partenaires'}
    >
      <p
        className={language === 'ar' ? 'text-center text-sm font-semibold mb-5 font-arabic' : 'text-center text-xs font-semibold uppercase tracking-[0.12em] mb-5'}
        style={{ color: '#64748b' }}
      >
        {language === 'ar' ? 'شركاؤنا' : 'Nos partenaires'}
      </p>
      <div className="partner-marquee overflow-hidden" dir="ltr">
        <div className="flex w-max animate-carousel">
          {duplicatedPartners.map((partner, index) => (
            <div key={`${partner.name}-${index}`} className="flex-shrink-0 px-6 sm:px-10 flex items-center justify-center">
              <img
                src={partner.logo}
                alt={index < partners.length ? partner.name : ''}
                aria-hidden={index >= partners.length}
                className="partner-logo h-9 md:h-11 w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerCarousel;
