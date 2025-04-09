import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  home: {
    en: 'Home',
    fr: 'Accueil'
  },
  track_application: {
    en: 'Track Application',
    fr: 'Suivi de dossier'
  },
  contact: {
    en: 'Contact',
    fr: 'Contact'
  },
  quick_links: {
    en: 'Quick Links',
    fr: 'Liens rapides'
  },
  legal_info: {
    en: 'Legal Information',
    fr: 'Informations légales'
  },
  legal_notice: {
    en: 'Legal Notice',
    fr: 'Mentions légales'
  },
  privacy_policy: {
    en: 'Privacy Policy',
    fr: 'Politique de confidentialité'
  },
  terms_of_use: {
    en: 'Terms of Use',
    fr: 'Conditions d\'utilisation'
  },
  follow_us: {
    en: 'Follow Us',
    fr: 'Suivez-nous'
  },
  all_rights_reserved: {
    en: 'All rights reserved',
    fr: 'Tous droits réservés'
  },
  file_details: {
    en: 'File Details',
    fr: 'Détails du dossier'
  },
  enter_immigration_id: {
    en: 'Enter your immigration ID',
    fr: 'Entrez votre ID d\'immigration'
  },
  access_file: {
    en: 'Access Your File',
    fr: 'Accéder à votre dossier'
  },
  need_help: {
    en: 'Need Help?',
    fr: 'Besoin d\'aide?'
  },
  need_help_subtitle: {
    en: 'Our team is here to assist you with any questions about your immigration process.',
    fr: 'Notre équipe est là pour vous aider avec toutes vos questions sur votre processus d\'immigration.'
  },
  phone: {
    en: 'Phone',
    fr: 'Téléphone'
  },
  email: {
    en: 'Email',
    fr: 'Email'
  },
  contact_us: {
    en: 'Contact Us',
    fr: 'Contactez-nous'
  },
  quick_consultation: {
    en: 'Quick Consultation',
    fr: 'Consultation rapide'
  },
  quick_consultation_desc: {
    en: 'Get immediate access to your file status and application details.',
    fr: 'Obtenez un accès immédiat à l\'état de votre dossier et aux détails de votre demande.'
  },
  secure_access: {
    en: 'Secure Access',
    fr: 'Accès sécurisé'
  },
  secure_access_desc: {
    en: 'Your personal information is protected with advanced encryption.',
    fr: 'Vos informations personnelles sont protégées par un cryptage avancé.'
  },
  personalized_tracking: {
    en: 'Personalized Tracking',
    fr: 'Suivi personnalisé'
  },
  personalized_tracking_desc: {
    en: 'Follow each step of your application with real-time updates.',
    fr: 'Suivez chaque étape de votre demande avec des mises à jour en temps réel.'
  },
  how_it_works: {
    en: 'How It Works',
    fr: 'Comment ça marche'
  },
  how_it_works_subtitle: {
    en: 'Access your immigration file in just a few simple steps',
    fr: 'Accédez à votre dossier d\'immigration en quelques étapes simples'
  },
  enter_id: {
    en: 'Enter Your ID',
    fr: 'Entrez votre ID'
  },
  enter_id_desc: {
    en: 'Fill in your immigration ID in the search field.',
    fr: 'Renseignez votre ID d\'immigration dans le champ de recherche.'
  },
  view_file: {
    en: 'View Your File',
    fr: 'Consultez votre dossier'
  },
  view_file_desc: {
    en: 'Access all your application information and status.',
    fr: 'Accédez à toutes les informations et au statut de votre demande.'
  },
  follow_updates: {
    en: 'Follow Updates',
    fr: 'Suivez les mises à jour'
  },
  follow_updates_desc: {
    en: 'Receive notifications on your application progress.',
    fr: 'Recevez des notifications sur l\'avancement de votre demande.'
  },
  testimonials_title: {
    en: 'What Our Users Say',
    fr: 'Ce que disent nos utilisateurs'
  },
  faq_title: {
    en: 'Frequently Asked Questions',
    fr: 'Questions fréquemment posées'
  },
  faq_subtitle: {
    en: 'Find answers to common questions about our platform and immigration process',
    fr: 'Trouvez des réponses aux questions courantes sur notre plateforme et le processus d\'immigration'
  },
  error_missing_id: {
    en: 'Please enter a valid immigration ID',
    fr: 'Veuillez entrer un ID d\'immigration valide'
  },
  // New translation keys for immigration programs
  immigration_programs: {
    en: 'Immigration Programs',
    fr: 'Programmes d\'immigration'
  },
  student_visa: {
    en: 'Student Visa',
    fr: 'Visa étudiant'
  },
  student_visa_desc: {
    en: 'Study at world-class Canadian institutions',
    fr: 'Étudiez dans des établissements canadiens de classe mondiale'
  },
  work_visa: {
    en: 'Work Visa',
    fr: 'Visa de travail'
  },
  work_visa_desc: {
    en: 'Opportunities in the Canadian job market',
    fr: 'Opportunités sur le marché du travail canadien'
  },
  permanent_residence: {
    en: 'Permanent Residence',
    fr: 'Résidence permanente'
  },
  permanent_residence_desc: {
    en: 'Start a new life in Canada',
    fr: 'Commencez une nouvelle vie au Canada'
  },
  
  // New translations for Eligibility Calculator
  eligibility_calculator: {
    en: 'Eligibility Calculator',
    fr: 'Calculateur d\'éligibilité'
  },
  eligibility_calculator_desc: {
    en: 'Assess your immigration eligibility',
    fr: 'Évaluez votre éligibilité à l\'immigration'
  },
  start_assessment: {
    en: 'Start Assessment',
    fr: 'Commencer l\'évaluation'
  },
  your_profile: {
    en: 'Your Immigration Profile',
    fr: 'Votre profil d\'immigration'
  },
  assessment_result: {
    en: 'Your Assessment Result',
    fr: 'Résultat de votre évaluation'
  },
  excellent_eligibility: {
    en: 'Excellent Eligibility',
    fr: 'Excellente éligibilité'
  },
  good_eligibility: {
    en: 'Good Eligibility',
    fr: 'Bonne éligibilité'
  },
  average_eligibility: {
    en: 'Average Eligibility',
    fr: 'Éligibilité moyenne'
  },
  limited_eligibility: {
    en: 'Limited Eligibility',
    fr: 'Éligibilité limitée'
  },
  recommended_programs: {
    en: 'Recommended Programs',
    fr: 'Programmes recommandés'
  },
  // Add new translations for jobs section
  jobs_in_canada: {
    en: 'Jobs in Canada',
    fr: 'Emplois au Canada'
  },
  job_management: {
    en: 'Job Management',
    fr: 'Gestion des offres d\'emploi'
  },
  job_title: {
    en: 'Job Title',
    fr: 'Titre du poste'
  },
  company: {
    en: 'Company',
    fr: 'Entreprise'
  },
  location: {
    en: 'Location',
    fr: 'Lieu'
  },
  job_type: {
    en: 'Job Type',
    fr: 'Type d\'emploi'
  },
  full_time: {
    en: 'Full Time',
    fr: 'Temps plein'
  },
  part_time: {
    en: 'Part Time',
    fr: 'Temps partiel'
  },
  contract: {
    en: 'Contract',
    fr: 'Contractuel'
  },
  temporary: {
    en: 'Temporary',
    fr: 'Temporaire'
  },
  internship: {
    en: 'Internship',
    fr: 'Stage'
  },
  description: {
    en: 'Description',
    fr: 'Description'
  },
  requirements: {
    en: 'Requirements',
    fr: 'Exigences'
  },
  salary_range: {
    en: 'Salary Range',
    fr: 'Fourchette de salaire'
  },
  apply_now: {
    en: 'Apply Now',
    fr: 'Postuler maintenant'
  },
  view_details: {
    en: 'View Details',
    fr: 'Voir les détails'
  },
  categories: {
    en: 'Categories',
    fr: 'Catégories'
  },
  all_categories: {
    en: 'All Categories',
    fr: 'Toutes les catégories'
  },
  province: {
    en: 'Province',
    fr: 'Province'
  },
  all_provinces: {
    en: 'All Provinces',
    fr: 'Toutes les provinces'
  },
  expiry_date: {
    en: 'Expiry Date',
    fr: 'Date d\'expiration'
  },
  status: {
    en: 'Status',
    fr: 'Statut'
  },
  active: {
    en: 'Active',
    fr: 'Active'
  },
  inactive: {
    en: 'Inactive',
    fr: 'Inactive'
  },
  search_jobs: {
    en: 'Search Jobs',
    fr: 'Rechercher des emplois'
  },
  add_job: {
    en: 'Add Job',
    fr: 'Ajouter une offre'
  },
  edit_job: {
    en: 'Edit Job',
    fr: 'Modifier l\'offre'
  },
  delete_job: {
    en: 'Delete Job',
    fr: 'Supprimer l\'offre'
  },
  confirm_delete: {
    en: 'Confirm Delete',
    fr: 'Confirmer la suppression'
  },
  cancel: {
    en: 'Cancel',
    fr: 'Annuler'
  },
  save: {
    en: 'Save',
    fr: 'Enregistrer'
  },
  job_resources: {
    en: 'Job Resources',
    fr: 'Ressources d\'emploi'
  },
  cv_template: {
    en: 'CV Template',
    fr: 'Modèle de CV'
  },
  interview_tips: {
    en: 'Interview Tips',
    fr: 'Conseils pour les entretiens'
  },
  jobs_available: {
    en: 'Jobs Available',
    fr: 'Offres d\'emploi disponibles'
  },
  no_jobs_found: {
    en: 'No jobs found',
    fr: 'Aucune offre d\'emploi trouvée'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
