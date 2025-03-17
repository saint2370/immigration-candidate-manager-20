
import { useState } from 'react';
import { 
  Settings as SettingsIcon, Users, FileText, 
  Activity, Save, Plus, Trash2
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface DocumentType {
  id: string;
  name: string;
  required: boolean;
  applicableVisaTypes: string[];
}

interface StatusType {
  id: string;
  name: string;
  color: string;
  description: string;
}

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  // Document types management
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([
    { id: '1', name: 'Contrat de travail', required: true, applicableVisaTypes: ['Travail'] },
    { id: '2', name: 'EIMT', required: true, applicableVisaTypes: ['Travail'] },
    { id: '3', name: 'Permis de travail', required: true, applicableVisaTypes: ['Travail'] },
    { id: '4', name: 'Lettre d\'offre d\'emploi', required: true, applicableVisaTypes: ['Travail', 'Résidence Permanente'] },
    { id: '5', name: 'CAQ', required: false, applicableVisaTypes: ['Travail', 'Résidence Permanente'] },
    { id: '6', name: 'Visa', required: true, applicableVisaTypes: ['Travail', 'Visiteur', 'Résidence Permanente'] },
    { id: '7', name: 'Billet d\'avion', required: false, applicableVisaTypes: ['Travail', 'Visiteur', 'Résidence Permanente'] },
    { id: '8', name: 'Lettre d\'invitation', required: true, applicableVisaTypes: ['Visiteur'] },
    { id: '9', name: 'Preuves financières', required: true, applicableVisaTypes: ['Visiteur', 'Résidence Permanente'] },
    { id: '10', name: 'Assurance voyage', required: false, applicableVisaTypes: ['Visiteur'] },
    { id: '11', name: 'Résultat de résidence permanente', required: true, applicableVisaTypes: ['Résidence Permanente'] }
  ]);
  
  const [newDocumentName, setNewDocumentName] = useState('');
  const [newDocumentRequired, setNewDocumentRequired] = useState(false);
  const [newDocumentVisaTypes, setNewDocumentVisaTypes] = useState<string[]>([]);
  
  // Status types management
  const [statusTypes, setStatusTypes] = useState<StatusType[]>([
    { id: '1', name: 'En cours', color: 'blue', description: 'Demande en cours de traitement' },
    { id: '2', name: 'Approuvé', color: 'green', description: 'Demande approuvée' },
    { id: '3', name: 'En attente', color: 'yellow', description: 'En attente de documents ou informations supplémentaires' },
    { id: '4', name: 'Rejeté', color: 'red', description: 'Demande rejetée' },
    { id: '5', name: 'Complété', color: 'purple', description: 'Processus complété' },
    { id: '6', name: 'Expiré', color: 'gray', description: 'Documents ou demande expirés' }
  ]);
  
  const [newStatusName, setNewStatusName] = useState('');
  const [newStatusColor, setNewStatusColor] = useState('blue');
  const [newStatusDescription, setNewStatusDescription] = useState('');
  
  // General settings
  const [settings, setSettings] = useState({
    companyName: 'IRCC Gestion',
    emailNotifications: true,
    defaultLanguage: 'Français',
    autoArchiveCompleted: true
  });
  
  // Add new document type
  const handleAddDocumentType = () => {
    if (!newDocumentName) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un nom pour le document",
        variant: "destructive"
      });
      return;
    }
    
    if (newDocumentVisaTypes.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins un type de visa applicable",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (documentTypes.length + 1).toString();
    const newDocumentType: DocumentType = {
      id: newId,
      name: newDocumentName,
      required: newDocumentRequired,
      applicableVisaTypes: newDocumentVisaTypes
    };
    
    setDocumentTypes([...documentTypes, newDocumentType]);
    setNewDocumentName('');
    setNewDocumentRequired(false);
    setNewDocumentVisaTypes([]);
    
    toast({
      title: "Succès",
      description: "Type de document ajouté avec succès",
    });
  };
  
  // Delete document type
  const handleDeleteDocumentType = (id: string) => {
    setDocumentTypes(documentTypes.filter(doc => doc.id !== id));
    toast({
      title: "Succès",
      description: "Type de document supprimé avec succès",
    });
  };
  
  // Add new status type
  const handleAddStatusType = () => {
    if (!newStatusName) {
      toast({
        title: "Erreur",
        description: "Veuillez saisir un nom pour le statut",
        variant: "destructive"
      });
      return;
    }
    
    const newId = (statusTypes.length + 1).toString();
    const newStatusType: StatusType = {
      id: newId,
      name: newStatusName,
      color: newStatusColor,
      description: newStatusDescription
    };
    
    setStatusTypes([...statusTypes, newStatusType]);
    setNewStatusName('');
    setNewStatusColor('blue');
    setNewStatusDescription('');
    
    toast({
      title: "Succès",
      description: "Type de statut ajouté avec succès",
    });
  };
  
  // Delete status type
  const handleDeleteStatusType = (id: string) => {
    setStatusTypes(statusTypes.filter(status => status.id !== id));
    toast({
      title: "Succès",
      description: "Type de statut supprimé avec succès",
    });
  };
  
  // Save general settings
  const handleSaveSettings = () => {
    // In a real application, this would save to a database
    toast({
      title: "Succès",
      description: "Paramètres enregistrés avec succès",
    });
  };
  
  // Toggle visa type selection for new document
  const toggleVisaType = (visaType: string) => {
    if (newDocumentVisaTypes.includes(visaType)) {
      setNewDocumentVisaTypes(newDocumentVisaTypes.filter(type => type !== visaType));
    } else {
      setNewDocumentVisaTypes([...newDocumentVisaTypes, visaType]);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <SettingsIcon size={24} className="mr-2 text-ircc-blue" />
          Paramètres
        </h2>
        <p className="text-gray-500 mt-1">Configurez les paramètres de l'application</p>
      </div>
      
      {/* Tabs */}
      <Tabs 
        defaultValue="general" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="animate-fade-in"
      >
        <TabsList className="grid grid-cols-3 mb-8 bg-transparent p-0 border-b border-gray-200">
          <TabsTrigger 
            value="general" 
            className={cn(
              "data-[state=active]:text-ircc-blue data-[state=active]:border-b-2 data-[state=active]:border-ircc-blue rounded-none",
              "text-gray-600 pb-3"
            )}
          >
            <SettingsIcon size={18} className="mr-2" />
            Général
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
            value="status" 
            className={cn(
              "data-[state=active]:text-ircc-blue data-[state=active]:border-b-2 data-[state=active]:border-ircc-blue rounded-none",
              "text-gray-600 pb-3"
            )}
          >
            <Activity size={18} className="mr-2" />
            Statuts
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6 animate-slide-up">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nom de l'entreprise</Label>
                <Input 
                  id="companyName" 
                  value={settings.companyName} 
                  onChange={e => setSettings({...settings, companyName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defaultLanguage">Langue par défaut</Label>
                <select 
                  id="defaultLanguage" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.defaultLanguage}
                  onChange={e => setSettings({...settings, defaultLanguage: e.target.value})}
                >
                  <option value="Français">Français</option>
                  <option value="English">English</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="emailNotifications" 
                  className="h-4 w-4 rounded border-gray-300 text-ircc-blue focus:ring-ircc-blue"
                  checked={settings.emailNotifications}
                  onChange={e => setSettings({...settings, emailNotifications: e.target.checked})}
                />
                <Label htmlFor="emailNotifications">Activer les notifications par email</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="autoArchiveCompleted" 
                  className="h-4 w-4 rounded border-gray-300 text-ircc-blue focus:ring-ircc-blue"
                  checked={settings.autoArchiveCompleted}
                  onChange={e => setSettings({...settings, autoArchiveCompleted: e.target.checked})}
                />
                <Label htmlFor="autoArchiveCompleted">Archiver automatiquement les dossiers complétés</Label>
              </div>
              
              <Button onClick={handleSaveSettings} className="mt-4 w-full md:w-auto bg-ircc-blue hover:bg-ircc-dark-blue btn-hover">
                <Save size={18} className="mr-2" />
                Enregistrer les paramètres
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6 animate-slide-up">
          <Card>
            <CardHeader>
              <CardTitle>Types de documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du document</TableHead>
                      <TableHead>Requis</TableHead>
                      <TableHead>Types de visa applicables</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentTypes.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>
                          {doc.required ? (
                            <Badge className="badge-blue">Requis</Badge>
                          ) : (
                            <Badge className="badge-gray">Optionnel</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {doc.applicableVisaTypes.map((type) => (
                              <Badge key={type} className={
                                type === 'Travail' ? 'badge-blue' : 
                                type === 'Visiteur' ? 'badge-yellow' : 'badge-green'
                              }>
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDeleteDocumentType(doc.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <h4 className="font-medium mb-3">Ajouter un nouveau type de document</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newDocumentName">Nom du document</Label>
                      <Input 
                        id="newDocumentName" 
                        value={newDocumentName} 
                        onChange={e => setNewDocumentName(e.target.value)}
                        placeholder="Ex: Certificat de naissance"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Types de visa applicables</Label>
                      <div className="flex flex-wrap gap-2">
                        {['Travail', 'Visiteur', 'Résidence Permanente'].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleVisaType(type)}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-medium border",
                              newDocumentVisaTypes.includes(type) 
                                ? type === 'Travail' 
                                  ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                  : type === 'Visiteur' 
                                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                    : 'bg-green-100 text-green-800 border-green-200'
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                            )}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="newDocumentRequired" 
                        className="h-4 w-4 rounded border-gray-300 text-ircc-blue focus:ring-ircc-blue"
                        checked={newDocumentRequired}
                        onChange={e => setNewDocumentRequired(e.target.checked)}
                      />
                      <Label htmlFor="newDocumentRequired">Document requis</Label>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddDocumentType} 
                    className="mt-4 bg-ircc-blue hover:bg-ircc-dark-blue btn-hover"
                  >
                    <Plus size={18} className="mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Status Tab */}
        <TabsContent value="status" className="space-y-6 animate-slide-up">
          <Card>
            <CardHeader>
              <CardTitle>Types de statuts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du statut</TableHead>
                      <TableHead>Couleur</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {statusTypes.map((status) => (
                      <TableRow key={status.id}>
                        <TableCell className="font-medium">{status.name}</TableCell>
                        <TableCell>
                          <div className={`badge badge-${status.color}`}>
                            {status.name}
                          </div>
                        </TableCell>
                        <TableCell>{status.description}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleDeleteStatusType(status.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <h4 className="font-medium mb-3">Ajouter un nouveau type de statut</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newStatusName">Nom du statut</Label>
                      <Input 
                        id="newStatusName" 
                        value={newStatusName} 
                        onChange={e => setNewStatusName(e.target.value)}
                        placeholder="Ex: En révision"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newStatusColor">Couleur</Label>
                      <select 
                        id="newStatusColor" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={newStatusColor}
                        onChange={e => setNewStatusColor(e.target.value)}
                      >
                        <option value="blue">Bleu</option>
                        <option value="green">Vert</option>
                        <option value="yellow">Jaune</option>
                        <option value="red">Rouge</option>
                        <option value="purple">Violet</option>
                        <option value="gray">Gris</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="newStatusDescription">Description</Label>
                      <Input 
                        id="newStatusDescription" 
                        value={newStatusDescription} 
                        onChange={e => setNewStatusDescription(e.target.value)}
                        placeholder="Description du statut"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddStatusType} 
                    className="mt-4 bg-ircc-blue hover:bg-ircc-dark-blue btn-hover"
                  >
                    <Plus size={18} className="mr-2" />
                    Ajouter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
