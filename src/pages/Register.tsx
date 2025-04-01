
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import IRCCHeader from '@/components/layout/IRCCHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

// Schéma pour la partie informations personnelles
const personalInfoSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  prenom: z.string().min(2, 'Le prénom est requis'),
  date_naissance: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date invalide (AAAA-MM-JJ)'),
  lieu_naissance: z.string().min(2, 'Le lieu de naissance est requis'),
  nationalite: z.string().min(2, 'La nationalité est requise'),
  pays_actuel: z.string().min(2, 'Le pays actuel est requis'),
  telephone: z.string().min(5, 'Un numéro de téléphone valide est requis'),
  email: z.string().email('Email invalide'),
  adresse: z.string().min(5, 'L\'adresse est requise'),
  numero_passport: z.string().min(5, 'Le numéro de passeport est requis'),
});

// Schéma pour la partie professionnelle
const professionalInfoSchema = z.object({
  dernier_diplome: z.string().min(2, 'Le diplôme est requis'),
  emploi_actuel: z.string().min(2, 'L\'emploi est requis'),
  visa_type: z.enum(['Visiteur', 'Travail', 'Résidence Permanente'], {
    required_error: 'Le type de visa est requis',
  }),
});

// Schéma pour la partie immigration (conditionnelle)
const immigrationInfoSchema = z.object({
  immigration_program: z.enum(['Entrée express', 'Arrima', 'Autre'], {
    required_error: 'Le programme d\'immigration est requis',
  }).optional(),
  nombre_personnes: z.number().int().positive().default(1),
  avec_conjoint: z.boolean().default(false),
  conjoint_nom: z.string().optional(),
  conjoint_prenom: z.string().optional(),
  conjoint_diplome: z.string().optional(),
  conjoint_passport: z.string().optional(),
  nombre_enfants: z.number().int().min(0).default(0),
  // Les détails des enfants seront gérés séparément
});

// Type pour les enfants
interface Enfant {
  nom: string;
  prenom: string;
  age: number;
}

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<'personal' | 'professional' | 'immigration' | 'family' | 'photo'>('personal');
  const [enfants, setEnfants] = useState<Enfant[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formulaires
  const personalForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      nom: '',
      prenom: '',
      date_naissance: '',
      lieu_naissance: '',
      nationalite: '',
      pays_actuel: '',
      telephone: '',
      email: '',
      adresse: '',
      numero_passport: '',
    },
  });

  const professionalForm = useForm<z.infer<typeof professionalInfoSchema>>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      dernier_diplome: '',
      emploi_actuel: '',
      visa_type: undefined,
    },
  });

  const immigrationForm = useForm<z.infer<typeof immigrationInfoSchema>>({
    resolver: zodResolver(immigrationInfoSchema),
    defaultValues: {
      immigration_program: undefined,
      nombre_personnes: 1,
      avec_conjoint: false,
      conjoint_nom: '',
      conjoint_prenom: '',
      conjoint_diplome: '',
      conjoint_passport: '',
      nombre_enfants: 0,
    },
  });

  // Handler pour ajouter/supprimer des enfants
  const addEnfant = () => {
    setEnfants([...enfants, { nom: '', prenom: '', age: 0 }]);
  };

  const removeEnfant = (index: number) => {
    const updatedEnfants = enfants.filter((_, i) => i !== index);
    setEnfants(updatedEnfants);
  };

  const updateEnfant = (index: number, field: keyof Enfant, value: string | number) => {
    const updatedEnfants = [...enfants];
    updatedEnfants[index] = { ...updatedEnfants[index], [field]: value };
    setEnfants(updatedEnfants);
  };

  // Handler pour la photo de profil
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Navigation entre les étapes
  const goToNext = async () => {
    if (currentStep === 'personal') {
      const valid = await personalForm.trigger();
      if (valid) setCurrentStep('professional');
    } else if (currentStep === 'professional') {
      const valid = await professionalForm.trigger();
      if (valid) {
        if (professionalForm.getValues().visa_type === 'Résidence Permanente') {
          setCurrentStep('immigration');
        } else {
          setCurrentStep('photo');
        }
      }
    } else if (currentStep === 'immigration') {
      const valid = await immigrationForm.trigger();
      if (valid) {
        if (immigrationForm.getValues().avec_conjoint || immigrationForm.getValues().nombre_enfants > 0) {
          setCurrentStep('family');
        } else {
          setCurrentStep('photo');
        }
      }
    } else if (currentStep === 'family') {
      setCurrentStep('photo');
    }
  };

  const goBack = () => {
    if (currentStep === 'professional') {
      setCurrentStep('personal');
    } else if (currentStep === 'immigration') {
      setCurrentStep('professional');
    } else if (currentStep === 'family') {
      setCurrentStep('immigration');
    } else if (currentStep === 'photo') {
      const visaType = professionalForm.getValues().visa_type;
      const hasFamily = immigrationForm.getValues().avec_conjoint || immigrationForm.getValues().nombre_enfants > 0;
      
      if (hasFamily && visaType === 'Résidence Permanente') {
        setCurrentStep('family');
      } else if (visaType === 'Résidence Permanente') {
        setCurrentStep('immigration');
      } else {
        setCurrentStep('professional');
      }
    }
  };

  // Soumission du formulaire
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const personalData = personalForm.getValues();
      const professionalData = professionalForm.getValues();
      const immigrationData = immigrationForm.getValues();
      
      // Upload de la photo de profil si présente
      let photoUrl = null;
      if (photo) {
        const fileExt = photo.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `profile_photos/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('profile_photos')
          .upload(filePath, photo);
          
        if (uploadError) {
          throw new Error(`Erreur lors du téléversement de la photo: ${uploadError.message}`);
        }
        
        photoUrl = filePath;
      }

      // Préparation des données du candidat
      const candidateData = {
        nom: personalData.nom,
        prenom: personalData.prenom,
        date_naissance: personalData.date_naissance,
        lieu_naissance: personalData.lieu_naissance,
        nationalite: personalData.nationalite,
        pays_actuel: personalData.pays_actuel,
        numero_passport: personalData.numero_passport,
        telephone: personalData.telephone,
        email: personalData.email,
        adresse: personalData.adresse,
        dernier_diplome: professionalData.dernier_diplome,
        emploi_actuel: professionalData.emploi_actuel,
        visa_type: professionalData.visa_type,
        status: 'En attente',
        photo_url: photoUrl,
        date_soumission: format(new Date(), 'yyyy-MM-dd'),
      };

      // Insertion du candidat
      const { data: candidateInsertData, error: candidateError } = await supabase
        .from('candidates')
        .insert(candidateData as any)
        .select('id');

      if (candidateError) {
        throw new Error(`Erreur lors de l'enregistrement du candidat: ${candidateError.message}`);
      }

      // Si c'est une demande de résidence permanente, on ajoute les détails
      if (professionalData.visa_type === 'Résidence Permanente' && candidateInsertData) {
        const candidateId = (candidateInsertData[0] as any).id;
        
        // Insertion des détails de résidence permanente
        const permanentResidenceData = {
          candidate_id: candidateId,
          immigration_program: immigrationData.immigration_program,
          nombre_personnes: immigrationData.nombre_personnes,
          conjoint_nom: immigrationData.avec_conjoint ? immigrationData.conjoint_nom : null,
          conjoint_prenom: immigrationData.avec_conjoint ? immigrationData.conjoint_prenom : null,
          conjoint_passport: immigrationData.avec_conjoint ? immigrationData.conjoint_passport : null,
        };

        const { data: residenceData, error: residenceError } = await supabase
          .from('permanent_residence_details')
          .insert(permanentResidenceData as any)
          .select('id');

        if (residenceError) {
          throw new Error(`Erreur lors de l'enregistrement des détails de résidence: ${residenceError.message}`);
        }
        
        // Insertion des enfants si applicable
        if (enfants.length > 0 && residenceData) {
          const residenceId = (residenceData[0] as any).id;
          
          const enfantsData = enfants.map(enfant => ({
            permanent_residence_id: residenceId,
            nom: enfant.nom,
            prenom: enfant.prenom,
            age: enfant.age
          }));
          
          const { error: enfantsError } = await supabase
            .from('enfants')
            .insert(enfantsData as any);
            
          if (enfantsError) {
            throw new Error(`Erreur lors de l'enregistrement des enfants: ${enfantsError.message}`);
          }
        }
      }
      
      // Afficher le message de confirmation
      toast({
        title: language === 'fr' ? 'Inscription réussie' : 'Registration successful',
        description: language === 'fr'
          ? "Merci pour votre intérêt de venir vivre et visiter le Canada. Votre demande de création de compte dans le portail de l'IRCC est en cours de traitement. Cela prendra 48h au plus, car vos informations seront envoyées à notre équipe pour expertise."
          : "Thank you for your interest in coming to live and visit Canada. Your request to create an account in the IRCC portal is being processed. This will take up to 48 hours, as your information will be sent to our team for review.",
        variant: 'default',
      });
      
      // Redirection vers la page d'accueil
      setTimeout(() => {
        navigate('/');
      }, 5000);

    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: language === 'fr' ? 'Erreur' : 'Error',
        description: error instanceof Error ? error.message : 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <IRCCHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{language === 'fr' ? 'Inscription' : 'Registration'}</CardTitle>
            <CardDescription>
              {language === 'fr' 
                ? 'Créez votre compte pour accéder aux services IRCC Canada'
                : 'Create your account to access IRCC Canada services'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {currentStep === 'personal' && (
              <Form {...personalForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={personalForm.control}
                      name="nom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Nom' : 'Last name'}</FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'fr' ? 'Votre nom' : 'Your last name'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalForm.control}
                      name="prenom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Prénom' : 'First name'}</FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'fr' ? 'Votre prénom' : 'Your first name'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalForm.control}
                      name="date_naissance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Date de naissance' : 'Date of birth'}</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalForm.control}
                      name="lieu_naissance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Lieu de naissance' : 'Place of birth'}</FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'fr' ? 'Ville, Pays' : 'City, Country'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalForm.control}
                      name="nationalite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Nationalité' : 'Nationality'}</FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'fr' ? 'Votre nationalité' : 'Your nationality'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalForm.control}
                      name="pays_actuel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Pays actuel de résidence' : 'Current country of residence'}</FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'fr' ? 'Pays où vous résidez' : 'Country where you reside'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalForm.control}
                      name="telephone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Téléphone' : 'Phone'}</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="+XX XXX XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Email' : 'Email'}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@domain.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalForm.control}
                      name="adresse"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>{language === 'fr' ? 'Adresse' : 'Address'}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={language === 'fr' ? 'Votre adresse complète' : 'Your complete address'} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={personalForm.control}
                      name="numero_passport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Numéro de passeport' : 'Passport number'}</FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'fr' ? 'Numéro de votre passeport' : 'Your passport number'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            )}
            
            {currentStep === 'professional' && (
              <Form {...professionalForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={professionalForm.control}
                      name="dernier_diplome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Dernier diplôme obtenu' : 'Highest degree obtained'}</FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'fr' ? 'Ex: Master en Informatique' : 'Ex: Master in Computer Science'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={professionalForm.control}
                      name="emploi_actuel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Emploi actuel' : 'Current job'}</FormLabel>
                          <FormControl>
                            <Input placeholder={language === 'fr' ? 'Ex: Développeur web' : 'Ex: Web developer'} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={professionalForm.control}
                      name="visa_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Type de visa souhaité' : 'Desired visa type'}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={language === 'fr' ? 'Sélectionnez un type de visa' : 'Select a visa type'} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Visiteur">{language === 'fr' ? 'Visa Visiteur' : 'Visitor Visa'}</SelectItem>
                              <SelectItem value="Travail">{language === 'fr' ? 'Visa de Travail' : 'Work Visa'}</SelectItem>
                              <SelectItem value="Résidence Permanente">{language === 'fr' ? 'Résidence Permanente' : 'Permanent Residence'}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            )}
            
            {currentStep === 'immigration' && (
              <Form {...immigrationForm}>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={immigrationForm.control}
                      name="immigration_program"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Programme d\'immigration' : 'Immigration program'}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={language === 'fr' ? 'Sélectionnez un programme' : 'Select a program'} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Entrée express">{language === 'fr' ? 'Entrée express' : 'Express Entry'}</SelectItem>
                              <SelectItem value="Arrima">Arrima</SelectItem>
                              <SelectItem value="Autre">{language === 'fr' ? 'Autre' : 'Other'}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={immigrationForm.control}
                      name="nombre_personnes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Nombre de personnes' : 'Number of people'}</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 1)} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={immigrationForm.control}
                      name="avec_conjoint"
                      render={({ field }) => (
                        <FormItem className="flex gap-2 items-center">
                          <FormControl>
                            <input 
                              type="checkbox" 
                              className="w-4 h-4" 
                              checked={field.value} 
                              onChange={(e) => field.onChange(e.target.checked)} 
                            />
                          </FormControl>
                          <FormLabel className="mt-0">
                            {language === 'fr' ? 'Voyagez-vous avec un conjoint?' : 'Are you traveling with a spouse?'}
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {immigrationForm.watch('avec_conjoint') && (
                      <>
                        <FormField
                          control={immigrationForm.control}
                          name="conjoint_nom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{language === 'fr' ? 'Nom du conjoint' : 'Spouse\'s last name'}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={immigrationForm.control}
                          name="conjoint_prenom"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{language === 'fr' ? 'Prénom du conjoint' : 'Spouse\'s first name'}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={immigrationForm.control}
                          name="conjoint_diplome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{language === 'fr' ? 'Diplôme du conjoint' : 'Spouse\'s degree'}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={immigrationForm.control}
                          name="conjoint_passport"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{language === 'fr' ? 'Numéro de passeport du conjoint' : 'Spouse\'s passport number'}</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    
                    <FormField
                      control={immigrationForm.control}
                      name="nombre_enfants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{language === 'fr' ? 'Nombre d\'enfants (moins de 18 ans)' : 'Number of children (under 18)'}</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0"
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            )}
            
            {currentStep === 'family' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">
                  {language === 'fr' ? 'Informations sur les enfants' : 'Children information'}
                </h3>
                
                {enfants.map((enfant, index) => (
                  <div key={index} className="border p-4 rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">
                        {language === 'fr' ? `Enfant ${index + 1}` : `Child ${index + 1}`}
                      </h4>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeEnfant(index)}
                      >
                        {language === 'fr' ? 'Supprimer' : 'Remove'}
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {language === 'fr' ? 'Nom' : 'Last name'}
                        </label>
                        <Input
                          value={enfant.nom}
                          onChange={(e) => updateEnfant(index, 'nom', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {language === 'fr' ? 'Prénom' : 'First name'}
                        </label>
                        <Input
                          value={enfant.prenom}
                          onChange={(e) => updateEnfant(index, 'prenom', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          {language === 'fr' ? 'Âge' : 'Age'}
                        </label>
                        <Input
                          type="number"
                          min="0"
                          max="18"
                          value={enfant.age}
                          onChange={(e) => updateEnfant(index, 'age', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                {enfants.length < (immigrationForm.getValues().nombre_enfants || 0) && (
                  <Button 
                    variant="outline"
                    onClick={addEnfant}
                  >
                    {language === 'fr' ? 'Ajouter un enfant' : 'Add child'}
                  </Button>
                )}
                
                {immigrationForm.getValues().nombre_enfants > 0 && enfants.length === 0 && (
                  <div className="text-center py-2">
                    <Button 
                      variant="outline"
                      onClick={addEnfant}
                    >
                      {language === 'fr' ? 'Ajouter un enfant' : 'Add child'}
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {currentStep === 'photo' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-4">
                    {language === 'fr' ? 'Photo de profil' : 'Profile photo'}
                  </h3>
                  
                  <div className="mb-4">
                    {photoPreview ? (
                      <div className="mx-auto overflow-hidden w-40 h-40 rounded-full border-2 border-gray-300">
                        <img 
                          src={photoPreview} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="mx-auto flex items-center justify-center w-40 h-40 rounded-full bg-gray-100 border-2 border-dashed border-gray-300">
                        <span className="text-gray-500">
                          {language === 'fr' ? 'Pas d\'image' : 'No image'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
                    {language === 'fr' ? 'Choisir une photo' : 'Choose a photo'}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handlePhotoChange}
                    />
                  </label>
                  
                  <p className="mt-2 text-sm text-gray-500">
                    {language === 'fr' 
                      ? 'Choisissez une photo de type portrait (format JPEG, PNG)' 
                      : 'Choose a portrait style photo (JPEG, PNG format)'}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {currentStep !== 'personal' && (
              <Button variant="outline" onClick={goBack} disabled={isSubmitting}>
                {language === 'fr' ? 'Retour' : 'Back'}
              </Button>
            )}
            
            {currentStep !== 'photo' ? (
              <Button onClick={goToNext} disabled={isSubmitting}>
                {language === 'fr' ? 'Suivant' : 'Next'}
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting 
                  ? (language === 'fr' ? 'Traitement en cours...' : 'Processing...') 
                  : (language === 'fr' ? 'Créer mon compte' : 'Create my account')}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
