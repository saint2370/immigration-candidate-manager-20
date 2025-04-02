
import React from 'react';
import { Link } from 'react-router-dom';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ImmigrationPageLayoutProps {
  children: React.ReactNode;
  title: string;
  headerImage: string;
  intro: string;
  faqItems: { question: string; answer: string }[];
}

const ImmigrationPageLayout: React.FC<ImmigrationPageLayoutProps> = ({ 
  children,
  title,
  headerImage,
  intro,
  faqItems
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen">
      <IRCCHeader />
      
      {/* Hero Section with Image */}
      <div 
        className="relative w-full h-64 md:h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto">{intro}</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          {children}
        </div>
      </div>
      
      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          {language === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md overflow-hidden">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-5 md:px-6 py-3 md:py-4 hover:bg-red-50">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-5 md:px-6 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-red-50 py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            {language === 'fr' 
              ? 'Vous avez besoin d\'aide pour votre demande?' 
              : 'Need help with your application?'}
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {language === 'fr'
              ? 'Consultez notre équipe de conseillers en immigration pour vous guider dans vos démarches.'
              : 'Consult our team of immigration advisors to guide you through the process.'}
          </p>
          <Link 
            to="/index#contact" 
            className="bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 transition-colors"
          >
            {language === 'fr' ? 'Nous contacter' : 'Contact Us'}
          </Link>
        </div>
      </section>
      
      {/* Footer import will be here in the full implementation */}
    </div>
  );
};

export default ImmigrationPageLayout;
