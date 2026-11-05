import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Language } from '@/types/chatbot';
import { cn } from '@/lib/utils';
import logoAlAtlassia from '@/assets/logo-al-atlassia-cropped.jpg';
import logoAtlantaSanad from '@/assets/logo-atlanta-sanad-cropped.png';

interface HeaderProps {
  language?: Language;
}

const NAV: Record<Language, { href: string; label: string }[]> = {
  fr: [
    { href: '#top', label: 'Accueil' },
    { href: '#assistant', label: 'Assistant' },
    { href: '#a-propos', label: 'À propos' },
    { href: '#contact', label: 'Contact' },
  ],
  ar: [
    { href: '#top', label: 'الرئيسية' },
    { href: '#assistant', label: 'المساعد' },
    { href: '#a-propos', label: 'من نحن' },
    { href: '#contact', label: 'اتصل بنا' },
  ],
};

/**
 * Fixed-height header: it never changes layout while scrolling (only its shadow does),
 * so the page below it does not jump.
 */
const Header = ({ language = 'fr' }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isRtl = language === 'ar';
  const links = NAV[language];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <header
      id="top"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="sticky top-0 z-50 transition-shadow duration-300"
      style={{
        background: 'linear-gradient(135deg, #1a2f5a 0%, #1e3a6f 100%)',
        boxShadow: isScrolled ? '0 8px 28px rgba(26, 47, 90, 0.28)' : '0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center gap-3 sm:gap-6">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 min-w-0 rounded-xl" aria-label="Al Atlassia Assurances">
          <span
            className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
            style={{ background: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}
          >
            <img src={logoAlAtlassia} alt="" className="w-[84%] h-[84%] object-contain" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[15px] sm:text-[17px] font-semibold text-white truncate" style={{ letterSpacing: '-0.01em' }}>
              Al Atlassia Assurances
            </span>
            <span className="block text-xs sm:text-[13px] font-arabic truncate" style={{ color: 'rgba(219, 234, 254, 0.8)' }}>
              الأطلسية للتأمينات
            </span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className={cn('hidden md:flex items-center gap-1 ms-auto', isRtl && 'font-arabic')} aria-label={isRtl ? 'القائمة الرئيسية' : 'Menu principal'}>
          {links.map(link => (
            <a key={link.href} href={link.href} className="header-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Partner */}
        <div className="flex items-center gap-2.5 ms-auto md:ms-2 md:ps-5 md:border-s md:border-white/10">
          <span className="hidden lg:block text-[11px] leading-tight text-end" style={{ color: 'rgba(219, 234, 254, 0.7)' }}>
            {isRtl ? 'وكيل عام' : 'Agent général'}
            <br />
            <span className="text-white/90 font-medium">Atlanta Sanad</span>
          </span>
          <span
            className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center"
            style={{ background: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.15)' }}
          >
            <img src={logoAtlantaSanad} alt="Atlanta Sanad" className="w-[80%] h-[80%] object-contain" />
          </span>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? (isRtl ? 'إغلاق القائمة' : 'Fermer le menu') : (isRtl ? 'فتح القائمة' : 'Ouvrir le menu')}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="md:hidden flex-shrink-0 w-10 h-10 -me-1.5 rounded-xl flex items-center justify-center text-white transition-colors hover:bg-white/10"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out',
          isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0',
        )}
        style={{ borderTop: isOpen ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
      >
        <nav
          className={cn('px-4 py-2 flex flex-col', isRtl && 'font-arabic')}
          aria-label={isRtl ? 'القائمة الرئيسية' : 'Menu principal'}
          onClick={() => setIsOpen(false)}
        >
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={isOpen ? 0 : -1}
              className="py-3 px-2 rounded-lg text-[15px] font-medium transition-colors hover:bg-white/5"
              style={{ color: 'rgba(239, 246, 255, 0.92)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
