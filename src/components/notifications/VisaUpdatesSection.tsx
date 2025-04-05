
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Plane, BookOpen, Briefcase, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VisaUpdatesCounter from './VisaUpdatesCounter';

const VisaUpdatesSection = () => {
  const { language } = useLanguage();
  
  const visaCategories = [
    {
      icon: <Plane size={24} className="text-blue-600" />,
      title: language === 'fr' ? 'Visa Visiteur' : 'Visitor Visa',
      link: '/nouveaux-programmes',
      type: 'visitor'
    },
    {
      icon: <BookOpen size={24} className="text-green-600" />,
      title: language === 'fr' ? 'Visa Étudiant' : 'Student Visa',
      link: '/visa-etudiant',
      type: 'student'
    },
    {
      icon: <Briefcase size={24} className="text-orange-600" />,
      title: language === 'fr' ? 'Visa Travail' : 'Work Visa',
      link: '/visa-travail',
      type: 'work'
    },
    {
      icon: <Home size={24} className="text-purple-600" />,
      title: language === 'fr' ? 'Résidence Permanente' : 'Permanent Residence',
      link: '/residence-permanente',
      type: 'permanent'
    }
  ];

  return (
    <section className="py-8 md:py-10 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          {language === 'fr' ? 'Dernières mises à jour des visas' : 'Latest Visa Updates'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visaCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="mr-3">
                  {category.icon}
                </div>
                <h3 className="text-lg font-medium">{category.title}</h3>
              </div>
              
              <div className="mb-4">
                <VisaUpdatesCounter type={category.type} />
              </div>
              
              <Link to={category.link}>
                <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                  {language === 'fr' ? 'En savoir plus' : 'Learn more'}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisaUpdatesSection;
