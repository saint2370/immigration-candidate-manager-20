
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { Lock, User } from 'lucide-react';

// Schéma de validation pour le formulaire
const formSchema = z.object({
  id: z.string().min(1, { message: "L'identifiant est requis" }),
  password: z.string().min(1, { message: "Le mot de passe est requis" }),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/tableaudebord');
    }
  }, [navigate]);

  // Configuration du formulaire avec React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      password: '',
    },
  });

  // Fonction de connexion
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulation d'une requête d'authentification
    setTimeout(() => {
      // Vérification des identifiants prédéfinis
      if (values.id === 'Futur' && values.password === 'Futur123') {
        // Stockage de l'état d'authentification
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', 'Futur');
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur votre tableau de bord",
        });
        
        navigate('/tableaudebord');
      } else {
        toast({
          title: "Échec de la connexion",
          description: "Identifiant ou mot de passe incorrect",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 800); // Délai simulant une requête réseau
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl border-gray-200">
          <CardHeader className="bg-gradient-to-r from-ircc-blue to-ircc-dark-blue text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center font-bold">
              Connexion Administrateur
            </CardTitle>
          </CardHeader>
          
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="id" className="block text-sm font-medium text-gray-700">
                        Identifiant
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="text"
                            id="id"
                            placeholder="Entrez votre identifiant"
                            className="pl-10"
                            disabled={isLoading}
                          />
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Mot de passe
                      </Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type="password"
                            id="password"
                            placeholder="Entrez votre mot de passe"
                            className="pl-10"
                            disabled={isLoading}
                          />
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                      Connexion en cours...
                    </span>
                  ) : "Se connecter"}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <div className="text-sm text-gray-500">
                Connectez-vous pour accéder au tableau de bord administrateur
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <footer className="bg-[#26374A] text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300 text-sm">© 2024 IRCC Statut. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
