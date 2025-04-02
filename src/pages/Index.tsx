import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import BackgroundSlideshow from '@/components/animations/BackgroundSlideshow';
import CounterAnimation from '@/components/animations/CounterAnimation';
import CanadaAdvantages from '@/components/home/CanadaAdvantages';
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
import { NotificationCarousel } from '@/components/notifications/NotificationCarousel';

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

  // Images d'arrière-plan dynamiques
  const backgroundImages = [
    '/lovable-uploads/558584bc-ea53-41a4-af28-c62cd053ac50.png',
    '/lovable-uploads/2c6012c5-1aeb-427c-9537-6464053f3b55.png',
    '/lovable-uploads/6741185c-18b1-4058-a6ab-670479ba19e7.png',
    '/lovable-uploads/8723bfa1-a246-4a52-a6aa-e6917ee1059f.png',
    '/lovable-uploads/a7798152-6004-45cd-82ac-015273e182fb.png',
  ];
  
  // Récupérer les informations sur les visas
  const visasCounterValue = getStatValue('visas_counter');
  const visasCount = visasCounterValue ? visasCounterValue.value : 5000;
  const visasText = visasCounterValue ? 
    (language === 'fr' ? visasCounterValue.text_fr : visasCounterValue.text_en) : 
    (language === 'fr' ? 'visas délivrés' : 'visas issued');
  
  // Récupérer les informations de contact
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
      {/* Carrousel d'arrière-plan */}
      <BackgroundSlideshow images={backgroundImages} interval={7000} blur={true} />
      
      {/* Header */}
      <IRCCHeader />
      
      {/* Hero Section */}
      <section className="relative py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full md:w-3/5 space-y-6 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white">
                {language === 'fr' ? 'Suivez votre dossier d\'immigration canadienne' : 'Track your Canadian immigration file'}
              </h1>
              <p className="text-lg md:text-xl text-white">
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
                  {language === 'fr' ? 'Accéder' : 'Access'}
                  <ChevronRight size={18} className="ml-1" />
                </Button>
              </form>
              
              {/* Compteur de visas */}
              <div className="mt-6 bg-white bg-opacity-90 p-6 rounded-lg shadow-md border border-red-100 max-w-md mx-auto">
                <CounterAnimation 
                  startValue={450}
                  endValue={visasCount}
                  duration={3000}
                  suffix={` ${visasText}`}
                  className="text-2xl md:text-3xl text-red-600 font-bold"
                  formatNumber={true}
                />
                <p className="text-center text-gray-700 mt-2">
                  {language === 'fr' 
                    ? 'Nous aidons des milliers de candidats chaque année à réaliser leur rêve canadien'
                    : 'We help thousands of candidates each year achieve their Canadian dream'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Notification Carousel Section */}
      <section className="py-6 bg-white bg-opacity-95 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
            {language === 'fr' ? 'Dernières mises à jour sur les visas' : 'Latest Visa Updates'}
          </h2>
          <NotificationCarousel />
        </div>
      </section>

      {/* Avantages d'immigrer au Canada */}
      <CanadaAdvantages />
      
      {/* Presentation Section */}
      <section className="py-10 bg-white bg-opacity-95">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {language === 'fr' ? 'Une plateforme intuitive et sécurisée' : 'An intuitive and secure platform'}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Notre plateforme vous offre un suivi complet et transparent de votre demande d\'immigration.'
                : 'Our platform offers you complete and transparent monitoring of your immigration application.'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-red-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 border border-red-100">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('quick_consultation')}</h3>
              <p className="text-gray-600">
                {t('quick_consultation_desc')}
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 border border-red-100">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('secure_access')}</h3>
              <p className="text-gray-600">
                {t('secure_access_desc')}
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 border border-red-100">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('personalized_tracking')}</h3>
              <p className="text-gray-600">
                {t('personalized_tracking_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Steps */}
      <section className="py-10 bg-gray-50 bg-opacity-95">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{t('how_it_works')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('how_it_works_subtitle')}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex-1 max-w-xs border-t-4 border-red-600">
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">{t('enter_id')}</h3>
              <p className="text-gray-600">{t('enter_id_desc')}</p>
            </div>
            
            <div className="hidden md:block">
              <ArrowRight className="text-red-600" size={40} />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex-1 max-w-xs border-t-4 border-red-600">
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">{t('view_file')}</h3>
              <p className="text-gray-600">{t('view_file_desc')}</p>
            </div>
            
            <div className="hidden md:block">
              <ArrowRight className="text-red-600" size={40} />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex-1 max-w-xs border-t-4 border-red-600">
              <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">{t('follow_updates')}</h3>
              <p className="text-gray-600">{t('follow_updates_desc')}</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Témoignages */}
      <section className="py-10 bg-white bg-opacity-95">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{t('testimonials_title')}</h2>
            <div className="flex items-center justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
              ))}
              <span className="ml-2 text-lg font-medium">4.8/5</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-100 hover:shadow-lg transition-duration-300">
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/e83d4090-759f-4383-a50e-0935b0dff46f.png" alt="Candidate guinéenne" className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-red-200" />
                <div>
                  <h4 className="font-semibold">Fanta Camara</h4>
                  <p className="text-sm text-gray-600">Visa de travail | Guinée</p>
                </div>
              </div>
              <p className="text-gray-700">
                "En tant que professionnelle guinéenne, j'ai pu suivre facilement l'évolution de ma demande de visa de travail pour le Canada. Le service est transparent et m'a permis de préparer sereinement mon départ. Vivement recommandé!"
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-100 hover:shadow-lg transition-duration-300">
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/e6ba2df5-51d5-4e44-8310-c09f211ddd38.png" alt="Candidates ivoiriennes" className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-red-200" />
                <div>
                  <h4 className="font-semibold">Marie Kouamé</h4>
                  <p className="text-sm text-gray-600">Résidence permanente | Côte d'Ivoire</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Notre demande de résidence permanente depuis la Côte d'Ivoire était complexe, mais grâce à cette plateforme, nous avons pu suivre chaque étape et soumettre tous nos documents à temps. Un service indispensable pour notre famille!"
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-100 hover:shadow-lg transition-duration-300">
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/11a52f19-da3d-40d6-8a0e-e964633eac3a.png" alt="Candidat camerounais" className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-red-200" />
                <div>
                  <h4 className="font-semibold">Paul Mbarga</h4>
                  <p className="text-sm text-gray-600">Regroupement familial | Cameroun</p>
                </div>
              </div>
              <p className="text-gray-700">
                "En tant que Camerounais vivant au Canada, j'ai utilisé ce service pour suivre la procédure de regroupement familial. L'interface est intuitive et les notifications m'ont aidé à comprendre où en était mon dossier à chaque instant."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section id="faq" className="py-10 bg-gray-50 bg-opacity-95">
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
      <section id="contact" className="py-10 bg-white bg-opacity-95">
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
                <div className="bg-red-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300 border border-red-100">
                  <Phone size={28} className="text-red-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{t('phone')}</h3>
                  <p className="text-gray-600">{phone}</p>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300 border border-red-100">
                  <Mail size={28} className="text-red-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">{t('email')}</h3>
                  <p className="text-gray-600">{email}</p>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg text-center hover:shadow-md transition-all duration-300 border border-red-100">
                  <MessageSquare size={28} className="text-red-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">WhatsApp</h3>
                  <p className="text-gray-600">{whatsapp}</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
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
      
      {/* Footer */}
      <footer className="bg-red-700 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">IRCC Statut</h3>
              <p className="text-gray-100">
                {language === 'fr' 
                  ? 'Votre plateforme de suivi des dossiers d\'immigration canadienne' 
                  : 'Your Canadian immigration file tracking platform'}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">{t('quick_links')}</h4>
              <ul className="space-y-2">
                <li><Link to="/index" className="text-gray-100 hover:text-white transition-colors">{t('home')}</Link></li>
                <li><Link to="/portal" className="text-gray-100 hover:text-white transition-colors">{t('track_application')}</Link></li>
                <li><a href="#faq" className="text-gray-100 hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#contact" className="text-gray-100 hover:text-white transition-colors">{t('contact')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">{t('legal_info')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-100 hover:text-white transition-colors">{t('legal_notice')}</a></li>
                <li><a href="#" className="text-gray-100 hover:text-white transition-colors">{t('privacy_policy')}</a></li>
                <li><a href="#" className="text-gray-100 hover:text-white transition-colors">{t('terms_of_use')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">{t('follow_us')}</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-100 hover:text-white transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gray-100 hover:text-white transition-colors">
                  <Twitter size={24} />
                </a>
                <a href="#" className="text-gray-100 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-red-600 mt-8 pt-8 text-center text-gray-100">
            <p>© 2024 IRCC Statut. {t('all_rights_reserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
