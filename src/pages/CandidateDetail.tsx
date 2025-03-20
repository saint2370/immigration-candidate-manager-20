import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CalendarIcon, CheckCircle, ChevronsUpDown, Copy, CopyCheck, Edit, File, Loader2, RefreshCcw, Trash2 } from 'lucide-react';
import { DateRange } from "react-day-picker"
import { DateInput } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import ResidencePermanenteForm from '@/components/candidates/ResidencePermanenteForm';
import { CustomButton } from '@/components/ui/custom-button';
import type { ResidencePermanenteFormProps } from '@/components/candidates/ResidencePermanenteFormProps';

// Define types based on your database schema
type Candidate = Database['public']['Tables']['candidates']['Row'];
type VisaType = Database['public']['Enums']['visa_type'];
type StatusType = Database['public']['Enums']['status_type'];
type Document = Database['public']['Tables']['documents']['Row'];
type DocumentType = Database['public']['Tables']['document_types']['Row'];
type DocumentStatus = Database['public']['Enums']['document_status'];
type PermanentResidenceDetails = Database['public']['Tables']['permanent_residence_details']['Row'];
type Enfant = Database['public']['Tables']['enfants']['Row'];

// Define form schema
const formSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  prenom: z.string().min(2, { message: "Le prénom doit comporter au moins 2 caractères." }),
  date_naissance: z.string(),
  lieu_naissance: z.string().min(2, { message: "Le lieu de naissance doit comporter au moins 2 caractères." }),
  nationalite: z.string().min(2, { message: "La nationalité doit comporter au moins 2 caractères." }),
  numero_passport: z.string().min(5, { message: "Le numéro de passeport doit comporter au moins 5 caractères." }),
  telephone: z.string().min(8, { message: "Le numéro de téléphone doit comporter au moins 8 caractères." }),
  email: z.string().email({ message: "Email invalide" }).optional().or(z.literal('')),
  adresse: z.string().optional().or(z.literal('')),
  visa_type: z.enum(['Visiteur', 'Travail', 'Résidence Permanente']),
  procedure: z.string().optional().or(z.literal('')),
  date_soumission: z.string(),
  delai_traitement: z.string().optional().or(z.literal('')),
  status: z.enum(['En cours', 'Approuvé', 'En attente', 'Rejeté', 'Complété', 'Expiré']),
  date_voyage: z.string(),
  bureau: z.string().min(2, { message: "Le bureau doit comporter au moins 2 caractères." }),
  notes: z.string().optional().or(z.literal('')),
  photo_url: z.string().optional().or(z.literal(''))
});

const CandidateDetail = ({ isNewCandidate }: { isNewCandidate?: boolean }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const [candidateData, setCandidateData] = useState<Candidate | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [permanentResidence, setPermanentResidence] = useState<PermanentResidenceDetails | null>(null);
  const [enfants, setEnfants] = useState<Enfant[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: '',
      prenom: '',
      date_naissance: '',
      lieu_naissance: '',
      nationalite: '',
      numero_passport: '',
      telephone: '',
      email: '',
      adresse: '',
      visa_type: 'Visiteur',
      procedure: '',
      date_soumission: '',
      delai_traitement: '',
      status: 'En cours',
      date_voyage: '',
      bureau: '',
      notes: '',
      photo_url: ''
    },
  });

  // Fetch candidate data, documents, and document types
  useEffect(() => {
    if (id) {
      fetchCandidateData(id);
      fetchDocuments(id);
      fetchPermanentResidenceDetails(id);
      fetchEnfants(id);
    }
    fetchDocumentTypes();
  }, [id]);

  // Fetch candidate data from Supabase
  const fetchCandidateData = async (candidateId: string) => {
    try {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('id', candidateId)
        .single();

      if (error) {
        console.error('Error fetching candidate data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les informations du candidat.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setCandidateData(data);
        // Set default values for the form
        form.reset({
          nom: data.nom,
          prenom: data.prenom,
          date_naissance: data.date_naissance,
          lieu_naissance: data.lieu_naissance,
          nationalite: data.nationalite,
          numero_passport: data.numero_passport,
          telephone: data.telephone,
          email: data.email || '',
          adresse: data.adresse || '',
          visa_type: data.visa_type,
          procedure: data.procedure || '',
          date_soumission: data.date_soumission,
          delai_traitement: data.delai_traitement || '',
          status: data.status,
          date_voyage: data.date_voyage,
          bureau: data.bureau,
          notes: data.notes || '',
          photo_url: data.photo_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching candidate data:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors du chargement des informations du candidat.",
        variant: "destructive",
      });
    }
  };

  // Fetch documents from Supabase
  const fetchDocuments = async (candidateId: string) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('candidate_id', candidateId);

      if (error) {
        console.error('Error fetching documents:', error);
        return;
      }

      if (data) {
        setDocuments(data);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  // Fetch document types from Supabase
  const fetchDocumentTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('document_types')
        .select('*');

      if (error) {
        console.error('Error fetching document types:', error);
        return;
      }

      if (data) {
        setDocumentTypes(data);
      }
    } catch (error) {
      console.error('Error fetching document types:', error);
    }
  };

  const fetchPermanentResidenceDetails = async (candidateId: string) => {
    try {
      const { data, error } = await supabase
        .from('permanent_residence_details')
        .select('*')
        .eq('candidate_id', candidateId)
        .single();

      if (error) {
        console.error('Error fetching permanent residence details:', error);
        return;
      }

      if (data) {
        setPermanentResidence(data);
      }
    } catch (error) {
      console.error('Error fetching permanent residence details:', error);
    }
  };

  const fetchEnfants = async (candidateId: string) => {
    try {
      // Fetch permanent residence details first
      const { data: residenceData, error: residenceError } = await supabase
        .from('permanent_residence_details')
        .select('id')
        .eq('candidate_id', candidateId)
        .single();
  
      if (residenceError) {
        console.error('Error fetching permanent residence details:', residenceError);
        return;
      }
  
      if (residenceData) {
        // Now fetch enfants using the permanent residence ID
        const { data: enfantsData, error: enfantsError } = await supabase
          .from('enfants')
          .select('*')
          .eq('permanent_residence_id', residenceData.id);
  
        if (enfantsError) {
          console.error('Error fetching enfants:', enfantsError);
          return;
        }
  
        if (enfantsData) {
          setEnfants(enfantsData);
        }
      }
    } catch (error) {
      console.error('Error fetching enfants:', error);
    }
  };

  // Function to handle copying candidate ID
  const handleCopyCandidateId = () => {
    if (candidateData) {
      navigator.clipboard.writeText(candidateData.id)
        .then(() => {
          setIsCopying(true);
          toast({
            title: "Succès",
            description: "ID du candidat copié dans le presse-papiers.",
          });
          setTimeout(() => setIsCopying(false), 2000);
        })
        .catch(err => {
          console.error("Failed to copy candidate ID: ", err);
          toast({
            title: "Erreur",
            description: "Impossible de copier l'ID du candidat.",
            variant: "destructive",
          });
        });
    }
  };

  // Function to handle document status change
  const handleChangeDocumentStatus = async (documentId: string, status: DocumentStatus) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ status })
        .eq('id', documentId);

      if (error) {
        console.error('Error updating document status:', error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le statut du document.",
          variant: "destructive",
        });
        return;
      }

      // Optimistically update the document status in the local state
      setDocuments(prevDocuments =>
        prevDocuments.map(doc =>
          doc.id === documentId ? { ...doc, status } : doc
        )
      );

      toast({
        title: "Succès",
        description: "Statut du document mis à jour avec succès.",
      });
    } catch (error) {
      console.error('Error updating document status:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour du statut du document.",
        variant: "destructive",
      });
    }
  };

  // Function to handle candidate update
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('candidates')
        .update({
          nom: data.nom,
          prenom: data.prenom,
          date_naissance: data.date_naissance,
          lieu_naissance: data.lieu_naissance,
          nationalite: data.nationalite,
          numero_passport: data.numero_passport,
          telephone: data.telephone,
          email: data.email,
          adresse: data.adresse,
          visa_type: data.visa_type,
          procedure: data.procedure,
          date_soumission: data.date_soumission,
          delai_traitement: data.delai_traitement,
          status: data.status,
          date_voyage: data.date_voyage,
          bureau: data.bureau,
          notes: data.notes,
          photo_url: data.photo_url
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating candidate:', error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour les informations du candidat.",
          variant: "destructive",
        });
        return;
      }

      // Update local state with new data
      setCandidateData({ ...candidateData, ...data } as Candidate);
      toast({
        title: "Succès",
        description: "Informations du candidat mises à jour avec succès.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating candidate:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour des informations du candidat.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCandidate = async () => {
    if (!id) return;

    try {
      const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting candidate:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le candidat.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Candidat supprimé avec succès.",
      });
      navigate('/tableaudebord/candidates');
    } catch (error) {
      console.error('Error deleting candidate:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la suppression du candidat.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: DocumentStatus) => {
    let variant: "default" | "secondary" | "destructive" | "outline" | "success" = "default";
    
    switch(status) {
      case "verified":
        variant = "outline";
        break;
      case "uploaded":
        variant = "outline";
        break;
      case "rejected":
        variant = "destructive";
        break;
      case "pending":
        variant = "outline";
        break;
      default:
        variant = "outline";
    }
    
    return (
      <Badge variant={variant} className={status === "verified" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}>
        {status}
      </Badge>
    );
  };

  if (!candidateData) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" /> Chargement des informations du candidat...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{candidateData.prenom} {candidateData.nom}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/tableaudebord/candidates')}>
                <RefreshCcw className="h-4 w-4 mr-2" /> Retour à la liste
              </Button>
              {!isEditing ? (
                <Button size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" /> Modifier
                </Button>
              ) : (
                <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" /> Annuler
                </Button>
              )}
              <Button variant="destructive" size="sm" onClick={handleDeleteCandidate}>
                <Trash2 className="h-4 w-4 mr-2" /> Supprimer
              </Button>
            </div>
          </div>
          <CardDescription>
            Informations détaillées du candidat.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>ID du candidat</Label>
              <div className="flex items-center">
                <Input value={candidateData.id} readOnly className="cursor-not-allowed" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyCandidateId}
                  disabled={isCopying}
                >
                  {isCopying ? (
                    <CopyCheck className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <Label>Type de visa</Label>
              <Input value={candidateData.visa_type} readOnly className="cursor-not-allowed" />
            </div>
          </div>

          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom</Label>
                    <Input id="nom" placeholder="Nom" {...form.register("nom")} />
                  </div>
                  <div>
                    <Label htmlFor="prenom">Prénom</Label>
                    <Input id="prenom" placeholder="Prénom" {...form.register("prenom")} />
                  </div>
                  <div>
                    <Label htmlFor="date_naissance">Date de naissance</Label>
                    <Input id="date_naissance" placeholder="Date de naissance" {...form.register("date_naissance")} />
                  </div>
                  <div>
                    <Label htmlFor="lieu_naissance">Lieu de naissance</Label>
                    <Input id="lieu_naissance" placeholder="Lieu de naissance" {...form.register("lieu_naissance")} />
                  </div>
                  <div>
                    <Label htmlFor="nationalite">Nationalité</Label>
                    <Input id="nationalite" placeholder="Nationalité" {...form.register("nationalite")} />
                  </div>
                  <div>
                    <Label htmlFor="numero_passport">Numéro de passeport</Label>
                    <Input id="numero_passport" placeholder="Numéro de passeport" {...form.register("numero_passport")} />
                  </div>
                  <div>
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input id="telephone" placeholder="Téléphone" {...form.register("telephone")} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email" {...form.register("email")} />
                  </div>
                  <div>
                    <Label htmlFor="adresse">Adresse</Label>
                    <Input id="adresse" placeholder="Adresse" {...form.register("adresse")} />
                  </div>
                  <div>
                    <Label htmlFor="visa_type">Type de visa</Label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder={candidateData.visa_type} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Visiteur">Visiteur</SelectItem>
                        <SelectItem value="Travail">Travail</SelectItem>
                        <SelectItem value="Résidence Permanente">Résidence Permanente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="procedure">Procédure</Label>
                    <Input id="procedure" placeholder="Procédure" {...form.register("procedure")} />
                  </div>
                  <div>
                    <Label htmlFor="date_soumission">Date de soumission</Label>
                    <Input id="date_soumission" placeholder="Date de soumission" {...form.register("date_soumission")} />
                  </div>
                  <div>
                    <Label htmlFor="delai_traitement">Délai de traitement</Label>
                    <Input id="delai_traitement" placeholder="Délai de traitement" {...form.register("delai_traitement")} />
                  </div>
                  <div>
                    <Label htmlFor="status">Statut</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={candidateData.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="En cours">En cours</SelectItem>
                        <SelectItem value="Approuvé">Approuvé</SelectItem>
                        <SelectItem value="En attente">En attente</SelectItem>
                        <SelectItem value="Rejeté">Rejeté</SelectItem>
                        <SelectItem value="Complété">Complété</SelectItem>
                        <SelectItem value="Expiré">Expiré</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date_voyage">Date de voyage</Label>
                    <Input id="date_voyage" placeholder="Date de voyage" {...form.register("date_voyage")} />
                  </div>
                  <div>
                    <Label htmlFor="bureau">Bureau</Label>
                    <Input id="bureau" placeholder="Bureau" {...form.register("bureau")} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Notes" {...form.register("notes")} className="min-h-[80px]" />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enregistrement...
                    </>
                  ) : (
                    "Enregistrer"
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Nom</Label>
                  <Input value={candidateData.nom} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Prénom</Label>
                  <Input value={candidateData.prenom} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Date de naissance</Label>
                  <Input value={candidateData.date_naissance} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Lieu de naissance</Label>
                  <Input value={candidateData.lieu_naissance} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Nationalité</Label>
                  <Input value={candidateData.nationalite} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Numéro de passeport</Label>
                  <Input value={candidateData.numero_passport} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Téléphone</Label>
                  <Input value={candidateData.telephone} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={candidateData.email || 'N/A'} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Adresse</Label>
                  <Input value={candidateData.adresse || 'N/A'} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Procédure</Label>
                  <Input value={candidateData.procedure || 'N/A'} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Date de soumission</Label>
                  <Input value={candidateData.date_soumission} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Délai de traitement</Label>
                  <Input value={candidateData.delai_traitement || 'N/A'} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Statut</Label>
                  <Input value={candidateData.status} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Date de voyage</Label>
                  <Input value={candidateData.date_voyage} readOnly className="cursor-not-allowed" />
                </div>
                <div>
                  <Label>Bureau</Label>
                  <Input value={candidateData.bureau} readOnly className="cursor-not-allowed" />
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea value={candidateData.notes || 'N/A'} readOnly className="cursor-not-allowed min-h-[80px]" />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <h3 className="text-xl font-bold mb-4">Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documentTypes.map((docType) => {
                const document = documents.find(doc => doc.document_type_id === docType.id);
                return (
                  <Card key={docType.id}>
                    <CardHeader>
                      <CardTitle>{docType.nom}</CardTitle>
                      <CardDescription>{docType.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {document ? (
                        <div className="flex flex-col space-y-2">
                          <p>Nom du fichier: {document.filename}</p>
                          <p>Date de téléversement: {format(new Date(document.upload_date), 'd MMMM yyyy', { locale: language === 'fr' ? fr : undefined })}</p>
                          <Badge variant={document.status === "verified" ? "outline" : "default"} className={document.status === "verified" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}>
                            {document.status}
                          </Badge>
                          <div className="flex space-x-2">
                            <CustomButton variant="success" size="sm" onClick={() => handleChangeDocumentStatus(document.id, "verified")}>
                              Approuver
                            </CustomButton>
                            <Button variant="destructive" size="sm" onClick={() => handleChangeDocumentStatus(document.id, "rejected")}>
                              Rejeter
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p>Aucun document téléversé</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardFooter>
        {candidateData.visa_type === 'Résidence Permanente' && permanentResidence && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Détails de résidence permanente</h2>
            <ResidencePermanenteForm
              permanentResidence={permanentResidence}
              setPermanentResidence={setPermanentResidence}
              enfants={enfants}
              setEnfants={setEnfants}
              isEditing={isEditing}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default CandidateDetail;

interface XProps {
  className?: string;
}

function X(props: XProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
