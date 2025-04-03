
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import StaticBackground from '@/components/animations/StaticBackground';
import VisaUpdatesSection from '@/components/notifications/VisaUpdatesSection';
import WhyImmigrate from '@/components/home/WhyImmigrate';
import PlatformAdvantages from '@/components/home/PlatformAdvantages';
import IntuitiveSecurePlatform from '@/components/home/IntuitiveSecurePlatform';
import ImmigrationTestimonials from '@/components/home/ImmigrationTestimonials';
import HowItWorks from '@/components/home/HowItWorks';
import { 
  ChevronRight,
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
  const { t, language } = useLanguage();
  const { 
    getSettingValue, 
    getLocalizedValue, 
    loading: settingsLoading 
  } = useSiteSettings('home');
  const { getSettingValue: getStatValue } = useSiteSettings('statistics');
  const { getSettingValue: getContactValue } = useSiteSettings('contact');

  // Image d'arrière-plan statique
  const backgroundImage = '/lovable-uploads/7f62a887-7e55-4ec9-b913-cd152c1d0706.png';
  
  // Get contact information
  const contactInfo = getContactValue('contact_info') || {};
  const phone = contactInfo.phone || '+1 (514) 123-4567';
  const email = contactInfo.email || 'contact@irccstatut.ca';
  const whatsapp = contactInfo.whatsapp || '+1 (514) 123-4567';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!immigrationId.trim()) {
      toast({
        title: language === 'fr' ? "Erreur" : "Error",
        description: t('error_missing_id'),
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to portal with the ID
    navigate(`/portal?id=${encodeURIComponent(immigrationId)}`);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Image d'arrière-plan statique */}
      <StaticBackground image={backgroundImage} />
      
      {/* Header */}
      <IRCCHeader />
      
      {/* Hero Section */}
      <section className="relative py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <div className="w-full md:w-3/5 space-y-5 text-center">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                {language === 'fr' ? 'Suivez votre dossier d\'immigration canadienne' : 'Track your Canadian immigration file'}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-white">
                {language === 'fr' 
                  ? 'Accédez facilement à votre dossier et suivez l\'évolution de votre demande de visa en temps réel.' 
                  : 'Easily access your file and track the progress of your visa application in real time.'}
              </p>
              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input 
                  placeholder={t('enter_immigration_id')} 
                  className="flex-1 border-red-200 focus:ring-red-500"
                  value={immigrationId}
                  onChange={(e) => setImmigrationId(e.target.value)}
                />
                <Button type="submit" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                  {language === 'fr' ? 'Se connecter' : 'Login'}
                  <ChevronRight size={18} className="ml-1" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section mise à jour des visas - Nouvelle version avec colonnes */}
      <VisaUpdatesSection />
      
      {/* Section Pourquoi Immigrer au Canada - Nouvelle version avec images en arrière-plan */}
      <WhyImmigrate />
      
      {/* Section Avantages de la plateforme - Version améliorée */}
      <PlatformAdvantages />
      
      {/* Section Plateforme intuitive et sécurisée - Version modernisée */}
      <IntuitiveSecurePlatform />
      
      {/* Comment ça marche - Version améliorée */}
      <HowItWorks />
      
      {/* Témoignages - Nouvelle disposition avec image en arrière-plan */}
      <ImmigrationTestimonials />
      
      {/* FAQ */}
      <section id="faq" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{t('faq_title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('faq_subtitle')}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md overflow-hidden">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-6 py-4 hover:bg-red-50">
                  {language === 'fr' ? 'Comment retrouver mon ID d\'immigration ?' : 'How can I find my immigration ID?'}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  {language === 'fr' 
                    ? 'Votre ID d\'immigration se trouve sur votre récépissé d\'immigration au niveau de la mention "ID". Il est présent sur tous les documents officiels que vous avez reçus de l\'IRCC. Il commence généralement par "IMM-" suivi d\'une série de chiffres et de lettres. Si vous ne le trouvez pas, contactez notre service client.'
                    : 'Your immigration ID can be found on your immigration receipt at the "ID" mention. It appears on all official documents you received from IRCC. It usually starts with "IMM-" followed by a series of numbers and letters. If you can\'t find it, contact our customer service.'}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-6 py-4 hover:bg-red-50">
                  {language === 'fr' ? 'Que faire si un document est manquant dans mon dossier ?' : 'What if a document is missing from my file?'}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  {language === 'fr'
                    ? 'Si vous constatez qu\'un document est manquant dans votre dossier, contactez immédiatement votre conseiller en immigration. Vous pouvez également utiliser la section Contact de notre plateforme pour signaler ce problème.'
                    : 'If you notice a document is missing from your file, contact your immigration advisor immediately. You can also use the Contact section of our platform to report this issue.'}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-6 py-4 hover:bg-red-50">
                  {language === 'fr' ? 'À quelle fréquence les informations sont-elles mises à jour ?' : 'How often is the information updated?'}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  {language === 'fr'
                    ? 'Les informations de votre dossier sont mises à jour en temps réel dès que nous recevons des nouvelles de l\'IRCC ou que votre conseiller effectue une action sur votre dossier. Vous recevrez également des notifications par email pour les mises à jour importantes.'
                    : 'Your file information is updated in real-time as soon as we receive news from IRCC or your advisor takes action on your file. You will also receive email notifications for important updates.'}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="px-6 py-4 hover:bg-red-50">
                  {language === 'fr' ? 'Comment puis-je télécharger mes documents ?' : 'How can I download my documents?'}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  {language === 'fr'
                    ? 'Une fois connecté à votre espace personnel, rendez-vous dans la section "Documents" de votre dossier. Tous vos documents disponibles y seront listés avec un bouton de téléchargement à côté de chacun d\'eux.'
                    : 'Once logged into your personal space, go to the "Documents" section of your file. All your available documents will be listed with a download button next to each of them.'}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="px-6 py-4 hover:bg-red-50">
                  {language === 'fr' ? 'Qui peut accéder à mon dossier ?' : 'Who can access my file?'}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  {language === 'fr'
                    ? 'Seules les personnes possédant votre ID d\'immigration peuvent accéder à votre dossier. Notre plateforme est sécurisée et vos informations sont protégées conformément aux lois sur la protection des données personnelles.'
                    : 'Only people with your immigration ID can access your file. Our platform is secure and your information is protected in accordance with personal data protection laws.'}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section id="contact" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{t('need_help')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('need_help_subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-red-50 p-5 rounded-lg text-center hover:shadow-md transition-all duration-300 border border-red-100">
                  <Phone size={24} className="text-red-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{t('phone')}</h3>
                  <p className="text-gray-600">{phone}</p>
                </div>
                
                <div className="bg-red-50 p-5 rounded-lg text-center hover:shadow-md transition-all duration-300 border border-red-100">
                  <Mail size={24} className="text-red-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{t('email')}</h3>
                  <p className="text-gray-600">{email}</p>
                </div>
                
                <div className="bg-red-50 p-5 rounded-lg text-center hover:shadow-md transition-all duration-300 border border-red-100">
                  <MessageSquare size={24} className="text-red-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-gray-600">{whatsapp}</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <a href={`mailto:${email}`}>
                  <Button className="bg-red-600 hover:bg-red-700">
                    {t('contact_us')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - More compact and better aligned */}
      <footer className="bg-red-700 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3">IRCC Statut Canada</h3>
              <p className="text-gray-100 text-sm md:text-base">
                {language === 'fr' 
                  ? 'Votre plateforme de suivi des dossiers d\'immigration canadienne' 
                  : 'Your Canadian immigration file tracking platform'}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">{t('quick_links')}</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li><Link to="/index" className="text-gray-100 hover:text-white transition-colors">{t('home')}</Link></li>
                <li><Link to="/portal" className="text-gray-100 hover:text-white transition-colors">{t('track_application')}</Link></li>
                <li><Link to="/nouveaux-programmes" className="text-gray-100 hover:text-white transition-colors">
                  {language === 'fr' ? 'Nouveaux Programmes 2025' : 'New 2025 Programs'}
                </Link></li>
                <li><a href="#faq" className="text-gray-100 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#contact" className="text-gray-100 hover:text-white transition-colors">{t('contact')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">{t('legal_info')}</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li><Link to="#" className="text-gray-100 hover:text-white transition-colors">{t('legal_notice')}</Link></li>
                <li><Link to="#" className="text-gray-100 hover:text-white transition-colors">{t('privacy_policy')}</Link></li>
                <li><Link to="#" className="text-gray-100 hover:text-white transition-colors">{t('terms_of_use')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 text-sm md:text-base">{t('follow_us')}</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-100 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-100 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-100 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-red-600 mt-6 pt-6 text-center text-gray-100 text-sm">
            <p>© {new Date().getFullYear()} IRCC Statut Canada. {t('all_rights_reserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
