
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Import all necessary icons
import { 
  FileText, Users, Heart, Home, FileCheck, Upload, 
  Calendar, AlertCircle, Globe, GraduationCap, Briefcase, 
  Clock, FileSearch, HelpCircle, BookOpen, PenTool
} from 'lucide-react';

const ImmigrationSections = () => {
  const { language } = useLanguage();

  // Immigration section items
  const immigrationItems = [
    {
      id: 'programs',
      icon: <FileText className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Programmes d\'immigration' : 'Immigration Programs',
      description: language === 'fr' 
        ? 'Découvrez tous les programmes disponibles pour immigrer au Canada'
        : 'Discover all available programs to immigrate to Canada',
      link: '/nouveaux-programmes'
    },
    {
      id: 'family',
      icon: <Users className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Parrainage familial' : 'Family Sponsorship',
      description: language === 'fr'
        ? 'Parrainer un membre de votre famille pour qu\'il s\'installe au Canada'
        : 'Sponsor a family member to settle in Canada',
      link: '/nouveaux-programmes'
    },
    {
      id: 'refugees',
      icon: <Heart className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Réfugiés et demandes d\'asile' : 'Refugees and Asylum',
      description: language === 'fr'
        ? 'Information sur les programmes d\'accueil des réfugiés au Canada'
        : 'Information on refugee reception programs in Canada',
      link: '/nouveaux-programmes'
    },
    {
      id: 'permanent',
      icon: <Home className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Résidence permanente' : 'Permanent Residence',
      description: language === 'fr'
        ? 'Conditions et démarches pour obtenir la résidence permanente'
        : 'Conditions and steps to obtain permanent residence',
      link: '/residence-permanente'
    }
  ];

  // Services section items
  const servicesItems = [
    {
      id: 'status',
      icon: <FileCheck className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Ma demande' : 'My Application',
      description: language === 'fr'
        ? 'Vérifiez l\'état de votre demande d\'immigration en ligne'
        : 'Check the status of your immigration application online',
      link: '/portal'
    },
    {
      id: 'documents',
      icon: <Upload className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Formulaires et guides' : 'Forms and Guides',
      description: language === 'fr'
        ? 'Accédez aux formulaires et guides pour votre demande'
        : 'Access forms and guides for your application',
      link: '#'
    },
    {
      id: 'biometrics',
      icon: <Calendar className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Services aux nouveaux arrivants' : 'Newcomer Services',
      description: language === 'fr'
        ? 'Découvrez les services disponibles pour vous aider à vous établir'
        : 'Discover services available to help you settle',
      link: '#'
    },
    {
      id: 'updates',
      icon: <AlertCircle className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Rendez-vous biométriques' : 'Biometric Appointments',
      description: language === 'fr'
        ? 'Prenez rendez-vous pour vos données biométriques'
        : 'Schedule an appointment for your biometric data',
      link: '/portal'
    }
  ];

  // Applications section items
  const applicationsItems = [
    {
      id: 'visa',
      icon: <Globe className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Visiter le Canada' : 'Visit Canada',
      description: language === 'fr'
        ? 'Comment faire une demande de visa pour visiter le Canada'
        : 'How to apply for a visa to visit Canada',
      link: '/nouveaux-programmes'
    },
    {
      id: 'study',
      icon: <GraduationCap className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Étudier au Canada' : 'Study in Canada',
      description: language === 'fr'
        ? 'Étapes pour obtenir un permis d\'étude pour étudier au Canada'
        : 'Steps to obtain a study permit to study in Canada',
      link: '/visa-etudiant'
    },
    {
      id: 'work',
      icon: <Briefcase className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Travailler au Canada' : 'Work in Canada',
      description: language === 'fr'
        ? 'Comment obtenir un permis de travail pour travailler au Canada'
        : 'How to obtain a work permit to work in Canada',
      link: '/visa-travail'
    },
    {
      id: 'tracking',
      icon: <Clock className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Suivi des demandes' : 'Application Tracking',
      description: language === 'fr'
        ? 'Suivez l\'état d\'avancement de votre demande en temps réel'
        : 'Track the progress of your application in real time',
      link: '/portal'
    }
  ];

  // Resources section items
  const resourcesItems = [
    {
      id: 'support',
      icon: <FileSearch className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Centre de soutien à la clientèle' : 'Client Support Center',
      description: language === 'fr'
        ? 'Obtenez de l\'aide pour vos questions d\'immigration'
        : 'Get help with your immigration questions',
      link: '#contact'
    },
    {
      id: 'publications',
      icon: <HelpCircle className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Publications et manuels' : 'Publications and Manuals',
      description: language === 'fr'
        ? 'Accédez aux publications et manuels officiels d\'IRCC'
        : 'Access official IRCC publications and manuals',
      link: '#'
    },
    {
      id: 'guides',
      icon: <BookOpen className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Guides officiels' : 'Official Guides',
      description: language === 'fr'
        ? 'Consultez les guides officiels pour mieux comprendre les procédures'
        : 'Consult the official guides to better understand the procedures',
      link: '#'
    },
    {
      id: 'contact',
      icon: <PenTool className="text-red-600" size={42} />,
      title: language === 'fr' ? 'Contactez IRCC' : 'Contact IRCC',
      description: language === 'fr'
        ? 'Contactez-nous pour toute question concernant votre demande'
        : 'Contact us for any questions regarding your application',
      link: '#contact'
    }
  ];

  const renderSection = (title, items, id, bgColor) => (
    <section id={id} className={`py-16 ${bgColor}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {id === 'immigration' 
              ? (language === 'fr' 
                ? 'Découvrez les différents programmes d\'immigration canadienne adaptés à votre situation'
                : 'Discover the different Canadian immigration programs adapted to your situation')
              : id === 'services'
              ? (language === 'fr' 
                ? 'Accédez à nos services en ligne pour simplifier vos démarches d\'immigration'
                : 'Access our online services to simplify your immigration procedures')
              : id === 'applications'
              ? (language === 'fr' 
                ? 'Toutes les informations pour soumettre et suivre votre demande d\'immigration'
                : 'All the information to submit and track your immigration application')
              : (language === 'fr' 
                ? 'Consultez nos ressources pour vous guider dans vos démarches d\'immigration'
                : 'Consult our resources to guide you through your immigration procedures')
            }
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div 
              id={`${id}-${item.id}`}
              key={item.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md"
            >
              <div className="bg-red-50 p-4 rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
              <Link to={item.link}>
                <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                  {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <>
      {renderSection(
        language === 'fr' ? 'Immigration et Réfugiés' : 'Immigration and Refugees',
        immigrationItems,
        'immigration',
        'bg-white'
      )}
      
      {renderSection(
        language === 'fr' ? 'Services' : 'Services',
        servicesItems,
        'services',
        'bg-gray-50'
      )}
      
      {renderSection(
        language === 'fr' ? 'Demandes' : 'Applications',
        applicationsItems,
        'applications',
        'bg-white'
      )}
      
      {renderSection(
        language === 'fr' ? 'Ressources' : 'Resources',
        resourcesItems,
        'resources',
        'bg-gray-50'
      )}
    </>
  );
};

export default ImmigrationSections;
