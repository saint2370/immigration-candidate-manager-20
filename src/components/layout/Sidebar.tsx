
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, Users, Briefcase, Plane, CreditCard, 
  Calendar, BarChart2, Settings, Menu, X, 
  LogOut, ChevronRight, AlertCircle
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

  // Ajouter les alertes spéciales
  const specialAlerts = [
    { name: 'Mesures Spéciales - Haïti', path: '/special/haiti' },
    { name: 'Mesures Spéciales - Ukraine', path: '/special/ukraine' },
    { name: 'Mesures Spéciales - Gaza', path: '/special/gaza' },
    { name: 'Toutes les mesures spéciales', path: '/special/all' },
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
          "fixed h-full z-40 bg-[#26374A] text-white overflow-y-auto transition-all duration-300 ease-in-out",
          isOpen 
            ? "translate-x-0 shadow-lg w-64" 
            : isMobile 
              ? "-translate-x-full"
              : "w-20",
          "flex flex-col py-3"
        )}
      >
        {/* Logo and Toggle */}
        <div className="px-4 mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-red-600 flex items-center justify-center text-white font-bold">
              IR
            </div>
            {isOpen && (
              <h1 className="ml-2 text-lg font-semibold text-white animate-fade-in">
                IRCC
              </h1>
            )}
          </div>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-[#1C2A38] text-gray-300 transition-colors"
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
                      ? "bg-red-700 text-white" 
                      : "text-gray-200 hover:bg-[#1C2A38]",
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

          {/* Special Alerts Section */}
          {isOpen && (
            <div className="mt-6 px-3">
              <div className="flex items-center text-gray-300 mb-2">
                <AlertCircle size={16} className="mr-2" />
                <span className="text-sm font-medium">Mesures Spéciales</span>
              </div>
              <ul className="space-y-1 pl-6">
                {specialAlerts.map((alert) => (
                  <li key={alert.path} className="text-sm">
                    <NavLink
                      to={alert.path}
                      className={({ isActive }) => cn(
                        "block py-1 hover:text-white transition-colors",
                        isActive ? "text-white" : "text-gray-300"
                      )}
                    >
                      {alert.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* Bottom section */}
        {isOpen && (
          <div className="mt-auto border-t border-gray-700 pt-4 px-4 animate-fade-in">
            <button className="flex items-center w-full px-3 py-2.5 text-gray-300 rounded-lg hover:bg-[#1C2A38] transition-all duration-200">
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
