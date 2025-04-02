
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  country: string;
  visaType: string;
  photo: string;
  content: string;
}

const TestimonialsCarousel = () => {
  const { language } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Fanta Camara",
      country: language === 'fr' ? 'Guinée' : 'Guinea',
      visaType: language === 'fr' ? 'Visa de travail' : 'Work visa',
      photo: "/lovable-uploads/e83d4090-759f-4383-a50e-0935b0dff46f.png",
      content: language === 'fr' 
        ? "En tant que professionnelle guinéenne, j'ai pu suivre facilement l'évolution de ma demande de visa de travail pour le Canada. Le service est transparent et m'a permis de préparer sereinement mon départ. Vivement recommandé!"
        : "As a Guinean professional, I was able to easily follow the progress of my work visa application for Canada. The service is transparent and allowed me to prepare calmly for my departure. Highly recommended!"
    },
    {
      id: 2,
      name: "Marie Kouamé",
      country: language === 'fr' ? 'Côte d\'Ivoire' : 'Ivory Coast',
      visaType: language === 'fr' ? 'Résidence permanente' : 'Permanent residence',
      photo: "/lovable-uploads/e6ba2df5-51d5-4e44-8310-c09f211ddd38.png",
      content: language === 'fr'
        ? "Notre demande de résidence permanente depuis la Côte d'Ivoire était complexe, mais grâce à cette plateforme, nous avons pu suivre chaque étape et soumettre tous nos documents à temps. Un service indispensable pour notre famille!"
        : "Our permanent residence application from Ivory Coast was complex, but thanks to this platform, we were able to follow each step and submit all our documents on time. An essential service for our family!"
    },
    {
      id: 3,
      name: "Paul Mbarga",
      country: language === 'fr' ? 'Cameroun' : 'Cameroon',
      visaType: language === 'fr' ? 'Regroupement familial' : 'Family reunification',
      photo: "/lovable-uploads/11a52f19-da3d-40d6-8a0e-e964633eac3a.png",
      content: language === 'fr'
        ? "En tant que Camerounais vivant au Canada, j'ai utilisé ce service pour suivre la procédure de regroupement familial. L'interface est intuitive et les notifications m'ont aidé à comprendre où en était mon dossier à chaque instant."
        : "As a Cameroonian living in Canada, I used this service to follow the family reunification procedure. The interface is intuitive and the notifications helped me understand where my file was at every moment."
    },
    {
      id: 4,
      name: "Amadou Diallo",
      country: language === 'fr' ? 'Sénégal' : 'Senegal',
      visaType: language === 'fr' ? 'Visa d\'études' : 'Study visa',
      photo: "/lovable-uploads/173c1e3b-c129-4e78-850e-618cc040e16e.png",
      content: language === 'fr'
        ? "Depuis Dakar, j'ai pu suivre l'évolution de mon visa d'études pour l'Université McGill sans stress. Les mises à jour automatiques et les conseils personnalisés m'ont été très utiles. Je recommande vivement!"
        : "From Dakar, I was able to track the progress of my study visa for McGill University without stress. The automatic updates and personalized advice were very useful. I highly recommend it!"
    },
    {
      id: 5,
      name: "Fatou Traoré",
      country: language === 'fr' ? 'Mali' : 'Mali',
      visaType: language === 'fr' ? 'Programme des travailleurs qualifiés' : 'Skilled workers program',
      photo: "/lovable-uploads/25aba192-ae76-469f-be21-d48e46b947ef.png",
      content: language === 'fr'
        ? "En tant qu'ingénieure malienne, j'avais de nombreuses questions sur mon éligibilité au programme des travailleurs qualifiés. Ce portail m'a fourni des réponses claires et m'a permis de suivre ma candidature étape par étape."
        : "As a Malian engineer, I had many questions about my eligibility for the skilled workers program. This portal provided me with clear answers and allowed me to track my application step by step."
    },
    {
      id: 6,
      name: "Jean-Pierre Ouedraogo",
      country: language === 'fr' ? 'Burkina Faso' : 'Burkina Faso',
      visaType: language === 'fr' ? 'Programme Start-up Visa' : 'Start-up Visa Program',
      photo: "/lovable-uploads/d6dda840-bc8c-4664-b871-93daaadbad82.png",
      content: language === 'fr'
        ? "Le suivi de mon dossier pour le programme Start-up Visa était impeccable! J'ai apprécié la transparence du processus et les notifications à chaque étape. Aujourd'hui, mon entreprise fonctionne au Canada, et tout a commencé avec ce service."
        : "The tracking of my file for the Start-up Visa program was impeccable! I appreciated the transparency of the process and the notifications at each stage. Today, my company operates in Canada, and it all started with this service."
    }
  ];

  return (
    <div className="w-full py-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 px-2">
              <div className="bg-red-50 p-6 rounded-lg border border-red-100 h-full hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.photo} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-red-200"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.visaType} | {testimonial.country}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-gray-700">"{testimonial.content}"</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 md:-left-4 bg-white text-red-600 border-red-200 hover:bg-red-50" />
        <CarouselNext className="right-0 md:-right-4 bg-white text-red-600 border-red-200 hover:bg-red-50" />
      </Carousel>
    </div>
  );
};

export default TestimonialsCarousel;
