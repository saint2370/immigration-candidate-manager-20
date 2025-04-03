
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, Info, HelpCircle } from 'lucide-react';
import IRCCHeader from '@/components/layout/IRCCHeader';

const CandidatePortal = () => {
  const [immigrationId, setImmigrationId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's an ID in the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const idFromUrl = queryParams.get('id');
    
    if (idFromUrl) {
      setImmigrationId(idFromUrl);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!immigrationId.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre numéro d'identification d'immigration.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Search by identification_number (which is the IMM-XXXX number)
      const { data: candidateData, error } = await supabase
        .from('candidates')
        .select('id, identification_number')
        .eq('identification_number', immigrationId.trim())
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching candidate:", error);
        throw new Error("Erreur lors de la recherche du numéro d'identification.");
      }
      
      if (!candidateData) {
        throw new Error("Numéro d'identification non trouvé.");
      }
      
      console.log("Candidate found:", candidateData);
      
      // Navigate to candidate portal detail view
      // Using the candidate's identification_number for a more user-friendly URL
      navigate(`/portal/candidate/${candidateData.identification_number}`);
      
    } catch (error) {
      console.error("Error fetching candidate:", error);
      toast({
        title: "Dossier non trouvé",
        description: "Le numéro d'identification saisi n'est pas valide ou n'existe pas.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Accès à votre dossier
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Consultez l'état de votre demande d'immigration en entrant votre numéro d'identification
            </p>
          </div>
          
          <Card className="shadow-lg border-gray-200">
            <CardHeader className="bg-gradient-to-r from-ircc-blue to-ircc-dark-blue text-white rounded-t-lg">
              <CardTitle className="text-xl text-center">
                Vérifiez l'état de votre demande
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="immigrationId" className="block text-sm font-medium text-gray-700">
                    Numéro d'identification d'immigration
                  </label>
                  <div className="relative">
                    <Input
                      id="immigrationId"
                      value={immigrationId}
                      onChange={(e) => setImmigrationId(e.target.value)}
                      placeholder="Exemple : IMM-2023-1A2B3C"
                      className="pl-10 pr-4 border-gray-300"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  <p className="text-xs text-gray-500 flex items-start mt-1">
                    <Info size={14} className="mr-1 mt-0.5 flex-shrink-0" />
                    Votre numéro d'identification se trouve sur vos documents officiels d'immigration
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-ircc-blue hover:bg-ircc-dark-blue transition-all"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Recherche en cours...
                    </span>
                  ) : "Se connecter"} {/* Changed from "Accéder à mon dossier" to "Se connecter" */}
                </Button>
              </form>
              
              <div className="mt-6 border-t pt-4">
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <HelpCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Besoin d'aide ?</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          Si vous ne connaissez pas votre numéro d'identification ou si vous rencontrez des difficultés, veuillez contacter notre service de support.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center text-sm text-gray-500">
            <p>
              Pour toute autre question, consultez notre <a href="/#faq" className="font-medium text-ircc-blue hover:text-ircc-dark-blue">FAQ</a> ou <a href="/#contact" className="font-medium text-ircc-blue hover:text-ircc-dark-blue">contactez-nous</a>.
            </p>
          </div>
        </div>
      </div>
      
      {/* Simple footer */}
      <footer className="bg-[#26374A] text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300 text-sm">© 2024 IRCC Statut. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default CandidatePortal;
