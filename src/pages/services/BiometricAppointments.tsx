
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { Fingerprint, MapPin, Calendar, Clock, AlertCircle, CheckCircle, HelpCircle, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BiometricAppointments = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-red-700 text-white py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-3/5 mb-8 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {language === 'fr' ? 'Rendez-vous biométriques' : 'Biometric Appointments'}
                </h1>
                <p className="text-xl opacity-90 max-w-2xl">
                  {language === 'fr' 
                    ? 'Informations sur la collecte des données biométriques et la prise de rendez-vous pour les demandes d\'immigration.' 
                    : 'Information about biometric data collection and appointment booking for immigration applications.'}
                </p>
              </div>
              <div className="md:w-2/5 flex justify-center">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20 text-center max-w-md">
                  <Fingerprint size={48} className="mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold mb-2">
                    {language === 'fr' ? 'Prendre un rendez-vous' : 'Book an Appointment'}
                  </h2>
                  <p className="mb-4 text-sm opacity-80">
                    {language === 'fr' 
                      ? 'Réservez votre rendez-vous pour fournir vos données biométriques à un centre de réception des demandes de visa (CRDV).' 
                      : 'Schedule your appointment to provide your biometric data at a Visa Application Centre (VAC).'}
                  </p>
                  <Button className="w-full bg-white text-red-700 hover:bg-gray-100">
                    {language === 'fr' ? 'Réserver maintenant' : 'Book Now'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* What are Biometrics Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'fr' ? 'Qu\'est-ce que les données biométriques?' : 'What are biometrics?'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'fr' 
                  ? 'Les données biométriques sont des caractéristiques physiques uniques qui peuvent être utilisées pour vous identifier. Dans le cadre des demandes d\'immigration canadiennes, les données biométriques comprennent :' 
                  : 'Biometrics are unique physical characteristics that can be used to identify you. For Canadian immigration applications, biometrics include:'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <Fingerprint size={24} className="text-red-600 mr-3" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      {language === 'fr' ? 'Empreintes digitales' : 'Fingerprints'}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {language === 'fr' 
                      ? 'Numérisation électronique de vos dix doigts.' 
                      : 'Electronic scanning of all ten fingers.'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 flex items-center justify-center bg-red-100 rounded-full text-red-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="7"></circle>
                        <rect x="5" y="21" width="14" height="1" rx="0.5" ry="0.5"></rect>
                        <path d="M12 8v.01"></path>
                        <path d="M8 9a4 4 0 0 1 8 0"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {language === 'fr' ? 'Photo numérique' : 'Digital photo'}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {language === 'fr' 
                      ? 'Photo de votre visage prise lors de votre rendez-vous.' 
                      : 'A picture of your face taken during your appointment.'}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-3">
                    <div className="w-6 h-6 flex items-center justify-center bg-red-100 rounded-full text-red-600 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="M7 15h0"></path>
                        <path d="M2 10h20"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {language === 'fr' ? 'Signature numérique' : 'Digital signature'}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {language === 'fr' 
                      ? 'Pour certains types de demandes.' 
                      : 'For certain types of applications.'}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">
                {language === 'fr' 
                  ? 'Ces données sont stockées en toute sécurité par le gouvernement du Canada et utilisées pour :' 
                  : 'This information is securely stored by the Government of Canada and used to:'}
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' 
                      ? 'Vérifier votre identité lors du traitement de votre demande' 
                      : 'Verify your identity when processing your application'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' 
                      ? 'Faciliter les voyages futurs vers le Canada si votre demande est approuvée' 
                      : 'Facilitate future travel to Canada if your application is approved'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' 
                      ? 'Confirmer que vous êtes la même personne qui a été approuvée pour venir au Canada' 
                      : 'Confirm you are the same person who was approved to come to Canada'}
                  </span>
                </li>
              </ul>
              
              <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <AlertCircle size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      {language === 'fr' ? 'Important à savoir' : 'Important to know'}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {language === 'fr' 
                        ? 'Vos données biométriques sont valides pendant 10 ans. Si vous avez déjà fourni des données biométriques pour une demande précédente et qu\'elles sont toujours valides, vous n\'aurez peut-être pas besoin de les fournir à nouveau.' 
                        : 'Your biometrics are valid for 10 years. If you have already provided biometrics for a previous application and they are still valid, you may not need to provide them again.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Who Needs Biometrics Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'fr' ? 'Qui a besoin de fournir des données biométriques?' : 'Who needs to provide biometrics?'}
              </h2>
              
              <p className="text-gray-600 mb-6">
                {language === 'fr' 
                  ? 'La plupart des demandeurs doivent fournir des données biométriques, notamment les personnes qui font une demande de :' 
                  : 'Most applicants need to provide biometrics, including people applying for:'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">
                      {language === 'fr' ? 'Visa de visiteur' : 'Visitor visa'}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">
                      {language === 'fr' ? 'Permis d\'études' : 'Study permit'}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">
                      {language === 'fr' ? 'Permis de travail' : 'Work permit'}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">
                      {language === 'fr' ? 'Résidence permanente' : 'Permanent residence'}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">
                      {language === 'fr' ? 'Statut de réfugié ou d\'asile' : 'Refugee or asylum status'}
                    </span>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">
                      {language === 'fr' ? 'Prolongation de séjour au Canada' : 'Extension of stay in Canada'}
                    </span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {language === 'fr' ? 'Exemptions' : 'Exemptions'}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {language === 'fr' 
                  ? 'Certaines personnes sont exemptées de fournir des données biométriques :' 
                  : 'Some people are exempt from providing biometrics:'}
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' 
                      ? 'Citoyens américains' 
                      : 'U.S. citizens'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' 
                      ? 'Enfants de moins de 14 ans' 
                      : 'Children under 14 years old'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' 
                      ? 'Demandeurs âgés de plus de 79 ans' 
                      : 'Applicants over 79 years old'}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'fr' 
                      ? 'Personnes qui ont déjà fourni des données biométriques pour une demande antérieure et qui sont encore valides' 
                      : 'People who have already provided biometrics for a previous application and they are still valid'}
                  </span>
                </li>
              </ul>
              
              <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-100">
                <div className="flex items-start">
                  <div className="mr-3 mt-0.5">
                    <HelpCircle size={20} className="text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      {language === 'fr' ? 'Vous ne savez pas si vous avez besoin de fournir des données biométriques?' : 'Not sure if you need to provide biometrics?'}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {language === 'fr' 
                        ? 'Utilisez l\'outil de vérification d\'IRCC pour déterminer si vous devez fournir des données biométriques.' 
                        : 'Use the IRCC check tool to determine if you need to provide biometrics.'}
                    </p>
                    <Button variant="outline" className="text-sm border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                      {language === 'fr' ? 'Vérifier mon admissibilité' : 'Check my eligibility'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Booking Process Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'fr' ? 'Processus de prise de rendez-vous' : 'Appointment Booking Process'}
              </h2>
              
              <div className="mb-8">
                <ol className="relative border-l border-gray-200 ml-3 pl-6 space-y-10">
                  <li className="mb-10">
                    <div className="absolute w-10 h-10 bg-red-100 rounded-full -left-5 flex items-center justify-center border border-white">
                      <span className="text-red-600 font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === 'fr' ? 'Soumettez votre demande' : 'Submit your application'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {language === 'fr' 
                        ? 'Après avoir soumis votre demande, vous recevrez une lettre d\'instructions pour fournir vos données biométriques.' 
                        : 'After submitting your application, you will receive an instruction letter to provide your biometrics.'}
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-600 text-sm">
                        {language === 'fr' 
                          ? 'La lettre d\'instructions contiendra :' 
                          : 'The instruction letter will include:'}
                      </p>
                      <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc pl-5">
                        <li>{language === 'fr' ? 'Un numéro de référence unique' : 'A unique reference number'}</li>
                        <li>{language === 'fr' ? 'Une liste des centres de collecte près de chez vous' : 'A list of collection centers near you'}</li>
                        <li>{language === 'fr' ? 'Les frais à payer' : 'The fees to pay'}</li>
                        <li>{language === 'fr' ? 'Le délai pour fournir vos biométriques' : 'The deadline to provide your biometrics'}</li>
                      </ul>
                    </div>
                  </li>
                  <li className="mb-10">
                    <div className="absolute w-10 h-10 bg-red-100 rounded-full -left-5 flex items-center justify-center border border-white">
                      <span className="text-red-600 font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === 'fr' ? 'Payez les frais biométriques' : 'Pay the biometric fee'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {language === 'fr' 
                        ? 'Vous devez payer les frais biométriques avant de prendre un rendez-vous.' 
                        : 'You must pay the biometric fee before booking an appointment.'}
                    </p>
                    <div className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <DollarSign size={20} className="text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700 font-medium">
                          {language === 'fr' ? 'Frais biométriques :' : 'Biometric fee:'}
                        </p>
                        <ul className="mt-1 space-y-1 text-sm text-gray-600">
                          <li>{language === 'fr' ? '85 $ CAD par personne' : 'CAD $85 per person'}</li>
                          <li>{language === 'fr' ? '170 $ CAD maximum par famille' : 'CAD $170 maximum per family'}</li>
                          <li>{language === 'fr' ? '170 $ CAD maximum pour les groupes de 3 artistes interprètes ou plus voyageant ensemble' : 'CAD $170 maximum for groups of 3 or more performing artists traveling together'}</li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="mb-10">
                    <div className="absolute w-10 h-10 bg-red-100 rounded-full -left-5 flex items-center justify-center border border-white">
                      <span className="text-red-600 font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === 'fr' ? 'Trouvez un centre de collecte' : 'Find a collection location'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {language === 'fr' 
                        ? 'Localisez un centre de réception des demandes de visa (CRDV) ou un centre de soutien à la demande (CSA) près de chez vous.' 
                        : 'Locate a Visa Application Centre (VAC) or Application Support Center (ASC) near you.'}
                    </p>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
                      <div className="p-4 border-b border-gray-200">
                        <h4 className="font-medium text-gray-800">
                          {language === 'fr' ? 'Rechercher un centre' : 'Find a center'}
                        </h4>
                      </div>
                      <div className="p-4">
                        <div className="mb-4">
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'fr' ? 'Pays' : 'Country'}
                          </label>
                          <select id="country" className="w-full p-2 border border-gray-300 rounded-md">
                            <option>{language === 'fr' ? 'Sélectionnez un pays' : 'Select a country'}</option>
                            <option value="canada">Canada</option>
                            <option value="france">France</option>
                            <option value="usa">États-Unis / United States</option>
                            <option value="uk">Royaume-Uni / United Kingdom</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            {language === 'fr' ? 'Ville' : 'City'}
                          </label>
                          <Input id="city" placeholder={language === 'fr' ? 'Entrez une ville' : 'Enter a city'} />
                        </div>
                        <Button className="w-full bg-red-700 hover:bg-red-800">
                          {language === 'fr' ? 'Rechercher' : 'Search'}
                        </Button>
                      </div>
                    </div>
                  </li>
                  <li className="mb-10">
                    <div className="absolute w-10 h-10 bg-red-100 rounded-full -left-5 flex items-center justify-center border border-white">
                      <span className="text-red-600 font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === 'fr' ? 'Prenez un rendez-vous' : 'Book your appointment'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {language === 'fr' 
                        ? 'Contactez le centre de votre choix pour prendre un rendez-vous. La plupart des centres offrent la possibilité de réserver en ligne.' 
                        : 'Contact your chosen center to book an appointment. Most centers offer online booking options.'}
                    </p>
                    <div className="flex flex-col space-y-3">
                      <Button className="bg-red-700 hover:bg-red-800">
                        {language === 'fr' ? 'Réserver en ligne' : 'Book online'}
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                        {language === 'fr' ? 'Appeler un centre' : 'Call a center'}
                      </Button>
                    </div>
                  </li>
                  <li>
                    <div className="absolute w-10 h-10 bg-red-100 rounded-full -left-5 flex items-center justify-center border border-white">
                      <span className="text-red-600 font-bold">5</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === 'fr' ? 'Assistez à votre rendez-vous' : 'Attend your appointment'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {language === 'fr' 
                        ? 'Le jour de votre rendez-vous, apportez votre lettre d\'instructions et votre passeport valide.' 
                        : 'On the day of your appointment, bring your instruction letter and valid passport.'}
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-gray-800 mb-2">
                        {language === 'fr' ? 'Que se passe-t-il lors du rendez-vous?' : 'What happens at the appointment?'}
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5">
                            <Fingerprint size={16} className="text-red-600" />
                          </div>
                          <span>{language === 'fr' ? 'On prendra vos empreintes digitales électroniquement.' : 'Your fingerprints will be taken electronically.'}</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                              <circle cx="12" cy="12" r="10"></circle>
                              <circle cx="12" cy="10" r="3"></circle>
                              <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path>
                            </svg>
                          </div>
                          <span>{language === 'fr' ? 'On prendra votre photo numérique.' : 'Your digital photo will be taken.'}</span>
                        </li>
                        <li className="flex items-start">
                          <div className="mr-2 mt-0.5">
                            <Clock size={16} className="text-red-600" />
                          </div>
                          <span>{language === 'fr' ? 'Le processus prend généralement de 15 à 30 minutes.' : 'The process typically takes 15 to 30 minutes.'}</span>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {language === 'fr' ? 'Questions fréquemment posées' : 'Frequently Asked Questions'}
              </h2>
              
              <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm overflow-hidden">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    {language === 'fr' 
                      ? 'Que dois-je apporter à mon rendez-vous biométrique?' 
                      : 'What should I bring to my biometric appointment?'}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {language === 'fr' 
                      ? 'Vous devez apporter votre lettre d\'instructions biométriques, une preuve de paiement des frais biométriques, votre passeport valide ou autre document de voyage, et toute autre pièce d\'identité mentionnée dans votre lettre d\'instructions.' 
                      : 'You need to bring your biometric instruction letter, proof of payment of the biometric fee, your valid passport or other travel document, and any other identification mentioned in your instruction letter.'}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    {language === 'fr' 
                      ? 'Combien de temps mes données biométriques sont-elles valides?' 
                      : 'How long are my biometrics valid?'}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {language === 'fr' 
                      ? 'Vos données biométriques sont valides pendant 10 ans à compter de la date à laquelle vous les avez fournies. Si vous avez déjà fourni des données biométriques pour une demande d\'immigration précédente et qu\'elles sont toujours valides, vous n\'aurez généralement pas besoin de les fournir à nouveau pour une nouvelle demande.' 
                      : 'Your biometrics are valid for 10 years from the date you provided them. If you have already provided biometrics for a previous immigration application and they are still valid, you generally won\'t need to provide them again for a new application.'}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    {language === 'fr' 
                      ? 'Que se passe-t-il si je ne peux pas fournir mes données biométriques?' 
                      : 'What happens if I cannot provide my biometrics?'}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {language === 'fr' 
                      ? 'Si vous ne pouvez pas fournir vos données biométriques en raison d\'une incapacité physique ou médicale, vous pouvez demander une exemption. Vous devrez fournir un certificat médical ou d\'autres documents justificatifs. Si vous ne pouvez pas vous rendre dans un centre de collecte en raison de circonstances exceptionnelles (comme l\'éloignement géographique), contactez IRCC pour discuter de votre situation.' 
                      : 'If you cannot provide your biometrics due to a physical or medical condition, you can request an exemption. You will need to provide a medical certificate or other supporting documents. If you cannot travel to a collection center due to exceptional circumstances (such as geographical remoteness), contact IRCC to discuss your situation.'}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    {language === 'fr' 
                      ? 'Puis-je obtenir un remboursement des frais biométriques?' 
                      : 'Can I get a refund of the biometric fee?'}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {language === 'fr' 
                      ? 'Les frais biométriques ne sont généralement pas remboursables, même si votre demande est refusée. Cependant, si vous avez payé des frais mais que vous n\'êtes pas tenu de fournir des données biométriques (par exemple, si vous êtes exempté), vous pouvez demander un remboursement.' 
                      : 'Biometric fees are generally not refundable, even if your application is refused. However, if you paid the fee but are not required to provide biometrics (for example, if you are exempt), you can request a refund.'}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    {language === 'fr' 
                      ? 'Combien de temps faut-il pour traiter les données biométriques?' 
                      : 'How long does it take to process biometrics?'}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    {language === 'fr' 
                      ? 'Une fois que vous avez fourni vos données biométriques, elles sont généralement traitées dans un délai de 24 à 48 heures. Cependant, le traitement global de votre demande d\'immigration dépend du type de demande et des délais de traitement actuels, qui peuvent être consultés sur le site Web d\'IRCC.' 
                      : 'Once you provide your biometrics, they are typically processed within 24 to 48 hours. However, the overall processing of your immigration application depends on the type of application and current processing times, which can be checked on the IRCC website.'}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'fr' ? 'Besoin d\'aide?' : 'Need help?'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'fr' 
                  ? 'Si vous avez des questions concernant les rendez-vous biométriques ou votre demande d\'immigration, contactez-nous.' 
                  : 'If you have questions about biometric appointments or your immigration application, contact us.'}
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button className="bg-red-700 hover:bg-red-800">
                  {language === 'fr' ? 'Contacter IRCC' : 'Contact IRCC'}
                </Button>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  {language === 'fr' ? 'Consulter le centre d\'aide' : 'Visit help center'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BiometricAppointments;
