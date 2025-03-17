
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Download, FileText, AlertCircle, Clock } from 'lucide-react';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Define a type for the documents with the nested document_types
type DocumentWithTypeName = Database['public']['Tables']['documents']['Row'] & {
  document_types: {
    nom: string;
    required: boolean;
  } | null;
};

const CandidatePortalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [candidate, setCandidate] = useState<Database['public']['Tables']['candidates']['Row'] | null>(null);
  const [documents, setDocuments] = useState<DocumentWithTypeName[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate progress based on status
  const calculateProgress = (status: string): number => {
    switch (status) {
      case 'En attente': return 15;
      case 'En cours': return 45;
      case 'Approuvé': return 85;
      case 'Complété': return 100;
      case 'Rejeté': return 100;
      case 'Expiré': return 100;
      default: return 0;
    }
  };

  // Get status color based on status
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Approuvé': return 'text-green-700 bg-green-100';
      case 'En cours': return 'text-blue-700 bg-blue-100';
      case 'En attente': return 'text-amber-700 bg-amber-100';
      case 'Rejeté': return 'text-red-700 bg-red-100';
      case 'Complété': return 'text-emerald-700 bg-emerald-100';
      case 'Expiré': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  // Get progress color based on status
  const getProgressColor = (status: string): string => {
    switch (status) {
      case 'Approuvé': return 'bg-green-500';
      case 'En cours': return 'bg-blue-500';
      case 'En attente': return 'bg-amber-500';
      case 'Rejeté': return 'bg-red-500';
      case 'Complété': return 'bg-emerald-500';
      case 'Expiré': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  useEffect(() => {
    if (id) {
      fetchCandidate();
    }
  }, [id]);

  const fetchCandidate = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First try to find by identification_number (IMM-XXXX format)
      let { data: candidateData, error: idError } = await supabase
        .from('candidates')
        .select('*')
        .eq('identification_number', id as string)
        .maybeSingle();

      // If not found by identification_number, try by UUID
      if (!candidateData && !idError) {
        const { data: candidateById, error: uuidError } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', id as string)
          .maybeSingle();

        if (uuidError) {
          console.error("Error fetching candidate by UUID:", uuidError);
        }

        candidateData = candidateById;
      }

      if (candidateData) {
        setCandidate(candidateData);
        console.log("Candidate data loaded:", candidateData);
        fetchDocuments(candidateData.id);
      } else {
        setError("Numéro d'identification incorrect ou dossier introuvable.");
        console.error("No candidate found with ID or identification number:", id);
      }
    } catch (error) {
      setError("Une erreur est survenue lors de la recherche du dossier.");
      console.error("Error fetching candidate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDocuments = async (candidateId: string) => {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*, document_types(nom, required)')
        .eq('candidate_id', candidateId);

      if (error) {
        console.error("Error fetching documents:", error);
      }

      if (data) {
        console.log("Documents loaded:", data);
        setDocuments(data as DocumentWithTypeName[]);
      }
    } catch (error) {
      console.error("Unexpected error fetching documents:", error);
    }
  };

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(filePath);
      
      if (error) {
        throw error;
      }
      
      // Create a download link and trigger download
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'document';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Téléchargement réussi",
        description: "Le document a été téléchargé avec succès.",
      });
    } catch (error) {
      console.error("Error downloading document:", error);
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de télécharger le document.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/portal" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft size={18} />
              <span>Retour à la page d'accueil</span>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ircc-blue"></div>
            </div>
          ) : error ? (
            <Card className="shadow-lg border-gray-200">
              <CardContent className="pt-6 flex flex-col items-center justify-center py-16">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dossier non trouvé</h3>
                <p className="text-gray-600 text-center mb-6">{error}</p>
                <Link to="/portal">
                  <Button>Retour à la recherche</Button>
                </Link>
              </CardContent>
            </Card>
          ) : candidate ? (
            <>
              {/* Candidate Information Card */}
              <Card className="shadow-lg border-gray-200 mb-6">
                <CardHeader className="bg-gradient-to-r from-ircc-blue to-ircc-dark-blue text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    Détails de votre dossier d'immigration
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Photo/Avatar */}
                    <div className="md:col-span-1 flex flex-col items-center">
                      {candidate.photo_url ? (
                        <Avatar className="h-40 w-40 rounded-full">
                          <AvatarImage 
                            src={`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/profile_photos/${candidate.photo_url}`}
                            alt={`${candidate.prenom} ${candidate.nom}`}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-4xl bg-ircc-blue text-white">
                            {candidate.prenom?.charAt(0)}{candidate.nom?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="h-40 w-40 rounded-full">
                          <AvatarFallback className="text-4xl bg-ircc-blue text-white">
                            {candidate.prenom?.charAt(0)}{candidate.nom?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      {/* ID display */}
                      <div className="mt-4 bg-blue-50 rounded-lg px-4 py-2 text-center">
                        <p className="text-sm text-gray-600">Numéro de dossier</p>
                        <p className="font-bold text-blue-800">{candidate.identification_number}</p>
                      </div>
                    </div>
                    
                    {/* Candidate details */}
                    <div className="md:col-span-3">
                      <h2 className="text-2xl font-bold mb-4">{candidate.prenom} {candidate.nom}</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Nationalité</p>
                          <p className="font-medium">{candidate.nationalite}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Numéro de passeport</p>
                          <p className="font-medium">{candidate.numero_passport}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Date de naissance</p>
                          <p className="font-medium">{format(new Date(candidate.date_naissance), 'dd MMMM yyyy', { locale: fr })}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Lieu de naissance</p>
                          <p className="font-medium">{candidate.lieu_naissance}</p>
                        </div>
                        {candidate.email && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Courriel</p>
                            <p className="font-medium">{candidate.email}</p>
                          </div>
                        )}
                        {candidate.telephone && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Téléphone</p>
                            <p className="font-medium">{candidate.telephone}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Status section */}
                      <div className="mt-6">
                        <div className="flex flex-wrap justify-between items-center mb-2">
                          <div className="flex items-center">
                            <h3 className="font-semibold text-gray-800 mr-3">État de votre demande</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
                              {candidate.status}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={16} className="mr-1" />
                            <span>Mise à jour: {format(new Date(candidate.updated_at), 'dd MMMM yyyy', { locale: fr })}</span>
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
                                Progrès du dossier
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-blue-600">
                                {calculateProgress(candidate.status)}%
                              </span>
                            </div>
                          </div>
                          <Progress
                            value={calculateProgress(candidate.status)}
                            className="h-2 bg-gray-200"
                            indicatorClassName={getProgressColor(candidate.status)}
                          />
                        </div>
                      </div>

                      {/* Visa type and details */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Type de visa</p>
                          <p className="font-medium">{candidate.visa_type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Date de soumission</p>
                          <p className="font-medium">{format(new Date(candidate.date_soumission), 'dd MMMM yyyy', { locale: fr })}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Bureau en charge</p>
                          <p className="font-medium">{candidate.bureau}</p>
                        </div>
                        {candidate.delai_traitement && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Délai de traitement estimé</p>
                            <p className="font-medium">{candidate.delai_traitement}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Documents Card */}
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    Vos documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {documents.length > 0 ? (
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div 
                          key={doc.id} 
                          className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <FileText className="text-blue-500 mr-3" />
                            <div>
                              <h4 className="font-medium">{doc.document_types?.nom || 'Document'}</h4>
                              <p className="text-sm text-gray-500">{doc.filename || 'Fichier téléversé'}</p>
                            </div>
                          </div>
                          {doc.file_path ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2"
                              onClick={() => handleDownload(doc.file_path!, doc.filename || 'document')}
                            >
                              <Download size={16} />
                              Télécharger
                            </Button>
                          ) : (
                            <span className="text-sm text-gray-500 italic">Aucun fichier</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <FileText size={42} className="mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-800 mb-1">Aucun document disponible</h3>
                      <p className="text-gray-500">Vos documents seront affichés ici lorsqu'ils seront disponibles.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-[#26374A] text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300 text-sm">© 2024 IRCC Statut. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default CandidatePortalDetail;
