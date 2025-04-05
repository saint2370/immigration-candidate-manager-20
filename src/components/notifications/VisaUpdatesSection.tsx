
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Plane, BookOpen, Briefcase, Home, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VisaUpdatesCounter from './VisaUpdatesCounter';

const VisaUpdatesSection = () => {
  const { language } = useLanguage();
  
  const visaCategories = [
    {
      icon: <Plane size={24} className="text-blue-600" />,
      title: language === 'fr' ? 'Visa Visiteur' : 'Visitor Visa',
      description: language === 'fr' ? 'Pour les séjours touristiques et visites familiales' : 'For tourism and family visits',
      link: '/visiter-canada',
      type: 'visitor'
    },
    {
      icon: <BookOpen size={24} className="text-green-600" />,
      title: language === 'fr' ? 'Visa Étudiant' : 'Student Visa',
      description: language === 'fr' ? 'Pour étudier dans des institutions canadiennes' : 'For studying at Canadian institutions',
      link: '/visa-etudiant',
      type: 'student'
    },
    {
      icon: <Briefcase size={24} className="text-orange-600" />,
      title: language === 'fr' ? 'Visa Travail' : 'Work Visa',
      description: language === 'fr' ? 'Pour travailler temporairement au Canada' : 'For working temporarily in Canada',
      link: '/visa-travail',
      type: 'work'
    },
    {
      icon: <Home size={24} className="text-purple-600" />,
      title: language === 'fr' ? 'Résidence Permanente' : 'Permanent Residence',
      description: language === 'fr' ? 'Pour s\'établir définitivement au Canada' : 'For settling permanently in Canada',
      link: '/residence-permanente',
      type: 'permanent'
    }
  ];

  return (
    <section id="statistics" className="py-8 md:py-10 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {language === 'fr' ? 'Statistiques des visas en temps réel' : 'Real-time Visa Statistics'}
          </h2>
          <div className="flex items-center text-sm text-blue-600">
            <Users className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">
              {language === 'fr' ? 'Total des cas traités aujourd\'hui' : 'Total cases processed today'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visaCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="p-2 rounded-lg bg-gray-50 mr-3">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{category.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <VisaUpdatesCounter type={category.type} />
              </div>
              
              <Link to={category.link} className="group inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaUpdatesSection;
