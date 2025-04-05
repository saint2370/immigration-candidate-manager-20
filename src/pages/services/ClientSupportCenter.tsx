
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { 
  Phone, Mail, MessageSquare, HelpCircle, Send, 
  CheckCircle, Clock, User, ArrowRight, Search, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClientSupportCenter = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedForm(true);
    
    // Reset form after 3 seconds to simulate submission
    setTimeout(() => {
      setSubmittedForm(false);
      e.target.reset();
    }, 3000);
  };
  
  const faqs = [
    {
      question: language === 'fr' ? 'Comment puis-je vérifier l\'état de ma demande?' : 'How can I check the status of my application?',
      answer: language === 'fr' 
        ? 'Vous pouvez vérifier l\'état de votre demande en ligne en utilisant le service "Vérifier l\'état de votre demande" sur le site Web d\'IRCC. Vous aurez besoin de votre numéro de demande et de quelques autres informations personnelles.'
        : 'You can check your application status online using the "Check application status" service on the IRCC website. You will need your application number and some other personal information.'
    },
    {
      question: language === 'fr' ? 'Que faire si je n\'ai pas reçu de mise à jour depuis longtemps?' : 'What should I do if I haven\'t received an update for a long time?',
      answer: language === 'fr'
        ? 'Si vous n\'avez pas reçu de mise à jour et que le délai de traitement estimé pour votre type de demande est dépassé, vous pouvez contacter le Centre de soutien à la clientèle d\'IRCC par téléphone ou en remplissant le formulaire de demande de renseignements en ligne.'
        : 'If you haven\'t received an update and the estimated processing time for your application type has passed, you can contact the IRCC Client Support Center by phone or by filling out the online enquiry form.'
    },
    {
      question: language === 'fr' ? 'Comment puis-je savoir si IRCC a reçu mes documents supplémentaires?' : 'How can I know if IRCC received my additional documents?',
      answer: language === 'fr'
        ? 'Lorsque vous envoyez des documents supplémentaires à IRCC, ils sont généralement traités dans les 30 jours. Vous pouvez vérifier si les documents ont été reçus en consultant l\'état de votre demande en ligne. Si le délai est dépassé et qu\'il n\'y a pas de mise à jour, contactez le Centre de soutien à la clientèle.'
        : 'When you send additional documents to IRCC, they are typically processed within 30 days. You can check if the documents have been received by checking your application status online. If the timeframe has passed and there is no update, contact the Client Support Center.'
    },
    {
      question: language === 'fr' ? 'Comment mettre à jour mes coordonnées?' : 'How do I update my contact information?',
      answer: language === 'fr'
        ? 'Vous pouvez mettre à jour vos coordonnées (adresse, numéro de téléphone, adresse e-mail) en utilisant le portail en ligne d\'IRCC. Si vous n\'avez pas accès au portail, vous pouvez remplir le formulaire de changement d\'adresse et le soumettre selon les instructions.'
        : 'You can update your contact information (address, phone number, email) using the IRCC online portal. If you don\'t have access to the portal, you can complete the change of address form and submit it according to the instructions.'
    },
    {
      question: language === 'fr' ? 'Que faire si je trouve une erreur dans mes documents?' : 'What should I do if I find an error in my documents?',
      answer: language === 'fr'
        ? 'Si vous trouvez une erreur dans vos documents d\'immigration (permis d\'études, permis de travail, visa, etc.), contactez immédiatement le Centre de soutien à la clientèle. Il est important de faire corriger ces erreurs dès que possible pour éviter des problèmes futurs.'
        : 'If you find an error in your immigration documents (study permit, work permit, visa, etc.), contact the Client Support Center immediately. It\'s important to have these errors corrected as soon as possible to avoid future issues.'
    },
    {
      question: language === 'fr' ? 'Comment puis-je savoir si je dois fournir des données biométriques?' : 'How do I know if I need to provide biometrics?',
      answer: language === 'fr'
        ? 'La plupart des demandeurs doivent fournir des données biométriques. Vous recevrez une lettre d\'instructions si vous devez le faire. Vous pouvez également utiliser l\'outil de vérification des exigences biométriques sur le site Web d\'IRCC pour déterminer si vous devez fournir des données biométriques.'
        : 'Most applicants need to provide biometrics. You will receive an instruction letter if you need to do so. You can also use the biometrics requirement check tool on the IRCC website to determine if you need to provide biometrics.'
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-red-700 text-white py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'fr' ? 'Centre de soutien à la clientèle' : 'Client Support Center'}
              </h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                {language === 'fr' 
                  ? 'Nous sommes là pour vous aider avec vos questions et préoccupations concernant l\'immigration et les services de citoyenneté.' 
                  : 'We\'re here to help with your questions and concerns about immigration and citizenship services.'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Methods Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
              {language === 'fr' ? 'Comment nous contacter' : 'How to reach us'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <Phone size={32} className="text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {language === 'fr' ? 'Par téléphone' : 'By phone'}
                </h3>
                <p className="text-gray-600 mb-3">
                  {language === 'fr' 
                    ? 'Appelez notre centre d\'appels pour une assistance immédiate.' 
                    : 'Call our call center for immediate assistance.'}
                </p>
                <div className="bg-white p-3 rounded-md border border-gray-200 inline-block">
                  <p className="font-medium text-gray-800">+1 (514) 123-4567</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {language === 'fr' ? 'Lun-Ven: 8h-18h (heure locale)' : 'Mon-Fri: 8AM-6PM (local time)'}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <Mail size={32} className="text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {language === 'fr' ? 'Par courriel' : 'By email'}
                </h3>
                <p className="text-gray-600 mb-3">
                  {language === 'fr' 
                    ? 'Envoyez-nous un courriel et nous vous répondrons dans les 3 jours ouvrables.' 
                    : 'Send us an email and we\'ll get back to you within 3 business days.'}
                </p>
                <div className="bg-white p-3 rounded-md border border-gray-200 inline-block">
                  <p className="font-medium text-gray-800">support@irccstatut.ca</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {language === 'fr' ? 'Réponse sous 2-3 jours' : 'Response within 2-3 days'}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <MessageSquare size={32} className="text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {language === 'fr' ? 'Chat en direct' : 'Live chat'}
                </h3>
                <p className="text-gray-600 mb-3">
                  {language === 'fr' 
                    ? 'Discutez avec un agent du service clientèle pour obtenir de l\'aide immédiate.' 
                    : 'Chat with a customer service agent for immediate help.'}
                </p>
                <Button className="bg-red-700 hover:bg-red-800">
                  {language === 'fr' ? 'Démarrer le chat' : 'Start chat'}
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  {language === 'fr' ? 'Disponible 24/7' : 'Available 24/7'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Search Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
                {language === 'fr' ? 'Questions fréquemment posées' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-gray-600 text-center mb-6">
                {language === 'fr' 
                  ? 'Trouvez rapidement des réponses à vos questions sur l\'immigration et la citoyenneté.' 
                  : 'Quickly find answers to your immigration and citizenship questions.'}
              </p>
              
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  type="text"
                  placeholder={language === 'fr' ? 'Rechercher une question...' : 'Search for a question...'}
                  className="pl-10 py-6 text-base"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          <HelpCircle size={20} className="text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-2">
                      {language === 'fr' 
                        ? 'Aucun résultat trouvé pour votre recherche.' 
                        : 'No results found for your search.'}
                    </p>
                    <Button variant="outline" onClick={clearSearch} className="mt-2">
                      {language === 'fr' ? 'Effacer la recherche' : 'Clear search'}
                    </Button>
                  </div>
                )}
              </div>
              
              {filteredFaqs.length > 0 && (
                <div className="mt-8 text-center">
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                    {language === 'fr' ? 'Voir toutes les FAQ' : 'View all FAQs'}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
                {language === 'fr' ? 'Nous contacter' : 'Contact Us'}
              </h2>
              <p className="text-gray-600 text-center mb-8">
                {language === 'fr' 
                  ? 'Remplissez ce formulaire pour nous envoyer un message et nous vous répondrons dans les plus brefs délais.' 
                  : 'Fill out this form to send us a message and we\'ll get back to you as soon as possible.'}
              </p>
              
              {submittedForm ? (
                <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {language === 'fr' ? 'Message envoyé avec succès!' : 'Message successfully sent!'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'fr' 
                      ? 'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.' 
                      : 'Thank you for contacting us. We\'ll get back to you as soon as possible.'}
                  </p>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Clock size={16} className="mr-1" />
                    <span>
                      {language === 'fr' ? 'Temps de réponse typique: 1-2 jours ouvrables' : 'Typical response time: 1-2 business days'}
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Nom complet' : 'Full Name'}
                      </label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input 
                          id="full-name" 
                          type="text" 
                          placeholder={language === 'fr' ? 'Votre nom complet' : 'Your full name'} 
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Adresse courriel' : 'Email Address'}
                      </label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder={language === 'fr' ? 'votre@courriel.com' : 'your@email.com'} 
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'fr' ? 'Sujet' : 'Subject'}
                    </label>
                    <Select>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder={language === 'fr' ? 'Sélectionnez un sujet' : 'Select a subject'} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="application-status">{language === 'fr' ? 'État de la demande' : 'Application Status'}</SelectItem>
                        <SelectItem value="document-submission">{language === 'fr' ? 'Soumission de documents' : 'Document Submission'}</SelectItem>
                        <SelectItem value="biometrics">{language === 'fr' ? 'Rendez-vous biométrique' : 'Biometric Appointment'}</SelectItem>
                        <SelectItem value="technical-issues">{language === 'fr' ? 'Problèmes techniques' : 'Technical Issues'}</SelectItem>
                        <SelectItem value="other">{language === 'fr' ? 'Autre' : 'Other'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="application-number" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'fr' ? 'Numéro de demande (si applicable)' : 'Application Number (if applicable)'}
                    </label>
                    <Input 
                      id="application-number" 
                      type="text" 
                      placeholder={language === 'fr' ? 'Ex: IMM-1234567' : 'E.g., IMM-1234567'} 
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'fr' ? 'Message' : 'Message'}
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder={language === 'fr' ? 'Décrivez votre problème ou question en détail...' : 'Describe your issue or question in detail...'} 
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-red-700 hover:bg-red-800">
                      {language === 'fr' ? 'Envoyer le message' : 'Send Message'}
                      <Send size={16} className="ml-2" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
        
        {/* Service Standards Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                {language === 'fr' ? 'Nos normes de service' : 'Our Service Standards'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Phone size={20} className="text-red-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {language === 'fr' ? 'Appels téléphoniques' : 'Phone Calls'}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'fr' 
                      ? 'Nous nous efforçons de répondre à 80% des appels dans un délai de 5 minutes pendant les heures d\'ouverture.' 
                      : 'We strive to answer 80% of calls within 5 minutes during business hours.'}
                  </p>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <p className="text-xs text-gray-500">
                      {language === 'fr' ? 'Temps d\'attente actuel:' : 'Current wait time:'}
                      <span className="text-green-600 font-medium ml-1">~3 min</span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Mail size={20} className="text-red-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {language === 'fr' ? 'Courriels' : 'Emails'}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'fr' 
                      ? 'Nous répondons à tous les courriels dans un délai de 3 jours ouvrables.' 
                      : 'We respond to all emails within 3 business days.'}
                  </p>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <p className="text-xs text-gray-500">
                      {language === 'fr' ? 'Délai de réponse actuel:' : 'Current response time:'}
                      <span className="text-green-600 font-medium ml-1">1-2 {language === 'fr' ? 'jours' : 'days'}</span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center mb-3">
                    <MessageSquare size={20} className="text-red-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {language === 'fr' ? 'Chat en direct' : 'Live Chat'}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === 'fr' 
                      ? 'Notre service de chat en direct est disponible 24h/24 et 7j/7 avec un temps de réponse moyen de 2 minutes.' 
                      : 'Our live chat service is available 24/7 with an average response time of 2 minutes.'}
                  </p>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <p className="text-xs text-gray-500">
                      {language === 'fr' ? 'Statut actuel:' : 'Current status:'}
                      <span className="text-green-600 font-medium ml-1">{language === 'fr' ? 'En ligne' : 'Online'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Office Locations */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                {language === 'fr' ? 'Nos bureaux' : 'Our Offices'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {language === 'fr' ? 'Bureau principal de Montréal' : 'Montreal Main Office'}
                  </h3>
                  <address className="not-italic text-gray-600 mb-4">
                    1010 Rue Sainte-Catherine O,<br />
                    Montréal, QC H3B 1E7<br />
                    Canada
                  </address>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      {language === 'fr' ? 'Lun-Ven: 9h-17h' : 'Mon-Fri: 9AM-5PM'}
                    </span>
                    <Button variant="outline" size="sm" className="text-xs">
                      {language === 'fr' ? 'Voir sur la carte' : 'View on map'}
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {language === 'fr' ? 'Bureau de Toronto' : 'Toronto Office'}
                  </h3>
                  <address className="not-italic text-gray-600 mb-4">
                    55 Bloor Street W,<br />
                    Toronto, ON M4W 1A5<br />
                    Canada
                  </address>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      {language === 'fr' ? 'Lun-Ven: 9h-17h' : 'Mon-Fri: 9AM-5PM'}
                    </span>
                    <Button variant="outline" size="sm" className="text-xs">
                      {language === 'fr' ? 'Voir sur la carte' : 'View on map'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientSupportCenter;
