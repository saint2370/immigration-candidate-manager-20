
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ImmigrationPageLayout from '@/components/immigration/ImmigrationPageLayout';
import { Card } from '@/components/ui/card';
import { Briefcase, Users, GraduationCap, Clock, Building } from 'lucide-react';

const NewImmigrationPrograms = () => {
  const { language } = useLanguage();
  
  const headerImage = "https://www.canada.ca/content/dam/ircc/images/services/visit-canada/8-banner.jpg";
  
  const programs = [
    {
      icon: <Users size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Parrainage des familles' : 'Family Sponsorship',
      description: language === 'fr' 
        ? 'Programme permettant aux citoyens canadiens et aux résidents permanents de parrainer des membres de leur famille proche pour venir au Canada. En 2025, les délais de traitement sont réduits et le processus simplifié.'
        : 'Program allowing Canadian citizens and permanent residents to sponsor close family members to come to Canada. In 2025, processing times are reduced and the process is simplified.',
      eligibility: language === 'fr'
        ? 'Être citoyen canadien ou résident permanent, avoir plus de 18 ans, et démontrer la capacité financière de subvenir aux besoins des membres de la famille parrainés.'
        : 'Be a Canadian citizen or permanent resident, be over 18 years old, and demonstrate the financial capacity to support sponsored family members.',
      process: language === 'fr'
        ? 'Soumission de la demande de parrainage, paiement des frais, vérification d\'admissibilité, puis traitement de la demande de résidence permanente du membre de la famille.'
        : 'Submit sponsorship application, pay fees, eligibility check, then process the family member\'s permanent residence application.'
    },
    {
      icon: <Briefcase size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Programme des travailleurs qualifiés' : 'Skilled Worker Program',
      description: language === 'fr'
        ? 'Programme destiné aux travailleurs ayant des compétences recherchées au Canada. Les nouveaux critères 2025 accordent plus de points pour l\'expérience canadienne et les compétences linguistiques.'
        : 'Program for workers with skills in demand in Canada. The new 2025 criteria award more points for Canadian experience and language skills.',
      eligibility: language === 'fr'
        ? 'Avoir au moins un an d\'expérience professionnelle dans une profession qualifiée, connaissance du français ou de l\'anglais, et un niveau d\'éducation suffisant.'
        : 'Have at least one year of work experience in a skilled occupation, knowledge of French or English, and sufficient education level.',
      process: language === 'fr'
        ? 'Création d\'un profil Entrée express, réception d\'une invitation à présenter une demande si sélectionné, soumission de la demande de résidence permanente.'
        : 'Create an Express Entry profile, receive an invitation to apply if selected, submit permanent residence application.'
    },
    {
      icon: <Building size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Visa pour entrepreneurs et investisseurs' : 'Entrepreneur and Investor Visa',
      description: language === 'fr'
        ? 'Programme conçu pour les entrepreneurs qui souhaitent créer une entreprise au Canada ou les investisseurs prêts à investir dans l\'économie canadienne. Le programme 2025 offre des voies accélérées pour les startups innovantes.'
        : 'Program designed for entrepreneurs wishing to start a business in Canada or investors ready to invest in the Canadian economy. The 2025 program offers accelerated pathways for innovative startups.',
      eligibility: language === 'fr'
        ? 'Avoir une expérience de gestion d\'entreprise, un patrimoine net minimal, et un plan d\'affaires viable ou un investissement qualifié. Des critères spécifiques s\'appliquent selon la province.'
        : 'Have business management experience, minimum net worth, and a viable business plan or qualified investment. Specific criteria apply depending on the province.',
      process: language === 'fr'
        ? 'Soumission d\'un plan d\'affaires ou d\'une proposition d\'investissement, entretien avec les responsables du programme, obtention d\'un visa conditionnel, puis résidence permanente après conditions remplies.'
        : 'Submit a business plan or investment proposal, interview with program officials, obtain a conditional visa, then permanent residence after conditions are met.'
    },
    {
      icon: <GraduationCap size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Programme pour étudiants internationaux' : 'International Student Program',
      description: language === 'fr'
        ? 'Nouveau programme facilitant l\'accès à la résidence permanente pour les diplômés internationaux d\'établissements canadiens. Le programme 2025 inclut des voies spécifiques pour les étudiants dans des domaines à forte demande.'
        : 'New program facilitating access to permanent residence for international graduates of Canadian institutions. The 2025 program includes specific pathways for students in high-demand fields.',
      eligibility: language === 'fr'
        ? 'Avoir obtenu un diplôme d\'un établissement d\'enseignement canadien reconnu, une expérience de travail canadienne post-diplôme, et démontrer des compétences linguistiques adéquates.'
        : 'Have graduated from a recognized Canadian educational institution, have post-graduation Canadian work experience, and demonstrate adequate language skills.',
      process: language === 'fr'
        ? 'Obtention d\'un permis de travail post-diplôme, acquisition d\'expérience professionnelle canadienne qualifiante, puis demande de résidence permanente via Entrée express ou un programme provincial.'
        : 'Obtain a post-graduation work permit, acquire qualifying Canadian work experience, then apply for permanent residence through Express Entry or a provincial program.'
    },
    {
      icon: <Clock size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Programme des résidences temporaires et prolongations' : 'Temporary Residence and Extensions Program',
      description: language === 'fr'
        ? 'Programme simplifié pour les visiteurs, travailleurs et étudiants temporaires souhaitant prolonger leur séjour au Canada. Les modifications 2025 permettent des extensions en ligne et des transitions plus faciles entre statuts.'
        : 'Simplified program for temporary visitors, workers and students wishing to extend their stay in Canada. The 2025 changes allow for online extensions and easier transitions between statuses.',
      eligibility: language === 'fr'
        ? 'Avoir un statut légal au Canada, démontrer l\'intention de quitter le Canada à la fin de la période autorisée, et répondre aux exigences spécifiques selon le type de permis temporaire.'
        : 'Have legal status in Canada, demonstrate intent to leave Canada at the end of the authorized period, and meet specific requirements depending on the type of temporary permit.',
      process: language === 'fr'
        ? 'Soumission d\'une demande de prolongation avant l\'expiration du statut actuel, fourniture des documents justificatifs, et maintien du statut implicite pendant le traitement de la demande.'
        : 'Submit an extension application before current status expires, provide supporting documents, and maintain implied status during application processing.'
    }
  ];
  
  const faqItems = [
    {
      question: language === 'fr' ? 'Quels sont les délais de traitement pour les nouveaux programmes 2025 ?' : 'What are the processing times for the new 2025 programs?',
      answer: language === 'fr' 
        ? 'Les délais de traitement varient selon le programme et le volume de demandes, mais le gouvernement canadien s\'engage à réduire les délais pour tous les nouveaux programmes 2025. Consultez régulièrement le site d\'IRCC pour les mises à jour des délais de traitement.' 
        : 'Processing times vary by program and application volume, but the Canadian government is committed to reducing times for all new 2025 programs. Check the IRCC website regularly for processing time updates.'
    },
    {
      question: language === 'fr' ? 'Puis-je déposer une demande pour plusieurs programmes simultanément ?' : 'Can I apply for multiple programs simultaneously?',
      answer: language === 'fr'
        ? 'Oui, vous pouvez soumettre des demandes pour plusieurs programmes d\'immigration simultanément. Cependant, des frais distincts s\'appliquent à chaque demande, et vous devez satisfaire aux critères d\'admissibilité de chaque programme.' 
        : 'Yes, you can submit applications for multiple immigration programs simultaneously. However, separate fees apply to each application, and you must meet the eligibility criteria for each program.'
    },
    {
      question: language === 'fr' ? 'Comment puis-je vérifier l\'état de ma demande pour les nouveaux programmes ?' : 'How can I check the status of my application for the new programs?',
      answer: language === 'fr'
        ? 'Vous pouvez vérifier l\'état de votre demande en ligne via votre compte IRCC. Vous aurez besoin de votre numéro de confirmation de demande et de vos informations personnelles pour accéder à votre dossier.' 
        : 'You can check your application status online through your IRCC account. You will need your application confirmation number and personal information to access your file.'
    },
    {
      question: language === 'fr' ? 'Les nouveaux programmes de 2025 offrent-ils des avantages par rapport aux programmes existants ?' : 'Do the new 2025 programs offer advantages over existing programs?',
      answer: language === 'fr'
        ? 'Oui, les nouveaux programmes 2025 offrent généralement des processus simplifiés, des délais de traitement plus courts, et des critères d\'admissibilité mieux adaptés aux besoins actuels du marché du travail canadien et aux objectifs d\'immigration du pays.' 
        : 'Yes, the new 2025 programs generally offer streamlined processes, shorter processing times, and eligibility criteria better adapted to the current needs of the Canadian labor market and the country\'s immigration objectives.'
    }
  ];

  return (
    <ImmigrationPageLayout
      title={language === 'fr' ? 'Nouveaux Programmes d\'Immigration 2025' : 'New Immigration Programs 2025'}
      headerImage={headerImage}
      intro={language === 'fr' 
        ? 'Découvrez les nouveaux programmes d\'immigration canadienne pour 2025, conçus pour attirer un plus grand nombre de travailleurs qualifiés, d\'entrepreneurs, d\'étudiants et de familles.'
        : 'Discover new Canadian immigration programs for 2025, designed to attract more skilled workers, entrepreneurs, students and families.'}
      faqItems={faqItems}
    >
      <div className="space-y-10">
        {programs.map((program, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-4 md:items-center mb-4">
                <div className="bg-red-50 p-3 rounded-full inline-flex">
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{program.title}</h3>
              </div>
              
              <p className="text-gray-700 mb-6">{program.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">
                    {language === 'fr' ? 'Critères d\'admissibilité' : 'Eligibility Criteria'}
                  </h4>
                  <p className="text-gray-600">{program.eligibility}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-700 mb-2">
                    {language === 'fr' ? 'Processus de demande' : 'Application Process'}
                  </h4>
                  <p className="text-gray-600">{program.process}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ImmigrationPageLayout>
  );
};

export default NewImmigrationPrograms;
