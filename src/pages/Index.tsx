import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
      <h1 className="text-4xl font-bold">Système de gestion des candidats IRCC</h1>
      <p className="mt-4 text-xl text-gray-600 max-w-2xl">
        Plateforme centralisée pour gérer et suivre les dossiers d'immigration auprès d'Immigration, Réfugiés et Citoyenneté Canada (IRCC).
      </p>
      
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-ircc-blue hover:bg-ircc-dark-blue text-white rounded-md transition duration-300 ease-in-out"
        >
          Accéder au tableau de bord
        </Link>
        
        <Link
          to="/portal"
          className="px-6 py-3 bg-white text-ircc-blue border border-ircc-blue hover:bg-gray-50 rounded-md transition duration-300 ease-in-out"
        >
          Portail des candidats
        </Link>
      </div>
    </div>
  );
};

export default Index;
