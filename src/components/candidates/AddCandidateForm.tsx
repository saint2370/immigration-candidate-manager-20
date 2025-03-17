
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Plus, X, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
  FormDescription,
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

// Types de visa disponibles
const visaTypes = [
  { id: 'travail', label: 'Visa de Travail' },
  { id: 'visiteur', label: 'Visa Visiteur' },
  { id: 'residence', label: 'Résidence Permanente' }
];

// Bureaux disponibles
const bureaux = [
  'Paris', 'Rabat', 'New York', 'Mumbai', 'Mexico', 
  'Tokyo', 'Moscou', 'Madrid', 'Séoul', 'Le Caire'
];

// Statuts disponibles
const statuses = [
  'En cours', 'Approuvé', 'En attente', 'Rejeté', 'Complété', 'Expiré'
];

// Documents requis par type de visa - Mis à jour selon les exigences spécifiques
const requiredDocuments = {
  visiteur: ['Visa', 'Billet d\'avion'],
  travail: [
    'Contrat de travail', 
    'Lettre d\'offre d\'emploi', 
    'EIMT', 
    'Permis de travail', 
    'Visa', 
    'Billet d\'avion'
  ],
  residence: [
    'Contrat de travail', 
    'Lettre d\'offre d\'emploi', 
    'EIMT', 
    'Permis de travail', 
    'Visa', 
    'Billet d\'avion',
    'Lettre de recommandation'
  ]
};

// Schéma de validation du formulaire principal
const formSchema = z.object({
  prenom: z.string().min(1, { message: 'Le prénom est requis' }),
  nom: z.string().min(1, { message: 'Le nom est requis' }),
  dateNaissance: z.date({ required_error: 'La date de naissance est requise' }),
  lieuNaissance: z.string().min(1, { message: 'Le lieu de naissance est requis' }),
  numeroPassport: z.string().min(5, { message: 'Numéro de passeport invalide' }),
  numeroTelephone: z.string().min(8, { message: 'Numéro de téléphone invalide' }),
  typeVisa: z.string({ required_error: 'Veuillez sélectionner un type de visa' }),
  dateSoumission: z.date({ required_error: 'La date de soumission est requise' }),
  dateVoyagePrevue: z.date({ required_error: 'La date prévue du voyage est requise' }),
  bureau: z.string({ required_error: 'Veuillez sélectionner un bureau' }),
  status: z.string({ required_error: 'Veuillez sélectionner un statut' }),
  detailsBillet: z.string().optional(),
});

// Schéma pour les détails spécifiques à la résidence permanente
const residenceSchema = z.object({
  programmeImmigration: z.enum(['Express Entry', 'Arrima']),
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

const AddCandidateForm: React.FC<AddCandidateFormProps> = ({ isOpen, onClose, onAddCandidate }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File | null>>({});
  const [enfants, setEnfants] = useState<EnfantType[]>([]);
  const [newEnfant, setNewEnfant] = useState<EnfantType>({nom: '', prenom: '', age: ''});

  // Formulaire principal
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prenom: '',
      nom: '',
      lieuNaissance: '',
      numeroPassport: '',
      numeroTelephone: '',
      typeVisa: '',
      bureau: '',
      status: 'En cours',
      detailsBillet: '',
    },
  });

  // Formulaire pour les détails de résidence permanente
  const residenceForm = useForm<z.infer<typeof residenceSchema>>({
    resolver: zodResolver(residenceSchema),
    defaultValues: {
      programmeImmigration: 'Express Entry',
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
  
  const documentsToUpload = visaType ? requiredDocuments[visaType as keyof typeof requiredDocuments] || [] : [];

  // Gérer le téléversement d'un document
  const handleFileUpload = (documentName: string, file: File | null) => {
    setUploadedDocuments(prev => ({
      ...prev,
      [documentName]: file
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

  // Soumission du formulaire
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Combiner les données du formulaire principal et les documents téléversés
    const candidateData = {
      ...data,
      id: Math.random().toString(36).substring(2, 11),
      photo: '',
      nationality: data.lieuNaissance,
      visaType: visaTypes.find(t => t.id === data.typeVisa)?.label || data.typeVisa,
      submissionDate: format(data.dateSoumission, 'dd MMMM yyyy', { locale: fr }),
      documents: uploadedDocuments,
    };

    // Ajouter les détails spécifiques à la résidence permanente si nécessaire
    if (data.typeVisa === 'residence') {
      const residenceData = residenceForm.getValues();
      Object.assign(candidateData, {
        programmeImmigration: residenceData.programmeImmigration,
        immigrationFamiliale: residenceData.immigrationFamiliale,
        nombrePersonnes: residenceData.nombrePersonnes,
        conjoint: residenceData.immigrationFamiliale ? {
          nom: residenceData.conjointNom,
          prenom: residenceData.conjointPrenom,
          numeroPassport: residenceData.conjointPassport
        } : null,
        enfants: enfants,
        detailsAutresPersonnes: residenceData.detailsAutresPersonnes,
      });
    }

    // Appeler la fonction pour ajouter le candidat
    onAddCandidate(candidateData);
    
    // Afficher un toast de confirmation
    toast({
      title: "Candidat ajouté",
      description: `${data.prenom} ${data.nom} a été ajouté avec succès.`,
    });
    
    // Fermer le formulaire
    onClose();
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
            {visaType === 'residence' && (
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

                {/* Détails du billet d'avion */}
                <FormField
                  control={form.control}
                  name="detailsBillet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Détails du billet d'avion</FormLabel>
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
                  <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
                  <Button type="submit">Ajouter le candidat</Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Documents requis</h3>
              {visaType ? (
                <div className="grid grid-cols-1 gap-4">
                  {documentsToUpload.map((doc) => (
                    <div key={doc} className="border rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{doc}</h4>
                        {uploadedDocuments[doc] && (
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
                            handleFileUpload(doc, file);
                          }}
                        />
                        {uploadedDocuments[doc] && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon"
                            onClick={() => handleFileUpload(doc, null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {uploadedDocuments[doc] && (
                        <p className="text-sm text-gray-500 mt-1">
                          {uploadedDocuments[doc]?.name} ({Math.round(uploadedDocuments[doc]?.size / 1024)} Ko)
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Veuillez d'abord sélectionner un type de visa dans l'onglet "Informations générales".
                </p>
              )}
            </div>
          </TabsContent>

          {visaType === 'residence' && (
            <TabsContent value="residence" className="space-y-4">
              <form className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <FormLabel>Programme d'immigration</FormLabel>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Button
                        type="button"
                        variant={residenceForm.getValues().programmeImmigration === 'Express Entry' ? 'default' : 'outline'}
                        onClick={() => residenceForm.setValue('programmeImmigration', 'Express Entry')}
                        className="w-full"
                      >
                        Express Entry
                      </Button>
                      <Button
                        type="button"
                        variant={residenceForm.getValues().programmeImmigration === 'Arrima' ? 'default' : 'outline'}
                        onClick={() => residenceForm.setValue('programmeImmigration', 'Arrima')}
                        className="w-full"
                      >
                        Arrima
                      </Button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="immigrationFamiliale"
                        checked={residenceForm.getValues().immigrationFamiliale}
                        onChange={(e) => {
                          residenceForm.setValue('immigrationFamiliale', e.target.checked);
                          if (!e.target.checked) {
                            setEnfants([]);
                            residenceForm.setValue('conjointNom', '');
                            residenceForm.setValue('conjointPrenom', '');
                            residenceForm.setValue('conjointPassport', '');
                          }
                        }}
                        className="form-checkbox h-4 w-4"
                      />
                      <FormLabel htmlFor="immigrationFamiliale" className="cursor-pointer">
                        Immigration familiale
                      </FormLabel>
                    </div>
                  </div>

                  {residenceForm.getValues().immigrationFamiliale && (
                    <div className="space-y-4 border rounded-md p-4">
                      <h4 className="font-medium">Informations du conjoint/de la conjointe</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <FormLabel htmlFor="conjointPrenom">Prénom du conjoint</FormLabel>
                          <Input 
                            id="conjointPrenom"
                            placeholder="Prénom" 
                            value={residenceForm.getValues().conjointPrenom}
                            onChange={(e) => residenceForm.setValue('conjointPrenom', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <FormLabel htmlFor="conjointNom">Nom du conjoint</FormLabel>
                          <Input 
                            id="conjointNom"
                            placeholder="Nom" 
                            value={residenceForm.getValues().conjointNom}
                            onChange={(e) => residenceForm.setValue('conjointNom', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <FormLabel htmlFor="conjointPassport">Numéro de passeport du conjoint</FormLabel>
                          <Input 
                            id="conjointPassport"
                            placeholder="Numéro de passeport" 
                            value={residenceForm.getValues().conjointPassport}
                            onChange={(e) => residenceForm.setValue('conjointPassport', e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="font-medium mb-3">Enfants</h4>
                        
                        <div className="space-y-2">
                          {enfants.map((enfant, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
                              <span>{enfant.prenom} {enfant.nom} - {enfant.age} ans</span>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm"
                                onClick={() => removeEnfant(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mt-3">
                          <Input 
                            placeholder="Prénom" 
                            value={newEnfant.prenom}
                            onChange={(e) => setNewEnfant({...newEnfant, prenom: e.target.value})}
                          />
                          <Input 
                            placeholder="Nom" 
                            value={newEnfant.nom}
                            onChange={(e) => setNewEnfant({...newEnfant, nom: e.target.value})}
                          />
                          <Input 
                            placeholder="Âge" 
                            value={newEnfant.age}
                            onChange={(e) => setNewEnfant({...newEnfant, age: e.target.value})}
                          />
                        </div>
                        
                        <Button 
                          type="button" 
                          onClick={addEnfant}
                          variant="outline"
                          className="w-full mt-2"
                        >
                          <Plus className="mr-2 h-4 w-4" /> Ajouter un enfant
                        </Button>
                      </div>
                      
                      <div>
                        <FormLabel htmlFor="nombrePersonnes">Nombre total de personnes</FormLabel>
                        <Input 
                          id="nombrePersonnes"
                          type="number" 
                          min="1"
                          value={residenceForm.getValues().nombrePersonnes}
                          onChange={(e) => residenceForm.setValue('nombrePersonnes', parseInt(e.target.value) || 1)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <FormLabel htmlFor="detailsAutresPersonnes">Informations supplémentaires</FormLabel>
                    <Textarea 
                      id="detailsAutresPersonnes"
                      placeholder="Détails additionnels concernant la demande de résidence permanente"
                      value={residenceForm.getValues().detailsAutresPersonnes}
                      onChange={(e) => residenceForm.setValue('detailsAutresPersonnes', e.target.value)}
                      className="mt-1 min-h-[100px]"
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
