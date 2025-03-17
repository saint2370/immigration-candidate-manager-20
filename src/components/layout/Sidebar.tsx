
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Users, Briefcase, Plane, CreditCard, 
  Calendar, BarChart2, Settings, Menu, X, 
  LogOut, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Tableau de bord', path: '/dashboard', icon: Home },
    { name: 'Candidats', path: '/candidates', icon: Users },
    { name: 'Visas Travail', path: '/work-visas', icon: Briefcase },
    { name: 'Visas Visiteur', path: '/visitor-visas', icon: Plane },
    { name: 'Résidence Permanente', path: '/permanent-residence', icon: CreditCard },
    { name: 'Calendrier', path: '/calendar', icon: Calendar },
    { name: 'Rapports', path: '/reports', icon: BarChart2 },
    { name: 'Paramètres', path: '/settings', icon: Settings },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed h-full z-40 bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ease-in-out",
          isOpen 
            ? "translate-x-0 shadow-lg w-64" 
            : isMobile 
              ? "-translate-x-full"
              : "w-20",
          "flex flex-col py-6"
        )}
      >
        {/* Logo and Toggle */}
        <div className="px-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-ircc-blue flex items-center justify-center text-white font-bold">
              IR
            </div>
            {isOpen && (
              <h1 className="ml-2 text-lg font-semibold text-gray-900 animate-fade-in">
                IRCC
              </h1>
            )}
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2.5 rounded-lg transition-all duration-200",
                    isActive 
                      ? "bg-ircc-blue text-white" 
                      : "text-gray-700 hover:bg-gray-100",
                    !isOpen && "justify-center"
                  )}
                >
                  <item.icon size={20} className={cn(!isOpen && "mx-auto")} />
                  {isOpen && (
                    <span className="ml-3 animate-fade-in">{item.name}</span>
                  )}
                  {isOpen && (
                    <ChevronRight size={16} className="ml-auto opacity-50" />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        {isOpen && (
          <div className="mt-auto border-t border-gray-200 pt-4 px-4 animate-fade-in">
            <button className="flex items-center w-full px-3 py-2.5 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <LogOut size={20} />
              <span className="ml-3">Déconnexion</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
