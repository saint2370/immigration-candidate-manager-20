
import React from 'react';
import ImmigrationPageLayout from '@/components/immigration/ImmigrationPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, FileText, GraduationCap, Clock, DollarSign } from 'lucide-react';

const StudentVisa = () => {
  const { language, t } = useLanguage();
  
  // FAQ items
  const faqItems = [
    {
      question: language === 'fr' 
        ? 'Combien de temps puis-je rester au Canada avec un permis d\'études?' 
        : 'How long can I stay in Canada with a study permit?',
      answer: language === 'fr'
        ? 'La durée de votre permis d\'études correspond généralement à la durée de votre programme d\'études, plus une période supplémentaire de 90 jours pour vous permettre de quitter le Canada ou de demander une prolongation de votre séjour.'
        : 'The duration of your study permit generally matches the duration of your study program, plus an additional 90-day period to allow you to leave Canada or apply for an extension of your stay.'
    },
    {
      question: language === 'fr' 
        ? 'Puis-je travailler pendant mes études?' 
        : 'Can I work while studying?',
      answer: language === 'fr'
        ? 'Oui, avec un permis d\'études valide, vous pouvez travailler jusqu\'à 20 heures par semaine pendant les sessions régulières et à temps plein pendant les congés scolaires, comme les vacances d\'été ou d\'hiver, sans avoir besoin d\'un permis de travail distinct.'
        : 'Yes, with a valid study permit, you can work up to 20 hours per week during regular academic sessions and full-time during scheduled breaks, such as summer or winter holidays, without needing a separate work permit.'
    },
    {
      question: language === 'fr' 
        ? 'Puis-je inclure mon conjoint et mes enfants dans ma demande?' 
        : 'Can I include my spouse and children in my application?',
      answer: language === 'fr'
        ? 'Votre conjoint peut être admissible à un permis de travail ouvert pendant que vous étudiez. Vos enfants peuvent venir avec vous au Canada et fréquenter des écoles primaires ou secondaires. Vous devrez faire une demande séparée pour chaque membre de la famille.'
        : 'Your spouse may be eligible for an open work permit while you study. Your children can come with you to Canada and attend primary or secondary schools. You will need to apply separately for each family member.'
    },
    {
      question: language === 'fr' 
        ? 'De combien d\'argent ai-je besoin pour prouver que je peux subvenir à mes besoins?' 
        : 'How much money do I need to prove I can support myself?',
      answer: language === 'fr'
        ? 'Vous devez prouver que vous disposez de suffisamment de fonds pour payer vos frais de scolarité et vos frais de subsistance pour vous et les membres de votre famille qui viennent au Canada avec vous. Pour un étudiant seul, il est généralement recommandé de disposer d\'au moins 10 000 $ CAD par an en plus des frais de scolarité.'
        : 'You need to prove you have enough money to pay your tuition and living expenses for yourself and any family members who come to Canada with you. For a single student, it is generally recommended to have at least CAD $10,000 per year in addition to tuition fees.'
    },
    {
      question: language === 'fr' 
        ? 'Puis-je rester au Canada après avoir terminé mes études?' 
        : 'Can I stay in Canada after I finish my studies?',
      answer: language === 'fr'
        ? 'Oui, vous pouvez être admissible à un permis de travail post-diplôme (PTPD) qui vous permet de rester au Canada et d\'acquérir une expérience de travail précieuse. La durée de ce permis dépend de la durée de votre programme d\'études et peut aller jusqu\'à 3 ans.'
        : 'Yes, you may be eligible for a Post-Graduation Work Permit (PGWP) that allows you to stay in Canada and gain valuable work experience. The duration of this permit depends on the length of your study program and can be up to 3 years.'
    }
  ];

  return (
    <ImmigrationPageLayout
      title={language === 'fr' ? "Visa Étudiant" : "Student Visa"}
      headerImage="/lovable-uploads/0791dc74-a2c6-4108-b35f-44c5bba6ddfb.png"
      intro={language === 'fr' 
        ? "Découvrez comment étudier au Canada et profiter d'un système éducatif de classe mondiale." 
        : "Discover how to study in Canada and benefit from a world-class education system."}
      faqItems={faqItems}
    >
      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <GraduationCap className="mr-2 text-red-600" />
            {language === 'fr' ? 'À propos du visa étudiant canadien' : 'About the Canadian Student Visa'}
          </h2>
          <p className="text-gray-600 mb-4">
            {language === 'fr' 
              ? 'Le permis d\'études canadien est un document officiel délivré par le gouvernement du Canada qui permet aux étudiants étrangers d\'étudier dans des établissements d\'enseignement canadiens. Ce permis est obligatoire pour la plupart des étudiants internationaux qui souhaitent poursuivre des études au Canada pendant plus de six mois.'
              : 'The Canadian Study Permit is an official document issued by the Government of Canada that allows foreign students to study at designated learning institutions in Canada. This permit is mandatory for most international students who want to pursue studies in Canada for more than six months.'}
          </p>
          <p className="text-gray-600">
            {language === 'fr'
              ? 'Le Canada est reconnu pour son système d\'éducation de haute qualité, son environnement multiculturel et sa qualité de vie exceptionnelle, ce qui en fait une destination de choix pour les étudiants internationaux.'
              : 'Canada is known for its high-quality education system, multicultural environment, and exceptional quality of life, making it a preferred destination for international students.'}
          </p>
        </section>
        
        {/* Application Process */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <Clock className="mr-2 text-red-600" />
            {language === 'fr' ? 'Processus de demande' : 'Application Process'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Étape 1: Admission' : 'Step 1: Admission'}</h3>
              <p>
                {language === 'fr'
                  ? 'Obtenez une lettre d\'acceptation d\'une institution d\'enseignement désignée (DLI) au Canada avant de faire votre demande de permis d\'études.'
                  : 'Obtain a letter of acceptance from a Designated Learning Institution (DLI) in Canada before applying for a study permit.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Étape 2: Documentation' : 'Step 2: Documentation'}</h3>
              <p>
                {language === 'fr'
                  ? 'Rassemblez tous les documents requis, y compris la preuve de moyens financiers, les documents d\'identité et les documents académiques.'
                  : 'Gather all required documents, including proof of financial means, identity documents, and academic documents.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Étape 3: Demande' : 'Step 3: Application'}</h3>
              <p>
                {language === 'fr'
                  ? 'Soumettez votre demande en ligne via le portail d\'Immigration, Réfugiés et Citoyenneté Canada (IRCC) et payez les frais requis.'
                  : 'Submit your application online through the Immigration, Refugees and Citizenship Canada (IRCC) portal and pay the required fees.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Étape 4: Suivi' : 'Step 4: Follow-up'}</h3>
              <p>
                {language === 'fr'
                  ? 'Attendez la décision et fournissez des données biométriques si demandé. Une fois approuvé, recevez votre permis d\'études à votre arrivée au Canada.'
                  : 'Wait for a decision and provide biometric data if requested. Once approved, receive your study permit upon arrival in Canada.'}
              </p>
            </div>
          </div>
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
                <strong>{language === 'fr' ? 'Lettre d\'acceptation' : 'Letter of Acceptance'}</strong> - 
                {language === 'fr' 
                  ? ' De votre institution d\'enseignement désignée.' 
                  : ' From your designated learning institution.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Preuve de moyens financiers' : 'Proof of Financial Support'}</strong> - 
                {language === 'fr' 
                  ? ' Pour couvrir les frais de scolarité et de subsistance.' 
                  : ' To cover tuition fees and living expenses.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Passeport valide' : 'Valid Passport'}</strong> - 
                {language === 'fr' 
                  ? ' Avec une validité suffisante pour la durée de vos études.' 
                  : ' With validity extending beyond your period of study.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Photographies' : 'Photographs'}</strong> - 
                {language === 'fr' 
                  ? ' Qui répondent aux exigences spécifiques de l\'IRCC.' 
                  : ' Meeting IRCC specific requirements.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Lettre d\'explication' : 'Letter of Explanation'}</strong> - 
                {language === 'fr' 
                  ? ' Expliquant pourquoi vous souhaitez étudier au Canada.' 
                  : ' Explaining why you want to study in Canada.'}
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="text-green-600 mt-1 mr-2 flex-shrink-0" size={18} />
              <span>
                <strong>{language === 'fr' ? 'Certificat médical' : 'Medical Examination'}</strong> - 
                {language === 'fr' 
                  ? ' Si requis, selon votre pays d\'origine et la durée de votre séjour.' 
                  : ' If required, based on your country of origin and length of stay.'}
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
                  ? 'Les frais de traitement pour un permis d\'études sont de 150 CAD. Des frais supplémentaires de 85 CAD peuvent s\'appliquer pour les données biométriques.'
                  : 'The processing fee for a study permit is CAD $150. Additional fees of CAD $85 may apply for biometric data.'}
              </p>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">{language === 'fr' ? 'Délais de traitement' : 'Processing Time'}</h3>
              <p>
                {language === 'fr'
                  ? 'Les délais de traitement varient selon votre pays de résidence, mais peuvent généralement prendre de 2 à 16 semaines. Il est conseillé de vérifier les délais actuels sur le site web d\'IRCC.'
                  : 'Processing times vary depending on your country of residence but can generally take 2 to 16 weeks. It is advisable to check current times on the IRCC website.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </ImmigrationPageLayout>
  );
};

export default StudentVisa;
