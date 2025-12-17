import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import logoAlAtlassia from '@/assets/logo-al-atlassia.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-blue-900 shadow-2xl'
          : 'bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Left: Logos */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img
                src={logoAlAtlassia}
                alt="Al Atlassia Assurances"
                className="h-12 w-auto object-contain"
              />
            </div>

            <div className="hidden md:block w-0.5 h-12 bg-blue-700"></div>

            <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img
                src={logoAtlantaSanad}
                alt="Atlanta Sanad"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          {/* Right: Brand Text */}
          <div className="flex-1 text-right">
            <div className="space-y-1">
              <div className="flex flex-col md:flex-row items-end md:items-center gap-2 justify-end">
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight font-arabic">
                  الأطلسية للتأمينات
                </h1>
                <span className="text-base md:text-lg text-blue-200 hidden md:inline">|</span>
                <h2 className="text-lg md:text-2xl font-semibold text-blue-100">
                  Al Atlassia Assurances
                </h2>
              </div>
              <p className="text-xs md:text-sm text-blue-300 leading-tight font-arabic">
                وسيط تأمين خاضع لمقتضيات القانون رقم 17.99 المتعلق بمدونة التأمينات
              </p>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-blue-200 transition-colors"
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

      {/* Gradient Accent Line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </header>
  );
};

export default Header;
