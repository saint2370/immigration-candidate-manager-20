
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { Users, CheckCircle, Clock, AlertCircle, FileText, Calendar, HelpCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FamilySponsorshipProgram = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-red-700 text-white py-10 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/lovable-uploads/e83d4090-759f-4383-a50e-0935b0dff46f.png" 
              alt="Family reunification" 
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'fr' ? 'Programme de parrainage familial' : 'Family Sponsorship Program'}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl">
              {language === 'fr' 
                ? 'Réunissez-vous avec vos proches au Canada. Découvrez comment parrainer des membres de votre famille pour qu\'ils deviennent résidents permanents.' 
                : 'Reunite with your loved ones in Canada. Learn how to sponsor family members to become permanent residents.'}
            </p>
          </div>
        </div>
        
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
                    <TabsTrigger value="eligibility" className="py-3">
                      {language === 'fr' ? 'Éligibilité' : 'Eligibility'}
                    </TabsTrigger>
                    <TabsTrigger value="apply" className="py-3">
                      {language === 'fr' ? 'Comment postuler' : 'How to Apply'}
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="py-3">
                      {language === 'fr' ? 'Documents requis' : 'Required Documents'}
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="bg-red-100 p-3 rounded-full">
                        <Users className="h-6 w-6 text-red-700" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {language === 'fr' ? 'Programme de parrainage familial' : 'Family Sponsorship Program'}
                      </h2>
                    </div>
                    
                    <p className="text-gray-700 mb-6">
                      {language === 'fr' 
                        ? 'Le programme de parrainage familial permet aux citoyens canadiens et aux résidents permanents de parrainer des membres de leur famille proche pour qu\'ils puissent venir vivre au Canada en tant que résidents permanents. Ce programme reconnaît l\'importance de la réunification familiale et vise à garder les familles ensemble.' 
                        : 'The Family Sponsorship Program allows Canadian citizens and permanent residents to sponsor close family members to come live in Canada as permanent residents. This program recognizes the importance of family reunification and aims to keep families together.'}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">
                          {language === 'fr' ? 'Qui peut être parrainé?' : 'Who Can Be Sponsored?'}
                        </h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Époux ou conjoint de fait' : 'Spouse or common-law partner'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Enfants à charge' : 'Dependent children'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Parents et grands-parents' : 'Parents and grandparents'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {language === 'fr' ? 'Enfants orphelins (frères, sœurs, neveux, nièces) de moins de 18 ans' : 'Orphaned children (brothers, sisters, nephews, nieces) under 18'}
                            </span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold mb-3 text-gray-800">
                          {language === 'fr' ? 'Délais et coûts estimés' : 'Estimated Timelines & Costs'}
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <Clock className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-gray-700 font-medium block">
                                {language === 'fr' ? 'Délai de traitement:' : 'Processing time:'}
                              </span>
                              <span className="text-gray-600 text-sm">
                                {language === 'fr' ? '12-36 mois (varie selon le type de parrainage)' : '12-36 months (varies by sponsorship type)'}
                              </span>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Clock className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="text-gray-700 font-medium block">
                                {language === 'fr' ? 'Frais estimés:' : 'Estimated fees:'}
                              </span>
                              <span className="text-gray-600 text-sm">
                                {language === 'fr' ? '1,050 CAD - 1,500 CAD par personne' : 'CAD $1,050 - $1,500 per person'}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-8">
                      <div className="flex items-start">
                        <AlertCircle className="h-6 w-6 text-blue-700 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-lg font-semibold text-blue-800 mb-2">
                            {language === 'fr' ? 'Informations importantes' : 'Important Information'}
                          </h3>
                          <p className="text-blue-800">
                            {language === 'fr' 
                              ? 'En tant que répondant, vous vous engagez à subvenir aux besoins essentiels des membres de votre famille que vous parrainez pendant une période de 3 à 20 ans, selon leur lien de parenté avec vous. Assurez-vous de comprendre pleinement vos responsabilités avant de soumettre une demande.' 
                              : 'As a sponsor, you are committing to providing for the essential needs of your sponsored family members for a period of 3 to 20 years, depending on their relationship to you. Make sure you fully understand your responsibilities before submitting an application.'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button className="bg-red-700 hover:bg-red-800">
                        {language === 'fr' ? 'Vérifier mon éligibilité' : 'Check My Eligibility'}
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                        {language === 'fr' ? 'Guide du programme' : 'Program Guide'}
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                        {language === 'fr' ? 'FAQ du parrainage' : 'Sponsorship FAQ'}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* Eligibility Tab */}
                  <TabsContent value="eligibility" className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {language === 'fr' ? 'Critères d\'éligibilité' : 'Eligibility Criteria'}
                    </h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          {language === 'fr' ? 'Pour les répondants (parrains)' : 'For Sponsors'}
                        </h3>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="divide-y divide-gray-200">
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Statut au Canada' : 'Status in Canada'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Vous devez être un citoyen canadien ou un résident permanent âgé d\'au moins 18 ans et résider au Canada.' 
                                  : 'You must be a Canadian citizen or permanent resident, at least 18 years old, and living in Canada.'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Capacité financière' : 'Financial Capacity'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Vous devez démontrer que vous avez un revenu suffisant pour subvenir aux besoins de votre famille et des membres de la famille que vous parrainez.' 
                                  : 'You must demonstrate that you have enough income to provide for your family and the family members you are sponsoring.'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Engagement de parrainage' : 'Sponsorship Undertaking'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'Vous devez vous engager à subvenir aux besoins essentiels des membres de votre famille pendant la période de parrainage (3 à 20 ans).' 
                                  : 'You must commit to providing for the essential needs of your family members for the duration of the sponsorship period (3 to 20 years).'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                          {language === 'fr' ? 'Pour les personnes parrainées' : 'For Sponsored Persons'}
                        </h3>
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <div className="divide-y divide-gray-200">
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Lien familial' : 'Family Relationship'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'La personne parrainée doit être un membre de la famille admissible (époux, enfant à charge, parent, etc.).' 
                                  : 'The sponsored person must be an eligible family member (spouse, dependent child, parent, etc.).'}
                              </p>
                            </div>
                            
                            <div className="p-4">
                              <div className="flex items-center mb-2">
                                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                                <h4 className="font-medium text-gray-800">
                                  {language === 'fr' ? 'Contrôles médicaux et de sécurité' : 'Medical and Security Checks'}
                                </h4>
                              </div>
                              <p className="text-gray-600 ml-7">
                                {language === 'fr' 
                                  ? 'La personne parrainée doit passer des examens médicaux et des vérifications de sécurité/antécédents criminels.' 
                                  : 'The sponsored person must pass medical examinations and security/criminal background checks.'}
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
                              {language === 'fr' ? 'Restrictions' : 'Restrictions'}
                            </h3>
                            <p className="text-amber-800 mb-2">
                              {language === 'fr' 
                                ? 'Vous pourriez ne pas être admissible à parrainer un membre de votre famille si:' 
                                : 'You might not be eligible to sponsor a family member if:'}
                            </p>
                            <ul className="list-disc list-inside text-amber-800 space-y-1">
                              <li>
                                {language === 'fr' 
                                  ? 'Vous recevez de l\'aide sociale (sauf pour raison d\'invalidité)' 
                                  : 'You are receiving social assistance (except for disability)'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Vous avez déjà manqué à des engagements de parrainage antérieurs' 
                                  : 'You have failed to meet previous sponsorship obligations'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Vous avez été déclaré coupable de certaines infractions criminelles' 
                                  : 'You have been convicted of certain criminal offenses'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Vous êtes en détention' 
                                  : 'You are in prison'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Vous êtes en faillite' 
                                  : 'You are bankrupt'}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button className="bg-red-700 hover:bg-red-800">
                        {language === 'fr' ? 'Utiliser l\'outil d\'éligibilité' : 'Use Eligibility Tool'}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  {/* How to Apply Tab */}
                  <TabsContent value="apply" className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {language === 'fr' ? 'Comment faire une demande de parrainage' : 'How to Apply for Sponsorship'}
                    </h2>
                    
                    <div className="space-y-6 mb-8">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">1</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Vérifier votre admissibilité' : 'Check Your Eligibility'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Assurez-vous que vous et la personne que vous souhaitez parrainer répondez aux critères d\'admissibilité du programme de parrainage familial.' 
                              : 'Make sure both you and the person you want to sponsor meet the eligibility requirements for the Family Sponsorship Program.'}
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
                            {language === 'fr' ? 'Recueillir les documents requis' : 'Gather Required Documents'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Rassemblez tous les documents nécessaires pour le répondant et la personne parrainée, tels que les pièces d\'identité, les preuves de relation, les documents financiers, etc.' 
                              : 'Collect all necessary documents for both the sponsor and the sponsored person, such as identification, proof of relationship, financial documents, etc.'}
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
                            {language === 'fr' ? 'Remplir les formulaires de demande' : 'Complete Application Forms'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Téléchargez et complétez tous les formulaires requis pour la demande de parrainage. Assurez-vous de remplir tous les champs et de signer où nécessaire.' 
                              : 'Download and complete all required forms for the sponsorship application. Make sure to fill in all fields and sign where necessary.'}
                          </p>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Télécharger les formulaires' : 'Download Forms'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">4</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Payer les frais' : 'Pay the Fees'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Payez les frais de traitement de la demande, les frais pour le droit de résidence permanente et les frais biométriques si applicables.' 
                              : 'Pay the application processing fee, the permanent residence fee, and biometric fees if applicable.'}
                          </p>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Payer les frais' : 'Pay Fees'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">5</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Soumettre votre demande' : 'Submit Your Application'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Envoyez votre demande complète, y compris tous les formulaires, documents et preuves de paiement, au bureau de traitement approprié.' 
                              : 'Send your complete application, including all forms, documents, and proof of payment, to the appropriate processing office.'}
                          </p>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                            {language === 'fr' ? 'Instructions d\'envoi' : 'Submission Instructions'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold mr-4 flex-shrink-0 mt-1">6</div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            {language === 'fr' ? 'Suivi de votre demande' : 'Track Your Application'}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {language === 'fr' 
                              ? 'Une fois votre demande soumise, vous pouvez suivre son statut en ligne. Vous pouvez être contacté pour fournir des informations supplémentaires ou pour des entrevues.' 
                              : 'After submitting your application, you can track its status online. You may be contacted to provide additional information or for interviews.'}
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
                              ? 'Si vous avez besoin d\'assistance pour remplir votre demande de parrainage familial, plusieurs options s\'offrent à vous:' 
                              : 'If you need assistance with completing your family sponsorship application, several options are available to you:'}
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
                  
                  {/* Required Documents Tab */}
                  <TabsContent value="documents" className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      {language === 'fr' ? 'Documents requis pour le parrainage familial' : 'Required Documents for Family Sponsorship'}
                    </h2>
                    
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-red-600" />
                          {language === 'fr' ? 'Documents pour le répondant' : 'Documents for the Sponsor'}
                        </h3>
                        
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {language === 'fr' ? 'Document' : 'Document'}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {language === 'fr' ? 'Détails' : 'Details'}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-800">
                                    {language === 'fr' ? 'Preuve de citoyenneté/résidence' : 'Proof of Citizenship/Residence'}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-600">
                                    {language === 'fr' 
                                      ? 'Certificat de naissance, passeport canadien, carte de citoyenneté ou carte de résident permanent.' 
                                      : 'Birth certificate, Canadian passport, citizenship card, or permanent resident card.'}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-800">
                                    {language === 'fr' ? 'Preuve de revenu' : 'Proof of Income'}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-600">
                                    {language === 'fr' 
                                      ? 'Avis de cotisation, talons de paie, relevés bancaires ou déclaration de revenus.' 
                                      : 'Notice of assessment, pay stubs, bank statements, or tax returns.'}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-800">
                                    {language === 'fr' ? 'Formulaire d\'engagement' : 'Undertaking Form'}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-600">
                                    {language === 'fr' 
                                      ? 'Formulaire d\'engagement de parrainage signé (IMM 1344).' 
                                      : 'Signed sponsorship undertaking form (IMM 1344).'}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <FileText className="h-5 w-5 mr-2 text-red-600" />
                          {language === 'fr' ? 'Documents pour la personne parrainée' : 'Documents for the Sponsored Person'}
                        </h3>
                        
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {language === 'fr' ? 'Document' : 'Document'}
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {language === 'fr' ? 'Détails' : 'Details'}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-800">
                                    {language === 'fr' ? 'Pièce d\'identité' : 'Identification'}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-600">
                                    {language === 'fr' 
                                      ? 'Passeport valide, certificat de naissance et cartes d\'identité nationales.' 
                                      : 'Valid passport, birth certificate, and national ID cards.'}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-800">
                                    {language === 'fr' ? 'Photos' : 'Photos'}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-600">
                                    {language === 'fr' 
                                      ? 'Photos de format passeport récentes (prises dans les 6 derniers mois).' 
                                      : 'Recent passport-format photos (taken within the last 6 months).'}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-800">
                                    {language === 'fr' ? 'Preuve de relation' : 'Proof of Relationship'}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-600">
                                    {language === 'fr' 
                                      ? 'Certificat de mariage, certificats de naissance des enfants, photos, correspondance, etc.' 
                                      : 'Marriage certificate, birth certificates of children, photos, correspondence, etc.'}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-800">
                                    {language === 'fr' ? 'Formulaires de demande' : 'Application Forms'}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-600">
                                    {language === 'fr' 
                                      ? 'Formulaires de demande de résidence permanente remplis (IMM 5406, IMM 5669, etc.).' 
                                      : 'Completed permanent residence application forms (IMM 5406, IMM 5669, etc.).'}
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-800">
                                    {language === 'fr' ? 'Casier judiciaire' : 'Police Certificates'}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-600">
                                    {language === 'fr' 
                                      ? 'Certificats de police de chaque pays où la personne a vécu plus de 6 mois depuis l\'âge de 18 ans.' 
                                      : 'Police certificates from each country where the person has lived for more than 6 months since the age of 18.'}
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-5">
                        <div className="flex items-start">
                          <Calendar className="h-6 w-6 text-amber-700 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-lg font-semibold text-amber-800 mb-2">
                              {language === 'fr' ? 'Validité des documents' : 'Document Validity'}
                            </h3>
                            <p className="text-amber-800 mb-2">
                              {language === 'fr' 
                                ? 'Veuillez noter les points importants suivants concernant vos documents:' 
                                : 'Please note the following important points about your documents:'}
                            </p>
                            <ul className="list-disc list-inside text-amber-800 space-y-1">
                              <li>
                                {language === 'fr' 
                                  ? 'Tous les documents doivent être valides au moment de la soumission de la demande' 
                                  : 'All documents must be valid at the time of application submission'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Les documents qui ne sont pas en anglais ou en français doivent être accompagnés d\'une traduction certifiée' 
                                  : 'Documents not in English or French must be accompanied by a certified translation'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Les copies des documents doivent être claires et lisibles' 
                                  : 'Copies of documents must be clear and legible'}
                              </li>
                              <li>
                                {language === 'fr' 
                                  ? 'Des documents supplémentaires peuvent être demandés pendant le traitement' 
                                  : 'Additional documents may be requested during processing'}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Button className="bg-red-700 hover:bg-red-800">
                        {language === 'fr' ? 'Télécharger la liste de documents' : 'Download Document Checklist'}
                      </Button>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                        {language === 'fr' ? 'Obtenir de l\'aide' : 'Get Help'}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Related Links */}
              <div className="mt-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {language === 'fr' ? 'Liens connexes' : 'Related Links'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="#" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-center">
                      <div>
                        <h4 className="font-medium text-red-700 mb-1">
                          {language === 'fr' ? 'Super visa pour parents et grands-parents' : 'Super Visa for Parents and Grandparents'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'fr' ? 'Une alternative au parrainage familial.' : 'An alternative to family sponsorship.'}
                        </p>
                      </div>
                      <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                    </div>
                  </a>
                  
                  <a href="#" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-center">
                      <div>
                        <h4 className="font-medium text-red-700 mb-1">
                          {language === 'fr' ? 'Programme des époux et partenaires' : 'Spouses and Partners Program'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'fr' ? 'Information spécifique sur le parrainage des époux.' : 'Specific information on sponsoring spouses.'}
                        </p>
                      </div>
                      <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                    </div>
                  </a>
                  
                  <a href="#" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-center">
                      <div>
                        <h4 className="font-medium text-red-700 mb-1">
                          {language === 'fr' ? 'Délais de traitement actuels' : 'Current Processing Times'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'fr' ? 'Consultez les délais de traitement à jour.' : 'Check current up-to-date processing times.'}
                        </p>
                      </div>
                      <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                    </div>
                  </a>
                  
                  <a href="#" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all">
                    <div className="flex items-center">
                      <div>
                        <h4 className="font-medium text-red-700 mb-1">
                          {language === 'fr' ? 'FAQ sur le parrainage familial' : 'Family Sponsorship FAQ'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {language === 'fr' ? 'Réponses aux questions fréquemment posées.' : 'Answers to frequently asked questions.'}
                        </p>
                      </div>
                      <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FamilySponsorshipProgram;
