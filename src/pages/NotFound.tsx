
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, Home } from 'lucide-react';

interface NotFoundProps {
  title?: string;
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ 
  title = "Page non trouvée", 
  message = "La page que vous recherchez n'existe pas ou a été déplacée." 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center text-ircc-blue">
            <Clock className="h-12 w-12" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        
        <div className="flex justify-center space-x-4">
          <Button asChild>
            <Link to="/tableaudebord/dashboard" className="flex items-center">
              <Home className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
