
import React from 'react';
import ImmigrationPageLayout from '@/components/immigration/ImmigrationPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, FileText, Briefcase, Clock, DollarSign, Users } from 'lucide-react';

const WorkVisa = () => {
  const { language, t } = useLanguage();
  
  // FAQ items
  const faqItems = [
    {
      question: language === 'fr' 
        ? 'Quelle est la différence entre un permis de travail ouvert et un permis de travail fermé?' 
        : 'What is the difference between an open work permit and a closed work permit?',
      answer: language === 'fr'
        ? 'Un permis de travail fermé est lié à un employeur spécifique au Canada, ce qui signifie que vous ne pouvez travailler que pour cet employeur. Un permis de travail ouvert vous permet de travailler pour n\'importe quel employeur au Canada, sauf ceux qui offrent des services à caractère sexuel ou qui ne respectent pas régulièrement les normes d\'emploi.'
        : 'A closed work permit is tied to a specific employer in Canada, meaning you can only work for that employer. An open work permit allows you to work for any employer in Canada, except those that offer sexual services or regularly fail to comply with employment standards.'
    },
    {
      question: language === 'fr' 
        ? 'Puis-je demander un permis de travail depuis le Canada?' 
        : 'Can I apply for a work permit from within Canada?',
      answer: language === 'fr'
        ? 'Oui, dans certaines circonstances, vous pouvez demander un permis de travail depuis le Canada. Par exemple, si vous êtes un étudiant international qui a terminé ses études ou si vous êtes déjà au Canada avec un statut de visiteur et que vous avez une offre d\'emploi valide.'
        : 'Yes, in certain circumstances, you can apply for a work permit from within Canada. For example, if you are an international student who has completed their studies, or if you are already in Canada with visitor status and have a valid job offer.'
    },
    {
      question: language === 'fr' 
        ? 'Combien de temps puis-je rester au Canada avec un permis de travail?' 
        : 'How long can I stay in Canada with a work permit?',
      answer: language === 'fr'
        ? 'La durée de votre permis de travail dépend généralement de votre situation spécifique, comme la durée de votre contrat de travail. Les permis de travail peuvent être valables pour des périodes allant de quelques mois à plusieurs années, avec des renouvellements possibles si vous répondez aux critères.'
        : 'The duration of your work permit generally depends on your specific situation, such as the length of your employment contract. Work permits can be valid for periods ranging from a few months to several years, with renewals possible if you meet the criteria.'
    },
    {
      question: language === 'fr' 
        ? 'Puis-je inclure ma famille dans ma demande de permis de travail?' 
        : 'Can I include my family in my work permit application?',
      answer: language === 'fr'
        ? 'Votre conjoint ou partenaire peut être admissible à un permis de travail ouvert et vos enfants à charge peuvent être admissibles à étudier au Canada. Vous devrez soumettre des demandes séparées pour chaque membre de la famille.'
        : 'Your spouse or partner may be eligible for an open work permit, and your dependent children may be eligible to study in Canada. You will need to submit separate applications for each family member.'
    },
    {
      question: language === 'fr' 
        ? 'Le permis de travail me donne-t-il accès aux soins de santé canadiens?' 
        : 'Does the work permit give me access to Canadian healthcare?',
      answer: language === 'fr'
        ? 'Avec un permis de travail valide, vous pourriez être admissible à une couverture d\'assurance maladie provinciale ou territoriale, selon la province ou le territoire où vous vivez et la durée de votre permis de travail. Il est recommandé de souscrire à une assurance privée en attendant que cette couverture entre en vigueur.'
        : 'With a valid work permit, you may be eligible for provincial or territorial health insurance coverage, depending on the province or territory where you live and the duration of your work permit. It is recommended to purchase private insurance while waiting for this coverage to take effect.'
    }
  ];

  return (
    <ImmigrationPageLayout
      title={language === 'fr' ? "Visa de Travail" : "Work Visa"}
      headerImage="/lovable-uploads/fd39e6b7-2604-4a75-9d31-0e861c44104d.png"
      intro={language === 'fr' 
        ? "Découvrez comment obtenir un permis de travail pour accéder au marché du travail canadien." 
        : "Discover how to obtain a work permit to access the Canadian job market."}
      faqItems={faqItems}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Briefcase className="mr-2 text-red-600" />
            {language === 'fr' ? 'À propos du visa de travail canadien' : 'About the Canadian Work Visa'}
          </h2>
          <p className="text-gray-600 mb-4">
            {language === 'fr' 
              ? 'Le permis de travail canadien est un document officiel qui permet aux ressortissants étrangers de travailler légalement au Canada. Il existe différents types de permis de travail adaptés à diverses situations professionnelles, qui offrent des opportunités de croissance de carrière et d\'intégration dans la société canadienne.'
              : 'The Canadian Work Permit is an official document that allows foreign nationals to legally work in Canada. There are different types of work permits suited to various professional situations, offering opportunities for career growth and integration into Canadian society.'}
          </p>
          <p className="text-gray-600">
            {language === 'fr'
              ? 'Le Canada cherche activement à attirer des travailleurs qualifiés pour contribuer à son économie et combler les pénuries de main-d\'œuvre dans certains secteurs, offrant ainsi des perspectives d\'emploi intéressantes pour les candidats internationaux.'
              : 'Canada is actively seeking to attract skilled workers to contribute to its economy and fill labor shortages in certain sectors, thus offering interesting employment prospects for international candidates.'}
          </p>
        </section>
        
        {/* Types of Work Permits */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Users className="mr-2 text-red-600" />
            {language === 'fr' ? 'Types de permis de travail' : 'Types of Work Permits'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Permis de travail fermé' : 'Employer-Specific Work Permit'}</h3>
              <p>
                {language === 'fr'
                  ? 'Ce permis est lié à un employeur spécifique, à un poste et à un lieu de travail précis. Il est généralement délivré sur la base d\'une Étude d\'impact sur le marché du travail (EIMT) positive de l\'employeur.'
                  : 'This permit is tied to a specific employer, position, and workplace. It is typically issued based on a positive Labour Market Impact Assessment (LMIA) from the employer.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Permis de travail ouvert' : 'Open Work Permit'}</h3>
              <p>
                {language === 'fr'
                  ? 'Ce permis vous permet de travailler pour n\'importe quel employeur au Canada. Il est disponible dans des situations spécifiques, comme pour les conjoints de travailleurs qualifiés, les diplômés d\'établissements canadiens, ou dans le cadre de certains accords internationaux.'
                  : 'This permit allows you to work for any employer in Canada. It\'s available in specific situations, such as for spouses of skilled workers, graduates from Canadian institutions, or under certain international agreements.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Programme de mobilité internationale' : 'International Mobility Program'}</h3>
              <p>
                {language === 'fr'
                  ? 'Ces permis sont exemptés d\'EIMT, généralement en raison d\'accords internationaux (comme l\'ALENA/AEUMC) ou d\'intérêts canadiens plus larges, y compris les avantages économiques, culturels ou autres.'
                  : 'These permits are LMIA-exempt, typically because of international agreements (like NAFTA/CUSMA) or broader Canadian interests, including economic, cultural, or other benefits.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Programme des travailleurs étrangers temporaires' : 'Temporary Foreign Worker Program'}</h3>
              <p>
                {language === 'fr'
                  ? 'Ce programme permet aux employeurs canadiens d\'embaucher des étrangers pour combler des pénuries de main-d\'œuvre temporaires lorsqu\'aucun Canadien ou résident permanent n\'est disponible. Une EIMT est généralement requise.'
                  : 'This program allows Canadian employers to hire foreigners to fill temporary labor shortages when no Canadians or permanent residents are available. An LMIA is typically required.'}
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
                  ? 'Vérifiez si vous êtes admissible à un permis de travail canadien et quel type de permis vous convient le mieux.'
                  : 'Check if you qualify for a Canadian work permit and which type of permit suits you best.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Obtenir une offre d\'emploi' : 'Secure a Job Offer'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Dans la plupart des cas, vous avez besoin d\'une offre d\'emploi valide d\'un employeur canadien. Pour les permis de travail fermés, l\'employeur peut avoir besoin d\'obtenir une EIMT.'
                  : 'In most cases, you need a valid job offer from a Canadian employer. For employer-specific work permits, the employer may need to obtain an LMIA.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Rassembler les documents' : 'Gather Documents'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Préparez tous les documents requis, y compris votre passeport, votre offre d\'emploi, et toute autre documentation spécifique à votre situation.'
                  : 'Prepare all required documents, including your passport, job offer, and any other documentation specific to your situation.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Soumettre votre demande' : 'Submit Your Application'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Soumettez votre demande en ligne ou sur papier, selon votre situation. Payez les frais de traitement requis.'
                  : 'Submit your application online or on paper, depending on your situation. Pay the required processing fees.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Attendre une décision' : 'Wait for a Decision'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Les délais de traitement varient selon votre pays de résidence et le type de permis de travail demandé.'
                  : 'Processing times vary depending on your country of residence and the type of work permit you\'re applying for.'}
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
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Offre d\'emploi' : 'Job Offer'}</strong> - 
                {language === 'fr' 
                  ? ' De votre employeur canadien, avec détails du poste et conditions de travail.' 
                  : ' From your Canadian employer, with details of the position and working conditions.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'EIMT (si applicable)' : 'LMIA (if applicable)'}</strong> - 
                {language === 'fr' 
                  ? ' Document confirmant que l\'embauche d\'un travailleur étranger n\'aura pas d\'impact négatif sur le marché du travail canadien.' 
                  : ' Document confirming that hiring a foreign worker will not negatively impact the Canadian labor market.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Passeport valide' : 'Valid Passport'}</strong> - 
                {language === 'fr' 
                  ? ' Valide pour la durée prévue de votre séjour au Canada.' 
                  : ' Valid for the planned duration of your stay in Canada.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Preuve de qualifications' : 'Proof of Qualifications'}</strong> - 
                {language === 'fr' 
                  ? ' Diplômes, certificats ou expérience professionnelle pertinente.' 
                  : ' Diplomas, certificates, or relevant professional experience.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Preuve de moyens financiers' : 'Proof of Financial Means'}</strong> - 
                {language === 'fr' 
                  ? ' Pour démontrer que vous pouvez subvenir à vos besoins et à ceux de votre famille.' 
                  : ' To demonstrate you can support yourself and your family.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Certificat médical' : 'Medical Examination'}</strong> - 
                {language === 'fr' 
                  ? ' Si requis, selon votre pays d\'origine et le type de travail.' 
                  : ' If required, depending on your country of origin and type of work.'}
              </span>
            </li>
          </ul>
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
              <p>
                {language === 'fr'
                  ? 'Les frais de traitement pour un permis de travail sont généralement de 155 CAD. Des frais supplémentaires de 85 CAD peuvent s\'appliquer pour les données biométriques.'
                  : 'The processing fee for a work permit is generally CAD $155. Additional fees of CAD $85 may apply for biometric data.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Délais de traitement' : 'Processing Time'}</h3>
              <p>
                {language === 'fr'
                  ? 'Les délais de traitement varient considérablement selon le pays où vous présentez votre demande, le type de permis de travail et votre situation individuelle. Ils peuvent aller de quelques semaines à plusieurs mois.'
                  : 'Processing times vary significantly depending on the country where you submit your application, the type of work permit, and your individual situation. They can range from a few weeks to several months.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </ImmigrationPageLayout>
  );
};

export default WorkVisa;
