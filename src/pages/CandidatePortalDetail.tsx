
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FileDown, Clock, Calendar, MapPin, Phone, Mail, User, FileText, Download, ArrowLeft, MessageCircle, ExternalLink } from 'lucide-react';

// Define a type for the documents with the nested document_types
type DocumentWithTypeName = Database['public']['Tables']['documents']['Row'] & {
  document_types: {
    nom: string;
    required: boolean;
  } | null;
};

// Status steps mapping
const statusSteps: Record<string, number> = {
  'En attente': 20,
  'En cours': 40,
  'Complété': 80,
  'Approuvé': 100,
  'Rejeté': 100,
  'Expiré': 100
};

// Status to color mapping
const statusColors: Record<string, string> = {
  'En attente': 'bg-yellow-500',
  'En cours': 'bg-blue-500',
  'Complété': 'bg-green-500',
  'Approuvé': 'bg-green-500',
  'Rejeté': 'bg-red-500',
  'Expiré': 'bg-gray-500'
};

const CandidatePortalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<Database['public']['Tables']['candidates']['Row'] | null>(null);
  const [documents, setDocuments] = useState<DocumentWithTypeName[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (id) {
      fetchCandidate();
      fetchDocuments();
    }
  }, [id]);

  useEffect(() => {
    if (candidate) {
      // Set progress based on status
      const progress = statusSteps[candidate.status] || 0;
      
      // Animate progress bar
      const timer = setTimeout(() => {
        setProgressValue(progress);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [candidate]);

  const fetchCandidate = async () => {
    setIsLoading(true);
    try {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-200 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Dossier non trouvé</h2>
          <p className="mt-2 text-gray-500">Le dossier demandé n'existe pas ou n'est pas accessible.</p>
          <Link to="/portal" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au portail
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link to="/portal" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au portail
          </Link>
          <div className="text-sm text-gray-500">
            ID: <span className="font-mono">{candidate.identification_number}</span>
          </div>
        </div>

        {/* Header with candidate info */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
              {candidate.photo_url ? (
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarImage 
                    src={`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/profile_photos/${candidate.photo_url}`}
                    alt={`${candidate.prenom} ${candidate.nom}`}
                  />
                  <AvatarFallback className="text-3xl">
                    {candidate.prenom?.charAt(0)}{candidate.nom?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                  <AvatarFallback className="text-3xl">
                    {candidate.prenom?.charAt(0)}{candidate.nom?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{candidate.prenom} {candidate.nom}</h1>
              
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center text-gray-600">
                  <User className="h-4 w-4 mr-2" />
                  <span>Né(e) le {format(new Date(candidate.date_naissance), 'dd MMMM yyyy', { locale: fr })}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{candidate.nationalite}</span>
                </div>
                {candidate.email && (
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{candidate.email}</span>
                  </div>
                )}
                {candidate.telephone && (
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{candidate.telephone}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {candidate.visa_type}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  candidate.status === 'Approuvé' ? 'bg-green-100 text-green-800' :
                  candidate.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                  candidate.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                  candidate.status === 'Rejeté' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {candidate.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress tracker */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Progression de votre dossier</CardTitle>
            <CardDescription>
              Suivi de l'avancement de votre demande de {candidate.visa_type}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>État actuel: <span className="font-medium">{candidate.status}</span></span>
                  <span>{progressValue}%</span>
                </div>
                <Progress 
                  value={progressValue} 
                  className="h-3"
                  style={{ 
                    '--progress-background': `var(--${statusColors[candidate.status] || 'bg-gray-500'})` 
                  } as React.CSSProperties}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-600 mb-2" />
                  <span className="text-xs text-gray-500">Date de soumission</span>
                  <span className="font-medium">{format(new Date(candidate.date_soumission), 'dd MMM yyyy', { locale: fr })}</span>
                </div>
                
                {candidate.delai_traitement && (
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <Clock className="h-5 w-5 text-gray-600 mb-2" />
                    <span className="text-xs text-gray-500">Délai de traitement</span>
                    <span className="font-medium">{candidate.delai_traitement}</span>
                  </div>
                )}
                
                {candidate.date_voyage && (
                  <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                    <ExternalLink className="h-5 w-5 text-gray-600 mb-2" />
                    <span className="text-xs text-gray-500">Date prévue du voyage</span>
                    <span className="font-medium">{format(new Date(candidate.date_voyage), 'dd MMM yyyy', { locale: fr })}</span>
                  </div>
                )}
                
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-600 mb-2" />
                  <span className="text-xs text-gray-500">Bureau en charge</span>
                  <span className="font-medium">{candidate.bureau}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Documents
            </CardTitle>
            <CardDescription>
              Consultez et téléchargez vos documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="border rounded-md p-4 flex justify-between items-center">
                    <div>
                      <span className="font-medium">{doc.document_types?.nom || 'Document'}</span>
                      {doc.document_types?.required && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800">Requis</span>
                      )}
                      <div className="text-xs text-gray-500">
                        {doc.status === 'uploaded' ? 'Téléversé' : 
                         doc.status === 'verified' ? 'Vérifié' : 
                         doc.status === 'pending' ? 'En attente' :
                         doc.status === 'rejected' ? 'Rejeté' : 
                         doc.status === 'expired' ? 'Expiré' : 'Statut inconnu'}
                      </div>
                    </div>
                    
                    {doc.file_path ? (
                      <a 
                        href={`https://msdvgjnugglqyjblbbgi.supabase.co/storage/v1/object/public/documents/${doc.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-ircc-blue hover:bg-ircc-dark-blue focus:outline-none focus:border-ircc-dark-blue focus:shadow-outline-blue active:bg-ircc-dark-blue transition ease-in-out duration-150"
                      >
                        <Download className="mr-1 h-4 w-4" />
                        Télécharger
                      </a>
                    ) : (
                      <span className="text-xs px-3 py-1 rounded-md bg-gray-100 text-gray-600">
                        Non disponible
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                Aucun document n'est disponible pour le moment.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact and Support section */}
        <Card>
          <CardHeader>
            <CardTitle>Contact et support</CardTitle>
            <CardDescription>
              Besoin d'aide ou d'informations supplémentaires ?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Nous contacter</h3>
                <p className="text-sm text-gray-600">
                  Si vous avez des questions concernant votre dossier, n'hésitez pas à nous contacter :
                </p>
                <div className="flex flex-col space-y-2">
                  <Button variant="outline" className="justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    Envoyer un email
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contacter via WhatsApp
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Questions fréquentes</h3>
                <div className="space-y-3">
                  <div className="text-sm bg-gray-50 p-3 rounded-md">
                    <p className="font-medium text-gray-900">Combien de temps dure le traitement de ma demande ?</p>
                    <p className="mt-1 text-gray-600">
                      Le délai de traitement varie selon le type de visa et le bureau. Pour votre demande, le délai estimé est de {candidate.delai_traitement || 'quelques semaines à plusieurs mois'}.
                    </p>
                  </div>
                  
                  <div className="text-sm bg-gray-50 p-3 rounded-md">
                    <p className="font-medium text-gray-900">Que faire si un document est rejeté ?</p>
                    <p className="mt-1 text-gray-600">
                      Si un document est rejeté, vous recevrez une notification expliquant les raisons. Vous devrez soumettre un nouveau document conforme aux exigences.
                    </p>
                  </div>
                  
                  <div className="text-sm bg-gray-50 p-3 rounded-md">
                    <p className="font-medium text-gray-900">Comment mettre à jour mes informations personnelles ?</p>
                    <p className="mt-1 text-gray-600">
                      Pour mettre à jour vos informations personnelles, veuillez contacter notre service client avec votre numéro d'identification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidatePortalDetail;
