
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UserCheck, Plane, Award, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// LocalStorage keys
const VISA_COUNTS_KEY = 'visa_counts';
const VISA_DATE_KEY = 'visa_counts_date';

const VisaUpdatesSection = () => {
  const { language } = useLanguage();
  const today = new Date();
  const [visaCounts, setVisaCounts] = useState({
    workerVisas: 0,
    studentVisas: 0,
    visitorVisas: 0,
    permanentVisas: 0
  });
  const [countersVisible, setCountersVisible] = useState(false);
  
  const formattedDate = format(
    today,
    language === 'fr' ? 'd MMMM yyyy' : 'MMMM d, yyyy',
    { locale: language === 'fr' ? fr : undefined }
  );
  
  // Check if we need to generate new random visa numbers
  useEffect(() => {
    const initializeVisaCounts = () => {
      // Check if we have stored visa counts and if they're from today
      const storedDate = localStorage.getItem(VISA_DATE_KEY);
      const storedCounts = localStorage.getItem(VISA_COUNTS_KEY);
      const currentDate = today.toDateString();
      
      // Generate new counts if no stored counts or if they're not from today
      if (!storedCounts || storedDate !== currentDate) {
        const newCounts = {
          workerVisas: Math.floor(Math.random() * 4900) + 100, // 100-5000
          studentVisas: Math.floor(Math.random() * 4900) + 100,
          visitorVisas: Math.floor(Math.random() * 4900) + 100,
          permanentVisas: Math.floor(Math.random() * 4900) + 100
        };
        
        // Store the new counts and current date
        localStorage.setItem(VISA_COUNTS_KEY, JSON.stringify(newCounts));
        localStorage.setItem(VISA_DATE_KEY, currentDate);
        
        setVisaCounts(newCounts);
      } else {
        // Use stored counts
        setVisaCounts(JSON.parse(storedCounts));
      }
    };
    
    initializeVisaCounts();
    
    // Use Intersection Observer to detect when section is visible
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setCountersVisible(true);
      }
    }, { threshold: 0.1 });
    
    const visaSection = document.getElementById('visa-updates-section');
    if (visaSection) {
      observer.observe(visaSection);
    }
    
    return () => {
      if (visaSection) {
        observer.unobserve(visaSection);
      }
    };
  }, [today]);
  
  // Mise à jour des visas - données organisées en colonnes
  const leftColumnUpdates = [
    {
      id: 1,
      icon: <UserCheck className="text-red-600" size={24} />,
      title: language === 'fr' ? 'Visas Travailleurs' : 'Worker Visas',
      count: visaCounts.workerVisas,
      content: language === 'fr' 
        ? `délivrés aujourd'hui`
        : `issued today`,
    },
    {
      id: 2,
      icon: <Plane className="text-red-600" size={24} />,
      title: language === 'fr' ? 'Visas Visiteurs' : 'Visitor Visas',
      count: visaCounts.visitorVisas,
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
      count: visaCounts.studentVisas,
      content: language === 'fr'
        ? `étudiants internationaux ont reçu leur visa`
        : `international students received their visa`,
    },
    {
      id: 4,
      icon: <Award className="text-red-600" size={24} />,
      title: language === 'fr' ? 'Résidence Permanente' : 'Permanent Residence',
      count: visaCounts.permanentVisas,
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
        </div>
        
        <div className="mt-2">
          <div className="flex items-baseline">
            <span className="text-red-600 font-medium text-sm">
              {language === 'fr' ? 'Plus de ' : 'More than '}
            </span>
            <span className="text-xl font-bold text-red-600 mx-1">
              {countersVisible ? new Intl.NumberFormat().format(item.count) : "---"}
            </span>
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
    <section id="visa-updates-section" className="py-5 bg-white bg-opacity-95 border-y border-gray-100">
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
