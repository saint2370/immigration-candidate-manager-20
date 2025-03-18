
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types de langues disponibles
export type Language = 'fr' | 'en';

// Type pour le contexte de langue
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Création du contexte
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Header
    'home': 'Accueil',
    'track_application': 'Suivi du dossier',
    'access_file': 'Accéder à mon dossier',
    'contact': 'Contact',
    
    // Index page
    'hero_title': 'Suivez votre dossier d\'immigration en toute simplicité !',
    'hero_subtitle': 'Consultez en temps réel l\'état de votre demande et téléchargez vos documents en quelques clics.',
    'enter_immigration_id': 'Entrez votre ID d\'immigration',
    'access_my_file': 'Accéder à mon dossier',
    
    // Features
    'platform_title': 'Notre Plateforme de Suivi de Dossier',
    'platform_subtitle': 'Notre plateforme sécurisée vous permet de suivre l\'état d\'avancement de votre dossier d\'immigration, d\'accéder à vos documents et de rester informé des prochaines étapes de votre procédure.',
    'quick_consultation': 'Consultation rapide',
    'quick_consultation_desc': 'Accédez instantanément aux informations de votre dossier et consultez son état d\'avancement.',
    'secure_access': 'Accès sécurisé',
    'secure_access_desc': 'Vos documents et informations sont protégés et accessibles uniquement avec votre identifiant personnel.',
    'personalized_tracking': 'Suivi personnalisé',
    'personalized_tracking_desc': 'Bénéficiez d\'un accompagnement sur mesure et recevez des notifications sur l\'évolution de votre dossier.',
    
    // How it works
    'how_it_works': 'Comment ça marche ?',
    'how_it_works_subtitle': 'En seulement 3 étapes simples, accédez à toutes les informations de votre dossier d\'immigration',
    'enter_id': 'Entrez votre ID',
    'enter_id_desc': 'Saisissez votre numéro d\'identification d\'immigration unique',
    'view_file': 'Consultez votre dossier',
    'view_file_desc': 'Accédez à toutes vos informations et téléchargez vos documents',
    'follow_updates': 'Suivez les mises à jour',
    'follow_updates_desc': 'Restez informé de l\'évolution de votre dossier à chaque étape',
    
    // Testimonials
    'testimonials_title': 'Ce que disent nos utilisateurs',
    
    // FAQ
    'faq_title': 'Questions fréquentes',
    'faq_subtitle': 'Trouvez rapidement des réponses aux questions les plus courantes',
    
    // Contact
    'need_help': 'Besoin d\'aide ?',
    'need_help_subtitle': 'Notre équipe est à votre disposition pour répondre à toutes vos questions',
    'phone': 'Téléphone',
    'email': 'Email',
    'contact_us': 'Nous contacter',
    
    // Footer
    'quick_links': 'Liens rapides',
    'legal_info': 'Informations légales',
    'follow_us': 'Suivez-nous',
    'legal_notice': 'Mentions légales',
    'privacy_policy': 'Politique de confidentialité',
    'terms_of_use': 'Conditions d\'utilisation',
    'all_rights_reserved': 'Tous droits réservés.',
    
    // Portal
    'track_your_file': 'Suivez votre dossier',
    'track_subtitle': 'Entrez votre numéro d\'identification pour consulter l\'état de votre dossier',
    'search': 'Rechercher',
    'file_details': 'Détails du dossier',
    'application_status': 'État de la demande',
    'personal_info': 'Informations personnelles',
    'documents': 'Documents',
    'download': 'Télécharger',
    'no_documents': 'Aucun document disponible',
    'status': 'Statut',
    'next_steps': 'Prochaines étapes',
    'error_missing_id': 'Veuillez entrer votre numéro d\'identification d\'immigration.',
    'loading': 'Chargement...',
    'error_loading': 'Erreur lors du chargement des données',
  },
  en: {
    // Header
    'home': 'Home',
    'track_application': 'Track Application',
    'access_file': 'Access my file',
    'contact': 'Contact',
    
    // Index page
    'hero_title': 'Track your immigration file with ease!',
    'hero_subtitle': 'Check the status of your application in real time and download your documents in just a few clicks.',
    'enter_immigration_id': 'Enter your immigration ID',
    'access_my_file': 'Access my file',
    
    // Features
    'platform_title': 'Our File Tracking Platform',
    'platform_subtitle': 'Our secure platform allows you to track the progress of your immigration file, access your documents and stay informed of the next steps in your procedure.',
    'quick_consultation': 'Quick consultation',
    'quick_consultation_desc': 'Instantly access your file information and check its progress.',
    'secure_access': 'Secure access',
    'secure_access_desc': 'Your documents and information are protected and accessible only with your personal ID.',
    'personalized_tracking': 'Personalized tracking',
    'personalized_tracking_desc': 'Benefit from tailored support and receive notifications on the progress of your file.',
    
    // How it works
    'how_it_works': 'How it works?',
    'how_it_works_subtitle': 'In just 3 simple steps, access all the information in your immigration file',
    'enter_id': 'Enter your ID',
    'enter_id_desc': 'Enter your unique immigration identification number',
    'view_file': 'View your file',
    'view_file_desc': 'Access all your information and download your documents',
    'follow_updates': 'Follow updates',
    'follow_updates_desc': 'Stay informed of the progress of your file at each step',
    
    // Testimonials
    'testimonials_title': 'What our users say',
    
    // FAQ
    'faq_title': 'Frequently Asked Questions',
    'faq_subtitle': 'Quickly find answers to the most common questions',
    
    // Contact
    'need_help': 'Need help?',
    'need_help_subtitle': 'Our team is at your disposal to answer all your questions',
    'phone': 'Phone',
    'email': 'Email',
    'contact_us': 'Contact us',
    
    // Footer
    'quick_links': 'Quick links',
    'legal_info': 'Legal information',
    'follow_us': 'Follow us',
    'legal_notice': 'Legal notice',
    'privacy_policy': 'Privacy policy',
    'terms_of_use': 'Terms of use',
    'all_rights_reserved': 'All rights reserved.',
    
    // Portal
    'track_your_file': 'Track your file',
    'track_subtitle': 'Enter your identification number to check the status of your file',
    'search': 'Search',
    'file_details': 'File details',
    'application_status': 'Application status',
    'personal_info': 'Personal information',
    'documents': 'Documents',
    'download': 'Download',
    'no_documents': 'No documents available',
    'status': 'Status',
    'next_steps': 'Next steps',
    'error_missing_id': 'Please enter your immigration identification number.',
    'loading': 'Loading...',
    'error_loading': 'Error loading data',
  }
};

// Provider du contexte de langue
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  // Fonction pour traduire une clé
  const translate = (key: string): string => {
    return translations[language][key] || key;
  };

  // Sauvegarder la langue dans le localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Récupérer la langue du localStorage au chargement
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
