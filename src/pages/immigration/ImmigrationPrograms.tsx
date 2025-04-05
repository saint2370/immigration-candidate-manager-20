
import React from 'react';
import ImmigrationPageLayout from '@/components/immigration/ImmigrationPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Check, FileText, Users, Award } from 'lucide-react';

const ImmigrationPrograms = () => {
  const { language } = useLanguage();
  
  const headerImage = "/lovable-uploads/a7798152-6004-45cd-82ac-015273e182fb.png";
  
  const faqItems = [
    {
      question: language === 'fr' 
        ? 'Quels sont les critères pour l\'Entrée express ?' 
        : 'What are the criteria for Express Entry?',
      answer: language === 'fr'
        ? 'L\'Entrée express évalue les candidats selon plusieurs facteurs : l\'âge, le niveau d\'éducation, l\'expérience professionnelle, les compétences linguistiques (français et/ou anglais), l\'adaptabilité, et les offres d\'emploi. Un minimum de 67 points sur 100 est généralement nécessaire pour être admissible.'
        : 'Express Entry evaluates candidates based on several factors: age, education level, work experience, language skills (French and/or English), adaptability, and job offers. A minimum of 67 points out of 100 is generally required to be eligible.'
    },
    {
      question: language === 'fr' 
        ? 'Quel est le délai de traitement pour l\'Entrée express ?' 
        : 'What is the processing time for Express Entry?',
      answer: language === 'fr'
        ? 'Les délais de traitement pour l\'Entrée express varient généralement entre 6 et 12 mois, mais peuvent être plus courts pour les candidats hautement qualifiés ou ayant une offre d\'emploi d\'un employeur canadien.'
        : 'Processing times for Express Entry typically range from 6 to 12 months, but can be shorter for highly qualified candidates or those with a job offer from a Canadian employer.'
    },
    {
      question: language === 'fr' 
        ? 'Puis-je inclure ma famille dans ma demande d\'immigration ?' 
        : 'Can I include my family in my immigration application?',
      answer: language === 'fr'
        ? 'Oui, vous pouvez inclure votre conjoint(e) et vos enfants à charge dans votre demande d\'immigration. Ils recevront également la résidence permanente si votre demande est approuvée.'
        : 'Yes, you can include your spouse and dependent children in your immigration application. They will also receive permanent residence if your application is approved.'
    }
  ];

  return (
    <ImmigrationPageLayout
      title={language === 'fr' ? 'Programmes d\'immigration' : 'Immigration Programs'}
      headerImage={headerImage}
      intro={language === 'fr' 
        ? 'Découvrez les différents programmes d\'immigration canadienne adaptés à votre situation personnelle et professionnelle.' 
        : 'Discover the different Canadian immigration programs tailored to your personal and professional situation.'}
      faqItems={faqItems}
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Principaux programmes d\'immigration' : 'Main Immigration Programs'}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === 'fr' 
              ? 'Le Canada offre plusieurs voies d\'accès à la résidence permanente, chacune avec ses propres critères et processus.' 
              : 'Canada offers several pathways to permanent residence, each with its own criteria and processes.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <FileText className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'fr' ? 'Entrée Express' : 'Express Entry'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'fr' 
                ? 'Système en ligne pour gérer les demandes d\'immigration des travailleurs qualifiés. Il comprend le Programme des travailleurs qualifiés fédéraux, le Programme des métiers spécialisés, et la Catégorie de l\'expérience canadienne.' 
                : 'Online system to manage immigration applications from skilled workers. It includes the Federal Skilled Worker Program, Federal Skilled Trades Program, and Canadian Experience Class.'}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Bassin de candidats classés selon le Système de classement global (SCG)' : 'Pool of candidates ranked according to the Comprehensive Ranking System (CRS)'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Invitations à présenter une demande émises régulièrement' : 'Invitations to apply issued regularly'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Traitement des demandes généralement en 6 mois ou moins' : 'Applications typically processed in 6 months or less'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <Users className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'fr' ? 'Programme des candidats des provinces' : 'Provincial Nominee Program'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'fr' 
                ? 'Permet aux provinces et territoires canadiens de nommer des candidats pour l\'immigration en fonction de leurs besoins économiques et démographiques spécifiques.' 
                : 'Allows Canadian provinces and territories to nominate candidates for immigration based on their specific economic and demographic needs.'}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Programmes adaptés aux besoins spécifiques de chaque province' : 'Programs tailored to the specific needs of each province'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Critères d\'admissibilité variables selon la province' : 'Eligibility criteria vary by province'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Voies d\'accès pour les travailleurs, entrepreneurs et étudiants' : 'Pathways for workers, entrepreneurs, and students'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <Award className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'fr' ? 'Programmes pilotes d\'immigration' : 'Immigration Pilot Programs'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'fr' 
                ? 'Programmes spéciaux ciblant des régions ou des secteurs spécifiques ayant des besoins particuliers en matière d\'immigration.' 
                : 'Special programs targeting specific regions or sectors with particular immigration needs.'}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Programme pilote d\'immigration dans les communautés rurales et du Nord' : 'Rural and Northern Immigration Pilot'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Programme pilote d\'immigration au Canada atlantique' : 'Atlantic Immigration Pilot'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Programme des aides familiaux' : 'Home Child Care Provider Pilot'}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Users className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {language === 'fr' ? 'Programmes d\'entrepreneuriat' : 'Entrepreneurship Programs'}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              {language === 'fr' 
                ? 'Programmes destinés aux entrepreneurs, travailleurs autonomes et investisseurs souhaitant créer une entreprise au Canada.' 
                : 'Programs for entrepreneurs, self-employed individuals, and investors looking to start a business in Canada.'}
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Programme des travailleurs autonomes' : 'Self-Employed Persons Program'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Programmes d\'entrepreneuriat provinciaux' : 'Provincial Entrepreneurship Programs'}
                </span>
              </li>
              <li className="flex items-start">
                <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-700">
                  {language === 'fr' ? 'Programmes de visa pour démarrage d\'entreprise' : 'Start-up Visa Programs'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h4 className="font-semibold text-gray-800 mb-2">
            {language === 'fr' ? 'Critères d\'admissibilité généraux' : 'General Eligibility Criteria'}
          </h4>
          <p className="text-gray-600 mb-4">
            {language === 'fr' 
              ? 'Bien que chaque programme ait ses propres critères spécifiques, voici quelques facteurs généralement pris en compte :' 
              : 'While each program has its own specific criteria, here are some factors generally taken into account:'}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Compétences linguistiques (français et/ou anglais)' : 'Language skills (French and/or English)'}
              </span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Éducation et diplômes' : 'Education and degrees'}
              </span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Expérience professionnelle' : 'Work experience'}
              </span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Âge (généralement entre 18 et 45 ans)' : 'Age (generally between 18 and 45)'}
              </span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Fonds suffisants pour s\'établir' : 'Sufficient funds to settle'}
              </span>
            </li>
            <li className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">
                {language === 'fr' ? 'Liens avec le Canada (famille, études, travail)' : 'Ties to Canada (family, studies, work)'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </ImmigrationPageLayout>
  );
};

export default ImmigrationPrograms;
