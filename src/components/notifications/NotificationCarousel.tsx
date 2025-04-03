
import React, { useEffect, useState } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UserCheck, Plane, Award, Briefcase } from 'lucide-react';
import CounterAnimation from '@/components/animations/CounterAnimation';

// Generate dynamic notifications based on date
const generateNotifications = (language: string) => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  
  // Generate numbers based on the date for consistency but variability
  const workerVisas = 1000 + (day % 400);
  const permanentVisas = 1500 + (day % 500);
  const studentVisas = 1200 + (day % 300);
  const familyVisas = 800 + (day % 200);
  
  return [
    {
      id: 1,
      icon: <UserCheck className="text-green-600" size={24} />,
      title: language === 'fr' ? 'Visas Travailleurs' : 'Worker Visas',
      content: language === 'fr' 
        ? `visas de travail viennent d'être délivrés aujourd'hui`
        : `work visas have been issued today`,
      counter: workerVisas,
      color: 'bg-red-100 border-red-200'
    },
    {
      id: 2,
      icon: <Award className="text-blue-600" size={24} />,
      title: language === 'fr' ? 'Résidence Permanente' : 'Permanent Residence',
      content: language === 'fr'
        ? `demandes de résidence permanente approuvées ce mois-ci`
        : `permanent residence applications approved this month`,
      counter: permanentVisas,
      color: 'bg-white border-red-200'
    },
    {
      id: 3,
      icon: <Briefcase className="text-purple-600" size={24} />,
      title: language === 'fr' ? 'Visas Étudiants' : 'Student Visas',
      content: language === 'fr'
        ? `étudiants internationaux ont reçu leur visa cette semaine`
        : `international students received their visa this week`,
      counter: studentVisas,
      color: 'bg-red-100 border-red-200'
    },
    {
      id: 4,
      icon: <Plane className="text-teal-600" size={24} />,
      title: language === 'fr' ? 'Visiteurs' : 'Visitors',
      content: language === 'fr'
        ? `visiteurs accueillis au Canada ce mois-ci`
        : `visitors welcomed to Canada this month`,
      counter: familyVisas,
      color: 'bg-white border-red-200'
    }
  ];
};

export const NotificationCarousel = () => {
  const { language } = useLanguage();
  const [notifications, setNotifications] = useState<any[]>([]);
  
  // Update notifications based on date and language
  useEffect(() => {
    setNotifications(generateNotifications(language));
  }, [language]);

  return (
    <div className="w-full py-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {notifications.map((notification) => (
            <CarouselItem key={notification.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className={`${notification.color} border shadow-sm hover:shadow-md transition-shadow`}>
                  <CardContent className="flex items-start p-4 gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {notification.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{notification.title}</h3>
                      <div className="flex items-baseline">
                        <CounterAnimation
                          startValue={notification.counter - Math.floor(notification.counter/3)}
                          endValue={notification.counter}
                          duration={2000}
                          className="text-lg font-bold text-red-600 mr-1"
                          loop={true}
                          randomize={true}
                          minValue={notification.counter - 200}
                          maxValue={notification.counter + 200}
                          loopDelay={10000}
                        />
                        <p className="text-gray-700">{notification.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        {format(new Date(), language === 'fr' ? 'd MMMM yyyy' : 'MMMM d, yyyy', { locale: language === 'fr' ? fr : undefined })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 bg-white text-red-600 border-red-200 hover:bg-red-50" />
        <CarouselNext className="right-0 bg-white text-red-600 border-red-200 hover:bg-red-50" />
      </Carousel>
    </div>
  );
};

export default NotificationCarousel;
