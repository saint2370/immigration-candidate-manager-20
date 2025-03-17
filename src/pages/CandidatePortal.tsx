
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';

const CandidatePortal = () => {
  const [immigrationId, setImmigrationId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
      // Search by identification_number
      const { data: candidateData, error } = await supabase
        .from('candidates')
        .select('id')
        .eq('identification_number', immigrationId)
        .single();
      
      if (error || !candidateData) {
        throw new Error("Numéro d'identification non trouvé.");
      }
      
      // Navigate to candidate portal detail view
      navigate(`/portal/candidate/${candidateData.id}`);
      
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Portail des candidats
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accédez à votre dossier d'immigration en entrant votre numéro d'identification
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">
              Vérifiez l'état de votre demande
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Input
                  id="immigrationId"
                  value={immigrationId}
                  onChange={(e) => setImmigrationId(e.target.value)}
                  placeholder="Entrez votre numéro d'identification (ex: IMM-2023-1A2B3C)"
                  className="pl-10 pr-4"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-ircc-blue hover:bg-ircc-dark-blue"
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
                ) : "Accéder à mon dossier"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center text-sm text-gray-500">
          <p>
            Si vous ne connaissez pas votre numéro d'identification, veuillez contacter notre service client.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidatePortal;
