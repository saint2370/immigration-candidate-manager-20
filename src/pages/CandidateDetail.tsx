import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Edit, Trash2, Download, User, FileClock, 
  FileText, History, Activity, Calendar, Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const getDocumentStatusBadge = (status: string) => {
  const statusMap: Record<string, { variant: string; label: string }> = {
    'uploaded': { variant: 'badge-green', label: 'Téléversé' },
    'verified': { variant: 'badge-blue', label: 'Vérifié' },
    'pending': { variant: 'badge-yellow', label: 'En attente' },
    'rejected': { variant: 'badge-red', label: 'Rejeté' },
    'expired': { variant: 'badge-gray', label: 'Expiré' }
  };

  const statusInfo = statusMap[status] || { variant: 'badge-gray', label: status };
  
  return (
    <div className={cn("badge", statusInfo.variant)}>
      {statusInfo.label}
    </div>
  );
};

const CandidateDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('personal');
  const [candidate, setCandidate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<any[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchCandidateData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Récupérer les informations du candidat
        const { data: candidateData, error } = await supabase
          .from('candidates')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        if (candidateData) {
          setCandidate(candidateData);
          
          // Récupérer les documents du candidat
          const { data: documentData, error: documentError } = await supabase
            .from('documents')
            .select(`
              *,
              document_types(*)
            `)
            .eq('candidate_id', id);
            
          if (documentError) throw documentError;
          setDocuments(documentData || []);
        }
      } catch (error) {
        console.error('Error fetching candidate data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du candidat.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCandidateData();
  }, [id, toast]);
  
  const downloadDocument = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(filePath);
        
      if (error) throw error;
      
      // Créer un lien de téléchargement
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger le document.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ircc-blue"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold text-gray-700">Candidat non trouvé</h2>
        <p className="mt-2 text-gray-500">Le candidat que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/candidates" className="mt-4 inline-flex items-center text-ircc-blue hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          <span>Retour à la liste</span>
        </Link>
      </div>
    );
  }
  
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Link 
            to="/candidates" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Retour à la liste</span>
          </Link>
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-4 text-2xl">
              {`${candidate.prenom?.charAt(0) || ''}${candidate.nom?.charAt(0) || ''}`}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{`${candidate.prenom} ${candidate.nom}`}</h2>
              <p className="text-gray-500">
                {candidate.visa_type} • {candidate.nationalite} • 
                <span className={cn(
                  "ml-1 px-2 py-0.5 rounded-full text-xs font-medium",
                  candidate.status === 'En cours' 
                    ? "bg-blue-100 text-blue-800" 
                    : candidate.status === 'Approuvé' 
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                )}>
                  {candidate.status}
                </span>
              </p>
              {candidate.identification_number && (
                <p className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md font-mono mt-1 inline-block">
                  {candidate.identification_number}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="btn-hover">
            <Edit size={18} className="mr-2" />
            Modifier
          </Button>
          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50 btn-hover">
            <Trash2 size={18} className="mr-2" />
            Supprimer
          </Button>
          <Button className="bg-ircc-blue hover:bg-ircc-dark-blue btn-hover">
            <Download size={18} className="mr-2" />
            Exporter PDF
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs 
        defaultValue="personal" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="animate-fade-in"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8 bg-transparent p-0 border-b border-gray-200">
          <TabsTrigger 
            value="personal" 
            className={cn(
              "data-[state=active]:text-ircc-blue data-[state=active]:border-b-2 data-[state=active]:border-ircc-blue rounded-none",
              "text-gray-600 pb-3"
            )}
          >
            <User size={18} className="mr-2" />
            Informations
          </TabsTrigger>
          <TabsTrigger 
            value="application" 
            className={cn(
              "data-[state=active]:text-ircc-blue data-[state=active]:border-b-2 data-[state=active]:border-ircc-blue rounded-none",
              "text-gray-600 pb-3"
            )}
          >
            <FileClock size={18} className="mr-2" />
            Demande
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className={cn(
              "data-[state=active]:text-ircc-blue data-[state=active]:border-b-2 data-[state=active]:border-ircc-blue rounded-none",
              "text-gray-600 pb-3"
            )}
          >
            <FileText size={18} className="mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger 
            value="history" 
            className={cn(
              "data-[state=active]:text-ircc-blue data-[state=active]:border-b-2 data-[state=active]:border-ircc-blue rounded-none",
              "text-gray-600 pb-3"
            )}
          >
            <History size={18} className="mr-2" />
            Historique
          </TabsTrigger>
          <TabsTrigger 
            value="timeline" 
            className={cn(
              "data-[state=active]:text-ircc-blue data-[state=active]:border-b-2 data-[state=active]:border-ircc-blue rounded-none",
              "text-gray-600 pb-3"
            )}
          >
            <Activity size={18} className="mr-2" />
            Timeline
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal" className="space-y-6 animate-slide-up">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <User size={20} className="text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Informations personnelles</h3>
            </div>
            
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Nom complet</p>
                <p className="text-gray-900">{`${candidate.prenom} ${candidate.nom}`}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Date de naissance</p>
                <p className="text-gray-900">{candidate.date_naissance}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Lieu de naissance</p>
                <p className="text-gray-900">{candidate.lieu_naissance}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Nationalité</p>
                <p className="text-gray-900">{candidate.nationalite}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Numéro de passeport</p>
                <p className="text-gray-900">{candidate.numero_passport}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Téléphone</p>
                <p className="text-gray-900">{candidate.telephone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                <p className="text-gray-900">{candidate.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Adresse</p>
                <p className="text-gray-900">{candidate.adresse}</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="application" className="space-y-6 animate-slide-up">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <FileClock size={20} className="text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Détails de la demande</h3>
            </div>
            
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Type de visa</p>
                <p className="text-gray-900">{candidate.visa_type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Procédure</p>
                <p className="text-gray-900">{candidate.procedure}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Date de soumission</p>
                <p className="text-gray-900">{candidate.date_soumission}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Délai de traitement</p>
                <p className="text-gray-900">{candidate.delai_traitement}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Statut actuel</p>
                <p className={cn(
                  "inline-flex px-2 py-1 rounded-full text-xs font-medium",
                  candidate.status === 'En cours' 
                    ? "bg-blue-100 text-blue-800" 
                    : candidate.status === 'Approuvé' 
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                )}>
                  {candidate.status}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Date prévue du voyage</p>
                <p className="text-gray-900">{candidate.date_voyage}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Bureau en charge</p>
                <p className="text-gray-900">{candidate.bureau}</p>
              </div>
            </div>
            
            <div className="p-5 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-500 mb-2">Notes importantes</p>
              <p className="text-gray-900 text-sm">{candidate.notes}</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6 animate-slide-up">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <FileText size={20} className="text-gray-400 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Documents ({documents.length})</h3>
              </div>
              <Button size="sm" className="bg-ircc-blue hover:bg-ircc-dark-blue btn-hover">
                Ajouter un document
              </Button>
            </div>
            
            <div className="divide-y divide-gray-100">
              {documents.length > 0 ? (
                documents.map((document) => (
                  <div 
                    key={document.id} 
                    className="p-4 flex items-center justify-between transition-colors hover:bg-gray-50"
                  >
                    <div>
                      <div className="flex items-center">
                        <FileText size={18} className="text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900">{document.document_types?.nom || 'Document'}</span>
                      </div>
                      {document.upload_date && (
                        <p className="text-xs text-gray-500 mt-1 ml-6">
                          Téléversé le {new Date(document.upload_date).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      {getDocumentStatusBadge(document.status)}
                      
                      <div className="flex ml-3">
                        {document.status === 'uploaded' && document.file_path && (
                          <button 
                            className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                            onClick={() => downloadDocument(document.file_path, document.filename || 'document')}
                          >
                            <Download size={18} />
                          </button>
                        )}
                        {document.status === 'pending' && (
                          <button className="py-1 px-2 text-xs font-medium text-ircc-blue hover:underline">
                            Téléverser
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  Aucun document n'a été téléversé pour ce candidat.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6 animate-slide-up">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <History size={20} className="text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Historique du dossier</h3>
            </div>
            
            <div className="p-5">
              <div className="space-y-6">
                {candidate.history.map((item, index) => (
                  <div key={item.id} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        {index + 1}
                      </div>
                      {index < candidate.history.length - 1 && (
                        <div className="w-0.5 bg-gray-200 h-full mt-1"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {item.user}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-6 animate-slide-up">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center">
              <Activity size={20} className="text-gray-400 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Timeline du dossier</h3>
            </div>
            
            <div className="p-5">
              <div className="relative">
                {/* Horizontal line */}
                <div className="absolute top-12 left-0 right-0 h-0.5 bg-gray-200"></div>
                
                <div className="grid grid-cols-6 gap-4 relative">
                  {candidate.timeline.map((stage, index) => (
                    <div key={stage.id} className="flex flex-col items-center text-center">
                      <div 
                        className={cn(
                          "h-10 w-10 rounded-full flex items-center justify-center z-10",
                          stage.status === 'completed' 
                            ? "bg-green-500 text-white" 
                            : stage.status === 'pending' 
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-500"
                        )}
                      >
                        {index + 1}
                      </div>
                      <p className="mt-2 text-sm font-medium text-gray-900">{stage.stage}</p>
                      <p className="mt-1 text-xs text-gray-500">{stage.date || "Non défini"}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-10 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
                <Info size={18} className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-700">Étape suivante</h4>
                  <p className="text-sm text-blue-600 mt-1">
                    Entrevue à programmer avec le candidat. Veuillez contacter le candidat pour fixer une date d'entrevue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CandidateDetail;
