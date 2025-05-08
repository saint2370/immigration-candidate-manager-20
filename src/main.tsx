
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialiser les identifiants prédéfinis au démarrage de l'application
const initializeCredentials = () => {
  // Vérifier si les identifiants existent déjà
  const credentialsExist = localStorage.getItem('credentialsInitialized');
  
  if (!credentialsExist) {
    // Les identifiants n'existent pas encore, les initialiser
    console.log('Initialisation des identifiants prédéfinis');
    
    // Ne pas stocker les identifiants directement dans localStorage par sécurité
    // On stocke simplement un indicateur que les identifiants ont été initialisés
    localStorage.setItem('credentialsInitialized', 'true');
    
    // Ne stocker aucun identifiant dans localStorage pour la sécurité
    // Les identifiants sont vérifiés directement dans le composant Login.tsx
  }
};

// Initialiser les identifiants
initializeCredentials();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
