
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { FileText, Download, ExternalLink, Book, Users, Briefcase, GraduationCap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Guide card component
interface GuideCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  pdfUrl: string;
  webUrl: string;
  updated: string;
  fileSize?: string;
}

const GuideCard: React.FC<GuideCardProps> = ({ 
  title, 
  description, 
  icon, 
  pdfUrl, 
  webUrl, 
  updated,
  fileSize = "2.4 MB"
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start">
        <div className="p-3 rounded-lg bg-red-50 mr-4 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex flex-wrap gap-3">
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-sm font-medium bg-red-50 text-red-700 px-3 py-2 rounded-md hover:bg-red-100 transition-colors"
            >
              <Download size={16} className="mr-1" />
              {language === 'fr' ? 'Télécharger PDF' : 'Download PDF'}
              <span className="ml-1 text-xs text-gray-500">({fileSize})</span>
            </a>
            <a 
              href={webUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-sm font-medium bg-gray-50 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ExternalLink size={16} className="mr-1" />
              {language === 'fr' ? 'Version web' : 'Web version'}
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {language === 'fr' ? 'Dernière mise à jour: ' : 'Last updated: '}{updated}
          </p>
        </div>
      </div>
    </div>
  );
};

const OfficialGuides = () => {
  const { language } = useLanguage();
  
  // Sample guide data
  const immigrationGuides = [
    {
      title: language === 'fr' ? 'Guide pour l\'Entrée express' : 'Express Entry Guide',
      description: language === 'fr' 
        ? 'Guide complet expliquant le système d\'Entrée express, comment créer un profil et les étapes pour présenter une demande.' 
        : 'Comprehensive guide explaining the Express Entry system, how to create a profile, and steps for submitting an application.',
      icon: <FileText size={28} className="text-red-600" />,
      pdfUrl: 'https://www.canada.ca/content/dam/ircc/documents/pdf/francais/trousses/guides/g001-f.pdf',
      webUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/entree-express.html',
      updated: '2024-10-15'
    },
    {
      title: language === 'fr' ? 'Guide du parrainage familial' : 'Family Sponsorship Guide',
      description: language === 'fr' 
        ? 'Tout ce que vous devez savoir sur le parrainage d\'un époux, conjoint de fait, partenaire ou enfant pour qu\'il devienne résident permanent.' 
        : 'Everything you need to know about sponsoring a spouse, common-law partner, conjugal partner, or dependent child to become a permanent resident.',
      icon: <Users size={28} className="text-red-600" />,
      pdfUrl: 'https://www.canada.ca/content/dam/ircc/documents/pdf/francais/trousses/guides/g002-f.pdf',
      webUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/immigrer-canada/parrainer-membre-famille.html',
      updated: '2025-01-22'
    },
    {
      title: language === 'fr' ? 'Résidence permanente - Guide du demandeur' : 'Permanent Residence - Applicant Guide',
      description: language === 'fr' 
        ? 'Instructions détaillées pour remplir une demande de résidence permanente, y compris les documents requis et les étapes à suivre.' 
        : 'Detailed instructions for completing a permanent residence application, including required documents and steps to follow.',
      icon: <Book size={28} className="text-red-600" />,
      pdfUrl: 'https://www.canada.ca/content/dam/ircc/documents/pdf/francais/trousses/guides/g003-f.pdf',
      webUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande/formulaires-demande-guides/guide-g003.html',
      updated: '2024-09-30',
      fileSize: '3.2 MB'
    }
  ];
  
  const tempResidencyGuides = [
    {
      title: language === 'fr' ? 'Guide du permis de travail' : 'Work Permit Guide',
      description: language === 'fr' 
        ? 'Comment demander un permis de travail au Canada, y compris les exigences, les documents et les options disponibles.' 
        : 'How to apply for a work permit in Canada, including requirements, documents, and available options.',
      icon: <Briefcase size={28} className="text-blue-600" />,
      pdfUrl: 'https://www.canada.ca/content/dam/ircc/documents/pdf/francais/trousses/guides/g004-f.pdf',
      webUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/travailler-canada/permis.html',
      updated: '2025-02-12',
      fileSize: '2.8 MB'
    },
    {
      title: language === 'fr' ? 'Guide du permis d\'études' : 'Study Permit Guide',
      description: language === 'fr' 
        ? 'Tout ce que vous devez savoir pour demander un permis d\'études, y compris les établissements désignés et le processus de demande.' 
        : 'Everything you need to know to apply for a study permit, including designated learning institutions and the application process.',
      icon: <GraduationCap size={28} className="text-blue-600" />,
      pdfUrl: 'https://www.canada.ca/content/dam/ircc/documents/pdf/francais/trousses/guides/g005-f.pdf',
      webUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/etudier-canada/permis-etudes.html',
      updated: '2024-11-05'
    },
    {
      title: language === 'fr' ? 'Guide du visa de visiteur' : 'Visitor Visa Guide',
      description: language === 'fr' 
        ? 'Instructions pour demander un visa de visiteur ou une AVE, y compris les documents requis et comment prolonger votre séjour.' 
        : 'Instructions for applying for a visitor visa or eTA, including required documents and how to extend your stay.',
      icon: <Globe size={28} className="text-blue-600" />,
      pdfUrl: 'https://www.canada.ca/content/dam/ircc/documents/pdf/francais/trousses/guides/g006-f.pdf',
      webUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada.html',
      updated: '2025-03-18',
      fileSize: '1.9 MB'
    }
  ];
  
  const specializedGuides = [
    {
      title: language === 'fr' ? 'Bienvenue au Canada' : 'Welcome to Canada',
      description: language === 'fr' 
        ? 'Guide d\'orientation pour les nouveaux arrivants, couvrant tout, de la recherche d\'un logement à l\'inscription des enfants à l\'école.' 
        : 'Orientation guide for newcomers, covering everything from finding housing to enrolling children in school.',
      icon: <Users size={28} className="text-green-600" />,
      pdfUrl: 'https://www.canada.ca/content/dam/ircc/documents/pdf/francais/nouveaux/bienvenue-canada.pdf',
      webUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/nouvelle-vie-canada/guide.html',
      updated: '2024-12-01',
      fileSize: '5.6 MB'
    },
    {
      title: language === 'fr' ? 'Guide sur les données biométriques' : 'Biometrics Guide',
      description: language === 'fr' 
        ? 'Tout ce que vous devez savoir sur la collecte des données biométriques pour les demandes d\'immigration, de visa et de résidence permanente.' 
        : 'Everything you need to know about biometric collection for immigration, visa, and permanent residence applications.',
      icon: <FileText size={28} className="text-green-600" />,
      pdfUrl: 'https://www.canada.ca/content/dam/ircc/documents/pdf/francais/trousses/guides/g007-f.pdf',
      webUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande/verifier-biometrie.html',
      updated: '2025-01-10',
      fileSize: '1.5 MB'
    },
    {
      title: language === 'fr' ? 'Guide de la citoyenneté canadienne' : 'Canadian Citizenship Guide',
      description: language === 'fr' 
        ? 'Comment demander la citoyenneté canadienne, se préparer au test et comprendre vos droits et responsabilités en tant que citoyen.' 
        : 'How to apply for Canadian citizenship, prepare for the test, and understand your rights and responsibilities as a citizen.',
      icon: <Book size={28} className="text-green-600" />,
      pdfUrl: 'https://www.canada.ca/content/dam/ircc/documents/pdf/francais/trousses/guides/g008-f.pdf',
      webUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/citoyennete-canadienne.html',
      updated: '2024-08-15',
      fileSize: '4.2 MB'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-red-700 text-white py-10 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'fr' ? 'Guides officiels d\'immigration' : 'Official Immigration Guides'}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl">
              {language === 'fr' 
                ? 'Consultez nos guides complets sur l\'immigration, la résidence permanente, les permis de travail et d\'études, et plus encore.' 
                : 'Access our comprehensive guides on immigration, permanent residence, work and study permits, and more.'}
            </p>
          </div>
        </div>
        
        {/* Immigration Guides Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'fr' ? 'Guides d\'immigration et de résidence permanente' : 'Immigration and Permanent Residence Guides'}
              </h2>
              
              <div className="space-y-6">
                {immigrationGuides.map((guide, index) => (
                  <GuideCard 
                    key={index}
                    title={guide.title}
                    description={guide.description}
                    icon={guide.icon}
                    pdfUrl={guide.pdfUrl}
                    webUrl={guide.webUrl}
                    updated={guide.updated}
                    fileSize={guide.fileSize}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Temporary Residency Guides Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'fr' ? 'Guides de résidence temporaire' : 'Temporary Residency Guides'}
              </h2>
              
              <div className="space-y-6">
                {tempResidencyGuides.map((guide, index) => (
                  <GuideCard 
                    key={index}
                    title={guide.title}
                    description={guide.description}
                    icon={guide.icon}
                    pdfUrl={guide.pdfUrl}
                    webUrl={guide.webUrl}
                    updated={guide.updated}
                    fileSize={guide.fileSize}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Specialized Guides Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'fr' ? 'Guides spécialisés' : 'Specialized Guides'}
              </h2>
              
              <div className="space-y-6">
                {specializedGuides.map((guide, index) => (
                  <GuideCard 
                    key={index}
                    title={guide.title}
                    description={guide.description}
                    icon={guide.icon}
                    pdfUrl={guide.pdfUrl}
                    webUrl={guide.webUrl}
                    updated={guide.updated}
                    fileSize={guide.fileSize}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Guidance Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                {language === 'fr' ? 'Comment utiliser ces guides' : 'How to use these guides'}
              </h2>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <ol className="space-y-6">
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        {language === 'fr' ? 'Téléchargez le guide approprié' : 'Download the appropriate guide'}
                      </h4>
                      <p className="text-gray-600">
                        {language === 'fr' 
                          ? 'Choisissez le guide qui correspond à votre situation et téléchargez-le au format PDF pour y accéder hors ligne.' 
                          : 'Choose the guide that matches your situation and download it in PDF format for offline access.'}
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        {language === 'fr' ? 'Lisez le guide attentivement' : 'Read the guide carefully'}
                      </h4>
                      <p className="text-gray-600">
                        {language === 'fr' 
                          ? 'Prenez le temps de lire l\'intégralité du guide pour comprendre toutes les exigences et les étapes du processus.' 
                          : 'Take time to read the entire guide to understand all requirements and steps in the process.'}
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        {language === 'fr' ? 'Préparez vos documents' : 'Prepare your documents'}
                      </h4>
                      <p className="text-gray-600">
                        {language === 'fr' 
                          ? 'Rassemblez tous les documents nécessaires mentionnés dans le guide avant de commencer à remplir la demande.' 
                          : 'Gather all necessary documents mentioned in the guide before starting to fill out the application.'}
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        {language === 'fr' ? 'Suivez les instructions étape par étape' : 'Follow step-by-step instructions'}
                      </h4>
                      <p className="text-gray-600">
                        {language === 'fr' 
                          ? 'Suivez soigneusement les instructions fournies dans le guide pour remplir correctement votre demande.' 
                          : 'Carefully follow the instructions provided in the guide to correctly complete your application.'}
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        {language === 'fr' ? 'Vérifiez les mises à jour' : 'Check for updates'}
                      </h4>
                      <p className="text-gray-600">
                        {language === 'fr' 
                          ? 'Assurez-vous d\'utiliser la version la plus récente du guide, car les exigences et les procédures peuvent changer.' 
                          : 'Make sure you are using the most recent version of the guide, as requirements and procedures may change.'}
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional Resources */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                {language === 'fr' ? 'Ressources additionnelles' : 'Additional Resources'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande/formulaires-demande-guides.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 flex items-start hover:shadow-md transition-all duration-300"
                >
                  <div className="p-2 rounded-md bg-blue-50 mr-4">
                    <ExternalLink className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      {language === 'fr' ? 'Formulaires et guides IRCC' : 'IRCC Forms and Guides'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'fr' 
                        ? 'Accédez à tous les formulaires et guides officiels d\'IRCC.' 
                        : 'Access all official IRCC forms and guides.'}
                    </p>
                  </div>
                </a>
                
                <a 
                  href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande/verifier-delais-traitement.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-200 flex items-start hover:shadow-md transition-all duration-300"
                >
                  <div className="p-2 rounded-md bg-green-50 mr-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      {language === 'fr' ? 'Délais de traitement' : 'Processing Times'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'fr' 
                        ? 'Vérifiez les délais de traitement actuels pour différents types de demandes.' 
                        : 'Check current processing times for different types of applications.'}
                    </p>
                  </div>
                </a>
              </div>
              
              <div className="mt-8 p-6 bg-red-50 rounded-lg border border-red-100">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {language === 'fr' ? 'À propos des guides officiels' : 'About official guides'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {language === 'fr' 
                    ? 'Ces guides sont fournis par Immigration, Réfugiés et Citoyenneté Canada (IRCC) pour aider les demandeurs à naviguer dans le processus d\'immigration. Les informations contenues dans ces guides sont régulièrement mises à jour pour refléter les changements de politique et de procédure.' 
                    : 'These guides are provided by Immigration, Refugees and Citizenship Canada (IRCC) to help applicants navigate the immigration process. The information in these guides is regularly updated to reflect policy and procedural changes.'}
                </p>
                <p className="text-gray-600">
                  {language === 'fr' 
                    ? 'En cas de divergence entre les informations fournies ici et les informations officielles du gouvernement du Canada, ces dernières prévalent.' 
                    : 'In case of any discrepancy between information provided here and official Government of Canada information, the latter prevails.'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'fr' ? 'Besoin d\'aide supplémentaire?' : 'Need further assistance?'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'fr' 
                  ? 'Si vous avez des questions après avoir consulté nos guides, n\'hésitez pas à contacter notre équipe de support.' 
                  : 'If you have questions after reviewing our guides, don\'t hesitate to contact our support team.'}
              </p>
              <Button className="bg-red-700 hover:bg-red-800">
                {language === 'fr' ? 'Contacter le support' : 'Contact support'}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OfficialGuides;
