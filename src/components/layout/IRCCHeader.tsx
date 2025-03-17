
import React from 'react';
import { Search, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const IRCCHeader = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-3">
          <div className="flex items-center mb-4 md:mb-0">
            {/* Logo and Government title */}
            <Link to="/" className="flex items-center">
              <div className="mr-4">
                <img 
                  src="https://www.canada.ca/etc/designs/canada/wet-boew/assets/sig-blk-fr.svg" 
                  alt="Gouvernement du Canada" 
                  className="h-8"
                />
              </div>
              <div className="text-sm">
                <div className="font-semibold">Gouvernement du Canada</div>
                <div>Government of Canada</div>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input 
                placeholder="Rechercher dans IRCC Statut" 
                className="pl-10 pr-4 h-10 w-64 border-gray-300"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
            <Button 
              variant="default" 
              className="bg-[#26374A] hover:bg-[#1C2A38] text-white"
            >
              Se connecter
            </Button>
            <Button 
              variant="ghost" 
              className="text-ircc-blue"
            >
              English
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="bg-[#26374A] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="relative group">
              <button className="py-3 px-4 flex items-center focus:outline-none">
                <Menu className="mr-2" size={20} />
                <span className="font-medium">MENU</span>
              </button>
            </div>
            
            <nav className="hidden md:flex">
              <Link to="/" className="py-3 px-4 hover:bg-[#1C2A38] transition-colors">Accueil</Link>
              <Link to="/portal" className="py-3 px-4 hover:bg-[#1C2A38] transition-colors">Suivi du dossier</Link>
              <a href="#" className="py-3 px-4 hover:bg-[#1C2A38] transition-colors">FAQ</a>
              <a href="#" className="py-3 px-4 hover:bg-[#1C2A38] transition-colors">Contact</a>
            </nav>
            
            <Link to="/portal" className="py-3 px-4 bg-ircc-blue hover:bg-ircc-dark-blue transition-colors hidden md:block">
              Accéder à mon dossier
            </Link>
          </div>
        </div>
      </div>
      
      {/* Secondary navigation - Breadcrumb */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <Link to="/" className="text-ircc-blue hover:underline">Canada.ca</Link>
            <span className="mx-2">›</span>
            <span className="font-medium">IRCC Statut</span>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default IRCCHeader;
