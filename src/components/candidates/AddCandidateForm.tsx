
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Plus, X } from 'lucide-react';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Types précis basés sur la base de données
type VisaType = Database['public']['Enums']['visa_type'];
type StatusType = Database['public']['Enums']['status_type'];
type ImmigrationProgram = Database['public']['Enums']['immigration_program'];

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
  visa_type: string;
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
  const visaType = form.watch('typeVisa');

  // Charger les types de documents en fonction du visa sélectionné
  useEffect(() => {
    if (!visaType) return;
    
    const fetchDocumentTypes = async () => {
      setIsLoadingDocTypes(true);
      try {
        const { data, error } = await supabase
          .from('document_types')
          .select('*')
          .eq('visa_type', visaType);
        
        if (error) throw error;
        setDocumentTypes(data);
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
            status: 'uploaded',
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
      if (enfants.length > 0 && data && data[0]) {
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
      
      return data ? data[0]?.id : null;
    } catch (error) {
      console.error('Error inserting residence details:', error);
      return null;
    }
  };

  // Soumission du formulaire
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Formater les dates pour la base de données (YYYY-MM-DD)
      const formatDateForDB = (date: Date) => format(date, 'yyyy-MM-dd');
      
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
          notes: data.notes || null
        })
        .select();
      
      if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      }
      
      console.log('Candidate inserted:', insertedCandidate);
      const candidateId = insertedCandidate[0].id;
      
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
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">Informations générales</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            {visaType === 'Résidence Permanente' && (
              <TabsTrigger value="residence">Détails résidence</TabsTrigger>
            )}
          </TabsList>

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

                  {/* Date de naissance */}
                  <FormField
                    control={form.control}
                    name="dateNaissance"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de naissance</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'dd MMMM yyyy', { locale: fr })
                                ) : (
                                  <span>Sélectionner une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
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

                  {/* Date de soumission */}
                  <FormField
                    control={form.control}
                    name="dateSoumission"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de soumission</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'dd MMMM yyyy', { locale: fr })
                                ) : (
                                  <span>Sélectionner une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
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

                  {/* Date prévue du voyage */}
                  <FormField
                    control={form.control}
                    name="dateVoyagePrevue"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date prévue du voyage</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'dd MMMM yyyy', { locale: fr })
                                ) : (
                                  <span>Sélectionner une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bureau en charge */}
                  <FormField
                    control={form.control}
                    name="bureau"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bureau en charge</FormLabel>
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
                        <FormLabel>Statut</FormLabel>
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
                          placeholder="Notes importantes concernant le dossier"
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Détails du billet d'avion */}
                <FormField
                  control={form.control}
                  name="detailsBillet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Détails du billet d'avion (optionnels)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Numéro de vol, compagnie aérienne, escales, etc."
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>Annuler</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Ajout en cours...
                      </div>
                    ) : (
                      'Ajouter le candidat'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Documents requis</h3>
              {isLoadingDocTypes ? (
                <div className="flex justify-center p-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ircc-blue"></div>
                </div>
              ) : visaType ? (
                documentTypes.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {documentTypes.map((doc) => (
                      <div key={doc.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{doc.nom}</h4>
                          {uploadedDocuments[doc.id] && (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Téléversé
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Input 
                            type="file" 
                            className="flex-1"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleFileUpload(doc.id, file);
                            }}
                          />
                          {uploadedDocuments[doc.id] && (
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleFileUpload(doc.id, null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        {uploadedDocuments[doc.id] && (
                          <p className="text-sm text-gray-500 mt-1">
                            {uploadedDocuments[doc.id]?.name} ({Math.round((uploadedDocuments[doc.id]?.size || 0) / 1024)} Ko)
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Aucun document requis n'a été trouvé pour ce type de visa.
                  </p>
                )
              ) : (
                <p className="text-muted-foreground">
                  Veuillez d'abord sélectionner un type de visa dans l'onglet "Informations générales".
                </p>
              )}
            </div>
          </TabsContent>

          {visaType === 'Résidence Permanente' && (
            <TabsContent value="residence" className="space-y-4">
              <form className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <FormLabel>Programme d'immigration</FormLabel>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <Button
                        type="button"
                        variant={residenceForm.getValues().programmeImmigration === 'Entrée express' ? 'default' : 'outline'}
                        onClick={() => residenceForm.setValue('programmeImmigration', 'Entrée express')}
                        className="w-full"
                      >
                        Entrée express
                      </Button>
                      <Button
                        type="button"
                        variant={residenceForm.getValues().programmeImmigration === 'Arrima' ? 'default' : 'outline'}
                        onClick={() => residenceForm.setValue('programmeImmigration', 'Arrima')}
                        className="w-full"
                      >
                        Arrima
                      </Button>
                      <Button
                        type="button"
                        variant={residenceForm.getValues().programmeImmigration === 'Autre' ? 'default' : 'outline'}
                        onClick={() => residenceForm.setValue('programmeImmigration', 'Autre')}
                        className="w-full"
                      >
                        Autre
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <FormLabel>Immigration familiale</FormLabel>
                      <input
                        type="checkbox"
                        checked={residenceForm.getValues().immigrationFamiliale}
                        onChange={(e) => {
                          residenceForm.setValue('immigrationFamiliale', e.target.checked);
                          if (e.target.checked) {
                            residenceForm.setValue('nombrePersonnes', Math.max(2, residenceForm.getValues().nombrePersonnes));
                          } else {
                            residenceForm.setValue('nombrePersonnes', 1);
                            // Réinitialiser les détails du conjoint
                            residenceForm.setValue('conjointNom', '');
                            residenceForm.setValue('conjointPrenom', '');
                            residenceForm.setValue('conjointPassport', '');
                            setEnfants([]);
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  {residenceForm.getValues().immigrationFamiliale && (
                    <>
                      <div>
                        <FormLabel>Nombre de personnes</FormLabel>
                        <Input
                          type="number"
                          min="2"
                          value={residenceForm.getValues().nombrePersonnes}
                          onChange={(e) => residenceForm.setValue('nombrePersonnes', parseInt(e.target.value, 10) || 2)}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-3">Informations du conjoint</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <FormLabel>Nom du conjoint</FormLabel>
                            <Input
                              placeholder="Nom"
                              value={residenceForm.getValues().conjointNom || ''}
                              onChange={(e) => residenceForm.setValue('conjointNom', e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <FormLabel>Prénom du conjoint</FormLabel>
                            <Input
                              placeholder="Prénom"
                              value={residenceForm.getValues().conjointPrenom || ''}
                              onChange={(e) => residenceForm.setValue('conjointPrenom', e.target.value)}
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <FormLabel>Numéro de passeport du conjoint</FormLabel>
                            <Input
                              placeholder="Numéro de passeport"
                              value={residenceForm.getValues().conjointPassport || ''}
                              onChange={(e) => residenceForm.setValue('conjointPassport', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {residenceForm.getValues().nombrePersonnes > 2 && (
                        <div className="border rounded-md p-4">
                          <h4 className="font-medium mb-3">Informations des enfants</h4>
                          
                          {enfants.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-sm font-medium mb-2">Enfants ajoutés:</h5>
                              {enfants.map((enfant, index) => (
                                <div key={index} className="flex items-center gap-2 mb-2 border p-2 rounded">
                                  <span className="flex-1">
                                    {enfant.prenom} {enfant.nom}, {enfant.age} ans
                                  </span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => removeEnfant(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <FormLabel>Nom</FormLabel>
                              <Input
                                placeholder="Nom"
                                value={newEnfant.nom}
                                onChange={(e) => setNewEnfant({ ...newEnfant, nom: e.target.value })}
                              />
                            </div>
                            
                            <div>
                              <FormLabel>Prénom</FormLabel>
                              <Input
                                placeholder="Prénom"
                                value={newEnfant.prenom}
                                onChange={(e) => setNewEnfant({ ...newEnfant, prenom: e.target.value })}
                              />
                            </div>
                            
                            <div>
                              <FormLabel>Âge</FormLabel>
                              <Input
                                placeholder="Âge"
                                type="number"
                                min="0"
                                max="25"
                                value={newEnfant.age}
                                onChange={(e) => setNewEnfant({ ...newEnfant, age: e.target.value })}
                              />
                            </div>
                          </div>
                          
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-3 flex items-center gap-1"
                            onClick={addEnfant}
                            disabled={!newEnfant.nom || !newEnfant.prenom || !newEnfant.age}
                          >
                            <Plus className="h-4 w-4" />
                            Ajouter un enfant
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                  
                  <div>
                    <FormLabel>Autres détails</FormLabel>
                    <Textarea
                      placeholder="Détails supplémentaires concernant la demande de résidence permanente"
                      className="min-h-[80px]"
                      value={residenceForm.getValues().detailsAutresPersonnes || ''}
                      onChange={(e) => residenceForm.setValue('detailsAutresPersonnes', e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddCandidateForm;
