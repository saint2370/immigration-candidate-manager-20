
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Filter,
  CalendarIcon
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useJobOffers } from '@/hooks/useJobOffers';
import { useJobCategories } from '@/hooks/useJobCategories';
import { JobOffer, JobOfferFormData } from '@/types/jobs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

// Schéma de validation du formulaire
const jobOfferSchema = z.object({
  title: z.string().min(3, "Le titre doit comporter au moins 3 caractères"),
  company: z.string().min(2, "Le nom de l'entreprise est requis"),
  location: z.string().min(2, "Le lieu est requis"),
  description: z.string().min(10, "La description doit comporter au moins 10 caractères"),
  requirements: z.string().optional(),
  salary_range: z.string().optional(),
  contact_email: z.string().email("Email invalide").optional().or(z.literal('')),
  application_url: z.string().url("URL invalide").optional().or(z.literal('')),
  province: z.string().optional(),
  job_type: z.string().min(1, "Le type d'emploi est requis"),
  is_active: z.boolean().default(true),
  expiry_date: z.string().optional(),
  category_ids: z.array(z.string()).min(1, "Sélectionnez au moins une catégorie")
});

const JobsManagement: React.FC = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  
  const { 
    jobOffers, 
    isLoading, 
    error, 
    createJobOffer, 
    updateJobOffer, 
    deleteJobOffer, 
    toggleJobOfferStatus,
    getJobOfferById
  } = useJobOffers();
  
  const { categories, getCategoryName } = useJobCategories();

  const form = useForm<JobOfferFormData>({
    resolver: zodResolver(jobOfferSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      description: '',
      requirements: '',
      salary_range: '',
      contact_email: '',
      application_url: '',
      province: '',
      job_type: 'Temps plein',
      is_active: true,
      expiry_date: '',
      category_ids: []
    }
  });

  // Gérer la soumission du formulaire
  const onSubmit = async (data: JobOfferFormData) => {
    if (editingId) {
      const success = await updateJobOffer(editingId, data);
      if (success) {
        resetAndClose();
      }
    } else {
      const id = await createJobOffer(data);
      if (id) {
        resetAndClose();
      }
    }
  };

  // Ouvrir le formulaire pour modifier une offre
  const handleEdit = async (id: string) => {
    const offer = await getJobOfferById(id);
    if (offer) {
      setEditingId(id);
      
      // Extraire les IDs des catégories
      const categoryIds = offer.categories ? offer.categories.map((cat: any) => cat.id) : [];
      
      form.reset({
        title: offer.title,
        company: offer.company,
        location: offer.location,
        description: offer.description,
        requirements: offer.requirements || '',
        salary_range: offer.salary_range || '',
        contact_email: offer.contact_email || '',
        application_url: offer.application_url || '',
        province: offer.province || '',
        job_type: offer.job_type,
        is_active: offer.is_active,
        expiry_date: offer.expiry_date ? format(new Date(offer.expiry_date), 'yyyy-MM-dd') : '',
        category_ids: categoryIds
      });
      
      setIsOpen(true);
    }
  };

  // Réinitialiser le formulaire et fermer la feuille
  const resetAndClose = () => {
    form.reset();
    setEditingId(null);
    setIsOpen(false);
  };

  // Filtrer les offres d'emploi
  const filteredOffers = jobOffers ? jobOffers.filter((offer: JobOffer) => {
    const matchesSearch = 
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      (offer.categories && offer.categories.some(cat => cat.id === selectedCategory));
    
    return matchesSearch && matchesCategory;
  }) : [];

  // Formatter la date d'expiration pour l'affichage
  const formatExpiryDate = (dateString?: string) => {
    if (!dateString) return 'Non définie';
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
  };

  // Vérifier si l'offre est expirée
  const isExpired = (dateString?: string) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-ircc-blue" />
          Gestion des offres d'emploi
        </h1>
        <Button 
          onClick={() => {
            form.reset({
              title: '',
              company: '',
              location: '',
              description: '',
              requirements: '',
              salary_range: '',
              contact_email: '',
              application_url: '',
              province: '',
              job_type: 'Temps plein',
              is_active: true,
              expiry_date: '',
              category_ids: []
            });
            setEditingId(null);
            setIsOpen(true);
          }}
          className="bg-ircc-blue hover:bg-ircc-dark-blue"
        >
          <Plus className="h-4 w-4 mr-2" /> Ajouter une offre
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des offres d'emploi</CardTitle>
          <CardDescription>
            Gérez les offres d'emploi disponibles pour les candidats à l'immigration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une offre..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-64">
              <Select 
                value={selectedCategory} 
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filtrer par catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {getCategoryName(category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-ircc-blue border-t-transparent"></div>
              <span className="ml-3">Chargement des offres...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              Erreur lors du chargement des offres d'emploi
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune offre d'emploi trouvée
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre</TableHead>
                    <TableHead>Entreprise</TableHead>
                    <TableHead>Lieu</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Catégories</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOffers.map((offer: JobOffer) => (
                    <TableRow key={offer.id}>
                      <TableCell className="font-medium">{offer.title}</TableCell>
                      <TableCell>{offer.company}</TableCell>
                      <TableCell>{offer.location}</TableCell>
                      <TableCell>{offer.job_type}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {offer.categories?.map(category => (
                            <Badge key={category.id} variant="outline" className="text-xs">
                              {getCategoryName(category)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={isExpired(offer.expiry_date) ? "text-red-500" : ""}>
                          {formatExpiryDate(offer.expiry_date)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={offer.is_active ? "default" : "secondary"}
                          className={offer.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                        >
                          {offer.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(offer.id)}
                            title="Modifier"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => toggleJobOfferStatus(offer.id, !offer.is_active)}
                            title={offer.is_active ? "Désactiver" : "Activer"}
                          >
                            {offer.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Dialog open={confirmDelete === offer.id} onOpenChange={(open) => !open && setConfirmDelete(null)}>
                            <DialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => setConfirmDelete(offer.id)}
                                title="Supprimer"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirmer la suppression</DialogTitle>
                                <DialogDescription>
                                  Êtes-vous sûr de vouloir supprimer cette offre d'emploi ? Cette action est irréversible.
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="gap-2 sm:gap-0">
                                <Button
                                  variant="outline" 
                                  onClick={() => setConfirmDelete(null)}
                                >
                                  Annuler
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => {
                                    if (confirmDelete) {
                                      deleteJobOffer(confirmDelete);
                                      setConfirmDelete(null);
                                    }
                                  }}
                                >
                                  Supprimer
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-xl w-full overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{editingId ? 'Modifier une offre' : 'Ajouter une offre'}</SheetTitle>
            <SheetDescription>
              Complétez le formulaire ci-dessous pour {editingId ? 'modifier' : 'ajouter'} une offre d'emploi.
            </SheetDescription>
          </SheetHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre de l'offre*</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Développeur web frontend" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entreprise*</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom de l'entreprise" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lieu*</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Montréal, QC" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="job_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d'emploi*</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Temps plein">Temps plein</SelectItem>
                          <SelectItem value="Temps partiel">Temps partiel</SelectItem>
                          <SelectItem value="Contractuel">Contractuel</SelectItem>
                          <SelectItem value="Temporaire">Temporaire</SelectItem>
                          <SelectItem value="Stage">Stage</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description*</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description détaillée du poste" 
                          className="min-h-[120px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exigences</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Compétences et qualifications requises" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Province</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une province" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Non spécifié</SelectItem>
                            <SelectItem value="Alberta">Alberta</SelectItem>
                            <SelectItem value="Colombie-Britannique">Colombie-Britannique</SelectItem>
                            <SelectItem value="Manitoba">Manitoba</SelectItem>
                            <SelectItem value="Nouveau-Brunswick">Nouveau-Brunswick</SelectItem>
                            <SelectItem value="Terre-Neuve-et-Labrador">Terre-Neuve-et-Labrador</SelectItem>
                            <SelectItem value="Nouvelle-Écosse">Nouvelle-Écosse</SelectItem>
                            <SelectItem value="Ontario">Ontario</SelectItem>
                            <SelectItem value="Île-du-Prince-Édouard">Île-du-Prince-Édouard</SelectItem>
                            <SelectItem value="Québec">Québec</SelectItem>
                            <SelectItem value="Saskatchewan">Saskatchewan</SelectItem>
                            <SelectItem value="Territoires du Nord-Ouest">Territoires du Nord-Ouest</SelectItem>
                            <SelectItem value="Nunavut">Nunavut</SelectItem>
                            <SelectItem value="Yukon">Yukon</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="salary_range"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fourchette de salaire</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 50 000$ - 65 000$ CAD" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email de contact</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="application_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de candidature</FormLabel>
                        <FormControl>
                          <Input placeholder="https://exemple.com/postuler" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="expiry_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date d'expiration</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        Laissez vide pour une offre sans date d'expiration
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Separator className="my-4" />
                
                <FormField
                  control={form.control}
                  name="category_ids"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégories*</FormLabel>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {categories?.map((category) => (
                          <FormItem key={category.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(category.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    field.onChange([...(field.value || []), category.id]);
                                  } else {
                                    field.onChange(field.value?.filter(id => id !== category.id));
                                  }
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {getCategoryName(category)}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Offre active
                        </FormLabel>
                        <FormDescription>
                          Décochez pour masquer cette offre temporairement
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <SheetFooter className="mt-6 px-6 -mx-6 py-4 border-t flex flex-col md:flex-row gap-3">
                <Button 
                  variant="outline" 
                  onClick={resetAndClose} 
                  type="button"
                  className="md:order-1 order-2"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  className="md:order-2 order-1 bg-ircc-blue hover:bg-ircc-dark-blue"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  )}
                  {editingId ? 'Mettre à jour' : 'Ajouter'} l'offre
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default JobsManagement;
