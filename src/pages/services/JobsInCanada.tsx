
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Calendar, 
  Building, 
  DollarSign, 
  Mail, 
  ExternalLink,
  Filter,
  Download
} from 'lucide-react';
import IRCCHeader from '@/components/layout/IRCCHeader';
import { useJobOffers } from '@/hooks/useJobOffers';
import { useJobCategories } from '@/hooks/useJobCategories';
import { JobOffer } from '@/types/jobs';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useLanguage } from '@/contexts/LanguageContext';

const JobsInCanada: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [detailOffer, setDetailOffer] = useState<JobOffer | null>(null);
  
  const { jobOffers, isLoading } = useJobOffers();
  const { categories, getCategoryName } = useJobCategories();

  // Obtenir toutes les provinces des offres
  const provinces = jobOffers
    ? [...new Set(jobOffers.filter(offer => offer.province).map(offer => offer.province))]
        .filter(Boolean)
        .sort() as string[]
    : [];

  // Obtenir tous les types d'emploi des offres
  const jobTypes = jobOffers
    ? [...new Set(jobOffers.map(offer => offer.job_type))].sort()
    : [];

  // Filtrer les offres d'emploi
  const filteredOffers = jobOffers
    ? jobOffers
        .filter(offer => 
          offer.is_active && 
          (!offer.expiry_date || new Date(offer.expiry_date) > new Date())
        )
        .filter(offer => 
          offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offer.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(offer => 
          selectedCategory === 'all' || 
          (offer.categories && offer.categories.some(cat => cat.id === selectedCategory))
        )
        .filter(offer => 
          selectedProvince === 'all' || 
          offer.province === selectedProvince
        )
        .filter(offer => 
          selectedJobType === 'all' || 
          offer.job_type === selectedJobType
        )
    : [];

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedProvince('all');
    setSelectedJobType('all');
  };

  // Télécharger un exemple de CV canadien
  const downloadCVTemplate = () => {
    // Rediriger vers un exemple de CV canadien (lien fictif)
    window.open('https://www.canada.ca/fr/immigration-refugies-citoyennete/services/nouveaux-immigrants/preparer-vie-canada/preparer-emploi/recherche-emploi/rediger-cv.html', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <IRCCHeader />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Trouver un emploi au Canada
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explorez les opportunités professionnelles disponibles pour les nouveaux arrivants et futurs immigrants au Canada
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Search className="h-5 w-5 text-ircc-blue" />
                  Rechercher des offres d'emploi
                </CardTitle>
                <CardDescription>
                  Trouvez des opportunités correspondant à votre profil
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par titre, entreprise ou description..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
                    </Button>
                    
                    {(selectedCategory !== 'all' || selectedProvince !== 'all' || selectedJobType !== 'all' || searchTerm) && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={resetFilters}
                      >
                        Réinitialiser
                      </Button>
                    )}
                  </div>
                  
                  {showFilters && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Catégorie</label>
                        <Select 
                          value={selectedCategory} 
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Toutes les catégories" />
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
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Province</label>
                        <Select 
                          value={selectedProvince} 
                          onValueChange={setSelectedProvince}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Toutes les provinces" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes les provinces</SelectItem>
                            {provinces.map((province) => (
                              <SelectItem key={province} value={province}>
                                {province}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Type d'emploi</label>
                        <Select 
                          value={selectedJobType} 
                          onValueChange={setSelectedJobType}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Tous les types" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Tous les types</SelectItem>
                            {jobTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Download className="h-5 w-5 text-ircc-blue" />
                  Ressources utiles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={downloadCVTemplate}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Modèle de CV canadien
                </Button>
                
                <a 
                  href="https://www.guichetemplois.gc.ca/accueil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Guichet-Emplois Canada
                  </Button>
                </a>
                
                <a 
                  href="https://www.jobbank.gc.ca/home" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    JobBank Canada
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-ircc-blue" />
            Offres d'emploi disponibles
            {filteredOffers.length > 0 && (
              <Badge variant="outline" className="ml-2 font-normal">
                {filteredOffers.length} offre{filteredOffers.length > 1 ? 's' : ''}
              </Badge>
            )}
          </h2>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-ircc-blue border-t-transparent"></div>
              <span className="ml-3">Chargement des offres...</span>
            </div>
          ) : filteredOffers.length === 0 ? (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Aucune offre d'emploi ne correspond à vos critères.
                </p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                >
                  Réinitialiser les filtres
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredOffers.map((offer) => (
                <Card 
                  key={offer.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between flex-wrap">
                      <div>
                        <CardTitle>{offer.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Building className="h-4 w-4 mr-1" />
                          {offer.company}
                        </CardDescription>
                      </div>
                      <Badge className="bg-ircc-blue hover:bg-ircc-blue text-white">
                        {offer.job_type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>
                        {offer.location}
                        {offer.province && `, ${offer.province}`}
                      </span>
                      
                      {offer.expiry_date && (
                        <>
                          <span className="mx-2">•</span>
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            Expire le {format(new Date(offer.expiry_date), 'd MMMM yyyy', { locale: fr })}
                          </span>
                        </>
                      )}
                      
                      {offer.salary_range && (
                        <>
                          <span className="mx-2">•</span>
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>{offer.salary_range}</span>
                        </>
                      )}
                    </div>
                    
                    <p className="text-sm mb-4 line-clamp-2">
                      {offer.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {offer.categories?.map(category => (
                        <Badge key={category.id} variant="outline" className="text-xs">
                          {getCategoryName(category)}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between flex-wrap gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setDetailOffer(offer)}
                    >
                      Voir les détails
                    </Button>
                    
                    {offer.application_url && (
                      <a 
                        href={offer.application_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button className="bg-ircc-blue hover:bg-ircc-dark-blue">
                          Postuler maintenant
                        </Button>
                      </a>
                    )}
                    
                    {!offer.application_url && offer.contact_email && (
                      <a 
                        href={`mailto:${offer.contact_email}?subject=Candidature pour ${offer.title}`}
                        className="block"
                      >
                        <Button className="bg-ircc-blue hover:bg-ircc-dark-blue">
                          <Mail className="h-4 w-4 mr-2" />
                          Contacter le recruteur
                        </Button>
                      </a>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          <Separator className="my-10" />
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Astuces pour réussir vos entretiens au Canada
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Préparez-vous adéquatement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Recherchez l'entreprise et le poste en profondeur</li>
                    <li>Préparez des réponses aux questions courantes</li>
                    <li>Prévoyez des exemples concrets de réalisations</li>
                    <li>Arrivez 10-15 minutes en avance</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Adaptez-vous à la culture canadienne</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Le contact visuel est important</li>
                    <li>Soyez poli et courtois</li>
                    <li>Montrez votre capacité d'adaptation</li>
                    <li>Parlez de votre expérience d'intégration</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-ircc-blue to-blue-700 rounded-lg text-white p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Besoin d'aide pour votre recherche d'emploi?</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Nos conseillers en emploi peuvent vous aider à optimiser votre CV, préparer vos entretiens et trouver les opportunités qui correspondent à votre profil.
            </p>
            <a 
              href="/centre-soutien" 
              className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
            >
              Contacter un conseiller
            </a>
          </div>
        </div>
      </main>
      
      {/* Détails de l'offre d'emploi */}
      <Dialog open={!!detailOffer} onOpenChange={(open) => !open && setDetailOffer(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {detailOffer && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">{detailOffer.title}</DialogTitle>
                <DialogDescription className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  {detailOffer.company}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-ircc-blue hover:bg-ircc-blue text-white">
                    {detailOffer.job_type}
                  </Badge>
                  {detailOffer.categories?.map(category => (
                    <Badge key={category.id} variant="outline">
                      {getCategoryName(category)}
                    </Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      {detailOffer.location}
                      {detailOffer.province && `, ${detailOffer.province}`}
                    </span>
                  </div>
                  
                  {detailOffer.expiry_date && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        Date limite: {format(new Date(detailOffer.expiry_date), 'd MMMM yyyy', { locale: fr })}
                      </span>
                    </div>
                  )}
                  
                  {detailOffer.salary_range && (
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{detailOffer.salary_range}</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-2">Description du poste</h3>
                  <div className="whitespace-pre-line text-sm">
                    {detailOffer.description}
                  </div>
                </div>
                
                {detailOffer.requirements && (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Exigences</h3>
                    <div className="whitespace-pre-line text-sm">
                      {detailOffer.requirements}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-4 pt-4 border-t">
                  {detailOffer.application_url && (
                    <a 
                      href={detailOffer.application_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full md:w-auto"
                    >
                      <Button className="w-full bg-ircc-blue hover:bg-ircc-dark-blue">
                        Postuler maintenant
                      </Button>
                    </a>
                  )}
                  
                  {detailOffer.contact_email && (
                    <a 
                      href={`mailto:${detailOffer.contact_email}?subject=Candidature pour ${detailOffer.title}`}
                      className="block w-full md:w-auto"
                    >
                      <Button variant={detailOffer.application_url ? "outline" : "default"} className={cn("w-full", !detailOffer.application_url && "bg-ircc-blue hover:bg-ircc-dark-blue")}>
                        <Mail className="h-4 w-4 mr-2" />
                        Contacter par email
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobsInCanada;
