import { Menu, X, ChevronUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDelta = currentScrollY - lastScrollY.current;
          
          // Improved hysteresis with better thresholds
          if (currentScrollY < 20) {
            setIsCompact(false);
          } else if (scrollDelta > 5 && currentScrollY > 100) {
            // Scrolling down significantly
            setIsCompact(true);
          } else if (scrollDelta < -5) {
            // Scrolling up
            setIsCompact(false);
          }
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500 ease-in-out"
      style={{
        background: isCompact ? '#1e3a8a' : 'linear-gradient(to bottom, #1e3a8a, #1e40af, #1e3a8a)',
        boxShadow: isCompact ? '0 10px 40px rgba(0,0,0,0.3)' : '0 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 transition-all duration-500 ease-in-out" style={{ paddingTop: isCompact ? '0.5rem' : '1rem', paddingBottom: isCompact ? '0.5rem' : '1rem' }}>
        {!isCompact ? (
          /* FULL STATE */
          <div className="animate-in fade-in duration-500">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Left Logo */}
            <div className="flex-shrink-0">
              <div className="bg-white p-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img
                  src={logoAlAtlassia}
                  alt="Al Atlassia Assurances"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            {/* Center: Brand Text */}
            <div className="flex-1 text-center px-2">
              <div className="space-y-1">
                <div className="flex flex-col items-center gap-1">
                  <h1 className="text-xl md:text-3xl font-bold text-white leading-tight font-arabic">
                    الأطلسية للتأمينات
                  </h1>
                  <h2 className="text-base md:text-2xl font-semibold text-blue-100">
                    Al Atlassia Assurances
                  </h2>
                </div>
                <p className="text-[10px] md:text-xs text-blue-300 leading-tight font-arabic whitespace-nowrap overflow-hidden text-ellipsis">
                  وسيط تأمين خاضع لمقتضيات القانون رقم 17.99 المتعلق بمدونة التأمينات
                </p>
              </div>
            </div>

            {/* Right Logo */}
            <div className="flex-shrink-0">
              <div className="bg-white p-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img
                  src={logoAtlantaSanad}
                  alt="Atlanta Sanad"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-blue-200 transition-colors flex-shrink-0"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation */}
          <div
            className={`mt-4 pt-4 border-t border-blue-700/50 transition-all duration-300 overflow-hidden ${
              isOpen ? 'max-h-20' : 'max-h-0 md:max-h-12'
            }`}
          >
            <nav className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors duration-300 relative group"
              >
                <span>Accueil</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors duration-300 relative group"
              >
                <span>Services</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors duration-300 relative group"
              >
                <span>À Propos</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors duration-300 relative group"
              >
                <span>Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>
          </div>
        </div>
        ) : (
          /* COMPACT STATE */
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between gap-3 md:gap-6">
            {/* Left Logo */}
            <button
              onClick={scrollToTop}
              className="flex-shrink-0 bg-white p-1.5 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={logoAlAtlassia}
                alt="Al Atlassia Assurances"
                className="h-8 w-auto object-contain"
              />
            </button>

            {/* Center: Compact Navigation */}
            <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-6 flex-1">
              <a
                href="#"
                className="text-xs lg:text-sm text-blue-100 hover:text-white transition-colors duration-300 relative group whitespace-nowrap"
              >
                <span>Accueil</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#"
                className="text-xs lg:text-sm text-blue-100 hover:text-white transition-colors duration-300 relative group whitespace-nowrap"
              >
                <span>Services</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#"
                className="text-xs lg:text-sm text-blue-100 hover:text-white transition-colors duration-300 relative group whitespace-nowrap"
              >
                <span>À Propos</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#"
                className="text-xs lg:text-sm text-blue-100 hover:text-white transition-colors duration-300 relative group whitespace-nowrap"
              >
                <span>Contact</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>

            {/* Right Logo */}
            <div className="flex-shrink-0 bg-white p-1.5 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img
                src={logoAtlantaSanad}
                alt="Atlanta Sanad"
                className="h-8 w-auto object-contain"
              />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white hover:text-blue-200 transition-colors flex-shrink-0"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        )}

        {/* Mobile Menu (works in both states) */}
        {isOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-blue-700/50">
            <nav className="flex flex-col gap-3">
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors duration-300 py-2"
              >
                Accueil
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors duration-300 py-2"
              >
                Services
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors duration-300 py-2"
              >
                À Propos
              </a>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors duration-300 py-2"
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Gradient Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </header>
  );
};

export default Header;
