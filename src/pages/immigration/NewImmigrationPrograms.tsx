
import React from 'react';
import ImmigrationPageLayout from '@/components/immigration/ImmigrationPageLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Users, Briefcase, GraduationCap, Clock, ChevronRight } from 'lucide-react';

const NewImmigrationPrograms = () => {
  const { language } = useLanguage();
  
  // Header image for the page
  const headerImage = '/lovable-uploads/7f62a887-7e55-4ec9-b913-cd152c1d0706.png';
  
  // FAQ items
  const faqItems = [
    {
      question: language === 'fr' 
        ? 'Quand les nouveaux programmes 2025 seront-ils disponibles ?' 
        : 'When will the new 2025 programs be available?',
      answer: language === 'fr'
        ? 'Les nouveaux programmes d\'immigration 2025 seront progressivement disponibles à partir de janvier 2025. Certains programmes pilotes pourraient être lancés dès le dernier trimestre 2024.'
        : 'The new 2025 immigration programs will be gradually available from January 2025. Some pilot programs may be launched from the last quarter of 2024.'
    },
    {
      question: language === 'fr' 
        ? 'Comment puis-je savoir si je suis admissible à ces nouveaux programmes ?' 
        : 'How can I know if I am eligible for these new programs?',
      answer: language === 'fr'
        ? 'Chaque programme a ses propres critères d\'admissibilité. Nous vous recommandons de consulter les détails spécifiques de chaque programme sur notre site ou de contacter un conseiller en immigration pour une évaluation personnalisée.'
        : 'Each program has its own eligibility criteria. We recommend that you consult the specific details of each program on our website or contact an immigration advisor for a personalized assessment.'
    },
    {
      question: language === 'fr' 
        ? 'Les demandes peuvent-elles être faites en ligne ?' 
        : 'Can applications be made online?',
      answer: language === 'fr'
        ? 'Oui, tous les nouveaux programmes d\'immigration de 2025 accepteront les demandes en ligne. Notre portail sera mis à jour pour intégrer les formulaires spécifiques à chaque programme dès leur lancement.'
        : 'Yes, all new 2025 immigration programs will accept online applications. Our portal will be updated to include forms specific to each program as soon as they are launched.'
    },
    {
      question: language === 'fr' 
        ? 'Quels sont les délais de traitement prévus pour ces nouveaux programmes ?' 
        : 'What are the expected processing times for these new programs?',
      answer: language === 'fr'
        ? 'Les délais de traitement varieront selon le programme et le volume de demandes. En règle générale, nous visons un traitement de 3 à 6 mois pour les demandes complètes et sans complications.'
        : 'Processing times will vary by program and volume of applications. As a general rule, we aim for 3 to 6 months processing for complete and uncomplicated applications.'
    }
  ];
  
  // Program data
  const programs = [
    {
      id: 'family',
      icon: <Users size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Parrainage des familles' : 'Family Sponsorship',
      description: language === 'fr'
        ? 'Programme de regroupement familial modernisé pour 2025, avec traitement plus rapide et exigences simplifiées. Permet de parrainer conjoint, enfants, parents et grands-parents avec nouvelles voies accélérées.'
        : 'Modernized family reunification program for 2025, with faster processing and simplified requirements. Allows sponsorship of spouse, children, parents and grandparents with new expedited pathways.',
      eligibility: language === 'fr'
        ? ['Être citoyen canadien ou résident permanent', 'Avoir au moins 18 ans', 'Démontrer la capacité financière de subvenir aux besoins des personnes parrainées', 'S\'engager à soutenir financièrement les membres de la famille pendant 3 à 20 ans selon leur lien de parenté']
        : ['Be a Canadian citizen or permanent resident', 'Be at least 18 years old', 'Demonstrate financial ability to provide for sponsored individuals', 'Commit to financially supporting family members for 3 to 20 years depending on their relationship'],
      benefits: language === 'fr'
        ? ['Traitement accéléré des demandes (délai réduit à 6-12 mois)', 'Réduction des frais de demande pour les familles nombreuses', 'Option de statut temporaire pendant le traitement', 'Accès rapide aux soins de santé et services sociaux']
        : ['Expedited application processing (reduced time to 6-12 months)', 'Reduced application fees for large families', 'Temporary status option during processing', 'Quick access to healthcare and social services']
    },
    {
      id: 'skilled',
      icon: <Briefcase size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Programme des travailleurs qualifiés' : 'Skilled Worker Program',
      description: language === 'fr'
        ? 'Nouveau système de points pour 2025, favorisant l\'expertise technologique, scientifique et médicale. Accès facilité aux permis de travail et à la résidence permanente pour professionnels hautement qualifiés.'
        : 'New points system for 2025, favoring technological, scientific and medical expertise. Facilitated access to work permits and permanent residence for highly skilled professionals.',
      eligibility: language === 'fr'
        ? ['Minimum d\'un an d\'expérience professionnelle dans une profession qualifiée', 'Score minimum de 67 points sur 100 selon les nouveaux critères 2025', 'Niveau de langue minimum (français ou anglais)', 'Diplôme d\'études postsecondaires reconnu']
        : ['Minimum one year of professional experience in a skilled occupation', 'Minimum score of 67 points out of 100 according to new 2025 criteria', 'Minimum language level (French or English)', 'Recognized post-secondary diploma'],
      benefits: language === 'fr'
        ? ['Voie accélérée vers la résidence permanente', 'Possibilité de faire venir sa famille', 'Programmes d\'intégration améliorés', 'Accès à des formations professionnelles subventionnées']
        : ['Fast track to permanent residence', 'Ability to bring your family', 'Improved integration programs', 'Access to subsidized professional training']
    },
    {
      id: 'business',
      icon: <FileText size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Visa pour entrepreneurs et investisseurs' : 'Entrepreneur and Investor Visa',
      description: language === 'fr'
        ? 'Programme repensé pour attirer entrepreneurs innovants et investisseurs. Offre un parcours accéléré vers la résidence permanente avec moins d\'exigences d\'investissement mais plus d\'impact économique.'
        : 'Redesigned program to attract innovative entrepreneurs and investors. Offers an accelerated path to permanent residence with fewer investment requirements but greater economic impact.',
      eligibility: language === 'fr'
        ? ['Posséder une entreprise viable ou avoir un plan d\'affaires solide', 'Investissement minimum réduit à 150 000 CAD (secteurs prioritaires) ou 300 000 CAD', 'Créer au moins 2 emplois pour citoyens canadiens ou résidents permanents', 'Démontrer une expérience de gestion d\'entreprise']
        : ['Own a viable business or have a solid business plan', 'Reduced minimum investment to CAD 150,000 (priority sectors) or CAD 300,000', 'Create at least 2 jobs for Canadian citizens or permanent residents', 'Demonstrate business management experience'],
      benefits: language === 'fr'
        ? ['Résidence temporaire immédiate avec voie vers la permanence', 'Accès à des réseaux d\'affaires et mentors canadiens', 'Incitatifs fiscaux pour certains secteurs d\'activité', 'Moins de restrictions géographiques (par rapport aux programmes provinciaux)']
        : ['Immediate temporary residence with path to permanence', 'Access to Canadian business networks and mentors', 'Tax incentives for certain business sectors', 'Fewer geographical restrictions (compared to provincial programs)']
    },
    {
      id: 'students',
      icon: <GraduationCap size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Programme pour étudiants internationaux' : 'International Student Program',
      description: language === 'fr'
        ? 'Version 2025 du programme avec focus sur la rétention des diplômés. Permis d\'études bonifiés, stages rémunérés intégrés, et transition automatique vers résidence permanente pour diplômés dans secteurs stratégiques.'
        : '2025 version of the program with focus on graduate retention. Enhanced study permits, integrated paid internships, and automatic transition to permanent residence for graduates in strategic sectors.',
      eligibility: language === 'fr'
        ? ['Être admis dans un établissement d\'enseignement désigné canadien', 'Démontrer une capacité financière suffisante', 'Maîtriser le français ou l\'anglais au niveau requis', 'S\'engager à respecter les conditions du permis d\'études']
        : ['Be admitted to a designated Canadian educational institution', 'Demonstrate sufficient financial capacity', 'Master French or English at the required level', 'Commit to complying with study permit conditions'],
      benefits: language === 'fr'
        ? ['Permis de travail inclus (20h/semaine pendant études, temps plein pendant congés)', 'Permis de travail post-diplôme étendu à 3 ans pour tous les programmes', 'Accès à la résidence permanente via le programme d\'expérience canadienne simplifié', 'Accès prioritaire aux programmes de bourses canadiennes']
        : ['Work permit included (20h/week during studies, full time during breaks)', 'Post-graduate work permit extended to 3 years for all programs', 'Access to permanent residence via simplified Canadian experience program', 'Priority access to Canadian scholarship programs']
    },
    {
      id: 'temporary',
      icon: <Clock size={36} className="text-red-600" />,
      title: language === 'fr' ? 'Programme des résidences temporaires et prolongations' : 'Temporary Residence and Extensions Program',
      description: language === 'fr'
        ? 'Nouvelle approche flexible des séjours temporaires pour 2025. Permet prolongations multiples et changement de statut sans quitter le pays. Intègre un système de points pour transition vers résidence permanente.'
        : 'New flexible approach to temporary stays for 2025. Allows multiple extensions and status changes without leaving the country. Integrates a points system for transition to permanent residence.',
      eligibility: language === 'fr'
        ? ['Avoir un statut légal temporaire au Canada (visiteur, étudiant, travailleur)', 'Respecter les conditions du permis initial', 'Démontrer la raison de prolongation ou changement de statut', 'Maintenir une couverture d\'assurance maladie valide']
        : ['Have legal temporary status in Canada (visitor, student, worker)', 'Comply with initial permit conditions', 'Demonstrate reason for extension or status change', 'Maintain valid health insurance coverage'],
      benefits: language === 'fr'
        ? ['Processus de prolongation en ligne simplifié', 'Possibilité de changer de type de permis sans quitter le Canada', 'Accumulation de points pour admissibilité à la résidence permanente', 'Services d\'orientation gratuits pour les transitions de statut']
        : ['Simplified online extension process', 'Ability to change permit types without leaving Canada', 'Accumulation of points for permanent residence eligibility', 'Free orientation services for status transitions']
    }
  ];

  return (
    <ImmigrationPageLayout
      title={language === 'fr' ? 'Nouveaux Programmes d\'Immigration 2025' : 'New Immigration Programs 2025'}
      headerImage={headerImage}
      intro={language === 'fr' 
        ? 'Découvrez les nouveaux programmes d\'immigration canadienne pour 2025, conçus pour faciliter et accélérer votre installation au Canada.'
        : 'Discover new Canadian immigration programs for 2025, designed to facilitate and accelerate your settlement in Canada.'}
      faqItems={faqItems}
    >
      <div className="space-y-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {language === 'fr' 
              ? 'Cinq nouveaux programmes innovants pour 2025' 
              : 'Five innovative new programs for 2025'}
          </h2>
          <p className="text-gray-600">
            {language === 'fr'
              ? 'Le gouvernement canadien a annoncé une refonte majeure de ses programmes d\'immigration pour 2025, visant à attirer et retenir davantage de talents internationaux tout en facilitant le regroupement familial.'
              : 'The Canadian government has announced a major overhaul of its immigration programs for 2025, aimed at attracting and retaining more international talent while facilitating family reunification.'}
          </p>
        </div>

        <Tabs defaultValue="family" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full h-auto bg-gray-100 p-1">
            {programs.map(program => (
              <TabsTrigger 
                key={program.id} 
                value={program.id}
                className="py-3 data-[state=active]:bg-red-50 data-[state=active]:text-red-700 data-[state=active]:shadow-none"
              >
                {program.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {programs.map(program => (
            <TabsContent key={program.id} value={program.id} className="mt-6">
              <Card>
                <CardHeader className="bg-red-50">
                  <div className="flex items-center gap-4">
                    {program.icon}
                    <div>
                      <CardTitle className="text-xl text-gray-800">{program.title}</CardTitle>
                      <CardDescription className="text-gray-600 mt-1">{program.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        {language === 'fr' ? 'Critères d\'admissibilité' : 'Eligibility Criteria'}
                      </h3>
                      <ul className="space-y-2 list-disc pl-5">
                        {program.eligibility.map((item, index) => (
                          <li key={index} className="text-gray-600">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">
                        {language === 'fr' ? 'Avantages du programme' : 'Program Benefits'}
                      </h3>
                      <ul className="space-y-2 list-disc pl-5">
                        {program.benefits.map((item, index) => (
                          <li key={index} className="text-gray-600">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-center">
                    <Link to="/portal">
                      <Button className="bg-red-600 hover:bg-red-700">
                        {language === 'fr' ? 'Vérifier mon admissibilité' : 'Check my eligibility'}
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="text-center mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {language === 'fr' ? 'Préparez votre demande dès maintenant' : 'Prepare your application now'}
          </h3>
          <p className="text-gray-600 mb-4">
            {language === 'fr'
              ? 'Bien que ces programmes ne seront officiellement lancés qu\'en 2025, vous pouvez déjà commencer à préparer votre dossier et vérifier votre admissibilité.'
              : 'Although these programs will not be officially launched until 2025, you can already start preparing your file and checking your eligibility.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
              {language === 'fr' ? 'Télécharger le guide 2025' : 'Download the 2025 guide'}
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              {language === 'fr' ? 'Créer mon compte' : 'Create my account'}
            </Button>
          </div>
        </div>
      </div>
    </ImmigrationPageLayout>
  );
};

export default NewImmigrationPrograms;
