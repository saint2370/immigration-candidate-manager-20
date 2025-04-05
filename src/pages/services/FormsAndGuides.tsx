
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { FileText, Download, ExternalLink, Search, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Component for form item
interface FormItemProps {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

const FormItem: React.FC<FormItemProps> = ({ id, title, description, url, category }) => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start">
        <div className="p-2 rounded-md bg-red-50 mr-4 flex-shrink-0">
          <FileText className="h-6 w-6 text-red-600" />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-800">
              {title}
            </h3>
            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {id}
            </span>
          </div>
          <p className="text-gray-600 text-sm mt-1 mb-3">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{category}</span>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
            >
              <Download size={16} className="mr-1" />
              {language === 'fr' ? 'Télécharger' : 'Download'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormsAndGuides = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  // Form categories
  const categories = [
    { id: 'all', name: language === 'fr' ? 'Tous les formulaires' : 'All forms' },
    { id: 'permanent', name: language === 'fr' ? 'Résidence permanente' : 'Permanent residence' },
    { id: 'citizenship', name: language === 'fr' ? 'Citoyenneté' : 'Citizenship' },
    { id: 'temporary', name: language === 'fr' ? 'Résidence temporaire' : 'Temporary residence' },
    { id: 'work', name: language === 'fr' ? 'Permis de travail' : 'Work permits' },
    { id: 'study', name: language === 'fr' ? 'Permis d\'études' : 'Study permits' },
  ];
  
  // Sample form data
  const forms: FormItemProps[] = [
    {
      id: 'IMM 0008',
      title: language === 'fr' ? 'Demande générique pour le Canada' : 'Generic Application Form for Canada',
      description: language === 'fr' 
        ? 'Formulaire principal utilisé pour les demandes de résidence permanente.' 
        : 'Main form used for permanent residence applications.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/imm0008f.pdf',
      category: 'permanent'
    },
    {
      id: 'IMM 5257',
      title: language === 'fr' ? 'Demande de visa de résident temporaire' : 'Application for Temporary Resident Visa',
      description: language === 'fr' 
        ? 'Formulaire pour demander un visa de visiteur pour entrer au Canada.' 
        : 'Form to apply for a visitor visa to enter Canada.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/imm5257f.pdf',
      category: 'temporary'
    },
    {
      id: 'IMM 5645',
      title: language === 'fr' ? 'Déclaration familiale' : 'Family Information',
      description: language === 'fr' 
        ? 'Renseignements sur les membres de votre famille pour les demandes d\'immigration.' 
        : 'Information about your family members for immigration applications.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/imm5645f.pdf',
      category: 'permanent'
    },
    {
      id: 'IMM 5406',
      title: language === 'fr' ? 'Renseignements additionnels sur la famille' : 'Additional Family Information',
      description: language === 'fr' 
        ? 'Détails supplémentaires sur vos parents, frères et sœurs, enfants.' 
        : 'Additional details about your parents, siblings, and children.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/imm5406f.pdf',
      category: 'permanent'
    },
    {
      id: 'IMM 5409',
      title: language === 'fr' ? 'Déclaration statutaire de l\'union de fait' : 'Statutory Declaration of Common-Law Union',
      description: language === 'fr' 
        ? 'Formulaire pour attester une relation d\'union de fait.' 
        : 'Form to attest to a common-law relationship.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/imm5409f.pdf',
      category: 'permanent'
    },
    {
      id: 'IMM 1294',
      title: language === 'fr' ? 'Demande de permis d\'études' : 'Application for Study Permit',
      description: language === 'fr' 
        ? 'Formulaire pour demander un permis d\'étudier au Canada.' 
        : 'Form to apply for a permit to study in Canada.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/imm1294f.pdf',
      category: 'study'
    },
    {
      id: 'IMM 1295',
      title: language === 'fr' ? 'Demande de permis de travail' : 'Application for Work Permit',
      description: language === 'fr' 
        ? 'Formulaire pour demander l\'autorisation de travailler au Canada.' 
        : 'Form to apply for authorization to work in Canada.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/imm1295f.pdf',
      category: 'work'
    },
    {
      id: 'IMM 0008DEP',
      title: language === 'fr' ? 'Annexe de la demande générique - Personnes à charge' : 'Schedule to the Generic Application Form - Dependants',
      description: language === 'fr' 
        ? 'Annexe pour inclure les informations sur vos personnes à charge.' 
        : 'Schedule to include information about your dependants.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/imm0008_2f.pdf',
      category: 'permanent'
    },
    {
      id: 'CIT 0002',
      title: language === 'fr' ? 'Demande de citoyenneté canadienne - Adultes' : 'Application for Canadian Citizenship - Adults',
      description: language === 'fr' 
        ? 'Formulaire pour demander la citoyenneté canadienne pour les 18 ans et plus.' 
        : 'Form to apply for Canadian citizenship for those 18 years and older.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/cit0002f.pdf',
      category: 'citizenship'
    },
    {
      id: 'CIT 0007',
      title: language === 'fr' ? 'Demande de certificat de citoyenneté' : 'Application for a Citizenship Certificate',
      description: language === 'fr' 
        ? 'Formulaire pour obtenir une preuve de citoyenneté canadienne.' 
        : 'Form to obtain proof of Canadian citizenship.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/cit0007f.pdf',
      category: 'citizenship'
    },
    {
      id: 'IMM 5444',
      title: language === 'fr' ? 'Demande de permis de travail post-diplôme' : 'Application for a Post-Graduation Work Permit',
      description: language === 'fr' 
        ? 'Formulaire pour les diplômés d\'établissements canadiens qui souhaitent travailler au Canada.' 
        : 'Form for graduates of Canadian institutions who want to work in Canada.',
      url: 'https://www.canada.ca/content/dam/ircc/migration/ircc/francais/pdf/trousses/form/imm5444f.pdf',
      category: 'work'
    },
    {
      id: 'IMM 0100',
      title: language === 'fr' ? 'Demande d\'Autorisation de voyage électronique (AVE)' : 'Application for Electronic Travel Authorization (eTA)',
      description: language === 'fr' 
        ? 'Formulaire pour demander une AVE pour voyager au Canada par avion.' 
        : 'Form to apply for an eTA to travel to Canada by air.',
      url: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/visiter-canada/ave/demande.html',
      category: 'temporary'
    }
  ];
  
  // Filter forms by search query and category
  const filteredForms = forms.filter(form => {
    const matchesSearch = 
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || form.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-red-700 text-white py-10 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'fr' ? 'Formulaires et guides d\'immigration' : 'Immigration Forms and Guides'}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl">
              {language === 'fr' 
                ? 'Accédez à tous les formulaires officiels pour vos demandes d\'immigration, de résidence temporaire et de citoyenneté.' 
                : 'Access all official forms for your immigration, temporary residence, and citizenship applications.'}
            </p>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <div className="py-6 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  type="text"
                  placeholder={language === 'fr' ? 'Rechercher par numéro de formulaire ou mot-clé...' : 'Search by form number or keyword...'}
                  className="pl-10 py-6 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    className={activeCategory === category.id ? "bg-red-600 hover:bg-red-700" : ""}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {activeCategory === category.id && <Check size={16} className="mr-1" />}
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Forms List */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'fr' ? 'Formulaires disponibles' : 'Available Forms'}
                {activeCategory !== 'all' && ` - ${categories.find(cat => cat.id === activeCategory)?.name}`}
              </h2>
              
              {filteredForms.length > 0 ? (
                <div className="grid gap-4">
                  {filteredForms.map((form) => (
                    <FormItem key={form.id} {...form} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {language === 'fr' 
                      ? 'Aucun formulaire trouvé correspondant à votre recherche.' 
                      : 'No forms found matching your search.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* How to Use Forms Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'fr' ? 'Comment utiliser ces formulaires' : 'How to Use These Forms'}
              </h2>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <ol className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {language === 'fr' ? 'Téléchargez le formulaire approprié' : 'Download the appropriate form'}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        {language === 'fr' 
                          ? 'Assurez-vous de télécharger la version la plus récente du formulaire requis pour votre demande.' 
                          : 'Make sure to download the most recent version of the form required for your application.'}
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {language === 'fr' ? 'Remplissez toutes les sections' : 'Complete all sections'}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        {language === 'fr' 
                          ? 'Complétez tous les champs pertinents. Pour les champs qui ne s\'appliquent pas à votre situation, indiquez "S.O." (sans objet).' 
                          : 'Fill out all relevant fields. For fields that don\'t apply to your situation, indicate "N/A" (not applicable).'}
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {language === 'fr' ? 'Vérifiez les documents justificatifs' : 'Check supporting documents'}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        {language === 'fr' 
                          ? 'Identifiez tous les documents supplémentaires requis pour votre demande et préparez-les.' 
                          : 'Identify all additional documents required for your application and prepare them.'}
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {language === 'fr' ? 'Signez et datez le formulaire' : 'Sign and date the form'}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        {language === 'fr' 
                          ? 'N\'oubliez pas de signer et de dater le formulaire aux endroits indiqués.' 
                          : 'Don\'t forget to sign and date the form where indicated.'}
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="font-bold text-red-600">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {language === 'fr' ? 'Soumettez votre demande' : 'Submit your application'}
                      </h4>
                      <p className="text-gray-600 mt-1">
                        {language === 'fr' 
                          ? 'Suivez les instructions pour soumettre votre demande en ligne ou par la poste.' 
                          : 'Follow the instructions to submit your application online or by mail.'}
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {language === 'fr' ? 'Ressources supplémentaires' : 'Additional Resources'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande/formulaires-demande-guides.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-start hover:shadow-md transition-all duration-300"
                >
                  <div className="p-2 rounded-md bg-blue-50 mr-4">
                    <ExternalLink className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      {language === 'fr' ? 'Site officiel d\'IRCC' : 'Official IRCC Website'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === 'fr' 
                        ? 'Consultez la page officielle des formulaires et guides d\'IRCC pour les versions les plus récentes.' 
                        : 'Check the official IRCC forms and guides page for the most recent versions.'}
                    </p>
                  </div>
                </a>
                
                <a 
                  href="https://www.canada.ca/fr/immigration-refugies-citoyennete/services/demande/verifier-delais-traitement.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-start hover:shadow-md transition-all duration-300"
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FormsAndGuides;
