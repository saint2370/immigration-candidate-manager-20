import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Plus, X, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';

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
import { Input, DateInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Label } from '../ui/label';

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

  // Téléverser un fichier dans le storage Supabase
  const uploadFile = async (file: File, candidateId: string, documentTypeId: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${candidateId}/${documentTypeId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      console.log('Uploading file:', fileName, 'to path:', filePath);
      
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('Error uploading to storage:', error);
        throw error;
      }
      
      console.log('Upload successful:', data);
      return { filePath, fileName: file.name };
    } catch (error) {
      console.error('Exception during upload:', error);
      throw error;
    }
  };

  // Téléverser la photo de profil
  const uploadProfilePhoto = async (candidateId: string): Promise<string | null> => {
    if (!photoFile) return null;
    
    try {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${candidateId}/profile.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('profile_photos')
        .upload(fileName, photoFile, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('Error uploading profile photo:', error);
        throw error;
      }
      
      console.log('Upload profile photo successful:', data);
      return fileName;
    } catch (error) {
      console.error('Exception during profile photo upload:', error);
      throw error;
    }
  };

  // Insérer des documents dans la base de données
  const insertDocuments = async (candidateId: string) => {
    const documentsPromises = [];
    
    for (const [documentTypeId, file] of Object.entries(uploadedDocuments)) {
      if (!file) continue;
      
      try {
        console.log('Processing document:', documentTypeId, 'for candidate:', candidateId);
        
        // Upload the file
        const { filePath, fileName } = await uploadFile(file, candidateId, documentTypeId);
        
        // Insert document record
        const insertPromise = supabase
          .from('documents')
          .insert({
            candidate_id: candidateId,
            document_type_id: documentTypeId,
            file_path: filePath,
            filename: fileName,
            status: 'uploaded' as DocumentStatus,
            upload_date: new Date().toISOString()
          });
        
        documentsPromises.push(insertPromise);
      } catch (error) {
        console.error('Error uploading document:', error);
        toast({
          title: "Avertissement",
          description: `Échec du téléversement d'un document: ${file.name}`,
          variant: "destructive"
        });
        // Continue with other documents even if one fails
      }
    }
    
    // Wait for all document inserts to complete
    if (documentsPromises.length > 0) {
      try {
        await Promise.all(documentsPromises);
        console.log('All documents inserted successfully');
      } catch (error) {
        console.error('Error inserting documents:', error);
      }
    }
  };

  // Insérer l'historique du candidat
  const insertHistory = async (candidateId: string, action: string) => {
    try {
      const { error } = await supabase
        .from('history')
        .insert({
          candidate_id: candidateId,
          action,
          date: new Date().toISOString()
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error inserting history:', error);
    }
  };

  // Insérer les détails du vol
  const insertFlightDetails = async (candidateId: string, detailsBillet: string) => {
    if (!detailsBillet) return;
    
    try {
      const { error } = await supabase
        .from('details_vol')
        .insert({
          candidate_id: candidateId,
          numero_vol: detailsBillet
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error inserting flight details:', error);
    }
  };

  // Insérer les détails de résidence permanente
  const insertResidenceDetails = async (candidateId: string) => {
    if (visaType !== 'Résidence Permanente') return null;
    
    try {
      const residenceData = residenceForm.getValues();
      
      const { data, error } = await supabase
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
      
      if (error) throw error;
      
      // Si nous avons des enfants, les insérer également
      if (enfants.length > 0 && data && data.length > 0) {
        const permanentResidenceId = data[0].id;
        
        for (const enfant of enfants) {
          const { error: enfantError } = await supabase
            .from('enfants')
            .insert({
              permanent_residence_id: permanentResidenceId,
              nom: enfant.nom,
              prenom: enfant.prenom,
              age: parseInt(enfant.age, 10)
            });
          
          if (enfantError) throw enfantError;
        }
      }
      
      return data && data.length > 0 ? data[0].id : null;
    } catch (error) {
      console.error('Error inserting residence details:', error);
      return null;
    }
  };

  // Fonction pour valider et formater une date entrée manuellement
  const parseDateString = (value: string): Date | null => {
    // Format attendu: JJ/MM/AAAA
    const parts = value.split('/');
    if (parts.length !== 3) return null;
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Les mois commencent à 0
    const year = parseInt(parts[2], 10);
    
    // Vérifier que les valeurs sont des nombres valides
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    
    // Vérifier que la date est valide
    const date = new Date(year, month, day);
    if (
      date.getDate() !== day ||
      date.getMonth() !== month ||
      date.getFullYear() !== year
    ) {
      return null; // Date invalide (ex: 31/02/2023)
    }
    
    return date;
  };

  // Formatter une date en chaîne de caractères (JJ/MM/AAAA)
  const formatDateString = (date: Date | null): string => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Soumission du formulaire
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Formater les dates pour la base de données (YYYY-MM-DD)
      const formatDateForDB = (date: Date) => format(date, 'yyyy-MM-dd');

      // Variables pour stocker les résultats d'upload
      let photoUrlPath = null;
      
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
          photo_url: null // Initialisé à null, sera mis à jour après l'upload
        })
        .select();
      
      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }
      
      if (!insertedCandidate || insertedCandidate.length === 0) {
        throw new Error('No candidate data returned after insert');
      }
      
      console.log('Candidate inserted:', insertedCandidate);
      const candidateId = insertedCandidate[0].id;
      
      // Téléverser la photo de profil si disponible
      if (photoFile) {
        try {
          photoUrlPath = await uploadProfilePhoto(candidateId);
          
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
        description: "Le candidat a été ajouté avec succès",
        variant: "default"
      });
      
      // Appeler la fonction pour notifier que le candidat a été ajouté
      onAddCandidate({
        id: candidateId,
        prenom: data.prenom,
        nom: data.nom,
        photo_url: photoUrlPath
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
                    {isSubmitting ? "Enregistrement..."
