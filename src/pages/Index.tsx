
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { 
  Search, 
  Check, 
  Shield, 
  UserCheck, 
  ChevronRight, 
  ArrowRight, 
  Lock, 
  Clock, 
  Star, 
  Phone, 
  Mail, 
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [immigrationId, setImmigrationId] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!immigrationId.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre numéro d'identification d'immigration.",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to portal with the ID
    navigate(`/portal?id=${encodeURIComponent(immigrationId)}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <IRCCHeader />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                Suivez votre dossier d'immigration en toute simplicité !
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                Consultez en temps réel l'état de votre demande et téléchargez vos documents en quelques clics.
              </p>
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Entrez votre ID d'immigration" 
                  className="flex-1"
                  value={immigrationId}
                  onChange={(e) => setImmigrationId(e.target.value)}
                />
                <Button type="submit" className="bg-ircc-blue hover:bg-ircc-dark-blue w-full sm:w-auto">
                  Accéder à mon dossier
                  <ChevronRight size={18} />
                </Button>
              </form>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/lovable-uploads/8723bfa1-a246-4a52-a6aa-e6917ee1059f.png" 
                  alt="Nouveau arrivant" 
                  className="rounded-lg shadow-md"
                />
                <img 
                  src="/lovable-uploads/6741185c-18b1-4058-a6ab-670479ba19e7.png" 
                  alt="Arrivée à l'aéroport" 
                  className="rounded-lg shadow-md"
                />
                <img 
                  src="/lovable-uploads/2c6012c5-1aeb-427c-9537-6464053f3b55.png" 
                  alt="Groupe d'immigrants" 
                  className="rounded-lg shadow-md"
                />
                <img 
                  src="/lovable-uploads/a7798152-6004-45cd-82ac-015273e182fb.png" 
                  alt="Immigrant avec bagages" 
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Presentation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre Plateforme de Suivi de Dossier</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Notre plateforme sécurisée vous permet de suivre l'état d'avancement de votre dossier d'immigration, 
              d'accéder à vos documents et de rester informé des prochaines étapes de votre procédure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-blue-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300">
              <div className="bg-ircc-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Consultation rapide</h3>
              <p className="text-gray-600">
                Accédez instantanément aux informations de votre dossier et consultez son état d'avancement.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300">
              <div className="bg-ircc-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accès sécurisé</h3>
              <p className="text-gray-600">
                Vos documents et informations sont protégés et accessibles uniquement avec votre identifiant personnel.
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300">
              <div className="bg-ircc-blue w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suivi personnalisé</h3>
              <p className="text-gray-600">
                Bénéficiez d'un accompagnement sur mesure et recevez des notifications sur l'évolution de votre dossier.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              En seulement 3 étapes simples, accédez à toutes les informations de votre dossier d'immigration
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center flex-1 max-w-xs">
              <div className="bg-ircc-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Entrez votre ID</h3>
              <p className="text-gray-600">Saisissez votre numéro d'identification d'immigration unique</p>
            </div>
            
            <div className="hidden md:block">
              <ArrowRight className="text-ircc-blue" size={40} />
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center flex-1 max-w-xs">
              <div className="bg-ircc-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Consultez votre dossier</h3>
              <p className="text-gray-600">Accédez à toutes vos informations et téléchargez vos documents</p>
            </div>
            
            <div className="hidden md:block">
              <ArrowRight className="text-ircc-blue" size={40} />
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center flex-1 max-w-xs">
              <div className="bg-ircc-blue text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Suivez les mises à jour</h3>
              <p className="text-gray-600">Restez informé de l'évolution de votre dossier à chaque étape</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ce que disent nos utilisateurs</h2>
            <div className="flex items-center justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
              ))}
              <span className="ml-2 text-lg font-medium">4.8/5</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/a7798152-6004-45cd-82ac-015273e182fb.png" alt="Candidat" className="w-12 h-12 rounded-full object-cover mr-3" />
                <div>
                  <h4 className="font-semibold">Marc Dupont</h4>
                  <p className="text-sm text-gray-600">Visa de travail</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Grâce à cette plateforme, j'ai pu suivre facilement l'évolution de ma demande de visa de travail. Service efficace et très pratique !"
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/2c6012c5-1aeb-427c-9537-6464053f3b55.png" alt="Candidat" className="w-12 h-12 rounded-full object-cover mr-3" />
                <div>
                  <h4 className="font-semibold">Sophie Martin</h4>
                  <p className="text-sm text-gray-600">Résidence permanente</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Le suivi en temps réel de mon dossier de résidence permanente m'a permis de rester sereine tout au long du processus. Très recommandé !"
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/6741185c-18b1-4058-a6ab-670479ba19e7.png" alt="Candidat" className="w-12 h-12 rounded-full object-cover mr-3" />
                <div>
                  <h4 className="font-semibold">Ahmed Khalil</h4>
                  <p className="text-sm text-gray-600">Regroupement familial</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Interface intuitive et accès rapide à tous nos documents. Le processus de regroupement familial a été bien moins stressant grâce à ce service."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Questions fréquentes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement des réponses aux questions les plus courantes
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md overflow-hidden">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  Comment retrouver mon ID d'immigration ?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Votre ID d'immigration se trouve sur votre récépissé d'immigration au niveau de la mention "ID". 
                  Il est présent sur tous les documents officiels que vous avez reçus de l'IRCC. Il commence généralement 
                  par "IMM-" suivi d'une série de chiffres et de lettres. Si vous ne le trouvez pas, contactez notre service client.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  Que faire si un document est manquant dans mon dossier ?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Si vous constatez qu'un document est manquant dans votre dossier, contactez immédiatement votre conseiller en immigration. Vous pouvez également utiliser la section Contact de notre plateforme pour signaler ce problème.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  À quelle fréquence les informations sont-elles mises à jour ?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Les informations de votre dossier sont mises à jour en temps réel dès que nous recevons des nouvelles de l'IRCC ou que votre conseiller effectue une action sur votre dossier. Vous recevrez également des notifications par email pour les mises à jour importantes.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  Comment puis-je télécharger mes documents ?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Une fois connecté à votre espace personnel, rendez-vous dans la section "Documents" de votre dossier. Tous vos documents disponibles y seront listés avec un bouton de téléchargement à côté de chacun d'eux.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                  Qui peut accéder à mon dossier ?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Seules les personnes possédant votre ID d'immigration peuvent accéder à votre dossier. Notre plateforme est sécurisée et vos informations sont protégées conformément aux lois sur la protection des données personnelles.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Besoin d'aide ?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300">
                  <Phone size={28} className="text-ircc-blue mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Téléphone</h3>
                  <p className="text-gray-600">+1 (514) 123-4567</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300">
                  <Mail size={28} className="text-ircc-blue mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">contact@irccstatut.ca</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300">
                  <MessageSquare size={28} className="text-ircc-blue mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-gray-600">+1 (514) 123-4567</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <a href="mailto:contact@irccstatut.ca">
                  <Button className="bg-ircc-blue hover:bg-ircc-dark-blue">
                    Nous contacter
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#26374A] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">IRCC Statut</h3>
              <p className="text-gray-300">
                Votre plateforme de suivi des dossiers d'immigration canadienne
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Liens rapides</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/portal" className="text-gray-300 hover:text-white transition-colors">Suivi du dossier</Link></li>
                <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Informations légales</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mentions légales</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Conditions d'utilisation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 IRCC Statut. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
