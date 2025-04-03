
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, image }) => {
  return (
    <div 
      className="relative h-80 sm:h-64 md:h-72 rounded-lg overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-[1px]" />
      <div className="absolute inset-0 p-6 flex flex-col justify-center text-center">
        <div className="bg-white bg-opacity-10 p-5 rounded-lg backdrop-blur-sm">
          <p className="text-white mb-4 italic">{content}</p>
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
            ))}
          </div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-gray-300 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const ImmigrationTestimonials: React.FC = () => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      name: "Sophia Martinez",
      role: language === 'fr' ? "Étudiante internationale" : "International Student",
      content: language === 'fr' 
        ? "Grâce à cette plateforme, j'ai pu suivre mon dossier d'immigration en temps réel. Le processus était transparent et l'interface très intuitive."
        : "Thanks to this platform, I was able to track my immigration file in real time. The process was transparent and the interface very intuitive.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Ahmed Khalil",
      role: language === 'fr' ? "Travailleur qualifié" : "Skilled Worker",
      content: language === 'fr'
        ? "Le suivi en temps réel m'a permis de rester informé à chaque étape. Les notifications sont précises et le système est très fiable."
        : "Real-time tracking allowed me to stay informed at each step. The notifications are precise and the system is very reliable.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Li Wei",
      role: language === 'fr' ? "Résident permanent" : "Permanent Resident",
      content: language === 'fr'
        ? "Le processus d'immigration peut être stressant, mais cette plateforme a rendu tout beaucoup plus facile. Les informations sont claires et précises."
        : "The immigration process can be stressful, but this platform made everything much easier. The information is clear and accurate.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Elena Sokolov",
      role: language === 'fr' ? "Entrepreneure" : "Entrepreneur",
      content: language === 'fr'
        ? "Service exceptionnel qui m'a aidé à naviguer dans le processus complexe d'immigration des affaires. Je recommande vivement."
        : "Exceptional service that helped me navigate the complex business immigration process. I highly recommend.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            {language === 'fr' ? 'Ce que nos utilisateurs disent' : 'What our users say'}
          </h2>
          <div className="flex items-center justify-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />
            ))}
            <span className="ml-2 text-lg font-medium">4.8/5</span>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {language === 'fr' 
              ? 'Découvrez les expériences de personnes qui ont utilisé notre plateforme pour leur processus d\'immigration.' 
              : 'Discover the experiences of people who have used our platform for their immigration process.'}
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Testimonial
                  name={testimonial.name}
                  role={testimonial.role}
                  content={testimonial.content}
                  image={testimonial.image}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 bg-white text-red-600 border-red-200 hover:bg-red-50" />
          <CarouselNext className="right-0 bg-white text-red-600 border-red-200 hover:bg-red-50" />
        </Carousel>
      </div>
    </section>
  );
};

export default ImmigrationTestimonials;
