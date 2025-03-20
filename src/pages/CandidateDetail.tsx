import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import { Link } from 'react-router-dom';
import { Pencil, ArrowLeft, Save, X, Upload, Trash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, DateInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ResidencePermanenteForm from '@/components/candidates/ResidencePermanenteForm';

// Define a type for the documents with the nested document_types
type DocumentWithTypeName = Database['public']['Tables']['documents']['Row'] & {
  document_types: {
    nom: string;
    required: boolean;
  } | null;
};

type StatusType = Database['public']['Enums']['status_type'];
type VisaType = Database['public']['Enums']['visa_type'];
type DocumentType = {
  id: string;
  nom: string;
  visa_type: VisaType;
  required: boolean;
};
type DocumentStatus = Database['public']['Enums']['document_status'];

// Type pour les enfants
interface EnfantType {
  id?: string;
  nom: string;
  prenom: string;
  age: string;
  numero_passport?: string;
  permanent_residence_id?: string;
}

// Type pour les détails de résidence permanente
type PermanentResidenceDetails = Database['public']['Tables']['permanent_residence_details']['Row'];
type ImmigrationProgram = 'Entrée express' | 'Arrima' | 'Autre';

// Component props interface
interface CandidateDetailProps {
  isNewCandidate?: boolean;
}

const statuses: StatusType[] = [
  'En cours', 'Approuvé', 'En attente', 'Rejeté', 'Complété', 'Expiré'
];

const visaTypes: VisaType[] = [
  'Visiteur', 'Travail', 'Résidence Permanente'
];

// Bureaux disponibles
const bureaux = [
  'Paris', 'Rabat', 'New York', 'Mumbai', 'Mexico', 
  'Tokyo', 'Moscou', 'Madrid', 'Séoul', 'Le Caire'
];

const CandidateDetail: React.FC<CandidateDetailProps> = ({ isNewCandidate = false }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isEditMode = location.pathname.includes('/edit/') || isNewCandidate;
  const [activeTab, setActiveTab] = useState('info');

  const [candidate, setCandidate] = useState<Database['public']['Tables']['candidates']['Row'] | null>(null);
  const [documents, setDocuments] = useState<DocumentWithTypeName[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File | null>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingDocTypes, setIsLoadingDocTypes] = useState(false);
  
  // État pour le formulaire d'édition
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    status: 'En attente' as StatusType,
    visa_type: 'Résidence Permanente' as VisaType,
    notes: '',
    bureau: 'Paris',
    numero_passport: '',
    nationalite: '',
    lieu_naissance: '',
    adresse: '',
    date_naissance: null as Date | null,
    date_soumission: new Date() as Date | null,
    date_voyage: null as Date | null,
    procedure: '',
    delai_traitement: '',
  });

  // État pour le téléchargement de la photo
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [permanentResidence, setPermanentResidence] = useState<PermanentResidenceDetails | null>(null);
  const [enfants, setEnfants] = useState<EnfantType[]>([]);
  const [isLoadingResidenceData, setIsLoadingResidenceData] = useState(false);
  
  useEffect(() => {
    if (id && !isNewCandidate) {
      fetchCandidate();
      fetchDocuments();
      fetchResidenceDetails();

      // Subscribe to realtime updates for this specific candidate
      const channel = supabase
        .channel(`candidate-${id}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'candidates',
            filter: `id=eq.${id}`
          },
          (payload) => {
            console.log('Candidate updated:', payload);
            
            // Update the candidate data in real-time
            const updatedCandidate = payload.new as Database['public']['Tables']['candidates']['Row'];
            setCandidate(updatedCandidate);
            
            // Show a toast notification
            if (!isEditMode) {
              toast({
                title: "Mise à jour en temps réel",
                description: "Les informations du candidat ont été mises à jour.",
              });
            }
          }
        )
        .subscribe();

      // Subscribe to document changes for this candidate
      const docsChannel = supabase
        .channel(`docs-${id}`)
        .on(
          'postgres_changes',
          {
            event: '*', // Listen to all events
            schema: 'public',
            table: 'documents',
            filter: `candidate_id=eq.${id}`
          },
          (payload) => {
            console.log('Documents updated:', payload);
            
            // Refresh documents list
            fetchDocuments();
            
            if (payload.eventType === 'INSERT') {
              toast({
                title: "Document ajouté",
                description: "Un nouveau document a été ajouté au dossier.",
              });
            }
          }
        )
        .subscribe();

      return () => {
        // Cleanup subscriptions on component unmount
        supabase.removeChannel(channel);
        supabase.removeChannel(docsChannel);
      };
    } else if (isNewCandidate) {
      // For new candidate, we're already in edit mode and don't need to fetch
      setIsLoading(false);
      // Set default visa type to fetch appropriate document types
      fetchDocumentTypes(formData.visa_type);
    }
  }, [id, isNewCandidate]);

  // Mettre à jour le formulaire lorsque le candidat est chargé
  useEffect(() => {
    if (candidate) {
      setFormData({
        nom: candidate.nom || '',
        prenom: candidate.prenom || '',
        email: candidate.email || '',
        telephone: candidate.telephone || '',
        status: candidate.status as StatusType,
        visa_type: candidate.visa_type as VisaType,
        notes: candidate.notes || '',
        bureau: candidate.bureau || '',
        numero_passport: candidate.numero_passport || '',
        nationalite: candidate.nationalite || '',
        lieu_naissance: candidate.lieu_naissance || '',
        adresse: candidate.adresse || '',
        date_naissance: candidate.date_naissance ? new Date(candidate.date_naissance) : null,
        date_soumission: candidate.date_soumission ? new Date(candidate.date_soumission) : null,
        date_voyage: candidate.date_voyage ? new Date(candidate.date_voyage) : null,
        procedure: candidate.procedure || '',
        delai_traitement: candidate.delai_traitement || '',
      });
      
      if (candidate.photo_url) {
        setPhotoPreview(`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/profile_photos/${candidate.photo_url}`);
      }

      // Charger les types de documents en fonction du visa sélectionné
      fetchDocumentTypes(candidate.visa_type);
    }
  }, [candidate]);

  // Surveiller le changement de type de visa pour recharger les types de documents
  useEffect(() => {
    if (isEditMode && formData.visa_type) {
      fetchDocumentTypes(formData.visa_type);
    }
  }, [formData.visa_type, isEditMode]);

  // Fetch residence details and children if applicable
  const fetchResidenceDetails = async () => {
    if (!id) return;
    
    setIsLoadingResidenceData(true);
    try {
      // Fetch residence details
      const { data: residenceData, error: residenceError } = await supabase
        .from('permanent_residence_details')
        .select('*')
        .eq('candidate_id', id)
        .single();
      
      if (residenceError && residenceError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Error fetching residence details:', residenceError);
      }
      
      if (residenceData) {
        setPermanentResidence(residenceData);
        
        // Now fetch children if we have residence details
        const { data: enfantsData, error: enfantsError } = await supabase
          .from('enfants')
          .select('*')
          .eq('permanent_residence_id', residenceData.id);
        
        if (enfantsError) {
          console.error('Error fetching children:', enfantsError);
        }
        
        if (enfantsData) {
          setEnfants(enfantsData.map(enfant => ({
            ...enfant,
            age: enfant.age.toString()
          })));
        }
      }
    } catch (error) {
      console.error('Unexpected error fetching residence details:', error);
    } finally {
      setIsLoadingResidenceData(false);
    }
  };

  const fetchCandidate = async () => {
    setIsLoading(true);
    try {
      // Fix the type issue with the id parameter
      const { data: candidate, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', id as string)
        .single();

      if (error) {
        console.error("Error fetching candidate:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les informations du candidat.",
          variant: "destructive"
        });
      }

      if (candidate) {
        setCandidate(candidate);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDocuments = async () => {
    try {
      // Fix the type issue with the candidate_id parameter
      const { data, error } = await supabase
        .from('documents')
        .select('*, document_types(nom, required)')
        .eq('candidate_id', id as string);

      if (error) {
        console.error("Error fetching documents:", error);
      }

      if (data) {
        setDocuments(data as DocumentWithTypeName[]);
      }
    } catch (error) {
      console.error("Unexpected error fetching documents:", error);
    }
  };

  const fetchDocumentTypes = async (visaType: VisaType) => {
    if (!visaType) return;
    
    setIsLoadingDocTypes(true);
    try {
      const { data, error } = await supabase
        .from('document_types')
        .select('*')
        .eq('visa_type', visaType);
      
      if (error) throw error;
      if (data) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [name]: date || null
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleFileUpload = (documentId: string, file: File | null) => {
    setUploadedDocuments(prev => ({
      ...prev,
      [documentId]: file
    }));
  };

  const clearPhotoSelection = () => {
    setPhotoFile(null);
    if (candidate?.photo_url) {
      setPhotoPreview(`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/profile_photos/${candidate.photo_url}`);
    } else {
      setPhotoPreview(null);
    }
  };

  const uploadPhoto = async (candidateId: string): Promise<string | null> => {
    if (!photoFile) return null;
    
    setIsUploading(true);
    try {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${candidateId}/profile.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profile_photos')
        .upload(fileName, photoFile, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        throw uploadError;
      }
      
      return fileName;
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast({
        title: "Erreur",
        description: "Impossible de téléverser la photo.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = async () => {
    if (!candidate?.photo_url || !id) return;
    
    try {
      // Supprimer le fichier du stockage
      const { error: deleteError } = await supabase.storage
        .from('profile_photos')
        .remove([candidate.photo_url]);
      
      if (deleteError) throw deleteError;
      
      // Mettre à jour le candidat pour supprimer la référence à la photo
      const { error: updateError } = await supabase
        .from('candidates')
        .update({ photo_url: null })
        .eq('id', id as string);
      
      if (updateError) throw updateError;
      
      // Mettre à jour l'état local
      setPhotoPreview(null);
      setPhotoFile(null);
      setCandidate(prev => prev ? { ...prev, photo_url: null } : null);
      
      toast({
        title: "Photo supprimée",
        description: "La photo du candidat a été supprimée.",
      });
    } catch (error) {
      console.error("Error removing photo:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la photo.",
        variant: "destructive"
      });
    }
  };

  // Téléverser un document dans le storage Supabase
  const uploadFile = async (file: File, candidateId: string, documentTypeId: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${candidateId}/${documentTypeId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;
      
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
      }
    }
    
    // Wait for all document inserts to complete
    if (documentsPromises.length > 0) {
      try {
        await Promise.all(documentsPromises);
        console.log('All documents inserted successfully');
        fetchDocuments(); // Refresh documents list
      } catch (error) {
        console.error('Error inserting documents:', error);
      }
    }
  };

  // Save residence details and children
  const saveResidenceDetails = async (candidateId: string) => {
    if (formData.visa_type !== 'Résidence Permanente') return;
    
    try {
      // Prepare data for residence details
      const residenceData = {
        candidate_id: candidateId,
        immigration_program: permanentResidence?.immigration_program || 'Entrée express',
        nombre_personnes: permanentResidence?.nombre_personnes || 1,
        conjoint_nom: permanentResidence?.conjoint_nom || null,
        conjoint_prenom: permanentResidence?.conjoint_prenom || null,
        conjoint_passport: permanentResidence?.conjoint_passport || null
      };
      
      let residenceId;
      
      if (permanentResidence && permanentResidence.id) {
        // Update existing residence details
        const { error: updateError } = await supabase
          .from('permanent_residence_details')
          .update(residenceData)
          .eq('id', permanentResidence.id);
        
        if (updateError) throw updateError;
        residenceId = permanentResidence.id;
      } else {
        // Insert new residence details
        const { data: newResidence, error: insertError } = await supabase
          .from('permanent_residence_details')
          .insert(residenceData)
          .select();
        
        if (insertError) throw insertError;
        if (!newResidence || newResidence.length === 0) {
          throw new Error('No data returned from residence details insert');
        }
        
        residenceId = newResidence[0].id;
      }
      
      // Handle children
      if (residenceId) {
        // First, delete any existing children not in our current list
        if (permanentResidence && permanentResidence.id) {
          const existingIds = enfants
            .filter(enfant => enfant.id)
            .map(enfant => enfant.id);
          
          if (existingIds.length > 0) {
            const { error: deleteError } = await supabase
              .from('enfants')
              .delete()
              .eq('permanent_residence_id', residenceId)
              .not('id', 'in', `(${existingIds.join(',')})`);
            
            if (deleteError) {
              console.error('Error deleting children:', deleteError);
            }
          } else {
            // If no existing IDs, delete all children for this residence
            const { error: deleteAllError } = await supabase
              .from('enfants')
              .delete()
              .eq('permanent_residence_id', residenceId);
            
            if (deleteAllError) {
              console.error('Error deleting all children:', deleteAllError);
            }
          }
        }
        
        // Now insert/update each child
        for (const enfant of enfants) {
          const enfantData = {
            permanent_residence_id: residenceId,
            nom: enfant.nom,
            prenom: enfant.prenom,
            age: parseInt(enfant.age, 10),
            numero_passport: enfant.numero_passport || null
          };
          
          if (enfant.id) {
            // Update existing child
            const { error: updateError } = await supabase
              .from('enfants')
              .update(enfantData)
              .eq('id', enfant.id);
            
            if (updateError) {
              console.error('Error updating child:', updateError);
            }
          } else {
            // Insert new child
            const { error: insertError } = await supabase
              .from('enfants')
              .insert(enfantData);
            
            if (insertError) {
              console.error('Error inserting child:', insertError);
            }
          }
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error saving residence details:', error);
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    try {
      // Format dates for database
      const formatDateForDB = (date: Date | null) => {
        if (!date) return null;
        return format(date, 'yyyy-MM-dd');
      };

      // Prepare data object for both new and existing candidates
      const candidateData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email || null,
        telephone: formData.telephone || null,
        status: formData.status,
        visa_type: formData.visa_type,
        notes: formData.notes || null,
        bureau: formData.bureau,
        numero_passport: formData.numero_passport,
        nationalite: formData.nationalite,
        lieu_naissance: formData.lieu_naissance,
        adresse: formData.adresse || null,
        date_naissance: formatDateForDB(formData.date_naissance),
        date_soumission: formatDateForDB(formData.date_soumission),
        date_voyage: formatDateForDB(formData.date_voyage),
        procedure: formData.procedure || null,
        delai_traitement: formData.delai_traitement || null,
      };

      let candidateId = id;
      let photoUrl = candidate?.photo_url;

      if (isNewCandidate) {
        // Insert new candidate
        const { data: newCandidate, error: insertError } = await supabase
          .from('candidates')
          .insert(candidateData)
          .select()
          .single();
        
        if (insertError) throw insertError;
        
        candidateId = newCandidate.id;
        
        // Upload photo if provided
        if (photoFile) {
          photoUrl = await uploadPhoto(candidateId);
          
          // Update candidate with photo URL if photo was uploaded
          if (photoUrl) {
            await supabase
              .from('candidates')
              .update({ photo_url: photoUrl })
              .eq('id', candidateId);
          }
        }
        
        // Add creation to history
        await supabase
          .from('history')
          .insert({
            candidate_id: candidateId,
            action: 'Dossier créé',
            date: new Date().toISOString()
          });
          
        // Save residence details if applicable
        if (formData.visa_type === 'Résidence Permanente' && candidateId) {
          await saveResidenceDetails(candidateId);
        }
        
        toast({
          title: "Candidat créé",
          description: "Le nouveau candidat a été créé avec succès.",
        });
      } else {
        // Update existing candidate
        if (photoFile) {
          photoUrl = await uploadPhoto(id as string);
        }
        
        const { error: updateError } = await supabase
          .from('candidates')
          .update({
            ...candidateData,
            photo_url: photoUrl
          })
          .eq('id', id as string);
        
        if (updateError) throw updateError;
        
        // Save residence details if applicable
        if (formData.visa_type === 'Résidence Permanente') {
          await saveResidenceDetails(id as string);
        } else if (permanentResidence && permanentResidence.id) {
          // If visa type changed and we have existing residence details, delete them
          const { error: deleteError } = await supabase
            .from('permanent_residence_details')
            .delete()
            .eq('id', permanentResidence.id);
          
          if (deleteError) {
            console.error('Error deleting residence details:', deleteError);
          }
        }
        
        // Add to history
        await supabase
          .from('history')
          .insert({
            candidate_id: id,
            action: 'Dossier modifié',
            date: new Date().toISOString()
          });
        
        toast({
          title: "Candidat mis à jour",
          description: "Les informations du candidat ont été mises à jour avec succès.",
        });
      }
      
      // Upload any new documents if we have an id
      if (candidateId && Object.keys(uploadedDocuments).length > 0) {
        await insertDocuments(candidateId);
      }
      
      // Refresh data and exit edit mode
      navigate(`/tableaudebord/candidate/${candidateId}`);
    } catch (error) {
      console.error("Error saving candidate:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement du candidat.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-4 flex justify-center items-center h-64">Chargement...</div>;
  }

  if (!candidate && !isNewCandidate) {
    return <div className="container mx-auto p-4">Candidat non trouvé.</div>;
  }

  // Vue en mode lecture
  if (!isEditMode) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/tableaudebord/candidates" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
            <ArrowLeft className="h-5 w-5" />
            Retour à la liste des candidats
          </Link>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate(`/tableaudebord/candidates/edit/${id}`)}
          >
            <Pencil className="h-4 w-4" />
            Modifier
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-1 flex flex-col items-center">
            {candidate && candidate.photo_url ? (
              <Avatar className="h-40 w-40 rounded-full">
                <AvatarImage 
                  src={`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/profile_photos/${candidate.photo_url}`}
                  alt={`${candidate.prenom} ${candidate.nom}`}
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl">
                  {candidate.prenom?.charAt(0)}{candidate.nom?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar className="h-40 w-40 rounded-full">
                <AvatarFallback className="text-3xl">
                  {candidate && candidate.prenom?.charAt(0)}{candidate && candidate.nom?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <h1 className="text-2xl font-bold mt-4 text-center">{candidate && candidate.prenom} {candidate && candidate.nom}</h1>
            <div className="mt-2 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {candidate && candidate.visa_type}
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow p-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
                {candidate && (
                  <>
                    <p className="mb-2"><strong>Date de naissance:</strong> {format(new Date(candidate.date_naissance), 'dd MMMM yyyy', { locale: fr })}</p>
                    <p className="mb-2"><strong>Lieu de naissance:</strong> {candidate.lieu_naissance}</p>
                    <p className="mb-2"><strong>Nationalité:</strong> {candidate.nationalite}</p>
                    <p className="mb-2"><strong>Numéro de passeport:</strong> {candidate.numero_passport}</p>
                    <p className="mb-2"><strong>Email:</strong> {candidate.email || 'Non spécifié'}</p>
                    <p className="mb-2"><strong>Téléphone:</strong> {candidate.telephone || 'Non spécifié'}</p>
                    <p className="mb-2"><strong>Adresse:</strong> {candidate.adresse || 'Non spécifiée'}</p>
                  </>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Détails du dossier</h2>
                {candidate && (
                  <>
                    <p className="mb-2"><strong>Type de visa:</strong> {candidate.visa_type}</p>
                    <p className="mb-2"><strong>Procédure:</strong> {candidate.procedure || 'Non spécifiée'}</p>
                    <p className="mb-2"><strong>Statut:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
                        candidate.status === 'Approuvé' ? 'bg-green-100 text-green-800' :
                        candidate.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                        candidate.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                        candidate.status === 'Rejeté' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {candidate.status}
                      </span>
                    </p>
                    <p className="mb-2"><strong>Date de soumission:</strong> {format(new Date(candidate.date_soumission), 'dd MMMM yyyy', { locale: fr })}</p>
                    <p className="mb-2"><strong>Date prévue du voyage:</strong> {candidate.date_voyage ? format(new Date(candidate.date_voyage), 'dd MMMM yyyy', { locale: fr }) : 'Non spécifiée'}</p>
                    <p className="mb-2"><strong>Bureau en charge:</strong> {candidate.bureau}</p>
                    <p className="mb-2"><strong>Délai de traitement:</strong> {candidate.delai_traitement || 'Non spécifié'}</p>
                  </>
                )}
              </div>
            </div>

            {candidate && candidate.notes && (
              <div className="mt-4 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-2">Notes</h2>
                <p className="whitespace-pre-wrap">{candidate.notes}</p>
              </div>
            )}
            
            {/* Afficher les détails de résidence permanente si applicable */}
            {candidate && candidate.visa_type === 'Résidence Permanente' && permanentResidence && (
              <div className="mt-4 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Détails de résidence permanente</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="mb-2"><strong>Programme d'immigration:</strong> {permanentResidence.immigration_program}</p>
