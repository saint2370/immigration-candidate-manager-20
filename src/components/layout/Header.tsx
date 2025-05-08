
import { useState, useEffect } from 'react';
import { 
  Search, Bell, Settings, ChevronDown, 
  Menu, User, LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 mr-4 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 hidden md:block">
          Gestion des Candidats à l'Immigration
        </h1>
      </div>

      {/* Middle section - Search */}
      <div className={cn(
        "hidden md:flex items-center relative transition-all duration-300 ease-in-out rounded-full",
        isSearchFocused ? "w-96 bg-white shadow-md" : "w-64 bg-gray-100"
      )}>
        <Search 
          size={18} 
          className={cn(
            "absolute left-3 transition-colors", 
            isSearchFocused ? "text-ircc-blue" : "text-gray-400"
          )}
        />
        <Input
          type="text"
          placeholder="Rechercher un candidat..."
          className="border-none bg-transparent h-10 pl-10 pr-4 focus:ring-0 focus:outline-none w-full rounded-full"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-full hover:bg-gray-100 relative text-gray-600 transition-colors">
          <Bell size={20} />
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
            3
          </Badge>
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
          <Settings size={20} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
              <div className="relative h-8 w-8 rounded-full bg-ircc-blue text-white flex items-center justify-center">
                <User size={16} />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">Admin</span>
              <ChevronDown size={16} className="text-gray-400 hidden md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1 p-1 bg-white rounded-lg shadow-lg border border-gray-200">
            <DropdownMenuItem className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center">
              <User size={16} className="mr-2" />
              <span>Mon profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors flex items-center text-red-500"
              onClick={logout}
            >
              <LogOut size={16} className="mr-2" />
              <span>Déconnexion</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
