
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import { Link } from 'react-router-dom';
import { Pencil, ArrowLeft, Save, X, Upload, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Define a type for the documents with the nested document_types
type DocumentWithTypeName = Database['public']['Tables']['documents']['Row'] & {
  document_types: {
    nom: string;
    required: boolean;
  } | null;
};

type StatusType = Database['public']['Enums']['status_type'];
type VisaType = Database['public']['Enums']['visa_type'];

const statuses: StatusType[] = [
  'En cours', 'Approuvé', 'En attente', 'Rejeté', 'Complété', 'Expiré'
];

const visaTypes: VisaType[] = [
  'Visiteur', 'Travail', 'Résidence Permanente'
];

const CandidateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isEditMode = location.pathname.includes('/edit/');

  const [candidate, setCandidate] = useState<Database['public']['Tables']['candidates']['Row'] | null>(null);
  const [documents, setDocuments] = useState<DocumentWithTypeName[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // État pour le formulaire d'édition
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    status: '' as StatusType,
    visa_type: '' as VisaType,
    notes: '',
    bureau: '',
    numero_passport: '',
  });

  // État pour le téléchargement de la photo
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCandidate();
      fetchDocuments();
    }
  }, [id]);

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
      });
      
      if (candidate.photo_url) {
        setPhotoPreview(`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/profile_photos/${candidate.photo_url}`);
      }
    }
  }, [candidate]);

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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile || !id) return null;
    
    setIsUploading(true);
    try {
      const fileExt = photoFile.name.split('.').pop();
      const fileName = `${id}/profile.${fileExt}`;
      
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setIsSaving(true);
    try {
      // Upload photo if changed
      let photoUrl = candidate?.photo_url;
      if (photoFile) {
        photoUrl = await uploadPhoto();
      }
      
      // Update candidate data
      const { error } = await supabase
        .from('candidates')
        .update({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email || null,
          telephone: formData.telephone || null,
          status: formData.status,
          visa_type: formData.visa_type,
          notes: formData.notes || null,
          bureau: formData.bureau,
          numero_passport: formData.numero_passport,
          photo_url: photoUrl
        })
        .eq('id', id as string);
      
      if (error) throw error;
      
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
      
      // Refresh data and exit edit mode
      await fetchCandidate();
      navigate(`/candidate/${id}`);
    } catch (error) {
      console.error("Error updating candidate:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour du candidat.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto p-4 flex justify-center items-center h-64">Chargement...</div>;
  }

  if (!candidate) {
    return <div className="container mx-auto p-4">Candidat non trouvé.</div>;
  }

  // Vue en mode lecture
  if (!isEditMode) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <Link to="/candidates" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
            <ArrowLeft className="h-5 w-5" />
            Retour à la liste des candidats
          </Link>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate(`/candidates/edit/${id}`)}
          >
            <Pencil className="h-4 w-4" />
            Modifier
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-1 flex flex-col items-center">
            {candidate.photo_url ? (
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
                  {candidate.prenom?.charAt(0)}{candidate.nom?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <h1 className="text-2xl font-bold mt-4 text-center">{candidate.prenom} {candidate.nom}</h1>
            <div className="mt-2 text-center">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {candidate.visa_type}
              </span>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg shadow p-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
                <p className="mb-2"><strong>Date de naissance:</strong> {format(new Date(candidate.date_naissance), 'dd MMMM yyyy', { locale: fr })}</p>
                <p className="mb-2"><strong>Lieu de naissance:</strong> {candidate.lieu_naissance}</p>
                <p className="mb-2"><strong>Numéro de passeport:</strong> {candidate.numero_passport}</p>
                <p className="mb-2"><strong>Email:</strong> {candidate.email || 'Non spécifié'}</p>
                <p className="mb-2"><strong>Téléphone:</strong> {candidate.telephone || 'Non spécifié'}</p>
                <p className="mb-2"><strong>Adresse:</strong> {candidate.adresse || 'Non spécifiée'}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Détails du dossier</h2>
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
              </div>
            </div>

            {candidate.notes && (
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

  // Vue en mode édition
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <Link to={`/candidate/${id}`} className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
          <X className="h-5 w-5" />
          Annuler les modifications
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 flex flex-col items-center">
            <div className="relative">
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
                    {formData.prenom.charAt(0)}{formData.nom.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className="mt-4 flex flex-col space-y-2">
                <Label htmlFor="photo" className="cursor-pointer flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
                  <Upload size={16} />
                  Téléverser une photo
                  <Input 
                    id="photo" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handlePhotoChange}
                  />
                </Label>
                
                {(photoPreview || candidate?.photo_url) && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700"
                    onClick={removePhoto}
                  >
                    <Trash size={16} />
                    Supprimer la photo
                  </Button>
                )}
              </div>
            </div>
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
                <Label htmlFor="bureau">Bureau</Label>
                <Input 
                  id="bureau" 
                  name="bureau" 
                  value={formData.bureau} 
                  onChange={handleInputChange} 
                  required 
                />
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
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/candidate/${id}`)}
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            className="flex items-center gap-2"
            disabled={isSaving || isUploading}
          >
            {(isSaving || isUploading) && (
              <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-white rounded-full mr-2"></div>
            )}
            <Save className="h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CandidateDetail;
