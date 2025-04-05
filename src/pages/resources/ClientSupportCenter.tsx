
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { MessageSquare, Mail, Phone, HelpCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ClientSupportCenter = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-red-700 text-white py-10 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'fr' ? 'Centre de soutien à la clientèle' : 'Client Support Center'}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl">
              {language === 'fr' 
                ? 'Nous sommes là pour vous aider avec toutes vos questions concernant l\'immigration au Canada.' 
                : 'We\'re here to help you with all your questions about immigrating to Canada.'}
            </p>
          </div>
        </div>
        
        {/* Support Options Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
                {language === 'fr' ? 'Comment pouvons-nous vous aider ?' : 'How Can We Help You?'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all text-center">
                  <div className="rounded-full bg-red-50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'fr' ? 'Assistance téléphonique' : 'Phone Support'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'fr' 
                      ? 'Appelez notre centre d\'appels pour une assistance immédiate.' 
                      : 'Call our contact center for immediate assistance.'}
                  </p>
                  <p className="font-medium text-red-700">1-888-242-2100</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {language === 'fr' 
                      ? 'Lun-Ven: 8h-16h (heure locale)' 
                      : 'Mon-Fri: 8am-4pm (local time)'}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all text-center">
                  <div className="rounded-full bg-red-50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'fr' ? 'Nous écrire' : 'Email Us'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'fr' 
                      ? 'Envoyez-nous un email et nous vous répondrons dans les 48 heures.' 
                      : 'Send us an email and we\'ll respond within 48 hours.'}
                  </p>
                  <p className="font-medium text-red-700">support@ircc.ca</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {language === 'fr' 
                      ? 'Temps de réponse moyen: 1-2 jours ouvrables' 
                      : 'Average response time: 1-2 business days'}
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all text-center">
                  <div className="rounded-full bg-red-50 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {language === 'fr' ? 'Chat en direct' : 'Live Chat'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'fr' 
                      ? 'Discutez avec un de nos agents en direct pour une aide immédiate.' 
                      : 'Chat with one of our agents live for immediate help.'}
                  </p>
                  <Button className="bg-red-700 hover:bg-red-800">
                    {language === 'fr' ? 'Démarrer le chat' : 'Start Chat'}
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    {language === 'fr' 
                      ? 'Disponible: Lun-Ven, 9h-17h (EDT)' 
                      : 'Available: Mon-Fri, 9am-5pm (EDT)'}
                  </p>
                </div>
              </div>
              
              {/* Form and FAQ Tabs */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <Tabs defaultValue="contact" className="w-full">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="contact" className="py-4">
                      {language === 'fr' ? 'Formulaire de contact' : 'Contact Form'}
                    </TabsTrigger>
                    <TabsTrigger value="faq" className="py-4">
                      {language === 'fr' ? 'Questions fréquentes' : 'FAQ'}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="contact" className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'fr' ? 'Envoyez-nous un message' : 'Send Us a Message'}
                    </h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'fr' ? 'Nom complet' : 'Full Name'}
                          </label>
                          <Input id="name" placeholder={language === 'fr' ? 'Votre nom' : 'Your name'} />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'fr' ? 'Email' : 'Email'}
                          </label>
                          <Input id="email" type="email" placeholder={language === 'fr' ? 'Votre email' : 'Your email'} />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'fr' ? 'Sujet' : 'Subject'}
                        </label>
                        <Input id="subject" placeholder={language === 'fr' ? 'Sujet de votre message' : 'Subject of your message'} />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'fr' ? 'Message' : 'Message'}
                        </label>
                        <Textarea 
                          id="message" 
                          rows={5} 
                          placeholder={language === 'fr' ? 'Comment pouvons-nous vous aider?' : 'How can we help you?'} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-end">
                        <Button type="submit" className="bg-red-700 hover:bg-red-800">
                          <Send className="mr-2 h-4 w-4" />
                          {language === 'fr' ? 'Envoyer le message' : 'Send Message'}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="faq" className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      {language === 'fr' ? 'Questions fréquemment posées' : 'Frequently Asked Questions'}
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="text-lg font-medium text-gray-800 mb-2">
                          {language === 'fr' 
                            ? 'Comment puis-je vérifier le statut de ma demande?' 
                            : 'How can I check the status of my application?'}
                        </h4>
                        <p className="text-gray-600">
                          {language === 'fr' 
                            ? 'Vous pouvez vérifier le statut de votre demande en ligne en utilisant votre compte IRCC. Connectez-vous et suivez les instructions pour voir où en est votre demande dans le processus.' 
                            : 'You can check your application status online using your IRCC account. Log in and follow the instructions to see where your application is in the process.'}
                        </p>
                      </div>
                      
                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="text-lg font-medium text-gray-800 mb-2">
                          {language === 'fr' 
                            ? 'Combien de temps faut-il pour traiter ma demande?' 
                            : 'How long will it take to process my application?'}
                        </h4>
                        <p className="text-gray-600">
                          {language === 'fr' 
                            ? 'Les délais de traitement varient selon le type de demande et le volume actuel. Consultez notre site web pour les estimations actuelles des délais de traitement pour votre type de demande spécifique.' 
                            : 'Processing times vary depending on the type of application and current volumes. Check our website for current processing time estimates for your specific application type.'}
                        </p>
                      </div>
                      
                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="text-lg font-medium text-gray-800 mb-2">
                          {language === 'fr' 
                            ? 'Que faire si je dois mettre à jour mes informations personnelles?' 
                            : 'What if I need to update my personal information?'}
                        </h4>
                        <p className="text-gray-600">
                          {language === 'fr' 
                            ? 'Si vous devez mettre à jour vos informations personnelles, comme votre adresse ou votre numéro de téléphone, vous pouvez le faire en vous connectant à votre compte IRCC et en suivant les instructions pour mettre à jour votre profil.' 
                            : 'If you need to update your personal information, such as your address or phone number, you can do so by logging into your IRCC account and following the instructions to update your profile.'}
                        </p>
                      </div>
                      
                      <div className="border-b border-gray-200 pb-4">
                        <h4 className="text-lg font-medium text-gray-800 mb-2">
                          {language === 'fr' 
                            ? 'Comment puis-je savoir si je suis admissible à un programme d\'immigration?' 
                            : 'How can I find out if I\'m eligible for an immigration program?'}
                        </h4>
                        <p className="text-gray-600">
                          {language === 'fr' 
                            ? 'Utilisez notre outil d\'éligibilité en ligne pour déterminer si vous êtes admissible à nos programmes d\'immigration. L\'outil vous posera une série de questions et vous fournira des informations sur les programmes auxquels vous pourriez être admissible.' 
                            : 'Use our online eligibility tool to determine if you\'re eligible for our immigration programs. The tool will ask you a series of questions and provide information on which programs you may be eligible for.'}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-gray-800 mb-2">
                          {language === 'fr' 
                            ? 'Que faire si ma demande est refusée?' 
                            : 'What if my application is refused?'}
                        </h4>
                        <p className="text-gray-600">
                          {language === 'fr' 
                            ? 'Si votre demande est refusée, la lettre de refus expliquera les raisons. Dans certains cas, vous pouvez faire appel de la décision ou soumettre une nouvelle demande. Contactez-nous pour des conseils spécifiques à votre situation.' 
                            : 'If your application is refused, the refusal letter will explain the reasons. In some cases, you may be able to appeal the decision or submit a new application. Contact us for advice specific to your situation.'}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
        
        {/* Office Locations */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {language === 'fr' ? 'Nos bureaux' : 'Our Offices'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-lg mb-2">Ottawa (Siège social)</h3>
                  <p className="text-gray-600 mb-1">365 avenue Laurier Ouest</p>
                  <p className="text-gray-600 mb-1">Ottawa, ON, K1A 1L1</p>
                  <p className="text-gray-600 mb-3">Canada</p>
                  <p className="text-sm text-gray-500">
                    {language === 'fr' ? 'Heures: 8h30-16h30 Lun-Ven' : 'Hours: 8:30am-4:30pm Mon-Fri'}
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-lg mb-2">Toronto</h3>
                  <p className="text-gray-600 mb-1">5343 Dundas Street West</p>
                  <p className="text-gray-600 mb-1">Toronto, ON, M9B 6K5</p>
                  <p className="text-gray-600 mb-3">Canada</p>
                  <p className="text-sm text-gray-500">
                    {language === 'fr' ? 'Heures: 8h30-16h30 Lun-Ven' : 'Hours: 8:30am-4:30pm Mon-Fri'}
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-lg mb-2">Montréal</h3>
                  <p className="text-gray-600 mb-1">1010 rue Sainte-Catherine Ouest</p>
                  <p className="text-gray-600 mb-1">Montréal, QC, H3B 3S6</p>
                  <p className="text-gray-600 mb-3">Canada</p>
                  <p className="text-sm text-gray-500">
                    {language === 'fr' ? 'Heures: 8h30-16h30 Lun-Ven' : 'Hours: 8:30am-4:30pm Mon-Fri'}
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button className="bg-transparent border border-red-700 text-red-700 hover:bg-red-50">
                  {language === 'fr' ? 'Voir tous les bureaux' : 'View All Offices'}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional Support */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <HelpCircle className="h-12 w-12 text-red-700 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'fr' ? 'Besoin d\'aide supplémentaire?' : 'Need Additional Help?'}
              </h2>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                {language === 'fr' 
                  ? 'Si vous ne trouvez pas la réponse à votre question, n\'hésitez pas à nous contacter directement. Notre équipe de support est là pour vous aider avec vos questions et préoccupations concernant l\'immigration.' 
                  : 'If you can\'t find the answer to your question, feel free to contact us directly. Our support team is here to help you with your immigration questions and concerns.'}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-red-700 hover:bg-red-800">
                  {language === 'fr' ? 'Contacter le support' : 'Contact Support'}
                </Button>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  {language === 'fr' ? 'Consulter les guides' : 'Browse Guides'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ClientSupportCenter;
