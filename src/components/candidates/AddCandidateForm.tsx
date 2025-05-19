import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Plus, X, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';

// Import UI components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// DateInput component (custom component for date selection)
type DateInputProps = {
  value?: Date;
  onChange: (date: Date) => void;
};

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  return (
    <Input
      type="date"
      value={value ? format(value, 'yyyy-MM-dd') : ''}
      onChange={(e) => {
        const date = new Date(e.target.value);
        if (!isNaN(date.getTime())) {
          onChange(date);
        }
      }}
    />
  );
};

// Types précis basés sur la base de données
type VisaType = Database['public']['Enums']['visa_type'];
type StatusType = Database['public']['Enums']['status_type'];
type ImmigrationProgram = Database['public']['Enums']['immigration_program'];
type DocumentStatus = Database['public']['Enums']['document_status'];

// Types de visa disponibles
const visaTypes = [
  { id: 'Visiteur' as VisaType, label: 'Visa Visiteur' },
  { id: 'Travail' as VisaType, label: 'Visa de Travail' },
  { id: 'Résidence Permanente' as VisaType, label: 'Résidence Permanente' }
];

// Obtenir les bureaux depuis la base de données (pour l'instant hardcodé)
const bureaux = [
  'Paris', 'Rabat', 'New York', 'Mumbai', 'Mexico', 
  'Tokyo', 'Moscou', 'Madrid', 'Séoul', 'Le Caire'
];

// Statuts disponibles
const statuses = [
  'En cours' as StatusType, 
  'Approuvé' as StatusType, 
  'En attente' as StatusType, 
  'Rejeté' as StatusType, 
  'Complété' as StatusType, 
  'Expiré' as StatusType
];

// Schéma de validation du formulaire principal
const formSchema = z.object({
  prenom: z.string().min(1, { message: 'Le prénom est requis' }),
  nom: z.string().min(1, { message: 'Le nom est requis' }),
  dateNaissance: z.date({ required_error: 'La date de naissance est requise' }),
  lieuNaissance: z.string().min(1, { message: 'Le lieu de naissance est requis' }),
  numeroPassport: z.string().min(5, { message: 'Numéro de passeport invalide' }),
  numeroTelephone: z.string().min(8, { message: 'Numéro de téléphone invalide' }),
  email: z.string().email({ message: 'Email invalide' }).optional().or(z.literal('')),
  adresse: z.string().optional(),
  typeVisa: z.enum(['Visiteur', 'Travail', 'Résidence Permanente']),
  dateSoumission: z.date({ required_error: 'La date de soumission est requise' }),
  dateVoyagePrevue: z.date({ required_error: 'La date prévue du voyage est requise' }),
  bureau: z.string({ required_error: 'Veuillez sélectionner un bureau' }),
  status: z.enum(['En cours', 'Approuvé', 'En attente', 'Rejeté', 'Complété', 'Expiré']),
  procedure: z.string().optional(),
  delaiTraitement: z.string().optional(),
  notes: z.string().optional(),
  detailsBillet: z.string().optional(),
});

// Schéma pour les détails spécifiques à la résidence permanente
const residenceSchema = z.object({
  programmeImmigration: z.enum(['Entrée express', 'Arrima', 'Autre']),
  immigrationFamiliale: z.boolean().default(false),
  nombrePersonnes: z.number().min(1).default(1),
  conjointNom: z.string().optional(),
  conjointPrenom: z.string().optional(),
  conjointPassport: z.string().optional(),
  detailsAutresPersonnes: z.string().optional(),
});

interface AddCandidateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCandidate: (data: any) => void;
}

// Type pour les membres de la famille (enfants)
interface EnfantType {
  nom: string;
  prenom: string;
  age: string;
}

// Type pour les documents
interface DocumentType {
  id: string;
  nom: string;
  visa_type: VisaType;
  required: boolean;
}

const AddCandidateForm: React.FC<AddCandidateFormProps> = ({ isOpen, onClose, onAddCandidate }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File | null>>({});
  const [enfants, setEnfants] = useState<EnfantType[]>([]);
  const [newEnfant, setNewEnfant] = useState<EnfantType>({nom: '', prenom: '', age: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [isLoadingDocTypes, setIsLoadingDocTypes] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Formulaire principal
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prenom: '',
      nom: '',
      lieuNaissance: '',
      numeroPassport: '',
      numeroTelephone: '',
      email: '',
      adresse: '',
      typeVisa: 'Visiteur',
      procedure: '',
      delaiTraitement: '',
      bureau: '',
      status: 'En attente',
      notes: '',
      detailsBillet: '',
    },
  });

  // Formulaire pour les détails de résidence permanente
  const residenceForm = useForm<z.infer<typeof residenceSchema>>({
    resolver: zodResolver(residenceSchema),
    defaultValues: {
      programmeImmigration: 'Entrée express',
      immigrationFamiliale: false,
      nombrePersonnes: 1,
      conjointNom: '',
      conjointPrenom: '',
      conjointPassport: '',
      detailsAutresPersonnes: '',
    },
  });

  // Surveiller le type de visa pour afficher les documents appropriés
  const visaType = form.watch('typeVisa') as VisaType;

  // Charger les types de documents en fonction du visa sélectionné
  useEffect(() => {
    if (!visaType) return;
    
    const fetchDocumentTypes = async () => {
      setIsLoadingDocTypes(true);
      try {
        const { data, error } = await supabase
          .from('document_types')
          .select('*')
          .eq('visa_type', visaType as VisaType);
        
        if (error) throw error;
        if (data) {
          // Ensure data conforms to our DocumentType interface
          const typedDocuments = data.map(doc => ({
            id: doc.id,
            nom: doc.nom,
            visa_type: doc.visa_type,
            required: doc.required
          }));
          setDocumentTypes(typedDocuments);
        }
      } catch (error) {
        console.error('Error fetching document types:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les types de documents.",
          variant: "destructive"
        });
      } finally {
        setIsLoadingDocTypes(false);
      }
    };
    
    fetchDocumentTypes();
  }, [visaType, toast]);
  
  // Gérer le téléversement d'un document
  const handleFileUpload = (documentId: string, file: File | null) => {
    setUploadedDocuments(prev => ({
      ...prev,
      [documentId]: file
    }));
  };

  // Ajouter un enfant
  const addEnfant = () => {
    if (newEnfant.nom && newEnfant.prenom && newEnfant.age) {
      setEnfants([...enfants, newEnfant]);
      setNewEnfant({nom: '', prenom: '', age: ''});
    }
  };

  // Supprimer un enfant
  const removeEnfant = (index: number) => {
    const updatedEnfants = [...enfants];
    updatedEnfants.splice(index, 1);
    setEnfants(updatedEnfants);
  };

  // Téléversement de la photo de profil
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const clearPhotoSelection = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  // Fonction pour générer un matricule unique
  const generateIdentificationNumber = () => {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const randomPart = Math.floor(10000 + Math.random() * 90000); // Nombre à 5 chiffres
    return `CAN-${currentYear}-${randomPart}`;
  };

  // Téléverser la photo de profil
  const uploadProfilePhoto = async (candidateId: string, photoFile: File): Promise<string | null> => {
    try {
      // Vérifier que le bucket "candidates" existe
      const { data: buckets } = await supabase.storage.listBuckets();
      const candidatesBucketExists = buckets?.some(bucket => bucket.name === 'candidates');
      
      // Créer le bucket s'il n'existe pas
      if (!candidatesBucketExists) {
        const { error: createBucketError } = await supabase.storage.createBucket('candidates', {
          public: true, // Rendre le bucket public pour accéder aux images
        });
        
        if (createBucketError) {
          console.error('Error creating bucket:', createBucketError);
          return null;
        }
        console.log('Created candidates bucket successfully');
      }
      
      // Générer un nom de fichier unique
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${candidateId}-${Date.now()}.${fileExt}`;
      const filePath = `profile-photos/${fileName}`;
      
      console.log('Uploading file to path:', filePath);
      
      // Téléverser le fichier dans le storage
      const { error: uploadError } = await supabase.storage
        .from('candidates')
        .upload(filePath, photoFile);
      
      if (uploadError) {
        console.error('Error uploading profile photo:', uploadError);
        return null;
      }
      
      // Obtenir l'URL publique
      const { data } = supabase.storage
        .from('candidates')
        .getPublicUrl(filePath);
      
      console.log('File uploaded successfully, URL:', data.publicUrl);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error in uploadProfilePhoto:', error);
      return null;
    }
  };

  // Insérer l'historique de création
  const insertHistory = async (candidateId: string, action: string) => {
    try {
      await supabase.from('history').insert({
        candidate_id: candidateId,
        action: action,
        details: `Action effectuée par un administrateur`
      });
    } catch (error) {
      console.error('Error inserting history:', error);
    }
  };
  
  // Insérer les détails de résidence permanente
  const insertResidenceDetails = async (candidateId: string) => {
    try {
      const residenceData = residenceForm.getValues();
      
      // Insérer les détails de résidence permanente
      const { data: insertedResidence, error: residenceError } = await supabase
        .from('permanent_residence_details')
        .insert({
          candidate_id: candidateId,
          immigration_program: residenceData.programmeImmigration as ImmigrationProgram,
          nombre_personnes: residenceData.nombrePersonnes,
          conjoint_nom: residenceData.conjointNom || null,
          conjoint_prenom: residenceData.conjointPrenom || null,
          conjoint_passport: residenceData.conjointPassport || null
        })
        .select();
      
      if (residenceError) throw residenceError;
      
      // Si des enfants ont été ajoutés, les insérer
      if (enfants.length > 0 && insertedResidence && insertedResidence.length > 0) {
        const residenceId = insertedResidence[0].id;
        
        for (const enfant of enfants) {
          await supabase.from('enfants').insert({
            permanent_residence_id: residenceId,
            nom: enfant.nom,
            prenom: enfant.prenom,
            age: parseInt(enfant.age, 10)
          });
        }
      }
    } catch (error) {
      console.error('Error inserting residence details:', error);
    }
  };
  
  // Insérer les détails du vol
  const insertFlightDetails = async (candidateId: string, flightDetails: string) => {
    try {
      await supabase.from('details_vol').insert({
        candidate_id: candidateId,
        numero_vol: flightDetails
      });
    } catch (error) {
      console.error('Error inserting flight details:', error);
    }
  };
  
  // Insérer les documents
  const insertDocuments = async (candidateId: string) => {
    try {
      for (const [documentTypeId, file] of Object.entries(uploadedDocuments)) {
        if (!file) continue;
        
        // Générer un nom de fichier unique
        const fileExt = file.name.split('.').pop();
        const fileName = `${candidateId}-${documentTypeId}-${Date.now()}.${fileExt}`;
        const filePath = `documents/${fileName}`;
        
        // Téléverser le fichier
        await supabase.storage
          .from('candidates')
          .upload(filePath, file);
        
        // Enregistrer les métadonnées du document
        await supabase.from('documents').insert({
          candidate_id: candidateId,
          document_type_id: documentTypeId,
          status: 'uploaded' as DocumentStatus,
          file_path: filePath,
          filename: file.name
        });
      }
    } catch (error) {
      console.error('Error uploading documents:', error);
    }
  };

  // Soumission du formulaire
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Vérifier que la date de naissance est définie
      if (!data.dateNaissance) {
        toast({
          title: "Erreur de validation",
          description: "La date de naissance est obligatoire",
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }

      // Formater les dates pour la base de données (YYYY-MM-DD)
      const formatDateForDB = (date: Date) => format(date, 'yyyy-MM-dd');

      // Générer un matricule unique pour le candidat
      const identificationNumber = generateIdentificationNumber();

      // Variables pour stocker les résultats d'upload
      let photoUrlPath = null;
      
      console.log("Données à envoyer:", {
        nom: data.nom,
        prenom: data.prenom,
        date_naissance: formatDateForDB(data.dateNaissance),
        lieu_naissance: data.lieuNaissance,
        nationalite: data.lieuNaissance, // Using lieu_naissance as nationality
        numero_passport: data.numeroPassport,
        telephone: data.numeroTelephone,
        email: data.email || null,
        adresse: data.adresse || null,
        visa_type: data.typeVisa,
        procedure: data.procedure || null,
        date_soumission: formatDateForDB(data.dateSoumission),
        delai_traitement: data.delaiTraitement || null,
        status: data.status,
        date_voyage: formatDateForDB(data.dateVoyagePrevue),
        bureau: data.bureau,
        notes: data.notes || null,
        identification_number: identificationNumber
      });
      
      // Insérer le candidat
      const { data: insertedCandidate, error: insertError } = await supabase
        .from('candidates')
        .insert({
          nom: data.nom,
          prenom: data.prenom,
          date_naissance: formatDateForDB(data.dateNaissance),
          lieu_naissance: data.lieuNaissance,
          nationalite: data.lieuNaissance, // Using lieu_naissance as nationality
          numero_passport: data.numeroPassport,
          telephone: data.numeroTelephone,
          email: data.email || null,
          adresse: data.adresse || null,
          visa_type: data.typeVisa as VisaType,
          procedure: data.procedure || null,
          date_soumission: formatDateForDB(data.dateSoumission),
          delai_traitement: data.delaiTraitement || null,
          status: data.status as StatusType,
          date_voyage: formatDateForDB(data.dateVoyagePrevue),
          bureau: data.bureau,
          notes: data.notes || null,
          photo_url: null, // Initialisé à null, sera mis à jour après l'upload
          identification_number: identificationNumber // Ajout du matricule généré
        })
        .select();
      
      if (insertError) {
        console.error('Error saving candidate:', insertError);
        toast({
          title: "Erreur",
          description: `Une erreur s'est produite lors de l'ajout du candidat: ${insertError.message}`,
          variant: "destructive"
        });
        setIsSubmitting(false);
        return;
      }
      
      if (!insertedCandidate || insertedCandidate.length === 0) {
        throw new Error('No candidate data returned after insert');
      }
      
      console.log('Candidate inserted:', insertedCandidate);
      const candidateId = insertedCandidate[0].id;
      
      // Téléverser la photo de profil si disponible
      if (photoFile) {
        try {
          photoUrlPath = await uploadProfilePhoto(candidateId, photoFile);
          
          // Mettre à jour le candidat avec l'URL de la photo
          if (photoUrlPath) {
            await supabase
              .from('candidates')
              .update({ photo_url: photoUrlPath })
              .eq('id', candidateId);
          }
        } catch (error) {
          console.error('Error uploading profile photo:', error);
          toast({
            title: "Avertissement",
            description: "Le candidat a été créé mais il y a eu un problème avec le téléversement de la photo.",
            variant: "destructive"
          });
        }
      }
      
      // Insérer l'historique de création du candidat
      await insertHistory(candidateId, 'Dossier créé');
      
      // Si c'est une demande de résidence permanente, insérer les détails additionnels
      if (data.typeVisa === 'Résidence Permanente') {
        await insertResidenceDetails(candidateId);
      }
      
      // Insérer les détails du vol si disponibles
      if (data.detailsBillet) {
        await insertFlightDetails(candidateId, data.detailsBillet);
      }
      
      // Insérer les documents téléversés
      console.log('Uploading documents for candidate:', candidateId);
      await insertDocuments(candidateId);
      
      toast({
        title: "Succès",
        description: `Le candidat a été ajouté avec succès. Matricule: ${identificationNumber}`,
        variant: "default"
      });
      
      // Appeler la fonction pour notifier que le candidat a été ajouté
      onAddCandidate({
        id: candidateId,
        prenom: data.prenom,
        nom: data.nom,
        photo_url: photoUrlPath,
        identification_number: identificationNumber
        // Autres données du candidat...
      });
      
      // Fermer le formulaire
      onClose();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du candidat.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau candidat</DialogTitle>
          <DialogDescription>
            Entrez les informations du candidat et téléversez les documents nécessaires.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="photo">Photo</TabsTrigger>
            <TabsTrigger value="general">Informations générales</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            {visaType === 'Résidence Permanente' && (
              <TabsTrigger value="residence">Détails résidence</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="photo" className="space-y-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full flex flex-col items-center justify-center">
                {photoPreview ? (
                  <div className="relative">
                    <img 
                      src={photoPreview} 
                      alt="Aperçu de la photo" 
                      className="w-48 h-48 object-cover rounded-full" 
                    />
                    <button 
                      onClick={clearPhotoSelection}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-4">Cliquez ou glissez-déposez une photo</p>
                    <Button variant="outline" asChild>
                      <Label htmlFor="photo-upload" className="cursor-pointer">
                        Sélectionner une photo
                        <Input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoChange}
                        />
                      </Label>
                    </Button>
                  </>
                )}
              </div>
              
              {photoPreview && (
                <p className="text-sm text-gray-500 italic">
                  La photo sera téléversée lorsque vous soumettrez le formulaire
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Prénom */}
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Prénom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Nom */}
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date de naissance - using DateInput */}
                  <FormField
                    control={form.control}
                    name="dateNaissance"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de naissance</FormLabel>
                        <FormControl>
                          <DateInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Lieu de naissance */}
                  <FormField
                    control={form.control}
                    name="lieuNaissance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lieu de naissance</FormLabel>
                        <FormControl>
                          <Input placeholder="Pays de naissance" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Numéro de passeport */}
                  <FormField
                    control={form.control}
                    name="numeroPassport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de passeport</FormLabel>
                        <FormControl>
                          <Input placeholder="Numéro de passeport" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Numéro de téléphone */}
                  <FormField
                    control={form.control}
                    name="numeroTelephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="Numéro de téléphone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email (optionnel) */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Adresse (optionnelle) */}
                  <FormField
                    control={form.control}
                    name="adresse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse (optionnelle)</FormLabel>
                        <FormControl>
                          <Input placeholder="Adresse" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Type de visa */}
                  <FormField
                    control={form.control}
                    name="typeVisa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de visa</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            // Réinitialiser les documents si le type de visa change
                            setUploadedDocuments({});
                            
                            // Si le type change, mettre à jour l'onglet actif
                            setActiveTab('general');
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un type de visa" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {visaTypes.map((type) => (
                              <SelectItem key={type.id} value={type.id}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Procédure (optionnelle) */}
                  <FormField
                    control={form.control}
                    name="procedure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Procédure (optionnelle)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Entrée express" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date de soumission - using DateInput */}
                  <FormField
                    control={form.control}
                    name="dateSoumission"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de soumission</FormLabel>
                        <FormControl>
                          <DateInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Délai de traitement (optionnel) */}
                  <FormField
                    control={form.control}
                    name="delaiTraitement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Délai de traitement (optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 8-12 semaines" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date prévue du voyage - using DateInput */}
                  <FormField
                    control={form.control}
                    name="dateVoyagePrevue"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date prévue du voyage</FormLabel>
                        <FormControl>
                          <DateInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bureau */}
                  <FormField
                    control={form.control}
                    name="bureau"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bureau de traitement</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un bureau" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bureaux.map((bureau) => (
                              <SelectItem key={bureau} value={bureau}>
                                {bureau}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Statut */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Statut du dossier</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un statut" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Détails du billet (optionnel) */}
                  <FormField
                    control={form.control}
                    name="detailsBillet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Détails du billet (optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: AF123 Paris-Montréal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Notes (optionnelles) */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (optionnelles)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Notes additionnelles" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enregistrement..." : "Enregistrer le candidat"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="text-lg font-medium mb-2">Documents requis pour {visaType}</h3>
              
              {isLoadingDocTypes ? (
                <p>Chargement des documents requis...</p>
              ) : documentTypes.length === 0 ? (
                <p>Aucun document requis pour ce type de visa.</p>
              ) : (
                <div className="space-y-4">
                  {documentTypes.map((docType) => (
                    <div key={docType.id} className="flex flex-col space-y-2">
                      <div className="flex items-center">
                        <span className="font-medium">{docType.nom}</span>
                        {docType.required && (
                          <Badge variant="destructive" className="ml-2">Requis</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            handleFileUpload(docType.id, file);
                          }}
                          className="flex-1"
                        />
                        {uploadedDocuments[docType.id] && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileUpload(docType.id, null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      {uploadedDocuments[docType.id] && (
                        <p className="text-sm text-green-600">
                          Fichier sélectionné: {uploadedDocuments[docType.id]?.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {visaType === 'Résidence Permanente' && (
            <TabsContent value="residence" className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="text-lg font-medium mb-4">Détails de résidence permanente</h3>
                
                <Form {...residenceForm}>
                  <div className="space-y-4">
                    <FormField
                      control={residenceForm.control}
                      name="programmeImmigration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Programme d'immigration</FormLabel>
                          <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un programme" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Entrée express">Entrée express</SelectItem>
                              <SelectItem value="Arrima">Arrima (Québec)</SelectItem>
                              <SelectItem value="Autre">Autre programme</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={residenceForm.control}
                      name="immigrationFamiliale"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Immigration familiale
                            </FormLabel>
                            <p className="text-sm text-muted-foreground">
                              Cochez si la demande inclut d'autres membres de la famille
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {residenceForm.watch('immigrationFamiliale') && (
                      <>
                        <FormField
                          control={residenceForm.control}
                          name="nombrePersonnes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nombre total de personnes</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  {...field}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value, 10);
                                    field.onChange(isNaN(value) ? 1 : value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="space-y-4 border-t pt-4 mt-4">
                          <h4 className="text-md font-medium">Détails du conjoint/conjointe</h4>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={residenceForm.control}
                              name="conjointNom"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nom</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Nom du conjoint" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={residenceForm.control}
                              name="conjointPrenom"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Prénom</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Prénom du conjoint" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={residenceForm.control}
                              name="conjointPassport"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Numéro de passeport</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Passeport du conjoint" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="space-y-4 border-t pt-4 mt-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-md font-medium">Enfants</h4>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={addEnfant}
                                disabled={!newEnfant.nom || !newEnfant.prenom || !newEnfant.age}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Ajouter
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor="enfant-nom">Nom</Label>
                                <Input
                                  id="enfant-nom"
                                  value={newEnfant.nom}
                                  onChange={(e) => setNewEnfant({...newEnfant, nom: e.target.value})}
                                  placeholder="Nom"
                                />
                              </div>
                              <div>
                                <Label htmlFor="enfant-prenom">Prénom</Label>
                                <Input
                                  id="enfant-prenom"
                                  value={newEnfant.prenom}
                                  onChange={(e) => setNewEnfant({...newEnfant, prenom: e.target.value})}
                                  placeholder="Prénom"
                                />
                              </div>
                              <div>
                                <Label htmlFor="enfant-age">Âge</Label>
                                <Input
                                  id="enfant-age"
                                  value={newEnfant.age}
                                  onChange={(e) => setNewEnfant({...newEnfant, age: e.target.value})}
                                  placeholder="Âge"
                                  type="number"
                                  min="0"
                                />
                              </div>
                            </div>
                            
                            {enfants.length > 0 && (
                              <div className="mt-4">
                                <h5 className="text-sm font-medium mb-2">Enfants ajoutés:</h5>
                                <div className="space-y-2">
                                  {enfants.map((enfant, index) => (
                                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                      <span>
                                        {enfant.prenom} {enfant.nom}, {enfant.age} ans
                                      </span>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeEnfant(index)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <FormField
                            control={residenceForm.control}
                            name="detailsAutresPersonnes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Détails additionnels (optionnel)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Autres informations sur les membres de la famille" 
                                    className="min-h-[100px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </Form>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddCandidateForm;
