
import React from 'react';
import ImmigrationPageLayout from '@/components/immigration/ImmigrationPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, FileText, Home, Clock, DollarSign, Users, Heart } from 'lucide-react';

const PermanentResidence = () => {
  const { language, t } = useLanguage();
  
  // FAQ items
  const faqItems = [
    {
      question: language === 'fr' 
        ? 'Quels sont les avantages de la résidence permanente au Canada?' 
        : 'What are the benefits of permanent residence in Canada?',
      answer: language === 'fr'
        ? 'En tant que résident permanent, vous bénéficiez de la plupart des droits des citoyens canadiens, y compris l\'accès aux soins de santé universels, l\'éducation gratuite jusqu\'au secondaire, le droit de vivre, travailler ou étudier n\'importe où au Canada, et la protection en vertu de la loi canadienne et de la Charte canadienne des droits et libertés.'
        : 'As a permanent resident, you benefit from most of the rights of Canadian citizens, including access to universal healthcare, free education up to secondary school, the right to live, work or study anywhere in Canada, and protection under Canadian law and the Canadian Charter of Rights and Freedoms.'
    },
    {
      question: language === 'fr' 
        ? 'Quelle est la différence entre la résidence permanente et la citoyenneté?' 
        : 'What is the difference between permanent residence and citizenship?',
      answer: language === 'fr'
        ? 'Contrairement aux citoyens, les résidents permanents ne peuvent pas voter ou se présenter aux élections, ne peuvent pas occuper certains emplois nécessitant une habilitation de sécurité de haut niveau, doivent respecter les conditions de résidence pour maintenir leur statut, et peuvent être expulsés pour certaines infractions graves. Pour devenir citoyen, un résident permanent doit avoir vécu au Canada pendant au moins 3 des 5 dernières années.'
        : 'Unlike citizens, permanent residents cannot vote or run in elections, cannot hold certain jobs requiring high-level security clearance, must meet residency requirements to maintain their status, and may be subject to deportation for certain serious offenses. To become a citizen, a permanent resident must have lived in Canada for at least 3 of the past 5 years.'
    },
    {
      question: language === 'fr' 
        ? 'Combien de temps faut-il pour obtenir la résidence permanente?' 
        : 'How long does it take to get permanent residence?',
      answer: language === 'fr'
        ? 'Les délais de traitement varient considérablement selon le programme d\'immigration, le pays d\'origine et d\'autres facteurs. Le processus peut prendre de quelques mois à plusieurs années. Entrée express, par exemple, vise à traiter les demandes en 6 mois, mais d\'autres programmes peuvent prendre plus de temps.'
        : 'Processing times vary significantly depending on the immigration program, country of origin, and other factors. The process can take from a few months to several years. Express Entry, for example, aims to process applications within 6 months, but other programs may take longer.'
    },
    {
      question: language === 'fr' 
        ? 'Quelles sont les exigences linguistiques pour la résidence permanente?' 
        : 'What are the language requirements for permanent residence?',
      answer: language === 'fr'
        ? 'Pour la plupart des programmes d\'immigration économique, vous devez passer un test de langue approuvé et atteindre un certain niveau de compétence en anglais ou en français. Pour Entrée express, par exemple, vous êtes évalué selon le Niveau de compétence linguistique canadien (NCLC) ou le Canadian Language Benchmark (CLB).'
        : 'For most economic immigration programs, you must take an approved language test and reach a certain level of proficiency in English or French. For Express Entry, for example, you are assessed according to the Canadian Language Benchmark (CLB) or Niveau de compétence linguistique canadien (NCLC).'
    },
    {
      question: language === 'fr' 
        ? 'Puis-je parrainer des membres de ma famille une fois que je suis résident permanent?' 
        : 'Can I sponsor family members once I am a permanent resident?',
      answer: language === 'fr'
        ? 'Oui, en tant que résident permanent, vous pouvez parrainer certains membres de votre famille pour qu\'ils viennent au Canada, notamment votre conjoint, vos enfants à charge, et dans certains cas, vos parents et grands-parents. Des conditions spécifiques s\'appliquent à chaque catégorie de parrainage familial.'
        : 'Yes, as a permanent resident, you can sponsor certain family members to come to Canada, including your spouse, dependent children, and in some cases, your parents and grandparents. Specific conditions apply to each family sponsorship category.'
    }
  ];

  return (
    <ImmigrationPageLayout
      title={language === 'fr' ? "Résidence Permanente" : "Permanent Residence"}
      headerImage="/lovable-uploads/bbaf0689-cf6e-4272-b527-b1c55faf3b1f.png"
      intro={language === 'fr' 
        ? "Découvrez les différentes voies d'accès à la résidence permanente canadienne et construisez votre avenir au Canada." 
        : "Discover the different pathways to Canadian permanent residence and build your future in Canada."}
      faqItems={faqItems}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Home className="mr-2 text-red-600" />
            {language === 'fr' ? 'À propos de la résidence permanente' : 'About Permanent Residence'}
          </h2>
          <p className="text-gray-600 mb-4">
            {language === 'fr' 
              ? 'La résidence permanente est un statut qui permet aux ressortissants étrangers de vivre au Canada indéfiniment en tant que résidents permanents. Les résidents permanents bénéficient de la plupart des droits et avantages accordés aux citoyens canadiens, y compris l\'accès aux soins de santé, l\'éducation, et le droit de travailler et d\'étudier n\'importe où au Canada.'
              : 'Permanent residence is a status that allows foreign nationals to live in Canada indefinitely as permanent residents. Permanent residents benefit from most of the rights and privileges granted to Canadian citizens, including access to healthcare, education, and the right to work and study anywhere in Canada.'}
          </p>
          <p className="text-gray-600">
            {language === 'fr'
              ? 'Le Canada offre plusieurs voies d\'accès à la résidence permanente, adaptées à différents profils et situations. Ces programmes sont conçus pour attirer des personnes qui contribueront positivement à l\'économie et à la société canadiennes.'
              : 'Canada offers several pathways to permanent residence, tailored to different profiles and situations. These programs are designed to attract individuals who will contribute positively to the Canadian economy and society.'}
          </p>
        </section>
        
        {/* Key Immigration Programs */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Users className="mr-2 text-red-600" />
            {language === 'fr' ? 'Principaux programmes d\'immigration' : 'Key Immigration Programs'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Entrée Express' : 'Express Entry'}</h3>
              <p>
                {language === 'fr'
                  ? 'Système de gestion des demandes pour trois programmes d\'immigration économique principaux : Programme des travailleurs qualifiés fédéraux, Programme des travailleurs de métiers spécialisés, et Catégorie de l\'expérience canadienne. Le système évalue les candidats selon divers facteurs et invite les mieux classés à présenter une demande de résidence permanente.'
                  : 'Application management system for three main economic immigration programs: Federal Skilled Worker Program, Federal Skilled Trades Program, and Canadian Experience Class. The system evaluates candidates based on various factors and invites the highest-ranked to apply for permanent residence.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Programmes des Provinces' : 'Provincial Nominee Programs'}</h3>
              <p>
                {language === 'fr'
                  ? 'Chaque province et territoire (sauf le Québec) dispose de son propre Programme des candidats des provinces, qui cible des travailleurs ayant les compétences, l\'éducation et l\'expérience professionnelle pour contribuer à l\'économie locale. Une nomination provinciale ajoute des points significatifs à votre profil Entrée express.'
                  : 'Each province and territory (except Quebec) has its own Provincial Nominee Program, which targets workers with the skills, education and work experience to contribute to the local economy. A provincial nomination adds significant points to your Express Entry profile.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Parrainage Familial' : 'Family Sponsorship'}</h3>
              <p>
                {language === 'fr'
                  ? 'Les citoyens canadiens et les résidents permanents peuvent parrainer certains membres de leur famille pour qu\'ils deviennent résidents permanents, y compris les conjoints, les partenaires, les enfants à charge, les parents et les grands-parents.'
                  : 'Canadian citizens and permanent residents can sponsor certain family members to become permanent residents, including spouses, partners, dependent children, parents, and grandparents.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Démarrage d\'Entreprise' : 'Start-up Visa'}</h3>
              <p>
                {language === 'fr'
                  ? 'Ce programme s\'adresse aux entrepreneurs innovants qui souhaitent créer une entreprise au Canada. Vous devez obtenir le soutien d\'une organisation désignée (groupe d\'investisseurs providentiels, fonds de capital-risque ou incubateur d\'entreprises) et répondre à certaines exigences linguistiques et éducatives.'
                  : 'This program is for innovative entrepreneurs looking to start a business in Canada. You must secure support from a designated organization (angel investor group, venture capital fund, or business incubator) and meet certain language and education requirements.'}
              </p>
            </div>
          </div>
        </section>
        
        {/* Key Steps to PR */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Clock className="mr-2 text-red-600" />
            {language === 'fr' ? 'Étapes clés pour obtenir la résidence permanente' : 'Key Steps to Permanent Residence'}
          </h2>
          
          <ol className="list-decimal list-inside space-y-4 pl-4">
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Déterminer votre éligibilité' : 'Determine Your Eligibility'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Évaluez quel programme d\'immigration vous convient le mieux en fonction de votre profil, de vos objectifs et de votre situation personnelle.'
                  : 'Assess which immigration program best suits you based on your profile, goals, and personal situation.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Préparer votre dossier' : 'Prepare Your Application'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Rassemblez tous les documents requis, passez les tests de langue nécessaires, obtenez l\'évaluation de vos diplômes si nécessaire, et assurez-vous de répondre à toutes les exigences spécifiques au programme choisi.'
                  : 'Gather all required documents, take necessary language tests, obtain credential assessment if needed, and ensure you meet all requirements specific to your chosen program.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Soumettre votre demande' : 'Submit Your Application'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Soumettez votre demande complète avec tous les documents justificatifs et payez les frais requis. La plupart des demandes peuvent être soumises en ligne.'
                  : 'Submit your complete application with all supporting documents and pay the required fees. Most applications can be submitted online.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Examen médical et vérifications' : 'Medical Examination and Background Checks'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Passez un examen médical auprès d\'un médecin désigné et soumettez-vous à des vérifications de sécurité et d\'antécédents criminels.'
                  : 'Undergo a medical examination with a designated physician and submit to security and criminal background checks.'}
              </p>
            </li>
            
            <li className="text-gray-700">
              <span className="font-medium">{language === 'fr' ? 'Décision finale' : 'Final Decision'}</span>
              <p className="mt-2 text-gray-600 pl-6">
                {language === 'fr'
                  ? 'Attendez la décision finale sur votre demande. Si elle est approuvée, vous recevrez une confirmation de résidence permanente.'
                  : 'Wait for the final decision on your application. If approved, you will receive confirmation of permanent residence.'}
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
                <strong>{language === 'fr' ? 'Pièce d\'identité' : 'Identification'}</strong> - 
                {language === 'fr' 
                  ? ' Passeport valide ou autre document de voyage.' 
                  : ' Valid passport or other travel document.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Résultats de tests linguistiques' : 'Language Test Results'}</strong> - 
                {language === 'fr' 
                  ? ' D\'un organisme de test approuvé (IELTS, CELPIP pour l\'anglais; TEF, TCF pour le français).' 
                  : ' From an approved testing organization (IELTS, CELPIP for English; TEF, TCF for French).'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Évaluation des diplômes' : 'Educational Credential Assessment'}</strong> - 
                {language === 'fr' 
                  ? ' Pour les diplômes obtenus à l\'étranger, afin de vérifier qu\'ils correspondent aux normes canadiennes.' 
                  : ' For credentials obtained outside Canada, to verify they meet Canadian standards.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Preuve d\'expérience professionnelle' : 'Proof of Work Experience'}</strong> - 
                {language === 'fr' 
                  ? ' Lettres de référence, contrats, bulletins de paie, etc.' 
                  : ' Reference letters, contracts, pay stubs, etc.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Preuve de fonds' : 'Proof of Funds'}</strong> - 
                {language === 'fr' 
                  ? ' Pour démontrer que vous pouvez subvenir à vos besoins et à ceux de votre famille lors de votre installation au Canada.' 
                  : ' To demonstrate you can support yourself and your family upon settling in Canada.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Certificat de police' : 'Police Certificates'}</strong> - 
                {language === 'fr' 
                  ? ' De chaque pays où vous avez vécu pendant six mois ou plus depuis l\'âge de 18 ans.' 
                  : ' From each country where you have lived for six months or more since the age of 18.'}
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
                  ? 'Les frais varient selon le programme et le nombre de personnes incluses dans la demande. En général, comptez environ 1 325 CAD pour le demandeur principal, 1 325 CAD pour un conjoint, et 225 CAD par enfant à charge. Des frais de droit de résidence permanente de 500 CAD s\'appliquent également pour chaque adulte.'
                  : 'Fees vary by program and the number of people included in the application. Generally, expect about CAD $1,325 for the principal applicant, CAD $1,325 for a spouse, and CAD $225 per dependent child. A right of permanent residence fee of CAD $500 also applies for each adult.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Délais de traitement' : 'Processing Time'}</h3>
              <p>
                {language === 'fr'
                  ? 'Les délais de traitement varient considérablement selon le programme et d\'autres facteurs. Pour Entrée express, l\'objectif est de traiter 80% des demandes en 6 mois. Pour d\'autres programmes, le traitement peut prendre de plusieurs mois à quelques années. Consultez le site web d\'IRCC pour les estimations de délais actuelles.'
                  : 'Processing times vary significantly by program and other factors. For Express Entry, the goal is to process 80% of applications within 6 months. For other programs, processing may take from several months to a few years. Check the IRCC website for current timeline estimates.'}
              </p>
            </div>
          </div>
        </section>
        
        {/* After Obtaining PR */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Heart className="mr-2 text-red-600" />
            {language === 'fr' ? 'Après l\'obtention de la résidence permanente' : 'After Obtaining Permanent Residence'}
          </h2>
          
          <div className="bg-gray-50 p-5 rounded-lg">
            <p className="text-gray-600 mb-4">
              {language === 'fr'
                ? 'Une fois que vous avez obtenu la résidence permanente, vous devez :'
                : 'Once you have obtained permanent residence, you must:'}
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>
                {language === 'fr'
                  ? 'Respecter l\'exigence de résidence (être physiquement présent au Canada pendant au moins 730 jours sur une période de 5 ans) pour maintenir votre statut.'
                  : 'Meet the residency requirement (be physically present in Canada for at least 730 days in a 5-year period) to maintain your status.'}
              </li>
              <li>
                {language === 'fr'
                  ? 'Renouveler votre carte de résident permanent tous les 5 ans.'
                  : 'Renew your permanent resident card every 5 years.'}
              </li>
              <li>
                {language === 'fr'
                  ? 'Respecter les lois canadiennes pour éviter de perdre votre statut.'
                  : 'Respect Canadian laws to avoid losing your status.'}
              </li>
              <li>
                {language === 'fr'
                  ? 'Après 3 ans de résidence permanente, vous pouvez demander la citoyenneté canadienne si vous répondez à toutes les exigences.'
                  : 'After 3 years of permanent residence, you can apply for Canadian citizenship if you meet all requirements.'}
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ImmigrationPageLayout>
  );
};

export default PermanentResidence;
