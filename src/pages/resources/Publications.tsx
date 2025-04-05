
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { FileText, Download, BookOpen, Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Publication card component
interface PublicationCardProps {
  title: string;
  description: string;
  date: string;
  type: string;
  downloadUrl: string;
  category: string;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ 
  title, 
  description, 
  date, 
  type, 
  downloadUrl,
  category
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-start">
        <div className="p-2 rounded-md bg-red-50 mr-4 flex-shrink-0">
          <FileText className="h-6 w-6 text-red-600" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              {category}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <div className="flex flex-wrap justify-between items-center mt-3">
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-3">{date}</span>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded">
                {type}
              </span>
            </div>
            <a 
              href={downloadUrl} 
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

const Publications = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  
  // Sample publication data
  const publications = [
    {
      title: language === 'fr' ? 'Rapport annuel sur l\'immigration 2024' : '2024 Annual Report to Parliament on Immigration',
      description: language === 'fr' 
        ? 'Un aperçu des activités et des initiatives d\'immigration du Canada en 2024, y compris les statistiques sur les résidents permanents et temporaires.' 
        : 'An overview of Canada\'s immigration activities and initiatives in 2024, including statistics on permanent and temporary residents.',
      date: '2025-03-10',
      type: 'PDF',
      downloadUrl: '#',
      category: language === 'fr' ? 'Rapport annuel' : 'Annual Report'
    },
    {
      title: language === 'fr' ? 'Guide d\'évaluation médicale pour l\'immigration' : 'Immigration Medical Examination Guidelines',
      description: language === 'fr' 
        ? 'Guide complet pour les médecins désignés effectuant des examens médicaux d\'immigration, y compris les protocoles et les critères d\'évaluation.' 
        : 'Comprehensive guide for panel physicians performing immigration medical examinations, including protocols and assessment criteria.',
      date: '2024-11-15',
      type: 'PDF',
      downloadUrl: '#',
      category: language === 'fr' ? 'Guide médical' : 'Medical Guide'
    },
    {
      title: language === 'fr' ? 'Manuel opérationnel: Traitement des demandes de visa' : 'Operational Manual: Visa Application Processing',
      description: language === 'fr' 
        ? 'Manuel interne pour les agents d\'immigration sur les procédures et les critères d\'évaluation des demandes de visa et de permis.' 
        : 'Internal manual for immigration officers on procedures and criteria for evaluating visa and permit applications.',
      date: '2025-01-22',
      type: 'PDF',
      downloadUrl: '#',
      category: language === 'fr' ? 'Manuel opérationnel' : 'Operational Manual'
    },
    {
      title: language === 'fr' ? 'Bulletin d\'interprétation des lois sur l\'immigration' : 'Immigration Law Interpretation Bulletin',
      description: language === 'fr' 
        ? 'Analyse juridique et clarifications sur des aspects spécifiques de la Loi sur l\'immigration et la protection des réfugiés.' 
        : 'Legal analysis and clarifications on specific aspects of the Immigration and Refugee Protection Act.',
      date: '2024-09-05',
      type: 'PDF',
      downloadUrl: '#',
      category: language === 'fr' ? 'Bulletin juridique' : 'Legal Bulletin'
    },
    {
      title: language === 'fr' ? 'Rapport sur les résultats du Programme d\'immigration économique' : 'Economic Immigration Program Outcomes Report',
      description: language === 'fr' 
        ? 'Analyse des résultats économiques des immigrants admis via les programmes d\'immigration économique au cours des 5 dernières années.' 
        : 'Analysis of economic outcomes for immigrants admitted through economic immigration programs over the past 5 years.',
      date: '2025-02-28',
      type: 'PDF',
      downloadUrl: '#',
      category: language === 'fr' ? 'Rapport d\'étude' : 'Research Report'
    },
    {
      title: language === 'fr' ? 'Guide des politiques d\'immigration familiale' : 'Family Immigration Policy Guide',
      description: language === 'fr' 
        ? 'Aperçu détaillé des politiques relatives au parrainage familial, y compris l\'évaluation des relations et les exigences financières.' 
        : 'Detailed overview of policies related to family sponsorship, including relationship assessment and financial requirements.',
      date: '2024-10-12',
      type: 'PDF',
      downloadUrl: '#',
      category: language === 'fr' ? 'Guide de politique' : 'Policy Guide'
    },
    {
      title: language === 'fr' ? 'Tendances et projections de l\'immigration 2025-2030' : 'Immigration Trends and Projections 2025-2030',
      description: language === 'fr' 
        ? 'Analyse des tendances récentes en matière d\'immigration et projections pour les 5 prochaines années, y compris les cibles par catégorie.' 
        : 'Analysis of recent immigration trends and projections for the next 5 years, including targets by category.',
      date: '2025-01-15',
      type: 'PDF',
      downloadUrl: '#',
      category: language === 'fr' ? 'Rapport d\'étude' : 'Research Report'
    },
    {
      title: language === 'fr' ? 'Bulletin des mises à jour de politique d\'immigration' : 'Immigration Policy Update Bulletin',
      description: language === 'fr' 
        ? 'Résumé des récents changements de politique d\'immigration et de leurs implications pour les demandeurs et les parties prenantes.' 
        : 'Summary of recent immigration policy changes and their implications for applicants and stakeholders.',
      date: '2025-03-01',
      type: 'PDF',
      downloadUrl: '#',
      category: language === 'fr' ? 'Bulletin de politique' : 'Policy Bulletin'
    }
  ];
  
  // Get unique categories
  const categories = ['all', ...new Set(publications.map(pub => pub.category))];
  
  // Filter publications based on search query and category
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || pub.category === selectedCategory;
    
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
              {language === 'fr' ? 'Publications et manuels' : 'Publications and Manuals'}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl">
              {language === 'fr' 
                ? 'Accédez à nos publications officielles, rapports, manuels et bulletins d\'information sur l\'immigration canadienne.' 
                : 'Access our official publications, reports, manuals, and information bulletins on Canadian immigration.'}
            </p>
          </div>
        </div>
        
        {/* Search and Filter Section */}
        <section className="py-6 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  type="text"
                  placeholder={language === 'fr' ? 'Rechercher des publications...' : 'Search publications...'}
                  className="pl-10 py-6 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              
              <div className="flex items-center overflow-x-auto pb-2">
                <div className="flex-shrink-0 mr-2">
                  <Filter size={18} className="text-gray-500" />
                </div>
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`flex-shrink-0 mr-2 px-3 py-1.5 text-sm rounded-full transition-colors ${
                      selectedCategory === category 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'all' 
                      ? (language === 'fr' ? 'Toutes les catégories' : 'All categories') 
                      : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Publications List */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory === 'all' 
                    ? (language === 'fr' ? 'Toutes les publications' : 'All Publications')
                    : selectedCategory}
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredPublications.length} {language === 'fr' ? 'résultats' : 'results'}
                </span>
              </div>
              
              {filteredPublications.length > 0 ? (
                <div className="space-y-4">
                  {filteredPublications.map((pub, index) => (
                    <PublicationCard 
                      key={index}
                      title={pub.title}
                      description={pub.description}
                      date={pub.date}
                      type={pub.type}
                      downloadUrl={pub.downloadUrl}
                      category={pub.category}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {language === 'fr' ? 'Aucune publication trouvée' : 'No publications found'}
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {language === 'fr' 
                      ? 'Nous n\'avons trouvé aucune publication correspondant à votre recherche.' 
                      : 'We couldn\'t find any publications matching your search.'}
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-red-300 text-red-700 hover:bg-red-50"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    {language === 'fr' ? 'Effacer les filtres' : 'Clear filters'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Subscribe Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {language === 'fr' ? 'Restez informé' : 'Stay Informed'}
              </h2>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                {language === 'fr' 
                  ? 'Abonnez-vous pour recevoir des notifications lorsque de nouvelles publications sont disponibles.' 
                  : 'Subscribe to receive notifications when new publications are available.'}
              </p>
              
              <div className="flex flex-col md:flex-row gap-3 justify-center max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder={language === 'fr' ? 'Votre adresse email' : 'Your email address'} 
                  className="md:min-w-[300px]"
                />
                <Button className="bg-red-700 hover:bg-red-800">
                  {language === 'fr' ? 'S\'abonner' : 'Subscribe'}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Additional Information */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {language === 'fr' ? 'À propos de nos publications' : 'About Our Publications'}
              </h2>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === 'fr' ? 'Types de publications disponibles' : 'Types of Available Publications'}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {language === 'fr' ? 'Rapports annuels' : 'Annual Reports'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'fr' 
                        ? 'Rapports détaillés sur les activités d\'immigration, les statistiques et les tendances de l\'année précédente.' 
                        : 'Detailed reports on immigration activities, statistics, and trends from the previous year.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {language === 'fr' ? 'Manuels opérationnels' : 'Operational Manuals'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'fr' 
                        ? 'Guides complets pour les agents d\'immigration et autres praticiens sur les procédures d\'immigration.' 
                        : 'Comprehensive guides for immigration officers and other practitioners on immigration procedures.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {language === 'fr' ? 'Bulletins de politique' : 'Policy Bulletins'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'fr' 
                        ? 'Mises à jour sur les changements de politique d\'immigration et leurs implications.' 
                        : 'Updates on immigration policy changes and their implications.'}
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">
                      {language === 'fr' ? 'Rapports d\'étude' : 'Research Reports'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'fr' 
                        ? 'Analyses approfondies sur des sujets spécifiques liés à l\'immigration et à l\'intégration.' 
                        : 'In-depth analyses on specific topics related to immigration and integration.'}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {language === 'fr' ? 'Comment utiliser ces publications' : 'How to Use These Publications'}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {language === 'fr' 
                      ? 'Nos publications sont des ressources précieuses pour :' 
                      : 'Our publications are valuable resources for:'}
                  </p>
                  
                  <ul className="space-y-2 text-gray-600 list-disc pl-5">
                    <li>
                      {language === 'fr' 
                        ? 'Comprendre les politiques et procédures d\'immigration actuelles' 
                        : 'Understanding current immigration policies and procedures'}
                    </li>
                    <li>
                      {language === 'fr' 
                        ? 'Rester informé des changements récents en matière d\'immigration' 
                        : 'Staying informed about recent immigration changes'}
                    </li>
                    <li>
                      {language === 'fr' 
                        ? 'Accéder à des analyses détaillées et à des statistiques sur l\'immigration canadienne' 
                        : 'Accessing detailed analyses and statistics on Canadian immigration'}
                    </li>
                    <li>
                      {language === 'fr' 
                        ? 'Se référer à des informations officielles pour la recherche ou la prise de décision' 
                        : 'Referencing official information for research or decision-making'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'fr' ? 'Besoin d\'une publication spécifique?' : 'Need a specific publication?'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'fr' 
                  ? 'Si vous ne trouvez pas la publication que vous recherchez, contactez notre équipe.' 
                  : 'If you can\'t find the publication you\'re looking for, contact our team.'}
              </p>
              <Button className="bg-red-700 hover:bg-red-800">
                {language === 'fr' ? 'Contacter le service des publications' : 'Contact Publications Service'}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Publications;
