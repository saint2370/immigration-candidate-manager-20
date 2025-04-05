
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
  reverse?: boolean;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  role, 
  image, 
  reverse = false 
}) => {
  return (
    <div 
      className={cn(
        "relative rounded-lg overflow-hidden h-auto min-h-[300px] md:min-h-[250px]",
        "transition-all duration-300 hover:shadow-lg"
      )}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20 flex items-center justify-center p-6">
        <div className="text-center max-w-md mx-auto">
          <p className="text-white italic mb-4">"{quote}"</p>
          <h4 className="text-white font-semibold">{author}</h4>
          <p className="text-gray-300 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const ImmigrationTestimonials = () => {
  const { language } = useLanguage();
  
  const testimonials = [
    {
      quote: language === 'fr' 
        ? 'Grâce à cette plateforme, j\'ai pu suivre l\'évolution de ma demande de résidence permanente en temps réel. Le processus était transparent et les notifications m\'ont permis de rester informé à chaque étape.'
        : 'Thanks to this platform, I was able to track the progress of my permanent residence application in real time. The process was transparent and notifications kept me informed at every step.',
      author: 'David Rodriguez',
      role: language === 'fr' ? 'Résident Permanent depuis 2023' : 'Permanent Resident since 2023',
      image: '/lovable-uploads/558584bc-ea53-41a4-af28-c62cd053ac50.png'
    },
    {
      quote: language === 'fr'
        ? 'J\'étais inquiète pour ma demande de visa étudiant, mais cette plateforme m\'a aidée à comprendre exactement ce qui était nécessaire. Mon dossier a été approuvé rapidement et j\'étudie maintenant à l\'Université de Montréal.'
        : 'I was worried about my student visa application, but this platform helped me understand exactly what was needed. My file was approved quickly and I am now studying at the University of Montreal.',
      author: 'Aisha Patel',
      role: language === 'fr' ? 'Étudiante internationale' : 'International Student',
      image: '/lovable-uploads/fd39e6b7-2604-4a75-9d31-0e861c44104d.png'
    },
    {
      quote: language === 'fr'
        ? 'La possibilité de télécharger directement des documents et de recevoir des réponses rapides a considérablement accéléré notre processus de parrainage familial. Un service professionnel qui a fait toute la différence.'
        : 'The ability to upload documents directly and receive quick responses has significantly accelerated our family sponsorship process. A professional service that made all the difference.',
      author: 'Jean et Marie Tremblay',
      role: language === 'fr' ? 'Programme de parrainage familial' : 'Family Sponsorship Program',
      image: '/lovable-uploads/25aba192-ae76-469f-be21-d48e46b947ef.png'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {language === 'fr' ? 'Témoignages' : 'Testimonials'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Découvrez les expériences de personnes qui ont utilisé notre plateforme pour leur processus d\'immigration.'
              : 'Discover the experiences of people who have used our platform for their immigration process.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImmigrationTestimonials;
