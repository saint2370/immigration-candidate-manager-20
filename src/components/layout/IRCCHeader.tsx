
import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const IRCCHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/portal?id=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleAccessFile = () => {
    navigate('/portal');
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-3">
          <div className="flex items-center mb-4 md:mb-0">
            {/* Logo and site title */}
            <Link to="/index" className="flex items-center">
              <div className="mr-4">
                <img 
                  src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-fr.svg" 
                  alt="IRCC Statut" 
                  className="h-8"
                />
              </div>
              <div className="text-sm">
                <div className="font-semibold text-lg">IRCC Statut</div>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input 
                placeholder={t('enter_immigration_id')} 
                className="pl-10 pr-4 h-10 w-64 border-gray-300"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </form>
            <Button 
              variant="ghost" 
              className="text-ircc-blue"
              onClick={toggleLanguage}
            >
              {language === 'fr' ? 'English' : 'Français'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="bg-[#26374A] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="relative">
              <button 
                className="py-3 px-4 flex items-center focus:outline-none"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="mr-2" size={20} /> : <Menu className="mr-2" size={20} />}
                <span className="font-medium">MENU</span>
              </button>
              
              {/* Mobile and Desktop Menu */}
              {isMenuOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg z-50 border border-gray-200">
                  <div className="py-2">
                    <Link 
                      to="/index" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      {t('home')}
                    </Link>
                    <Link 
                      to="/portal" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      {t('track_application')}
                    </Link>
                    <a 
                      href="/index#faq" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      FAQ
                    </a>
                    <a 
                      href="/index#contact" 
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={toggleMenu}
                    >
                      {t('contact')}
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <nav className="hidden md:flex">
              <Link to="/index" className={`py-3 px-4 hover:bg-[#1C2A38] transition-colors ${location.pathname === '/index' ? 'bg-[#1C2A38]' : ''}`}>
                {t('home')}
              </Link>
              <Link to="/portal" className={`py-3 px-4 hover:bg-[#1C2A38] transition-colors ${location.pathname.includes('/portal') ? 'bg-[#1C2A38]' : ''}`}>
                {t('track_application')}
              </Link>
              <a href="/index#faq" className="py-3 px-4 hover:bg-[#1C2A38] transition-colors">
                FAQ
              </a>
              <a href="/index#contact" className="py-3 px-4 hover:bg-[#1C2A38] transition-colors">
                {t('contact')}
              </a>
            </nav>
            
            <Button 
              className="py-3 px-4 bg-ircc-blue hover:bg-ircc-dark-blue transition-colors hidden md:block"
              onClick={handleAccessFile}
            >
              {t('access_file')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Secondary navigation - Breadcrumb */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/index" className="text-ircc-blue hover:underline">IRCC Statut</Link>
            {location.pathname !== '/index' && (
              <>
                <span className="mx-2">›</span>
                <span className="font-medium">
                  {location.pathname.includes('/portal/candidate') 
                    ? t('file_details')
                    : location.pathname === '/portal' 
                      ? t('track_application')
                      : t('home')}
                </span>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default IRCCHeader;
