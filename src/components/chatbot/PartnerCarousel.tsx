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

const PartnerCarousel = () => {
  // Duplicate for infinite scroll effect
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="bg-card/50 border-t border-border py-4 overflow-hidden">
      <div className="flex animate-carousel">
        {duplicatedPartners.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex-shrink-0 px-8 flex items-center justify-center"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="partner-logo h-8 md:h-10 w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerCarousel;
