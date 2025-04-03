
import React, { useState } from 'react';
import { Search, Menu, X, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
    <header className="w-full bg-white border-b border-gray-200 z-30">
      <div className="container mx-auto px-4">
        {/* Top bar - Ajustements pour mobile */}
        <div className="flex flex-col md:flex-row items-center justify-between py-3">
          <div className="flex items-center mb-4 md:mb-0">
            {/* Logo and site title */}
            <Link to="/index" className="flex items-center">
              <div className="mr-4">
                <img 
                  src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-fr.svg" 
                  alt="Immigration Canada" 
                  className="h-8"
                />
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Bouton de langue monté en haut pour mobile */}
            <Button 
              variant="ghost" 
              className="text-red-600 hover:text-red-700 hover:bg-red-50 order-first md:order-last"
              onClick={toggleLanguage}
            >
              {language === 'fr' ? 'English' : 'Français'}
            </Button>
            
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input 
                placeholder={t('enter_immigration_id')} 
                className="pl-10 pr-4 h-10 w-64 border-red-200 focus:ring-red-500"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </form>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="bg-red-700 text-white">
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
              
              {/* Mobile Menu - Amélioré avec meilleur espacement */}
              {isMenuOpen && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg z-50 border border-gray-200">
                  <div className="py-2">
                    <Link 
                      to="/index" 
                      className="block px-4 py-3 text-gray-800 hover:bg-red-50 border-b border-gray-100"
                      onClick={toggleMenu}
                    >
                      {t('home')}
                    </Link>
                    <Link 
                      to="/portal" 
                      className="block px-4 py-3 text-gray-800 hover:bg-red-50 border-b border-gray-100"
                      onClick={toggleMenu}
                    >
                      {t('track_application')}
                    </Link>
                    
                    {/* New dropdown menu for mobile - Amélioré avec espacement */}
                    <div className="relative group">
                      <button className="flex items-center justify-between w-full px-4 py-3 text-gray-800 hover:bg-red-50 border-b border-gray-100">
                        {t('immigration_programs')}
                        <ChevronDown size={16} />
                      </button>
                      <div className="pl-6 hidden group-hover:block">
                        <Link 
                          to="/visa-etudiant" 
                          className="block px-4 py-3 text-gray-800 hover:bg-red-50 border-b border-gray-100"
                          onClick={toggleMenu}
                        >
                          {t('student_visa')}
                        </Link>
                        <Link 
                          to="/visa-travail" 
                          className="block px-4 py-3 text-gray-800 hover:bg-red-50 border-b border-gray-100"
                          onClick={toggleMenu}
                        >
                          {t('work_visa')}
                        </Link>
                        <Link 
                          to="/residence-permanente" 
                          className="block px-4 py-3 text-gray-800 hover:bg-red-50 border-b border-gray-100"
                          onClick={toggleMenu}
                        >
                          {t('permanent_residence')}
                        </Link>
                      </div>
                    </div>
                    
                    <a 
                      href="/index#faq" 
                      className="block px-4 py-3 text-gray-800 hover:bg-red-50 border-b border-gray-100"
                      onClick={toggleMenu}
                    >
                      FAQ
                    </a>
                    <a 
                      href="/index#contact" 
                      className="block px-4 py-3 text-gray-800 hover:bg-red-50"
                      onClick={toggleMenu}
                    >
                      {t('contact')}
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <Link to="/index" className={`py-3 px-4 hover:bg-red-800 transition-colors ${location.pathname === '/index' ? 'bg-red-800' : ''}`}>
                {t('home')}
              </Link>
              <Link to="/portal" className={`py-3 px-4 hover:bg-red-800 transition-colors ${location.pathname.includes('/portal') ? 'bg-red-800' : ''}`}>
                {t('track_application')}
              </Link>
              
              {/* Desktop Navigation Menu for Programs */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className={`py-3 px-4 hover:bg-red-800 transition-colors bg-transparent text-white ${location.pathname.includes('/visa') || location.pathname.includes('/residence') ? 'bg-red-800' : ''}`}>
                      {t('immigration_programs')}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white">
                      <ul className="grid gap-3 p-4 w-[300px]">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/visa-etudiant"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-red-50"
                            >
                              <div className="text-sm font-medium leading-none text-red-600">
                                {t('student_visa')}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                {t('student_visa_desc')}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/visa-travail"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-red-50"
                            >
                              <div className="text-sm font-medium leading-none text-red-600">
                                {t('work_visa')}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                {t('work_visa_desc')}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/residence-permanente"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-red-50"
                            >
                              <div className="text-sm font-medium leading-none text-red-600">
                                {t('permanent_residence')}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                                {t('permanent_residence_desc')}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <a href="/index#faq" className="py-3 px-4 hover:bg-red-800 transition-colors">
                FAQ
              </a>
              <a href="/index#contact" className="py-3 px-4 hover:bg-red-800 transition-colors">
                {t('contact')}
              </a>
            </nav>
            
            <Button 
              className="py-3 px-4 bg-white text-red-600 hover:bg-gray-100 transition-colors hidden md:block font-medium"
              onClick={handleAccessFile}
            >
              {language === 'fr' ? 'Se connecter' : 'Login'}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Secondary navigation - Breadcrumb */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/index" className="text-red-600 hover:underline">Immigration Canada</Link>
            {location.pathname !== '/index' && (
              <>
                <span className="mx-2">›</span>
                <span className="font-medium">
                  {location.pathname.includes('/portal/candidate') 
                    ? t('file_details')
                    : location.pathname === '/portal' 
                      ? t('track_application')
                      : location.pathname === '/visa-etudiant'
                        ? t('student_visa')
                        : location.pathname === '/visa-travail'
                          ? t('work_visa')
                          : location.pathname === '/residence-permanente'
                            ? t('permanent_residence')
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
