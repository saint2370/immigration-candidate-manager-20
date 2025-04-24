import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Download, FileText, AlertCircle, Clock, Users, Home } from 'lucide-react';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { NotificationCarousel } from '@/components/notifications/NotificationCarousel';
import { ApprovalCelebration } from '@/components/effects/ApprovalCelebration';
import { useLanguage } from '@/contexts/LanguageContext';
import { calculateProgressFromDocuments } from '@/utils/progressCalculator';

// Define types for the documents and permanent residence details
type DocumentWithTypeName = Database['public']['Tables']['documents']['Row'] & {
  document_types: {
    nom: string;
    required: boolean;
  } | null;
};

type PermanentResidenceDetails = Database['public']['Tables']['permanent_residence_details']['Row'] & {
  enfants?: Database['public']['Tables']['enfants']['Row'][];
};

const CandidatePortalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [candidate, setCandidate] = useState<Database['public']['Tables']['candidates']['Row'] | null>(null);
  const [documents, setDocuments] = useState<DocumentWithTypeName[]>([]);
  const [permanentResidenceDetails, setPermanentResidenceDetails] = useState<PermanentResidenceDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Generate fake travel data based on candidate
  const getTravelInfo = (candidate: Database['public']['Tables']['candidates']['Row']) => {
    // Generate random dates within next 3 months
    const today = new Date();
    const flightDate = new Date(today);
    flightDate.setDate(today.getDate() + Math.floor(Math.random() * 90));
    
    // List of possible destinations based on visa type
    const destinations = ['Montréal, Canada', 'Toronto, Canada', 'Vancouver, Canada', 'Ottawa, Canada', 'Québec, Canada'];
    const jobTitles = ['Ingénieur logiciel', 'Infirmier', 'Chef cuisinier', 'Professeur', 'Technicien', 'Consultant'];
    const salaryRanges = ['60,000 - 75,000 CAD', '75,000 - 90,000 CAD', '90,000 - 120,000 CAD'];
    
    return {
      name: `${candidate.prenom} ${candidate.nom}`,
      flightDate: format(flightDate, language === 'fr' ? 'dd MMMM yyyy' : 'MMMM dd, yyyy', { locale: language === 'fr' ? fr : undefined }),
      destination: destinations[Math.floor(Math.random() * destinations.length)],
      jobTitle: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      salary: salaryRanges[Math.floor(Math.random() * salaryRanges.length)],
    };
  };

  // Calculate progress based on status
  const calculateProgress = (status: string): number => {
    return calculateProgressFromDocuments(documents, status);
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
        
        // If visa type is "Résidence Permanente", fetch additional details
        if (candidateData.visa_type === 'Résidence Permanente') {
          fetchPermanentResidenceDetails(candidateData.id);
        }
        
        // Show celebration if status is approved
        if (candidateData.status === 'Approuvé') {
          setShowCelebration(true);
        }
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

  const fetchPermanentResidenceDetails = async (candidateId: string) => {
    try {
      // Fetch permanent residence details
      const { data: residenceData, error: residenceError } = await supabase
        .from('permanent_residence_details')
        .select('*')
        .eq('candidate_id', candidateId)
        .maybeSingle();

      if (residenceError) {
        console.error("Error fetching permanent residence details:", residenceError);
        return;
      }

      if (residenceData) {
        // Fetch children if they exist
        const { data: enfantsData, error: enfantsError } = await supabase
          .from('enfants')
          .select('*')
          .eq('permanent_residence_id', residenceData.id);

        if (enfantsError) {
          console.error("Error fetching children:", enfantsError);
        }

        // Combine permanent residence details with children data
        const combinedData = {
          ...residenceData,
          enfants: enfantsData || []
        };

        console.log("Permanent residence details loaded:", combinedData);
        setPermanentResidenceDetails(combinedData);
      }
    } catch (error) {
      console.error("Unexpected error fetching permanent residence details:", error);
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
      
      {/* Approval Celebration Effect */}
      {candidate && (
        <ApprovalCelebration 
          isVisible={showCelebration} 
          onComplete={() => setShowCelebration(false)}
          candidateInfo={getTravelInfo(candidate)}
        />
      )}
      
      <div className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/portal" className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors">
              <ArrowLeft size={18} />
              <span>Retour à la page d'accueil</span>
            </Link>
          </div>
          
          {/* Notification Carousel */}
          <div className="mb-6">
            <NotificationCarousel />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : error ? (
            <Card className="shadow-lg border-gray-200">
              <CardContent className="pt-6 flex flex-col items-center justify-center py-16">
                <AlertCircle size={48} className="text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dossier non trouvé</h3>
                <p className="text-gray-600 text-center mb-6">{error}</p>
                <Link to="/portal">
                  <Button className="bg-red-600 hover:bg-red-700">Retour à la recherche</Button>
                </Link>
              </CardContent>
            </Card>
          ) : candidate ? (
            <>
              {/* Candidate Information Card */}
              <Card className="shadow-lg border-gray-200 mb-6">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    {language === 'fr' ? 'Détails de votre dossier d\'immigration' : 'Your Immigration File Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Photo/Avatar */}
                    <div className="md:col-span-1 flex flex-col items-center">
                      {candidate.photo_url ? (
                        <Avatar className="h-40 w-40 rounded-full border-4 border-red-100">
                          <AvatarImage 
                            src={`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/profile_photos/${candidate.photo_url}`}
                            alt={`${candidate.prenom} ${candidate.nom}`}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-4xl bg-red-600 text-white">
                            {candidate.prenom?.charAt(0)}{candidate.nom?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className="h-40 w-40 rounded-full border-4 border-red-100">
                          <AvatarFallback className="text-4xl bg-red-600 text-white">
                            {candidate.prenom?.charAt(0)}{candidate.nom?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      {/* ID display */}
                      <div className="mt-4 bg-red-50 rounded-lg px-4 py-2 text-center border border-red-100">
                        <p className="text-sm text-gray-600">{language === 'fr' ? 'Numéro de dossier' : 'File Number'}</p>
                        <p className="font-bold text-red-700">{candidate.identification_number}</p>
                      </div>
                    </div>
                    
                    {/* Candidate details */}
                    <div className="md:col-span-3">
                      <h2 className="text-2xl font-bold mb-4">{candidate.prenom} {candidate.nom}</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Nationalité' : 'Nationality'}</p>
                          <p className="font-medium">{candidate.nationalite}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Numéro de passeport' : 'Passport Number'}</p>
                          <p className="font-medium">{candidate.numero_passport}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Date de naissance' : 'Date of Birth'}</p>
                          <p className="font-medium">{format(new Date(candidate.date_naissance), language === 'fr' ? 'dd MMMM yyyy' : 'MMMM dd, yyyy', { locale: language === 'fr' ? fr : undefined })}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Lieu de naissance' : 'Place of Birth'}</p>
                          <p className="font-medium">{candidate.lieu_naissance}</p>
                        </div>
                        {candidate.email && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Courriel' : 'Email'}</p>
                            <p className="font-medium">{candidate.email}</p>
                          </div>
                        )}
                        {candidate.telephone && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Téléphone' : 'Phone'}</p>
                            <p className="font-medium">{candidate.telephone}</p>
                          </div>
                        )}
                        {candidate.adresse && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Adresse' : 'Address'}</p>
                            <p className="font-medium">{candidate.adresse}</p>
                          </div>
                        )}
                      </div>
                      
                      {/* Status section */}
                      <div className="mt-6">
                        <div className="flex flex-wrap justify-between items-center mb-2">
                          <div className="flex items-center">
                            <h3 className="font-semibold text-gray-800 mr-3">{language === 'fr' ? 'État de votre demande' : 'Application Status'}</h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
                              {candidate.status}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={16} className="mr-1" />
                            <span>{language === 'fr' ? 'Mise à jour: ' : 'Updated: '}{format(new Date(candidate.updated_at), language === 'fr' ? 'dd MMMM yyyy' : 'MMMM dd, yyyy', { locale: language === 'fr' ? fr : undefined })}</span>
                          </div>
                        </div>
                        
                        {/* Progress bar */}
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-100">
                                {language === 'fr' ? 'Progrès du dossier' : 'Application Progress'}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-red-600">
                                {calculateProgress(candidate.status)}%
                              </span>
                            </div>
                          </div>
                          <Progress
                            value={calculateProgress(candidate.status)}
                            className="h-2 bg-gray-200"
                            indicatorClassName={candidate.status === 'Approuvé' ? 'bg-red-600' : getProgressColor(candidate.status)}
                          />
                        </div>
                      </div>

                      {/* Visa type and details */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Type de visa' : 'Visa Type'}</p>
                          <p className="font-medium">{candidate.visa_type}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Date de soumission' : 'Submission Date'}</p>
                          <p className="font-medium">{format(new Date(candidate.date_soumission), language === 'fr' ? 'dd MMMM yyyy' : 'MMMM dd, yyyy', { locale: language === 'fr' ? fr : undefined })}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Bureau en charge' : 'Processing Office'}</p>
                          <p className="font-medium">{candidate.bureau}</p>
                        </div>
                        {candidate.delai_traitement && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{language === 'fr' ? 'Délai de traitement estimé' : 'Estimated Processing Time'}</p>
                            <p className="font-medium">{candidate.delai_traitement}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Permanent Residence Details Card (conditionally rendered) */}
              {candidate.visa_type === 'Résidence Permanente' && (
                <Card className="shadow-lg border-gray-200 mb-6">
                  <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                    <CardTitle className="text-xl">
                      {language === 'fr' ? 'Détails de votre demande de résidence permanente' : 'Permanent Residence Application Details'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {permanentResidenceDetails ? (
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-semibold text-lg mb-4 flex items-center">
                            <Users className="mr-2" />
                            {language === 'fr' ? 'Informations familiales' : 'Family Information'}
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-red-50 p-4 rounded-lg">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">
                                {language === 'fr' ? 'Programme d\'immigration' : 'Immigration Program'}
                              </p>
                              <p className="font-medium">{permanentResidenceDetails.immigration_program}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">
                                {language === 'fr' ? 'Nombre de personnes' : 'Number of Persons'}
                              </p>
                              <p className="font-medium">{permanentResidenceDetails.nombre_personnes}</p>
                            </div>
                            
                            {/* Spouse information if available */}
                            {permanentResidenceDetails.conjoint_nom && (
                              <>
                                <div className="col-span-2 mt-2">
                                  <h4 className="font-medium text-red-700 mb-2">
                                    {language === 'fr' ? 'Informations du conjoint' : 'Spouse Information'}
                                  </h4>
                                </div>
                                {permanentResidenceDetails.conjoint_prenom && (
                                  <div>
                                    <p className="text-sm text-gray-600 mb-1">
                                      {language === 'fr' ? 'Prénom du conjoint' : 'Spouse First Name'}
                                    </p>
                                    <p className="font-medium">{permanentResidenceDetails.conjoint_prenom}</p>
                                  </div>
                                )}
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">
                                    {language === 'fr' ? 'Nom du conjoint' : 'Spouse Last Name'}
                                  </p>
                                  <p className="font-medium">{permanentResidenceDetails.conjoint_nom}</p>
                                </div>
                                {permanentResidenceDetails.conjoint_passport && (
                                  <div>
                                    <p className="text-sm text-gray-600 mb-1">
                                      {language === 'fr' ? 'Passeport du conjoint' : 'Spouse Passport'}
                                    </p>
                                    <p className="font-medium">{permanentResidenceDetails.conjoint_passport}</p>
                                  </div>
                                )}
                              </>
                            )}
                            
                            {/* Children information if available */}
                            {permanentResidenceDetails.enfants && permanentResidenceDetails.enfants.length > 0 && (
                              <>
                                <div className="col-span-2 mt-4">
                                  <h4 className="font-medium text-red-700 mb-2">
                                    {language === 'fr' ? 'Informations des enfants' : 'Children Information'}
                                  </h4>
                                  <div className="space-y-4">
                                    {permanentResidenceDetails.enfants.map((enfant, index) => (
                                      <div key={enfant.id} className="bg-white p-3 rounded-md border border-red-100">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                          <div>
                                            <p className="text-sm text-gray-600 mb-1">
                                              {language === 'fr' ? 'Prénom' : 'First Name'}
                                            </p>
                                            <p className="font-medium">{enfant.prenom}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-gray-600 mb-1">
                                              {language === 'fr' ? 'Nom' : 'Last Name'}
                                            </p>
                                            <p className="font-medium">{enfant.nom}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm text-gray-600 mb-1">
                                              {language === 'fr' ? 'Âge' : 'Age'}
                                            </p>
                                            <p className="font-medium">{enfant.age} {language === 'fr' ? 'ans' : 'years'}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500">
                          {language === 'fr' 
                            ? 'Détails de résidence permanente en attente ou non disponibles.' 
                            : 'Permanent residence details pending or not available.'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {/* Documents Card */}
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    {language === 'fr' ? 'Vos documents' : 'Your Documents'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {documents.length > 0 ? (
                    <div className="space-y-4">
                      {documents.map((doc) => (
                        <div 
                          key={doc.id} 
                          className="border border-red-100 rounded-lg p-4 flex justify-between items-center hover:bg-red-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <FileText className="text-red-500 mr-3" />
                            <div>
                              <h4 className="font-medium">{doc.document_types?.nom || (language === 'fr' ? 'Document' : 'Document')}</h4>
                              <p className="text-sm text-gray-500">{doc.filename || (language === 'fr' ? 'Fichier téléversé' : 'Uploaded file')}</p>
                            </div>
                          </div>
                          {doc.file_path ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center gap-2 border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDownload(doc.file_path!, doc.filename || 'document')}
                            >
                              <Download size={16} />
                              {language === 'fr' ? 'Télécharger' : 'Download'}
                            </Button>
                          ) : (
                            <span className="text-sm text-gray-500 italic">{language === 'fr' ? 'Aucun fichier' : 'No file'}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <FileText size={42} className="mx-auto text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-800 mb-1">
                        {language === 'fr' ? 'Aucun document disponible' : 'No documents available'}
                      </h3>
                      <p className="text-gray-500">
                        {language === 'fr' 
                          ? 'Vos documents seront affichés ici lorsqu\'ils seront disponibles.' 
                          : 'Your documents will be displayed here when they become available.'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-red-700 text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white text-sm">© 2024 IRCC Statut. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
        </div>
      </footer>
    </div>
  );
};

export default CandidatePortalDetail;
