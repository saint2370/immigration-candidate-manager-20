
import React from 'react';
import ImmigrationPageLayout from '@/components/immigration/ImmigrationPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, FileText, Home, Clock, DollarSign, Award, Users, Map } from 'lucide-react';

const PermanentResidence = () => {
  const { language, t } = useLanguage();
  
  // FAQ items
  const faqItems = [
    {
      question: language === 'fr' 
        ? 'Quelle est la différence entre la résidence permanente et la citoyenneté canadienne?' 
        : 'What is the difference between permanent residence and Canadian citizenship?',
      answer: language === 'fr'
        ? 'Les résidents permanents ont la plupart des mêmes droits que les citoyens canadiens, y compris l\'accès aux services sociaux et de santé, le droit de vivre, de travailler ou d\'étudier n\'importe où au Canada. Cependant, ils ne peuvent pas voter, se présenter à des fonctions politiques ou détenir certains emplois nécessitant une habilitation de sécurité de haut niveau. La citoyenneté peut être demandée après avoir vécu au Canada en tant que résident permanent pendant au moins 3 ans.'
        : 'Permanent residents have most of the same rights as Canadian citizens, including access to social and health services, the right to live, work or study anywhere in Canada. However, they cannot vote, run for political office, or hold certain jobs requiring high-level security clearance. Citizenship can be applied for after living in Canada as a permanent resident for at least 3 years.'
    },
    {
      question: language === 'fr' 
        ? 'Comment puis-je savoir quel programme d\'immigration me convient le mieux?' 
        : 'How do I know which immigration program is best for me?',
      answer: language === 'fr'
        ? 'Le programme qui vous convient dépend de vos qualifications, de votre expérience professionnelle, de vos compétences linguistiques et de votre situation personnelle. Vous pouvez utiliser l\'outil d\'auto-évaluation d\'Immigration Canada pour avoir une idée ou consulter un conseiller en immigration réglementé pour obtenir des conseils personnalisés.'
        : 'The right program for you depends on your qualifications, work experience, language skills, and personal circumstances. You can use Immigration Canada\'s self-assessment tool to get an idea or consult a regulated immigration consultant for personalized advice.'
    },
    {
      question: language === 'fr' 
        ? 'Puis-je parrainer ma famille pour qu\'elle vienne au Canada une fois que j\'aurai obtenu ma résidence permanente?' 
        : 'Can I sponsor my family to come to Canada once I get my permanent residence?',
      answer: language === 'fr'
        ? 'Oui, en tant que résident permanent ou citoyen canadien, vous pouvez parrainer certains membres de votre famille pour qu\'ils deviennent résidents permanents. Cela comprend votre époux ou conjoint de fait, vos enfants à charge, et dans certains cas, d\'autres membres de la famille comme vos parents et grands-parents.'
        : 'Yes, as a permanent resident or Canadian citizen, you can sponsor certain family members to become permanent residents. This includes your spouse or common-law partner, dependent children, and in some cases, other family members such as parents and grandparents.'
    },
    {
      question: language === 'fr' 
        ? 'Quelle est la différence entre Entrée express et les Programmes des candidats des provinces?' 
        : 'What is the difference between Express Entry and Provincial Nominee Programs?',
      answer: language === 'fr'
        ? 'Entrée express est un système fédéral qui gère les demandes d\'immigration pour plusieurs programmes, y compris la catégorie de l\'expérience canadienne et le programme des travailleurs qualifiés fédéraux. Les Programmes des candidats des provinces sont gérés par les provinces et territoires individuels pour répondre à leurs besoins économiques et démographiques spécifiques. Une nomination provinciale vous donne des points supplémentaires dans le système d\'Entrée express.'
        : 'Express Entry is a federal system that manages immigration applications for several programs, including the Canadian Experience Class and Federal Skilled Worker Program. Provincial Nominee Programs are managed by individual provinces and territories to address their specific economic and demographic needs. A provincial nomination gives you additional points in the Express Entry system.'
    },
    {
      question: language === 'fr' 
        ? 'Combien coûte la demande de résidence permanente?' 
        : 'How much does it cost to apply for permanent residence?',
      answer: language === 'fr'
        ? 'Les frais varient selon le programme et le nombre de personnes incluses dans votre demande. Pour un demandeur principal par l\'intermédiaire d\'Entrée express, les frais sont d\'environ 1 325 CAD, ce qui comprend les frais de traitement, les droits de résidence permanente et les frais biométriques. Des frais supplémentaires s\'appliquent pour les conjoints et les enfants à charge.'
        : 'Fees vary depending on the program and how many people are included in your application. For a principal applicant through Express Entry, fees are around CAD $1,325, which includes processing fees, permanent residence fees, and biometric fees. Additional fees apply for spouses and dependent children.'
    }
  ];

  return (
    <ImmigrationPageLayout
      title={language === 'fr' ? "Résidence Permanente" : "Permanent Residence"}
      headerImage="/lovable-uploads/8723bfa1-a246-4a52-a6aa-e6917ee1059f.png"
      intro={language === 'fr' 
        ? "Découvrez comment obtenir la résidence permanente au Canada et profiter de tous ses avantages." 
        : "Discover how to obtain permanent residence in Canada and enjoy all its benefits."}
      faqItems={faqItems}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Home className="mr-2 text-red-600" />
            {language === 'fr' ? 'À propos de la résidence permanente canadienne' : 'About Canadian Permanent Residence'}
          </h2>
          <p className="text-gray-600 mb-4">
            {language === 'fr' 
              ? 'La résidence permanente canadienne offre le droit de vivre, travailler et étudier n\'importe où au Canada. Les résidents permanents bénéficient de la plupart des droits sociaux et avantages dont jouissent les citoyens canadiens, y compris l\'accès aux soins de santé, aux services sociaux, et aux droits et libertés garantis par la loi canadienne.'
              : 'Canadian Permanent Residence provides the right to live, work and study anywhere in Canada. Permanent residents benefit from most of the social rights and benefits enjoyed by Canadian citizens, including access to healthcare, social services, and rights and freedoms guaranteed by Canadian law.'}
          </p>
          <p className="text-gray-600">
            {language === 'fr'
              ? 'L\'obtention de la résidence permanente est une étape cruciale vers la citoyenneté canadienne, offrant une stabilité et une sécurité à long terme pour vous et votre famille dans l\'un des pays offrant la meilleure qualité de vie au monde.'
              : 'Obtaining permanent residence is a crucial step toward Canadian citizenship, offering long-term stability and security for you and your family in one of the countries with the best quality of life in the world.'}
          </p>
        </section>
        
        {/* Main Immigration Programs */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Award className="mr-2 text-red-600" />
            {language === 'fr' ? 'Principaux programmes d\'immigration' : 'Main Immigration Programs'}
          </h2>
          
          <div className="space-y-5">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Système d\'Entrée express' : 'Express Entry System'}</h3>
              <p className="mb-3">
                {language === 'fr'
                  ? 'Un système de gestion des demandes pour trois programmes fédéraux d\'immigration économique :'
                  : 'A system for managing applications for three federal economic immigration programs:'}
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>{language === 'fr' ? 'Programme des travailleurs qualifiés (fédéral)' : 'Federal Skilled Worker Program'}</strong> - 
                  {language === 'fr' 
                    ? ' Pour les professionnels ayant une expérience de travail qualifié.' 
                    : ' For professionals with skilled work experience.'}
                </li>
                <li>
                  <strong>{language === 'fr' ? 'Programme des métiers spécialisés (fédéral)' : 'Federal Skilled Trades Program'}</strong> - 
                  {language === 'fr' 
                    ? ' Pour les travailleurs qualifiés dans des métiers spécifiques.' 
                    : ' For skilled workers in specific trades.'}
                </li>
                <li>
                  <strong>{language === 'fr' ? 'Catégorie de l\'expérience canadienne' : 'Canadian Experience Class'}</strong> - 
                  {language === 'fr' 
                    ? ' Pour ceux ayant une expérience de travail qualifié au Canada.' 
                    : ' For those with skilled work experience in Canada.'}
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Programmes des candidats des provinces' : 'Provincial Nominee Programs'}</h3>
              <p>
                {language === 'fr'
                  ? 'Les provinces et territoires canadiens peuvent nommer des personnes qui souhaitent immigrer dans leur région et qui ont l\'intention de s\'y installer. Chaque programme provincial a ses propres critères et processus axés sur les besoins spécifiques de la région.'
                  : 'Canadian provinces and territories can nominate individuals who wish to immigrate to their region and intend to settle there. Each provincial program has its own criteria and processes focused on the specific needs of the region.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Programmes de regroupement familial' : 'Family Sponsorship Programs'}</h3>
              <p>
                {language === 'fr'
                  ? 'Les citoyens canadiens et les résidents permanents peuvent parrainer certains membres de leur famille pour qu\'ils deviennent résidents permanents, y compris les époux, les conjoints de fait, les enfants à charge, les parents et les grands-parents.'
                  : 'Canadian citizens and permanent residents can sponsor certain family members to become permanent residents, including spouses, common-law partners, dependent children, parents, and grandparents.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Programmes d\'immigration des gens d\'affaires' : 'Business Immigration Programs'}</h3>
              <p>
                {language === 'fr'
                  ? 'Programmes destinés aux entrepreneurs, aux travailleurs autonomes et aux investisseurs qui souhaitent contribuer à l\'économie canadienne par le biais d\'investissements commerciaux ou en créant des entreprises.'
                  : 'Programs for entrepreneurs, self-employed individuals, and investors who want to contribute to the Canadian economy through business investments or by creating businesses.'}
              </p>
            </div>
          </div>
        </section>
        
        {/* Eligibility Criteria */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Users className="mr-2 text-red-600" />
            {language === 'fr' ? 'Critères d\'éligibilité' : 'Eligibility Criteria'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Éducation' : 'Education'}</h3>
              <p>
                {language === 'fr'
                  ? 'Selon le programme, vous pouvez avoir besoin d\'un diplôme d\'études secondaires, d\'un diplôme post-secondaire ou d\'une équivalence canadienne de vos diplômes étrangers (évaluation des diplômes d\'études - EDE).'
                  : 'Depending on the program, you may need a high school diploma, a post-secondary degree, or a Canadian equivalency of your foreign credentials (Educational Credential Assessment - ECA).'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Compétences linguistiques' : 'Language Skills'}</h3>
              <p>
                {language === 'fr'
                  ? 'La plupart des programmes exigent une preuve de compétence en anglais ou en français (ou les deux), généralement par le biais de tests standardisés comme l\'IELTS, le CELPIP ou le TEF.'
                  : 'Most programs require proof of proficiency in English or French (or both), typically through standardized tests such as IELTS, CELPIP, or TEF.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Expérience professionnelle' : 'Work Experience'}</h3>
              <p>
                {language === 'fr'
                  ? 'De nombreux programmes exigent une expérience de travail qualifié, souvent classifiée selon la Classification nationale des professions (CNP) du Canada.'
                  : 'Many programs require skilled work experience, often classified according to Canada\'s National Occupational Classification (NOC).'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Âge' : 'Age'}</h3>
              <p>
                {language === 'fr'
                  ? 'Bien qu\'il n\'y ait pas d\'âge minimum ou maximum strict, certains programmes attribuent des points en fonction de l\'âge, favorisant généralement les candidats entre 18 et 35 ans.'
                  : 'While there is no strict minimum or maximum age, some programs award points based on age, generally favoring candidates between 18 and 35 years old.'}
              </p>
            </div>
          </div>
        </section>
        
        {/* Application Process */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Clock className="mr-2 text-red-600" />
            {language === 'fr' ? 'Processus de demande' : 'Application Process'}
          </h2>
          
          <ol className="list-decimal list-inside space-y-4 pl-4">
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Déterminer votre éligibilité' : 'Determine Your Eligibility'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Utilisez l\'outil d\'auto-évaluation d\'IRCC ou consultez un conseiller en immigration pour déterminer à quels programmes vous êtes admissible.'
                  : 'Use IRCC\'s self-assessment tool or consult with an immigration advisor to determine which programs you qualify for.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Créer un profil (pour Entrée express)' : 'Create a Profile (for Express Entry)'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Créez un profil en ligne avec des informations sur votre éducation, vos compétences linguistiques et votre expérience professionnelle pour recevoir un score et entrer dans le bassin de candidats.'
                  : 'Create an online profile with information about your education, language skills, and work experience to receive a score and enter the candidate pool.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Recevoir une invitation à présenter une demande' : 'Receive an Invitation to Apply'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Si vous êtes sélectionné, vous recevrez une invitation à présenter une demande de résidence permanente.'
                  : 'If selected, you will receive an invitation to apply for permanent residence.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Soumettre votre demande complète' : 'Submit Your Complete Application'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Préparez et soumettez une demande complète avec tous les documents requis et les frais de traitement.'
                  : 'Prepare and submit a complete application with all required documents and processing fees.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Examen médical et vérifications de sécurité' : 'Medical Examination and Security Checks'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Passez un examen médical et attendez les résultats des vérifications de sécurité et du casier judiciaire.'
                  : 'Undergo a medical examination and wait for security and criminal background check results.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Confirmation de résidence permanente' : 'Confirmation of Permanent Residence'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Si votre demande est approuvée, vous recevrez une confirmation de résidence permanente et un visa de résident permanent (si nécessaire).'
                  : 'If your application is approved, you will receive a confirmation of permanent residence and a permanent resident visa (if needed).'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Arrivée au Canada' : 'Arrival in Canada'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Présentez vos documents à un agent d\'immigration à votre arrivée pour finaliser votre statut de résident permanent.'
                  : 'Present your documents to an immigration officer upon arrival to finalize your permanent resident status.'}
              </p>
            </li>
          </ol>
        </section>
        
        {/* Required Documents */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FileText className="mr-2 text-red-600" />
            {language === 'fr' ? 'Documents requis' : 'Required Documents'}
          </h2>
          
          <p className="text-gray-600 mb-4">
            {language === 'fr'
              ? 'Les documents spécifiques requis peuvent varier selon le programme d\'immigration, mais ils incluent généralement :'
              : 'The specific documents required may vary depending on the immigration program, but they typically include:'}
          </p>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Documents d\'identité' : 'Identity Documents'}</strong> - 
                {language === 'fr' 
                  ? ' Passeport, certificats de naissance, de mariage, de divorce, etc.' 
                  : ' Passport, birth certificates, marriage/divorce certificates, etc.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Documents éducatifs' : 'Educational Documents'}</strong> - 
                {language === 'fr' 
                  ? ' Diplômes, relevés de notes et évaluation des diplômes d\'études (EDE).' 
                  : ' Diplomas, transcripts, and Educational Credential Assessment (ECA).'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Résultats de tests linguistiques' : 'Language Test Results'}</strong> - 
                {language === 'fr' 
                  ? ' Preuve de compétence en anglais ou en français.' 
                  : ' Proof of proficiency in English or French.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Preuve d\'expérience professionnelle' : 'Proof of Work Experience'}</strong> - 
                {language === 'fr' 
                  ? ' Lettres d\'emploi, bulletins de paie, etc.' 
                  : ' Employment reference letters, pay stubs, etc.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Preuves financières' : 'Proof of Funds'}</strong> - 
                {language === 'fr' 
                  ? ' Relevés bancaires montrant que vous avez suffisamment de fonds pour vous établir au Canada.' 
                  : ' Bank statements showing you have enough funds to settle in Canada.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Certificat de police' : 'Police Certificates'}</strong> - 
                {language === 'fr' 
                  ? ' De tous les pays où vous avez vécu pendant plus de 6 mois depuis l\'âge de 18 ans.' 
                  : ' From all countries where you have lived for more than 6 months since the age of 18.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Photographies' : 'Photographs'}</strong> - 
                {language === 'fr' 
                  ? ' Répondant aux spécifications d\'Immigration Canada.' 
                  : ' Meeting Immigration Canada specifications.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Examens médicaux' : 'Medical Examinations'}</strong> - 
                {language === 'fr' 
                  ? ' Effectués par un médecin désigné par l\'IRCC.' 
                  : ' Performed by an IRCC-designated physician.'}
              </span>
            </li>
          </ul>
        </section>
        
        {/* Provincial Programs */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Map className="mr-2 text-red-600" />
            {language === 'fr' ? 'Programmes provinciaux' : 'Provincial Programs'}
          </h2>
          
          <p className="text-gray-600 mb-4">
            {language === 'fr'
              ? 'Chaque province et territoire canadien (à l\'exception du Québec, qui a ses propres programmes d\'immigration) dispose de son propre Programme des candidats des provinces (PCP) adapté à ses besoins économiques et démographiques spécifiques.'
              : 'Each Canadian province and territory (except Quebec, which has its own immigration programs) has its own Provincial Nominee Program (PNP) tailored to its specific economic and demographic needs.'}
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-semibold mb-2">Ontario</h3>
              <p className="text-sm text-gray-600">
                {language === 'fr'
                  ? 'Programme des candidats immigrants de l\'Ontario (PCIO)'
                  : 'Ontario Immigrant Nominee Program (OINP)'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-semibold mb-2">British Columbia</h3>
              <p className="text-sm text-gray-600">
                {language === 'fr'
                  ? 'Programme des candidats de la Colombie-Britannique (BC PNP)'
                  : 'British Columbia Provincial Nominee Program (BC PNP)'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-semibold mb-2">Alberta</h3>
              <p className="text-sm text-gray-600">
                {language === 'fr'
                  ? 'Programme des candidats de l\'Alberta'
                  : 'Alberta Advantage Immigration Program'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-semibold mb-2">Manitoba</h3>
              <p className="text-sm text-gray-600">
                {language === 'fr'
                  ? 'Programme des candidats du Manitoba'
                  : 'Manitoba Provincial Nominee Program'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-semibold mb-2">Saskatchewan</h3>
              <p className="text-sm text-gray-600">
                {language === 'fr'
                  ? 'Programme des candidats immigrants de la Saskatchewan'
                  : 'Saskatchewan Immigrant Nominee Program'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-md font-semibold mb-2">Atlantic Canada</h3>
              <p className="text-sm text-gray-600">
                {language === 'fr'
                  ? 'Programme pilote d\'immigration au Canada atlantique'
                  : 'Atlantic Immigration Pilot Program'}
              </p>
            </div>
          </div>
        </section>
        
        {/* Fees and Timeline */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <DollarSign className="mr-2 text-red-600" />
            {language === 'fr' ? 'Frais et délais' : 'Fees and Timeline'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Frais de demande' : 'Application Fees'}</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>{language === 'fr' ? 'Frais de traitement' : 'Processing Fee'}</strong>: 
                  {language === 'fr' ? ' 825 CAD par demandeur principal' : ' CAD $825 per principal applicant'}
                </li>
                <li>
                  <strong>{language === 'fr' ? 'Droits de résidence permanente' : 'Right of Permanent Residence Fee'}</strong>: 
                  {language === 'fr' ? ' 500 CAD par adulte' : ' CAD $500 per adult'}
                </li>
                <li>
                  <strong>{language === 'fr' ? 'Frais biométriques' : 'Biometric Fee'}</strong>: 
                  {language === 'fr' ? ' 85 CAD par personne' : ' CAD $85 per person'}
                </li>
                <li>
                  <strong>{language === 'fr' ? 'Frais supplémentaires' : 'Additional Fees'}</strong>: 
                  {language === 'fr' 
                    ? ' Pour les examens médicaux, les certificats de police, les traductions, etc.' 
                    : ' For medical exams, police certificates, translations, etc.'}
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Délais de traitement' : 'Processing Time'}</h3>
              <p className="text-gray-600 mb-3">
                {language === 'fr'
                  ? 'Les délais de traitement varient considérablement selon le programme et la situation individuelle :'
                  : 'Processing times vary significantly depending on the program and individual circumstances:'}
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <strong>{language === 'fr' ? 'Entrée express' : 'Express Entry'}</strong>: 
                  {language === 'fr' ? ' 6 à 8 mois en moyenne' : ' 6 to 8 months on average'}
                </li>
                <li>
                  <strong>{language === 'fr' ? 'Programmes des candidats des provinces' : 'Provincial Nominee Programs'}</strong>: 
                  {language === 'fr' ? ' 15 à 19 mois en moyenne' : ' 15 to 19 months on average'}
                </li>
                <li>
                  <strong>{language === 'fr' ? 'Programmes de regroupement familial' : 'Family Sponsorship'}</strong>: 
                  {language === 'fr' ? ' 12 à 24 mois en moyenne' : ' 12 to 24 months on average'}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </ImmigrationPageLayout>
  );
};

export default PermanentResidence;
