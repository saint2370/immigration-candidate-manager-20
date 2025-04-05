
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { School, Home, Briefcase, Users, Globe, Phone, MapPin, BookOpen, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServiceCard = ({ icon, title, description, linkText, linkUrl }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start">
        <div className="p-3 rounded-lg bg-red-50 mr-4 flex-shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <a 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-red-600 font-medium hover:text-red-800 flex items-center"
          >
            {linkText} →
          </a>
        </div>
      </div>
    </div>
  );
};

const OrganizationCard = ({ name, description, address, phone, website }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <div className="space-y-2">
        <div className="flex items-start">
          <MapPin size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-gray-600 text-sm">{address}</span>
        </div>
        <div className="flex items-center">
          <Phone size={16} className="text-gray-400 mr-2 flex-shrink-0" />
          <span className="text-gray-600 text-sm">{phone}</span>
        </div>
        <div className="flex items-center">
          <Globe size={16} className="text-gray-400 mr-2 flex-shrink-0" />
          <a 
            href={website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 text-sm hover:underline"
          >
            {website.replace(/^https?:\/\//, '')}
          </a>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ title, date, location, description, link }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-start">
        <div className="p-2 rounded-md bg-blue-50 mr-3 flex-shrink-0">
          <Calendar className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <div className="mt-1 mb-2">
            <p className="text-gray-600 text-sm">{date}</p>
            <p className="text-gray-600 text-sm">{location}</p>
          </div>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 text-sm hover:underline"
          >
            En savoir plus →
          </a>
        </div>
      </div>
    </div>
  );
};

const NewcomerServices = () => {
  const { language } = useLanguage();
  
  // Sample services data
  const services = [
    {
      icon: <School className="h-6 w-6 text-red-600" />,
      title: language === 'fr' ? 'Cours de langue' : 'Language Training',
      description: language === 'fr' 
        ? 'Améliorez vos compétences en français ou en anglais grâce à des cours gratuits financés par le gouvernement.'
        : 'Improve your French or English language skills through free government-funded courses.',
      linkText: language === 'fr' ? 'Trouver des cours' : 'Find courses',
      linkUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/nouvelle-vie-canada/ameliorer-francais-anglais.html'
    },
    {
      icon: <Home className="h-6 w-6 text-red-600" />,
      title: language === 'fr' ? 'Aide au logement' : 'Housing Assistance',
      description: language === 'fr' 
        ? 'Obtenez de l\'aide pour trouver un logement temporaire ou permanent, comprendre vos droits en tant que locataire, et plus.'
        : 'Get help finding temporary or permanent housing, understanding your rights as a tenant, and more.',
      linkText: language === 'fr' ? 'Options de logement' : 'Housing options',
      linkUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/nouvelle-vie-canada/logement.html'
    },
    {
      icon: <Briefcase className="h-6 w-6 text-red-600" />,
      title: language === 'fr' ? 'Emploi et carrière' : 'Employment and Career',
      description: language === 'fr' 
        ? 'Accédez à des services de recherche d\'emploi, de rédaction de CV, de préparation aux entretiens et de reconnaissance des titres de compétences.'
        : 'Access job search services, resume writing, interview preparation, and credential recognition.',
      linkText: language === 'fr' ? 'Services d\'emploi' : 'Employment services',
      linkUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/nouvelle-vie-canada/education/recherche-emploi.html'
    },
    {
      icon: <BookOpen className="h-6 w-6 text-red-600" />,
      title: language === 'fr' ? 'Éducation et formation' : 'Education and Training',
      description: language === 'fr' 
        ? 'Découvrez les possibilités d\'études, les prêts et bourses, et comment faire reconnaître vos diplômes étrangers.'
        : 'Discover study opportunities, loans and scholarships, and how to get your foreign credentials recognized.',
      linkText: language === 'fr' ? 'Explorer les options' : 'Explore options',
      linkUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/nouvelle-vie-canada/education.html'
    },
    {
      icon: <Users className="h-6 w-6 text-red-600" />,
      title: language === 'fr' ? 'Soutien social et communautaire' : 'Social and Community Support',
      description: language === 'fr' 
        ? 'Connectez-vous avec des groupes communautaires, des événements culturels et des réseaux de soutien dans votre région.'
        : 'Connect with community groups, cultural events, and support networks in your area.',
      linkText: language === 'fr' ? 'Trouver du soutien' : 'Find support',
      linkUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/nouvelle-vie-canada/communaute-connexions.html'
    },
    {
      icon: <Globe className="h-6 w-6 text-red-600" />,
      title: language === 'fr' ? 'Services d\'établissement' : 'Settlement Services',
      description: language === 'fr' 
        ? 'Obtenez des conseils personnalisés, des informations et des références pour vous aider à vous établir au Canada.'
        : 'Get personalized advice, information, and referrals to help you settle in Canada.',
      linkText: language === 'fr' ? 'Localiser les services' : 'Find services',
      linkUrl: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/nouvelle-vie-canada/services-aide-installation.html'
    }
  ];
  
  // Sample organizations data
  const organizations = [
    {
      name: language === 'fr' ? 'Centre d\'accueil des nouveaux arrivants de Montréal' : 'Montreal Newcomer Welcome Center',
      description: language === 'fr' 
        ? 'Services complets pour les nouveaux arrivants à Montréal, y compris l\'orientation, les cours de langue et la recherche d\'emploi.'
        : 'Comprehensive services for newcomers to Montreal, including orientation, language courses, and job search.',
      address: '1010 Rue Sainte-Catherine O, Montréal, QC H3B 1E7',
      phone: '(514) 555-2525',
      website: 'https://www.newcomercentermontreal.ca'
    },
    {
      name: language === 'fr' ? 'Services communautaires d\'Ottawa' : 'Ottawa Community Services',
      description: language === 'fr' 
        ? 'Aide à l\'établissement, programmes culturels et services de traduction pour les immigrants dans la région d\'Ottawa.'
        : 'Settlement assistance, cultural programs, and translation services for immigrants in the Ottawa region.',
      address: '219 Argyle Ave, Ottawa, ON K2P 2H4',
      phone: '(613) 555-6890',
      website: 'https://www.ottawacommunityservices.org'
    },
    {
      name: language === 'fr' ? 'Centre multiculturel de Toronto' : 'Toronto Multicultural Center',
      description: language === 'fr' 
        ? 'Services d\'établissement, ateliers d\'intégration et programmes de mentorat pour les nouveaux arrivants à Toronto.'
        : 'Settlement services, integration workshops, and mentorship programs for newcomers to Toronto.',
      address: '123 Spadina Ave, Toronto, ON M5V 2K1',
      phone: '(416) 555-7890',
      website: 'https://www.torontomulticultural.ca'
    },
    {
      name: language === 'fr' ? 'Association des immigrants de Vancouver' : 'Vancouver Immigrant Association',
      description: language === 'fr' 
        ? 'Orientation professionnelle, cours d\'anglais et assistance pour le logement aux nouveaux arrivants à Vancouver.'
        : 'Career guidance, English classes, and housing assistance for newcomers to Vancouver.',
      address: '530 W Broadway, Vancouver, BC V5Z 1E9',
      phone: '(604) 555-3456',
      website: 'https://www.vancouverimassoc.ca'
    }
  ];
  
  // Sample events data
  const events = [
    {
      title: language === 'fr' ? 'Salon de l\'emploi pour nouveaux arrivants' : 'Newcomer Job Fair',
      date: language === 'fr' ? '15 juin 2025, 10h00 - 16h00' : 'June 15, 2025, 10:00 AM - 4:00 PM',
      location: language === 'fr' ? 'Centre des congrès de Montréal' : 'Montreal Convention Center',
      description: language === 'fr' 
        ? 'Rencontrez des employeurs locaux qui recrutent activement des talents issus de l\'immigration.'
        : 'Meet local employers who are actively recruiting immigrant talent.',
      link: '#'
    },
    {
      title: language === 'fr' ? 'Atelier sur le système de santé canadien' : 'Workshop on Canadian Healthcare System',
      date: language === 'fr' ? '22 juin 2025, 14h00 - 16h00' : 'June 22, 2025, 2:00 PM - 4:00 PM',
      location: language === 'fr' ? 'Bibliothèque centrale de Toronto' : 'Toronto Central Library',
      description: language === 'fr' 
        ? 'Apprenez à naviguer dans le système de santé canadien et à accéder aux services médicaux.'
        : 'Learn how to navigate the Canadian healthcare system and access medical services.',
      link: '#'
    },
    {
      title: language === 'fr' ? 'Festival des cultures du monde' : 'World Cultures Festival',
      date: language === 'fr' ? '8-10 juillet 2025, 11h00 - 22h00' : 'July 8-10, 2025, 11:00 AM - 10:00 PM',
      location: language === 'fr' ? 'Parc Jean-Drapeau, Montréal' : 'Jean-Drapeau Park, Montreal',
      description: language === 'fr' 
        ? 'Célébrez la diversité culturelle avec de la musique, de la danse, de la nourriture et des activités du monde entier.'
        : 'Celebrate cultural diversity with music, dance, food, and activities from around the world.',
      link: '#'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-red-700 text-white py-10 md:py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'fr' ? 'Services aux nouveaux arrivants' : 'Newcomer Services'}
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl">
              {language === 'fr' 
                ? 'Ressources et programmes pour vous aider à vous installer et à réussir votre nouvelle vie au Canada.' 
                : 'Resources and programs to help you settle and succeed in your new life in Canada.'}
            </p>
          </div>
        </div>
        
        {/* Welcome Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'fr' ? 'Bienvenue au Canada' : 'Welcome to Canada'}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === 'fr' 
                  ? 'Félicitations pour votre arrivée au Canada ! Cette nouvelle étape de votre vie apporte de nombreuses opportunités, ainsi que des défis. Les services aux nouveaux arrivants sont là pour vous aider à naviguer dans ce nouveau chapitre.' 
                  : 'Congratulations on your arrival to Canada! This new chapter in your life brings many opportunities, as well as challenges. Newcomer services are here to help you navigate this new chapter.'}
              </p>
              <p className="text-gray-600 mb-6">
                {language === 'fr' 
                  ? 'Sur cette page, vous trouverez des informations sur les services gratuits et les ressources disponibles pour vous aider à vous installer, à améliorer vos compétences linguistiques, à trouver un emploi, et plus encore.' 
                  : 'On this page, you will find information about free services and resources available to help you settle, improve your language skills, find employment, and more.'}
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Button className="bg-red-700 hover:bg-red-800">
                  {language === 'fr' ? 'Trouver des services près de chez vous' : 'Find services near you'}
                </Button>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  {language === 'fr' ? 'Guide pour les nouveaux arrivants' : 'Newcomer guide'}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                {language === 'fr' ? 'Services disponibles' : 'Available Services'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Settlement Organizations Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
                {language === 'fr' ? 'Organisations d\'aide à l\'établissement' : 'Settlement Organizations'}
              </h2>
              <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                {language === 'fr' 
                  ? 'Ces organisations offrent des services gratuits aux nouveaux arrivants dans différentes régions du Canada.' 
                  : 'These organizations provide free services to newcomers in different regions across Canada.'}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {organizations.map((org, index) => (
                  <OrganizationCard key={index} {...org} />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button className="bg-red-700 hover:bg-red-800">
                  {language === 'fr' ? 'Voir toutes les organisations' : 'View all organizations'}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Upcoming Events Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">
                {language === 'fr' ? 'Événements à venir' : 'Upcoming Events'}
              </h2>
              <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                {language === 'fr' 
                  ? 'Participez à ces événements pour en apprendre davantage sur la vie au Canada et pour rencontrer d\'autres nouveaux arrivants.' 
                  : 'Join these events to learn more about life in Canada and to meet other newcomers.'}
              </p>
              
              <div className="space-y-4">
                {events.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                  {language === 'fr' ? 'Voir tous les événements' : 'View all events'}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Get Started Section */}
        <section className="py-10 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {language === 'fr' ? 'Prêt à commencer?' : 'Ready to get started?'}
              </h2>
              <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
                {language === 'fr' 
                  ? 'Contactez un fournisseur de services d\'établissement près de chez vous pour accéder à des services personnalisés et gratuits.' 
                  : 'Contact a settlement service provider near you to access personalized, free services.'}
              </p>
              <Button className="bg-red-700 hover:bg-red-800 text-lg px-6 py-3">
                {language === 'fr' ? 'Trouver des services maintenant' : 'Find services now'}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewcomerServices;
