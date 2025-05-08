
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Vérifier l'état d'authentification au chargement
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserId = localStorage.getItem('userId');
    
    setIsAuthenticated(authStatus);
    setUserId(storedUserId);
  }, []);

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserId(null);
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    });
    
    navigate('/connexion');
  };

  return { isAuthenticated, userId, logout };
};
