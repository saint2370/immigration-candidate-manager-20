
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, DollarSign, GraduationCap, ClockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NewImmigrationPrograms = () => {
  const { language } = useLanguage();
  
  const programs = [
    {
      id: 1,
      title: language === 'fr' ? 'Parrainage des familles' : 'Family Sponsorship',
      description: language === 'fr' 
        ? 'Le programme de parrainage familial 2025 permet aux citoyens et résidents permanents du Canada de parrainer les membres de leur famille pour qu\'ils deviennent résidents permanents. Les délais de traitement ont été réduits et le processus simplifié.'
        : 'The 2025 Family Sponsorship Program allows Canadian citizens and permanent residents to sponsor family members to become permanent residents. Processing times have been reduced and the process simplified.',
      icon: <Users size={32} className="text-red-600" />,
      requirements: language === 'fr'
        ? ['Être citoyen canadien ou résident permanent', 'Avoir au moins 18 ans', 'Respecter les exigences de revenu minimum', 'S\'engager à subvenir aux besoins du membre parrainé']
        : ['Be a Canadian citizen or permanent resident', 'Be at least 18 years old', 'Meet minimum income requirements', 'Commit to supporting the sponsored member'],
      linkText: language === 'fr' ? 'En savoir plus' : 'Learn more'
    },
    {
      id: 2,
      title: language === 'fr' ? 'Programme des travailleurs qualifiés' : 'Skilled Workers Program',
      description: language === 'fr'
        ? 'Le nouveau programme Express Entry 2025 offre une voie plus rapide pour les travailleurs qualifiés. Avec des quotas élargis et un système de points amélioré, il cible particulièrement les professionnels dans les secteurs de la santé, des technologies et de l\'ingénierie.'
        : 'The new 2025 Express Entry program offers a faster track for skilled workers. With expanded quotas and an improved points system, it particularly targets professionals in healthcare, technology, and engineering sectors.',
      icon: <Briefcase size={32} className="text-red-600" />,
      requirements: language === 'fr'
        ? ['Niveau d\'éducation post-secondaire', 'Expérience professionnelle minimale de 1 an', 'Compétences linguistiques en français ou anglais', 'Offre d\'emploi canadien (un atout)']
        : ['Post-secondary education level', 'Minimum 1 year of professional experience', 'Language skills in French or English', 'Canadian job offer (an advantage)'],
      linkText: language === 'fr' ? 'En savoir plus' : 'Learn more'
    },
    {
      id: 3,
      title: language === 'fr' ? 'Visa pour entrepreneurs et investisseurs' : 'Entrepreneur and Investor Visa',
      description: language === 'fr'
        ? 'Le programme d\'immigration pour entrepreneurs et investisseurs 2025 a été remanié pour attirer les talents d\'affaires internationaux. Avec des seuils d\'investissement réduits et des voies accélérées, il encourage la création d\'emplois et l\'innovation au Canada.'
        : 'The 2025 Immigration Program for Entrepreneurs and Investors has been redesigned to attract international business talent. With reduced investment thresholds and expedited pathways, it encourages job creation and innovation in Canada.',
      icon: <DollarSign size={32} className="text-red-600" />,
      requirements: language === 'fr'
        ? ['Capital net minimum de 300 000 CAD', 'Expérience significative en gestion d\'entreprise', 'Plan d\'affaires viable', 'Création d\'au moins 2 emplois pour Canadiens']
        : ['Minimum net capital of CAD 300,000', 'Significant business management experience', 'Viable business plan', 'Creation of at least 2 jobs for Canadians'],
      linkText: language === 'fr' ? 'En savoir plus' : 'Learn more'
    },
    {
      id: 4,
      title: language === 'fr' ? 'Programme pour étudiants internationaux' : 'International Student Program',
      description: language === 'fr'
        ? 'Le programme pour étudiants internationaux 2025 offre désormais un parcours intégré vers la résidence permanente. Les diplômés bénéficient d\'un permis de travail étendu et d\'un accès prioritaire aux programmes d\'immigration provinciale.'
        : 'The 2025 International Student Program now offers an integrated path to permanent residence. Graduates benefit from an extended work permit and priority access to provincial immigration programs.',
      icon: <GraduationCap size={32} className="text-red-600" />,
      requirements: language === 'fr'
        ? ['Acceptation dans une institution canadienne désignée', 'Preuve de fonds suffisants', 'Compétences linguistiques adéquates', 'Intention de retourner dans son pays d\'origine après les études']
        : ['Acceptance to a designated Canadian institution', 'Proof of sufficient funds', 'Adequate language skills', 'Intention to return to home country after studies'],
      linkText: language === 'fr' ? 'En savoir plus' : 'Learn more'
    },
    {
      id: 5,
      title: language === 'fr' ? 'Programme des résidences temporaires et prolongations' : 'Temporary Residence and Extensions Program',
      description: language === 'fr'
        ? 'Le programme de résidence temporaire 2025 a été amélioré pour offrir plus de flexibilité. Avec des prolongations simplifiées et des passerelles vers la résidence permanente, il répond mieux aux besoins des travailleurs temporaires et des visiteurs de longue durée.'
        : 'The 2025 Temporary Residence Program has been improved to offer more flexibility. With simplified extensions and pathways to permanent residence, it better meets the needs of temporary workers and long-term visitors.',
      icon: <ClockIcon size={32} className="text-red-600" />,
      requirements: language === 'fr'
        ? ['Visa temporaire valide', 'Preuve de situation stable au Canada', 'Vérification des antécédents', 'Assurance maladie']
        : ['Valid temporary visa', 'Proof of stable situation in Canada', 'Background check', 'Health insurance'],
      linkText: language === 'fr' ? 'En savoir plus' : 'Learn more'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <IRCCHeader />
      
      <div 
        className="w-full h-64 md:h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: `url('/lovable-uploads/7f62a887-7e55-4ec9-b913-cd152c1d0706.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {language === 'fr' ? 'Nouveaux Programmes d\'Immigration 2025' : 'New Immigration Programs 2025'}
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">
              {language === 'fr' 
                ? 'Découvrez les nouvelles opportunités d\'immigration au Canada pour l\'année 2025'
                : 'Discover new immigration opportunities to Canada for the year 2025'}
            </p>
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              {language === 'fr' ? 'Programmes adaptés à vos besoins' : 'Programs tailored to your needs'}
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              {language === 'fr'
                ? 'Le Canada continue d\'améliorer ses programmes d\'immigration pour mieux répondre aux besoins des nouveaux arrivants et de l\'économie canadienne.'
                : 'Canada continues to improve its immigration programs to better meet the needs of newcomers and the Canadian economy.'}
            </p>
          </div>
          
          <div className="space-y-8">
            {programs.map((program) => (
              <Card key={program.id} className="shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-center">
                    {program.icon}
                    <CardTitle className="text-xl md:text-2xl ml-3">{program.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-base mb-6">{program.description}</CardDescription>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2 text-gray-700">
                      {language === 'fr' ? 'Exigences principales:' : 'Key Requirements:'}
                    </h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {program.requirements.map((req, idx) => (
                        <li key={idx} className="text-gray-700">{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button asChild className="bg-red-600 hover:bg-red-700">
                    <a href="#">{program.linkText}</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {language === 'fr' ? 'Vous avez des questions?' : 'Have questions?'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'fr'
                ? 'Notre équipe de conseillers en immigration est prête à vous aider à comprendre ces nouveaux programmes.'
                : 'Our team of immigration advisors is ready to help you understand these new programs.'}
            </p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <Link to="/index#contact">
                {language === 'fr' ? 'Contactez-nous' : 'Contact Us'}
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      {/* Footer would go here */}
    </div>
  );
};

export default NewImmigrationPrograms;
