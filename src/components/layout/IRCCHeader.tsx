
import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const IRCCHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  // Check scroll position to show/hide elements
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const handleLoginClick = () => {
    navigate('/portal');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const mainSections = [
    {
      id: 'immigration',
      title: language === 'fr' ? 'Immigration et Réfugiés' : 'Immigration and Refugees',
      subsections: [
        { id: 'programs', title: language === 'fr' ? 'Programmes d\'immigration' : 'Immigration Programs', link: '/nouveaux-programmes' },
        { id: 'family', title: language === 'fr' ? 'Parrainage familial' : 'Family Sponsorship', link: '/nouveaux-programmes' },
        { id: 'refugees', title: language === 'fr' ? 'Réfugiés et demandes d\'asile' : 'Refugees and Asylum', link: '/nouveaux-programmes' },
        { id: 'permanent', title: language === 'fr' ? 'Résidence permanente' : 'Permanent Residence', link: '/residence-permanente' },
      ]
    },
    {
      id: 'services',
      title: language === 'fr' ? 'Services' : 'Services',
      subsections: [
        { id: 'application', title: language === 'fr' ? 'Ma demande' : 'My Application', link: '/portal' },
        { id: 'forms', title: language === 'fr' ? 'Formulaires et guides' : 'Forms and Guides', link: '#' },
        { id: 'newcomers', title: language === 'fr' ? 'Services aux nouveaux arrivants' : 'Newcomer Services', link: '#' },
        { id: 'biometrics', title: language === 'fr' ? 'Rendez-vous biométriques' : 'Biometric Appointments', link: '/portal' },
      ]
    },
    {
      id: 'applications',
      title: language === 'fr' ? 'Demandes' : 'Applications',
      subsections: [
        { id: 'visit', title: language === 'fr' ? 'Visiter le Canada' : 'Visit Canada', link: '/nouveaux-programmes' },
        { id: 'study', title: language === 'fr' ? 'Étudier au Canada' : 'Study in Canada', link: '/visa-etudiant' },
        { id: 'work', title: language === 'fr' ? 'Travailler au Canada' : 'Work in Canada', link: '/visa-travail' },
        { id: 'tracking', title: language === 'fr' ? 'Suivi des demandes' : 'Application Tracking', link: '/portal' },
      ]
    },
    {
      id: 'resources',
      title: language === 'fr' ? 'Ressources' : 'Resources',
      subsections: [
        { id: 'support', title: language === 'fr' ? 'Centre de soutien à la clientèle' : 'Client Support Center', link: '#contact' },
        { id: 'publications', title: language === 'fr' ? 'Publications et manuels' : 'Publications and Manuals', link: '#' },
        { id: 'guides', title: language === 'fr' ? 'Guides officiels' : 'Official Guides', link: '#' },
        { id: 'contact', title: language === 'fr' ? 'Contactez IRCC' : 'Contact IRCC', link: '#contact' },
      ]
    }
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 z-30 sticky top-0">
      {/* Top bar */}
      <div className="bg-red-700 text-white py-1 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <img 
                src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/wmms-blk.svg" 
                alt="Symbol of the Government of Canada" 
                className="h-5"
              />
            </div>
            <Button 
              variant="ghost" 
              className="text-white hover:text-gray-200 p-1 h-auto"
              onClick={toggleLanguage}
            >
              <Globe size={16} className="mr-1" />
              <span className="text-xs font-medium">
                {language === 'fr' ? 'English' : 'Français'}
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main header */}
      <div className="bg-white py-2 md:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo on the left */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-fr.svg" 
                  alt="Immigration Canada" 
                  className="h-7 md:h-8"
                />
              </Link>
            </div>
            
            {/* Mobile controls */}
            <div className="flex items-center md:hidden space-x-1">
              <div className="flex flex-col items-end">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-700 p-1 h-auto"
                  onClick={toggleLanguage}
                >
                  <Globe size={16} className="mr-1" />
                  <span className="text-xs font-medium">
                    {language === 'fr' ? 'EN' : 'FR'}
                  </span>
                </Button>
                
                <Button
                  size="sm"
                  className="text-xs px-2 py-1 h-auto bg-red-700 hover:bg-red-800 text-white mt-1"
                  onClick={handleLoginClick}
                >
                  {language === 'fr' ? 'Se connecter' : 'Login'}
                </Button>
              </div>
              
              <button 
                className="p-1 text-gray-700"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            {/* Desktop controls */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                className="bg-red-700 hover:bg-red-800 text-white"
                onClick={handleLoginClick}
              >
                {language === 'fr' ? 'Se connecter' : 'Login'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Desktop navigation */}
      <div className="bg-gray-100 border-b border-gray-300 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between">
            <nav className="flex">
              {mainSections.map((section) => (
                <div key={section.id} className="relative group">
                  <button 
                    className="py-3 px-4 text-gray-700 font-medium hover:bg-red-700 hover:text-white transition-colors"
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.title}
                  </button>
                  <div className="absolute left-0 mt-0 w-64 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                    <div className="py-2">
                      {section.subsections.map((subsection) => (
                        <Link
                          key={subsection.id}
                          to={subsection.link}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subsection.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 md:hidden overflow-y-auto">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <Link to="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
              <img 
                src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-fr.svg" 
                alt="Immigration Canada" 
                className="h-7"
              />
            </Link>
            <button onClick={toggleMenu} className="p-2 text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <div className="p-4">
            {mainSections.map((section) => (
              <div key={section.id} className="mb-4">
                <button
                  className="w-full text-left font-medium text-gray-800 py-2 px-1 border-b border-gray-200 flex justify-between items-center"
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.title}
                </button>
                <div className="pl-4 mt-2 space-y-1">
                  {section.subsections.map((subsection) => (
                    <Link
                      key={subsection.id}
                      to={subsection.link}
                      className="w-full block text-left py-2 text-gray-600 hover:text-red-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subsection.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Button
                className="w-full bg-red-700 hover:bg-red-800 text-white"
                onClick={() => {
                  handleLoginClick();
                  setIsMenuOpen(false);
                }}
              >
                {language === 'fr' ? 'Se connecter' : 'Login'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default IRCCHeader;
