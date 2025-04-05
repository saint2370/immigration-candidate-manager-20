
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { Plane, Calendar, CreditCard, FileText, CheckCircle, Clock, AlertCircle, MapPin, HelpCircle, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const VisitorVisa = () => {
  const { language } = useLanguage();
  const [showResult, setShowResult] = useState(false);
  const [needsVisa, setNeedsVisa] = useState(true);
  
  const handleCheckEligibility = () => {
    setShowResult(true);
    // In a real app, this would check against actual rules
    // For demo purposes, we're setting a fixed result
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-red-700 text-white py-10 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/fd39e6b7-2604-4a75-9d31-0e861c44104d.png" 
              alt="Visitors to Canada" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'fr' ? 'Visa de visiteur pour le Canada' : 'Visitor Visa for Canada'}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl">
              {language === 'fr' 
                ? 'Planifiez votre visite au Canada pour le tourisme, rendre visite à la famille ou pour affaires. Découvrez si vous avez besoin d\'un visa de visiteur ou d\'une autorisation de voyage électronique (AVE).' 
                : 'Plan your visit to Canada for tourism, family visits, or business. Find out if you need a visitor visa or Electronic Travel Authorization (eTA).'}
            </p>
          </div>
        </div>
        
        {/* Quick Eligibility Checker */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-700" />
                  {language === 'fr' ? 'Vérifiez si vous avez besoin d\'un visa' : 'Check If You Need a Visa'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <Label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        {language === 'fr' ? 'Votre pays de citoyenneté' : 'Your Country of Citizenship'}
                      </Label>
                      <Input 
                        id="country" 
                        placeholder={language === 'fr' ? 'Entrez votre pays' : 'Enter your country'} 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'fr' ? 'But de votre voyage' : 'Purpose of Travel'}
                      </Label>
                      <RadioGroup defaultValue="tourism">
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="tourism" id="tourism" />
                          <Label htmlFor="tourism" className="text-gray-700">
                            {language === 'fr' ? 'Tourisme' : 'Tourism'}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value="family" id="family" />
                          <Label htmlFor="family" className="text-gray-700">
                            {language === 'fr' ? 'Visite familiale' : 'Family Visit'}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="business" id="business" />
                          <Label htmlFor="business" className="text-gray-700">
                            {language === 'fr' ? 'Affaires' : 'Business'}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button onClick={handleCheckEligibility} className="w-full bg-blue-700 hover:bg-blue-800">
                      {language === 'fr' ? 'Vérifier l\'éligibilité' : 'Check Eligibility'}
                    </Button>
                  </div>
                  
                  <div>
                    {showResult && (
                      <div className={`p-4 rounded-lg ${needsVisa ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'}`}>
                        <h3 className={`font-medium text-lg mb-2 ${needsVisa ? 'text-amber-800' : 'text-green-800'}`}>
                          {needsVisa 
                            ? (language === 'fr' ? 'Visa requis' : 'Visa Required') 
                            : (language === 'fr' ? 'AVE requise' : 'eTA Required')}
                        </h3>
                        <p className={`text-sm mb-3 ${needsVisa ? 'text-amber-800' : 'text-green-800'}`}>
                          {needsVisa 
                            ? (language === 'fr' 
                                ? 'Selon votre pays de citoyenneté, vous avez besoin d\'un visa de visiteur pour entrer au Canada.' 
                                : 'Based on your country of citizenship, you need a visitor visa to enter Canada.')
                            : (language === 'fr' 
                                ? 'Vous n\'avez pas besoin de visa, mais vous devez obtenir une Autorisation de Voyage Électronique (AVE).' 
                                : 'You don\'t need a visa, but you must obtain an Electronic Travel Authorization (eTA).')}
                        </p>
                        <Button className={`w-full ${needsVisa ? 'bg-amber-700 hover:bg-amber-800' : 'bg-green-700 hover:bg-green-800'}`}>
                          {needsVisa 
                            ? (language === 'fr' ? 'Postuler pour un visa' : 'Apply for Visa')
                            : (language === 'fr' ? 'Demander une AVE' : 'Apply for eTA')}
                        </Button>
                      </div>
                    )}
                    
                    <div className="mt-4 text-sm text-gray-600">
                      <p className="mb-2">
                        {language === 'fr' 
                          ? 'Notez que cet outil fournit une information préliminaire. Les exigences exactes peuvent varier.' 
                          : 'Note that this tool provides preliminary information. Exact requirements may vary.'}
                      </p>
                      <a href="#" className="text-blue-700 hover:underline">
                        {language === 'fr' ? 'Voir la liste complète des pays et exigences' : 'View full list of countries and requirements'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full grid grid-cols-1 md:grid-cols-4 border-b">
                    <TabsTrigger value="overview" className="py-3">
                      {language === 'fr' ? 'Aperçu' : 'Overview'}
                    </TabsTrigger>
                    <TabsTrigger value="requirements" className="py-3">
                      {language === 'fr' ? 'Conditions requises' : 'Requirements'}
                    </TabsTrigger>
                    <TabsTrigger value="apply" className="py-3">
                      {language === 'fr' ? 'Comment postuler' : 'How to Apply'}
                    </TabsTrigger>
                    <TabsTrigger value="after" className="py-3">
                      {language === 'fr' ? 'Après l\'approbation' : 'After Approval'}
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="bg-red-100 p-3 rounded-full">
                        <Plane className="h-6 w-6 text-red-700" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {language === 'fr' ? 'Visa de visiteur pour le Canada' : 'Visitor Visa for Canada'}
                      </h2>
                    </div>
                    
                    <p className="text-gray-700 mb-6">
                      {language === 'fr' 
                        ? 'Un visa de visiteur est un document officiel apposé dans votre passeport qui montre que vous remplissez les conditions requises pour entrer au Canada en tant que visiteur temporaire. La plupart des visiteurs sont autorisés à séjourner au Canada pour une période maximale de 6 mois.' 
                        : 'A visitor visa is an official document stamped in your passport that shows you meet the requirements to enter Canada as a temporary visitor. Most visitors are allowed to stay in Canada for up to 6 months.'}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">
                          {language === 'fr' ? 'Visa de visiteur' : 'Visitor Visa'}
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Requis pour les citoyens de certains pays' : 'Required for citizens of certain countries'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Peut être à entrée unique ou multiple' : 'Can be single or multiple entry'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Valable jusqu\'à 10 ans ou jusqu\'à l\'expiration du passeport' : 'Valid for up to 10 years or until passport expires'}
                            </span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">
                          {language === 'fr' ? 'Autorisation de voyage électronique (AVE)' : 'Electronic Travel Authorization (eTA)'}
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Requise pour les citoyens de pays dispensés de visa' : 'Required for citizens of visa-exempt countries'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Demande en ligne simple' : 'Simple online application'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Valable jusqu\'à 5 ans ou jusqu\'à l\'expiration du passeport' : 'Valid for up to 5 years or until passport expires'}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
                      <div className="flex items-start">
                        <Clock className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-semibold text-blue-800 mb-2">
                            {language === 'fr' ? 'Délais de traitement' : 'Processing Times'}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-blue-800 font-medium mb-1">
                                {language === 'fr' ? 'Visa de visiteur:' : 'Visitor Visa:'}
                              </p>
                              <p className="text-blue-800">
                                {language === 'fr' ? '15 à 45 jours en moyenne' : '15 to 45 days on average'}
                              </p>
                            </div>
                            <div>
                              <p className="text-blue-800 font-medium mb-1">
                                {language === 'fr' ? 'AVE:' : 'eTA:'}
                              </p>
                              <p className="text-blue-800">
                                {language === 'fr' ? 'Quelques minutes à 72 heures' : 'Few minutes to 72 hours'}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-blue-700 mt-2">
                            {language === 'fr' ? 'Les délais de traitement peuvent varier selon le volume des demandes.' : 'Processing times may vary depending on application volumes.'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="bg-red-700 hover:bg-red-800">
                        {language === 'fr' ? 'Postuler pour un visa' : 'Apply for Visa'}
                      </Button>
                      <Button className="bg-red-700 hover:bg-red-800">
                        {language === 'fr' ? 'Demander une AVE' : 'Apply for eTA'}
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                        {language === 'fr' ? 'Vérifier l\'admissibilité' : 'Check Eligibility'}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Requirements Tab */}
                  <TabsContent value="requirements" className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {language === 'fr' ? 'Conditions requises pour un visa de visiteur' : 'Requirements for a Visitor Visa'}
                    </h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          {language === 'fr' ? 'Documents de base requis' : 'Basic Documents Required'}
                        </h3>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="divide-y divide-gray-200">
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <FileText className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Formulaire de demande' : 'Application Form'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Formulaire de demande de visa de visiteur (IMM 5257) dûment rempli et signé.' 
                                  : 'Visitor visa application form (IMM 5257) properly completed and signed.'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <FileText className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Passeport valide' : 'Valid Passport'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Un passeport valide avec au moins deux pages vierges, valable au moins 6 mois au-delà de votre date de retour prévue.' 
                                  : 'A valid passport with at least two blank pages, valid for at least 6 months beyond your expected return date.'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <FileText className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Photos' : 'Photos'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Deux (2) photos récentes au format passeport (prises dans les derniers 6 mois).' 
                                  : 'Two (2) recent passport-sized photos (taken within the last 6 months).'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <FileText className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Preuve de moyens financiers' : 'Proof of Financial Support'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Documents montrant que vous avez suffisamment d\'argent pour votre séjour au Canada (relevés bancaires, relevés de carte de crédit, etc.).' 
                                  : 'Documents showing you have enough money for your stay in Canada (bank statements, credit card statements, etc.).'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <FileText className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Preuve de liens avec votre pays d\'origine' : 'Proof of Ties to Your Home Country'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Documents prouvant que vous avez des raisons de retourner dans votre pays d\'origine (emploi, propriété, famille, etc.).' 
                                  : 'Documents proving you have reasons to return to your home country (employment, property, family, etc.).'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <FileText className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Itinéraire de voyage' : 'Travel Itinerary'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Détails de votre voyage, y compris les réservations de vol et d\'hébergement.' 
                                  : 'Details of your travel plans, including flight and accommodation bookings.'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <FileText className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Lettre d\'invitation (si applicable)' : 'Letter of Invitation (if applicable)'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Si vous visitez un ami ou un membre de votre famille, une lettre d\'invitation de cette personne peut être requise.' 
                                  : 'If you are visiting a friend or family member, a letter of invitation from that person may be required.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                        <div className="flex items-start">
                          <AlertCircle className="h-6 w-6 text-amber-700 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-lg font-semibold text-amber-800 mb-2">
                              {language === 'fr' ? 'Documents supplémentaires' : 'Additional Documents'}
                            </h3>
                            <p className="text-amber-800 mb-2">
                              {language === 'fr' 
                                ? 'Selon votre situation, vous pourriez avoir besoin de fournir d\'autres documents:' 
                                : 'Depending on your situation, you might need to provide other documents:'}
                            </p>
                            <ul className="list-disc list-inside text-amber-800 space-y-1">
                              <li>
                                {language === 'fr' 
                                  ? 'Certificat de police (pour les séjours prolongés)' 
                                  : 'Police certificate (for extended stays)'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Examen médical (pour certains pays ou séjours prolongés)' 
                                  : 'Medical exam (for certain countries or extended stays)'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Lettre d\'employeur ou preuve d\'études' 
                                  : 'Letter from employer or proof of studies'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Preuve d\'assurance voyage' 
                                  : 'Proof of travel insurance'}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          {language === 'fr' ? 'Conditions d\'admissibilité' : 'Eligibility Conditions'}
                        </h3>
                        <p className="text-gray-700 mb-4">
                          {language === 'fr' 
                            ? 'Pour obtenir un visa de visiteur, vous devez:' 
                            : 'To be granted a visitor visa, you must:'}
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' 
                                ? 'Convaincre un agent d\'immigration que vous quitterez le Canada à la fin de votre séjour' 
                                : 'Convince an immigration officer that you will leave Canada at the end of your stay'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' 
                                ? 'Prouver que vous avez suffisamment d\'argent pour votre séjour' 
                                : 'Prove you have enough money for your stay'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' 
                                ? 'Ne pas avoir d\'antécédents criminels et ne pas constituer un risque pour la sécurité' 
                                : 'Have no criminal record and not be a security risk'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' 
                                ? 'Être en bonne santé (un examen médical peut être requis)' 
                                : 'Be in good health (a medical exam may be required)'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' 
                                ? 'Ne pas prévoir travailler ou étudier au Canada sans autorisation' 
                                : 'Not plan to work or study in Canada without authorization'}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button className="bg-red-700 hover:bg-red-800">
                        {language === 'fr' ? 'Télécharger la liste de contrôle des documents' : 'Download Document Checklist'}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* How to Apply Tab */}
                  <TabsContent value="apply" className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {language === 'fr' ? 'Comment faire une demande de visa de visiteur' : 'How to Apply for a Visitor Visa'}
                    </h2>
                    
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">1</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Vérifiez si vous avez besoin d\'un visa' : 'Check if You Need a Visa'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Utilisez l\'outil d\'éligibilité en haut de la page pour déterminer si vous avez besoin d\'un visa de visiteur ou d\'une AVE pour entrer au Canada.' 
                              : 'Use the eligibility tool at the top of the page to determine if you need a visitor visa or an eTA to enter Canada.'}
                          </p>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Vérifier l\'admissibilité' : 'Check Eligibility'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">2</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Rassemblez les documents requis' : 'Gather Required Documents'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Préparez tous les documents nécessaires pour votre demande, tels que passeport, photos, preuve de moyens financiers et autres documents justificatifs.' 
                              : 'Prepare all the necessary documents for your application, such as passport, photos, proof of financial means, and other supporting documents.'}
                          </p>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Liste de documents' : 'Document Checklist'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">3</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Créez un compte en ligne' : 'Create an Online Account'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Créez un compte sur le portail IRCC pour faire votre demande en ligne. Si vous ne pouvez pas postuler en ligne, vous pouvez utiliser une demande papier.' 
                              : 'Create an account on the IRCC portal to make your application online. If you cannot apply online, you can use a paper application.'}
                          </p>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Créer un compte' : 'Create Account'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">4</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Remplissez le formulaire de demande' : 'Complete the Application Form'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Remplissez soigneusement tous les champs du formulaire de demande. Assurez-vous que toutes les informations sont exactes et complètes.' 
                              : 'Fill out all fields in the application form carefully. Make sure all information is accurate and complete.'}
                          </p>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Guide du formulaire' : 'Form Guide'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">5</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Payez les frais de demande' : 'Pay the Application Fee'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Payez les frais requis en ligne par carte de crédit. Pour un visa de visiteur, les frais sont généralement de 100 CAD par personne.' 
                              : 'Pay the required fees online by credit card. For a visitor visa, the fee is typically CAD $100 per person.'}
                          </p>
                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <CreditCard className="h-4 w-4 mr-1 text-gray-500" />
                            <span>
                              {language === 'fr' ? 'Visa, MasterCard, American Express, UnionPay' : 'Visa, MasterCard, American Express, UnionPay'}
                            </span>
                          </div>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Détails des frais' : 'Fee Details'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">6</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Soumettez votre demande' : 'Submit Your Application'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Téléchargez tous vos documents et soumettez votre demande. Conservez les numéros de référence et de confirmation pour le suivi.' 
                              : 'Upload all your documents and submit your application. Keep the reference and confirmation numbers for tracking.'}
                          </p>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Instructions de soumission' : 'Submission Instructions'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">7</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Fournissez vos données biométriques (si requis)' : 'Provide Biometrics (if required)'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Si vous devez fournir vos données biométriques (empreintes digitales et photo), vous recevrez une lettre d\'instruction. Vous devrez vous rendre à un centre de collecte des données biométriques.' 
                              : 'If you need to provide biometrics (fingerprints and photo), you will receive an instruction letter. You will need to go to a biometrics collection center.'}
                          </p>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Centres biométriques' : 'Biometric Centers'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">8</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Suivez votre demande' : 'Track Your Application'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Utilisez votre compte en ligne pour suivre l\'état de votre demande. Vous pourriez être contacté pour fournir des informations supplémentaires ou pour une entrevue.' 
                              : 'Use your online account to track the status of your application. You may be contacted to provide additional information or for an interview.'}
                          </p>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Vérifier le statut' : 'Check Status'}
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
                      <div className="flex items-start">
                        <HelpCircle className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-semibold text-blue-800 mb-2">
                            {language === 'fr' ? 'Besoin d\'aide?' : 'Need Help?'}
                          </h3>
                          <p className="text-blue-800 mb-4">
                            {language === 'fr' 
                              ? 'Si vous avez besoin d\'assistance pour remplir votre demande de visa de visiteur, plusieurs options s\'offrent à vous:' 
                              : 'If you need assistance with completing your visitor visa application, several options are available to you:'}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 w-full">
                              {language === 'fr' ? 'Guide étape par étape' : 'Step-by-Step Guide'}
                            </Button>
                            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 w-full">
                              {language === 'fr' ? 'Contacter le support' : 'Contact Support'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="bg-red-700 hover:bg-red-800">
                      {language === 'fr' ? 'Commencer ma demande' : 'Start My Application'}
                    </Button>
                  </TabsContent>
                  
                  {/* After Approval Tab */}
                  <TabsContent value="after" className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {language === 'fr' ? 'Après l\'approbation de votre visa' : 'After Your Visa Is Approved'}
                    </h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-red-600" />
                          {language === 'fr' ? 'Planifier votre voyage' : 'Planning Your Trip'}
                        </h3>
                        
                        <p className="text-gray-700 mb-4">
                          {language === 'fr' 
                            ? 'Une fois que votre visa de visiteur est approuvé, vous pouvez planifier votre voyage au Canada. Voici quelques points importants à considérer:' 
                            : 'Once your visitor visa is approved, you can plan your trip to Canada. Here are some important points to consider:'}
                        </p>
                        
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="divide-y divide-gray-200">
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Validité de votre visa' : 'Validity of Your Visa'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Vérifiez les dates de validité de votre visa et planifiez votre voyage en conséquence. Votre visa peut être à entrée unique ou à entrées multiples.' 
                                  : 'Check the validity dates of your visa and plan your trip accordingly. Your visa may be single entry or multiple entry.'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Durée de séjour autorisée' : 'Authorized Length of Stay'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Un agent des services frontaliers décidera de la durée de votre séjour à votre arrivée, généralement jusqu\'à 6 mois. Même si votre visa est valide pour plusieurs années, chaque séjour est limité.' 
                                  : 'A border services officer will decide how long you can stay when you arrive, typically up to 6 months. Even if your visa is valid for several years, each stay is limited.'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Assurance voyage' : 'Travel Insurance'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Il est fortement recommandé de souscrire une assurance voyage couvrant les soins médicaux d\'urgence pendant votre séjour au Canada.' 
                                  : 'It is highly recommended to purchase travel insurance that covers emergency medical care during your stay in Canada.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <Plane className="h-5 w-5 mr-2 text-red-600" />
                          {language === 'fr' ? 'À votre arrivée au Canada' : 'Upon Arrival in Canada'}
                        </h3>
                        
                        <p className="text-gray-700 mb-4">
                          {language === 'fr' 
                            ? 'Lorsque vous arrivez au Canada, vous devrez passer par le contrôle d\'immigration et des douanes. Voici ce à quoi vous attendre:' 
                            : 'When you arrive in Canada, you will need to go through immigration and customs control. Here\'s what to expect:'}
                        </p>
                        
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="divide-y divide-gray-200">
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <FileText className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Documents à avoir à portée de main' : 'Documents to Have Ready'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Passeport avec visa, preuve d\'hébergement, itinéraire de voyage, preuve de fonds, lettre d\'invitation (si applicable).' 
                                  : 'Passport with visa, proof of accommodation, travel itinerary, proof of funds, letter of invitation (if applicable).'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <FileText className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Déclaration à l\'agent d\'immigration' : 'Declaration to Immigration Officer'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Soyez prêt à expliquer le but de votre visite, la durée prévue de votre séjour, et à montrer que vous avez les moyens de subvenir à vos besoins.' 
                                  : 'Be prepared to explain the purpose of your visit, intended length of stay, and show that you have the means to support yourself.'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <FileText className="h-5 w-5 text-red-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Déclaration de douane' : 'Customs Declaration'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Vous devrez remplir un formulaire de déclaration de douane indiquant les articles que vous apportez au Canada.' 
                                  : 'You will need to complete a customs declaration form indicating items you are bringing into Canada.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <Map className="h-5 w-5 mr-2 text-red-600" />
                          {language === 'fr' ? 'Pendant votre séjour au Canada' : 'During Your Stay in Canada'}
                        </h3>
                        
                        <p className="text-gray-700 mb-4">
                          {language === 'fr' 
                            ? 'Voici quelques informations importantes à connaître pendant votre séjour au Canada:' 
                            : 'Here are some important things to know during your stay in Canada:'}
                        </p>
                        
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="divide-y divide-gray-200">
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Respectez les conditions de votre visa' : 'Comply with Visa Conditions'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Respectez la durée de séjour autorisée et ne travaillez pas ou n\'étudiez pas sans autorisation supplémentaire.' 
                                  : 'Respect your authorized length of stay and do not work or study without additional authorization.'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Prolongation de séjour' : 'Extending Your Stay'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Si vous souhaitez rester plus longtemps que la période autorisée, vous devez demander une prolongation au moins 30 jours avant l\'expiration de votre statut.' 
                                  : 'If you want to stay longer than your authorized period, you must apply for an extension at least 30 days before your status expires.'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Accès aux services' : 'Access to Services'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'En tant que visiteur, vous n\'avez pas accès aux services de santé publics gratuits. Une assurance voyage est essentielle.' 
                                  : 'As a visitor, you do not have access to free public health services. Travel insurance is essential.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                        <div className="flex items-start">
                          <AlertCircle className="h-6 w-6 text-amber-700 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-lg font-semibold text-amber-800 mb-2">
                              {language === 'fr' ? 'Important à savoir' : 'Important to Know'}
                            </h3>
                            <p className="text-amber-800 mb-2">
                              {language === 'fr' 
                                ? 'Gardez à l\'esprit ces points importants:' 
                                : 'Keep these important points in mind:'}
                            </p>
                            <ul className="list-disc list-inside text-amber-800 space-y-1">
                              <li>
                                {language === 'fr' 
                                  ? 'Conservez toujours votre passeport et documents d\'immigration en lieu sûr' 
                                  : 'Always keep your passport and immigration documents in a safe place'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Ayez une copie de votre assurance voyage facilement accessible' 
                                  : 'Have a copy of your travel insurance readily accessible'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Respectez toutes les lois canadiennes pendant votre séjour' 
                                  : 'Obey all Canadian laws during your stay'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Quittez le Canada avant l\'expiration de votre séjour autorisé' 
                                  : 'Leave Canada before your authorized stay expires'}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button className="bg-red-700 hover:bg-red-800">
                        {language === 'fr' ? 'Guide du voyageur' : 'Traveler\'s Guide'}
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                        {language === 'fr' ? 'FAQ pour visiteurs' : 'Visitor FAQ'}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Explore Canada Section */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {language === 'fr' ? 'Explorez le Canada' : 'Explore Canada'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="relative rounded-lg overflow-hidden group">
                    <img 
                      src="/lovable-uploads/25aba192-ae76-469f-be21-d48e46b947ef.png" 
                      alt="Vancouver" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h4 className="text-white font-medium">Vancouver</h4>
                        <p className="text-white/80 text-sm">
                          {language === 'fr' ? 'Côte ouest vibrante' : 'Vibrant West Coast'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-lg overflow-hidden group">
                    <img 
                      src="/lovable-uploads/bbaf0689-cf6e-4272-b527-b1c55faf3b1f.png" 
                      alt="Toronto" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h4 className="text-white font-medium">Toronto</h4>
                        <p className="text-white/80 text-sm">
                          {language === 'fr' ? 'Métropole multiculturelle' : 'Multicultural Metropolis'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-lg overflow-hidden group">
                    <img 
                      src="/lovable-uploads/a7798152-6004-45cd-82ac-015273e182fb.png" 
                      alt="Montréal" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h4 className="text-white font-medium">Montréal</h4>
                        <p className="text-white/80 text-sm">
                          {language === 'fr' ? 'Charme européen' : 'European Charm'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative rounded-lg overflow-hidden group">
                    <img 
                      src="/lovable-uploads/2c6012c5-1aeb-427c-9537-6464053f3b55.png" 
                      alt="Banff" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <h4 className="text-white font-medium">Banff</h4>
                        <p className="text-white/80 text-sm">
                          {language === 'fr' ? 'Merveilles naturelles' : 'Natural Wonders'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                    {language === 'fr' ? 'Découvrir plus de destinations' : 'Discover More Destinations'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VisitorVisa;
