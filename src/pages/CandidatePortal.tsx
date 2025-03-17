
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CandidatePortal = () => {
  const [idNumber, setIdNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idNumber.trim()) {
      setError("Veuillez saisir votre numéro d'identification");
      return;
    }

    setIsSearching(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('id')
        .eq('identification_number', idNumber.trim())
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        toast({
          title: "Dossier trouvé",
          description: "Redirection vers les détails de votre dossier...",
          variant: "default",
        });
        navigate(`/portal/candidate/${data.id}`);
      }
    } catch (error) {
      console.error('Error searching for candidate:', error);
      setError("Aucun dossier trouvé avec ce numéro d'identification");
      toast({
        title: "Erreur",
        description: "Aucun dossier trouvé avec ce numéro d'identification",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
                IR
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Portail des Candidats
              </h1>
            </div>
            <Button variant="outline" size="sm" onClick={() => window.location.href = "/"}>
              Zone d'administration
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Suivez l'avancement de votre dossier</h1>
          <p className="mt-4 text-lg text-gray-600">
            Entrez votre numéro d'identification pour accéder aux détails de votre demande
          </p>
        </div>

        <Card className="w-full mb-8 max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Accès à votre dossier</CardTitle>
            <CardDescription>
              Saisissez le numéro d'identification qui vous a été fourni lors de votre demande
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    type="text"
                    id="identification-number"
                    placeholder="Ex: IMM-2023-ABC123"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="pr-10"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                {error && (
                  <div className="text-sm text-red-500 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error}
                  </div>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSearching}
              >
                {isSearching ? "Recherche en cours..." : "Rechercher mon dossier"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <div className="text-sm text-gray-500 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Vos informations sont protégées et confidentielles
            </div>
          </CardFooter>
        </Card>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Comment ça marche ?</h3>
            <ol className="space-y-3 text-gray-600">
              <li className="flex">
                <span className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <p>Entrez votre numéro d'identification unique</p>
              </li>
              <li className="flex">
                <span className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <p>Accédez aux détails de votre dossier en temps réel</p>
              </li>
              <li className="flex">
                <span className="bg-blue-100 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <p>Consultez l'avancement et téléchargez vos documents</p>
              </li>
            </ol>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Besoin d'assistance ?</h3>
            <p className="text-gray-600 mb-4">
              Si vous rencontrez des difficultés ou si vous n'avez pas reçu votre numéro d'identification, contactez notre équipe.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm">
                Nous contacter
              </Button>
              <Button variant="secondary" size="sm">
                FAQ
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2023 Service d'Immigration. Tous droits réservés.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-gray-700">Politique de confidentialité</a>
            <a href="#" className="hover:text-gray-700">Conditions d'utilisation</a>
            <a href="#" className="hover:text-gray-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CandidatePortal;
