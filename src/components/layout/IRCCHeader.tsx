
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const IRCCHeader = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            {/* Using a div with text instead of an image for the logo */}
            <div className="h-10 mr-4 flex items-center justify-center bg-ircc-blue text-white px-3 rounded">
              <span className="font-bold">IRCC</span>
            </div>
            <div className="text-sm">
              <div className="font-semibold">Gouvernement du Canada</div>
              <div>Government of Canada</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input 
                placeholder="Rechercher dans IRCC" 
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
              Se connecter à IRCC
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
    </header>
  );
};

export default IRCCHeader;
