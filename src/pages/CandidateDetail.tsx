
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

  useEffect(() => {
    if (id && !isNewCandidate) {
      fetchCandidate();
      fetchDocuments();
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
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          {documents.length > 0 ? (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map(doc => (
                <li key={doc.id} className="border rounded-md p-4 flex justify-between items-center">
                  <div>
                    <span className="font-medium">{doc.document_types?.nom || 'Document sans type'}</span>
                    {doc.document_types?.required && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800">Requis</span>
                    )}
                  </div>
                  {doc.file_path && (
                    <a 
                      href={`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/documents/${doc.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      Voir
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun document trouvé pour ce candidat.</p>
          )}
        </div>
      </div>
    );
  }

  // Vue en mode édition ou création
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <Link to="/tableaudebord/candidates" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
          <X className="h-5 w-5" />
          {isNewCandidate ? "Annuler la création" : "Annuler les modifications"}
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Informations générales</TabsTrigger>
            <TabsTrigger value="photo">Photo</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1 flex flex-col items-center">
                {photoPreview ? (
                  <Avatar className="h-40 w-40 rounded-full">
                    <AvatarImage 
                      src={photoPreview}
                      alt="Photo de profil"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-3xl">
                      {formData.prenom.charAt(0)}{formData.nom.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="h-40 w-40 rounded-full">
                    <AvatarFallback className="text-3xl">
                      {formData.prenom.charAt(0) || "?"}{formData.nom.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                )}
                <h2 className="text-xl font-bold mt-4 text-center">{formData.prenom || "Prénom"} {formData.nom || "Nom"}</h2>
              </div>

              <div className="md:col-span-3 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Modifier les informations</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input 
                      id="prenom" 
                      name="prenom" 
                      value={formData.prenom} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom</Label>
                    <Input 
                      id="nom" 
                      name="nom" 
                      value={formData.nom} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_naissance">Date de naissance</Label>
                    <DateInput
                      value={formData.date_naissance}
                      onChange={(date) => handleDateChange('date_naissance', date)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lieu_naissance">Lieu de naissance</Label>
                    <Input 
                      id="lieu_naissance" 
                      name="lieu_naissance" 
                      value={formData.lieu_naissance} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nationalite">Nationalité</Label>
                    <Input 
                      id="nationalite" 
                      name="nationalite" 
                      value={formData.nationalite} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input 
                      id="telephone" 
                      name="telephone" 
                      value={formData.telephone} 
                      onChange={handleInputChange} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adresse">Adresse</Label>
                    <Input 
                      id="adresse" 
                      name="adresse" 
                      value={formData.adresse} 
                      onChange={handleInputChange} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bureau">Bureau</Label>
                    <Select
                      value={formData.bureau}
                      onValueChange={(value) => handleSelectChange('bureau', value)}
                    >
                      <SelectTrigger id="bureau">
                        <SelectValue placeholder="Sélectionner un bureau" />
                      </SelectTrigger>
                      <SelectContent>
                        {bureaux.map((bureau) => (
                          <SelectItem key={bureau} value={bureau}>
                            {bureau}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numero_passport">Numéro de passeport</Label>
                    <Input 
                      id="numero_passport" 
                      name="numero_passport" 
                      value={formData.numero_passport} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="visa_type">Type de visa</Label>
                    <Select
                      value={formData.visa_type}
                      onValueChange={(value) => handleSelectChange('visa_type', value)}
                    >
                      <SelectTrigger id="visa_type">
                        <SelectValue placeholder="Sélectionner un type de visa" />
                      </SelectTrigger>
                      <SelectContent>
                        {visaTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="procedure">Procédure</Label>
                    <Input 
                      id="procedure" 
                      name="procedure" 
                      value={formData.procedure} 
                      onChange={handleInputChange} 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_soumission">Date de soumission</Label>
                    <DateInput
                      value={formData.date_soumission}
                      onChange={(date) => handleDateChange('date_soumission', date)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_voyage">Date prévue du voyage</Label>
                    <DateInput
                      value={formData.date_voyage}
                      onChange={(date) => handleDateChange('date_voyage', date)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delai_traitement">Délai de traitement</Label>
                    <Input 
                      id="delai_traitement" 
                      name="delai_traitement" 
                      value={formData.delai_traitement} 
                      onChange={handleInputChange} 
                    />
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea 
                      id="notes" 
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleInputChange} 
                      className="h-32"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="photo" className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Photo du candidat</h2>
              
              <div className="flex flex-col items-center gap-4">
                {photoPreview ? (
                  <div className="mb-4">
                    <Avatar className="h-60 w-60 rounded-full">
                      <AvatarImage 
                        src={photoPreview}
                        alt="Photo de profil"
                        className="object-cover"
                      />
                      <AvatarFallback className="text-5xl">
                        {formData.prenom.charAt(0) || "?"}{formData.nom.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="mb-4">
                    <Avatar className="h-60 w-60 rounded-full">
                      <AvatarFallback className="text-5xl">
                        {formData.prenom.charAt(0) || "?"}{formData.nom.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
                
                <div className="w-full max-w-md">
                  <div className="mb-4">
                    <Label htmlFor="photo" className="mb-2 block">Choisir une photo</Label>
                    <Input 
                      id="photo" 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoChange} 
                      disabled={isUploading}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    {photoFile && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={clearPhotoSelection}
                        disabled={isUploading}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Annuler
                      </Button>
                    )}
                    
                    {candidate?.photo_url && !isNewCandidate && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={removePhoto}
                        disabled={isUploading}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Supprimer
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Documents du candidat</h2>
              
              {isNewCandidate ? (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-700">
                    Vous devez d'abord créer le candidat avant de pouvoir ajouter des documents.
                    Veuillez remplir les informations dans l'onglet "Informations générales" et enregistrer.
                  </p>
                </div>
              ) : (
                <p className="mb-4">Ajoutez ou mettez à jour les documents du candidat</p>
              )}
              
              {isLoadingDocTypes ? (
                <div className="flex justify-center items-center h-64">
                  <p>Chargement des types de documents...</p>
                </div>
              ) : documentTypes.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documentTypes.map(docType => {
                    // Trouver si un document de ce type existe déjà
                    const existingDoc = documents.find(doc => 
                      doc.document_type_id === docType.id
                    );
                    
                    return (
                      <li key={docType.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <span className="font-medium">{docType.nom}</span>
                            {docType.required && (
                              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                                Requis
                              </span>
                            )}
                          </div>
                          {existingDoc && existingDoc.file_path && (
                            <a 
                              href={`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/documents/${existingDoc.file_path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-700 underline"
                            >
                              Document actuel
                            </a>
                          )}
                        </div>
                        
                        <div className="mt-2">
                          <Input 
                            type="file" 
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleFileUpload(docType.id, file);
                            }}
                            disabled={isNewCandidate || isSaving}
                            className={isNewCandidate ? "opacity-50 cursor-not-allowed" : ""}
                          />
                          {uploadedDocuments[docType.id] && (
                            <p className="text-sm text-green-600 mt-1">
                              Fichier sélectionné: {uploadedDocuments[docType.id]?.name}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>Aucun type de document trouvé pour ce type de visa.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/tableaudebord/candidates')}
            disabled={isSaving}
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            className="flex items-center gap-2"
            disabled={isSaving}
          >
            {isSaving ? 'Enregistrement...' : (
              <>
                <Save className="h-4 w-4" />
                {isNewCandidate ? 'Créer le candidat' : 'Enregistrer'}
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CandidateDetail;
