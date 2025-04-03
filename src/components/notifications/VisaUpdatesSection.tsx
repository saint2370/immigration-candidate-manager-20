
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UserCheck, Plane, Award, Briefcase, Plus } from 'lucide-react';
import CounterAnimation from '@/components/animations/CounterAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Générer des nombres dynamiques basés sur la date
const generateVisaNumbers = (day: number) => ({
  workerVisas: 1000 + (day % 1000),
  permanentVisas: 1500 + (day % 1200),
  studentVisas: 1200 + (day % 800),
  familyVisas: 800 + (day % 600),
});

export const VisaUpdatesSection = () => {
  const { language } = useLanguage();
  const today = new Date();
  const day = today.getDate();
  
  const { workerVisas, permanentVisas, studentVisas, familyVisas } = generateVisaNumbers(day);
  
  const formattedDate = format(
    today,
    language === 'fr' ? 'd MMMM yyyy' : 'MMMM d, yyyy',
    { locale: language === 'fr' ? fr : undefined }
  );
  
  // Mise à jour des visas - données organisées en colonnes
  const leftColumnUpdates = [
    {
      id: 1,
      icon: <UserCheck className="text-red-600" size={24} />,
      title: language === 'fr' ? 'Visas Travailleurs' : 'Worker Visas',
      count: workerVisas,
      content: language === 'fr' 
        ? `visas de travail délivrés aujourd'hui`
        : `work visas issued today`,
    },
    {
      id: 2,
      icon: <Plane className="text-red-600" size={24} />,
      title: language === 'fr' ? 'Visas Visiteurs' : 'Visitor Visas',
      count: familyVisas,
      content: language === 'fr'
        ? `visiteurs accueillis au Canada aujourd'hui`
        : `visitors welcomed to Canada today`,
    }
  ];
  
  const rightColumnUpdates = [
    {
      id: 3,
      icon: <Briefcase className="text-red-600" size={24} />,
      title: language === 'fr' ? 'Visas Étudiants' : 'Student Visas',
      count: studentVisas,
      content: language === 'fr'
        ? `étudiants internationaux ont reçu leur visa`
        : `international students received their visa`,
    },
    {
      id: 4,
      icon: <Award className="text-red-600" size={24} />,
      title: language === 'fr' ? 'Résidence Permanente' : 'Permanent Residence',
      count: permanentVisas,
      content: language === 'fr'
        ? `demandes de résidence permanente approuvées`
        : `permanent residence applications approved`,
    }
  ];
  
  const renderVisaItem = (item: typeof leftColumnUpdates[0], index: number) => (
    <Card key={item.id} className={`mb-4 border shadow-sm hover:shadow-md transition-all duration-300 ${index % 2 === 0 ? 'bg-red-50' : 'bg-white'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {item.icon}
            <h3 className="font-bold ml-2 text-gray-800">{item.title}</h3>
          </div>
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8 rounded-full">
            <Plus size={16} />
          </Button>
        </div>
        
        <div className="mt-2">
          <div className="flex items-baseline">
            <CounterAnimation
              startValue={item.count - 200}
              endValue={item.count}
              duration={2000}
              className="text-xl font-bold text-red-600 mr-1"
              loop={true}
              randomize={true}
              minValue={100}
              maxValue={5000}
              loopDelay={10000}
            />
            <span className="text-sm text-gray-700">{item.content}</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          {formattedDate}
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <section className="py-5 bg-white bg-opacity-95 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-3 text-gray-800">
          {language === 'fr' ? 'Dernières mises à jour sur les visas' : 'Latest Visa Updates'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            {leftColumnUpdates.map((item, index) => renderVisaItem(item, index))}
          </div>
          <div>
            {rightColumnUpdates.map((item, index) => renderVisaItem(item, index))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaUpdatesSection;
