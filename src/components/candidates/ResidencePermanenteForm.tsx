
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash, Plus, UserPlus, Users, Save } from 'lucide-react';
import { ResidencePermanenteFormProps, EnfantType, ImmigrationProgramType } from './ResidencePermanenteFormProps';

const immigrationPrograms: ImmigrationProgramType[] = [
  'Entrée express',
  'Arrima',
  'Autre'
];

const ResidencePermanenteForm: React.FC<ResidencePermanenteFormProps> = ({ 
  candidateId, 
  isNewCandidate = false,
  existingData,
  existingEnfants,
  permanentResidenceId,
  onSaved
}) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    immigration_program: (existingData?.immigration_program as ImmigrationProgramType) || 'Entrée express',
    nombre_personnes: existingData?.nombre_personnes || 1,
    conjoint_nom: existingData?.conjoint_nom || '',
    conjoint_prenom: existingData?.conjoint_prenom || '',
    conjoint_passport: existingData?.conjoint_passport || ''
  });
  
  // État pour les enfants
  const [enfants, setEnfants] = useState<EnfantType[]>(existingEnfants || []);
  
  // Mettre à jour le nombre de personnes lorsque les enfants changent
  useEffect(() => {
    let total = 1; // Le candidat principal
    
    // Ajouter +1 si les informations du conjoint sont présentes
    if (formData.conjoint_nom || formData.conjoint_prenom) {
      total += 1;
    }
    
    // Ajouter le nombre d'enfants
    total += enfants.length;
    
    setFormData(prev => ({
      ...prev,
      nombre_personnes: total
    }));
  }, [enfants, formData.conjoint_nom, formData.conjoint_prenom]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  const addEnfant = () => {
    const newEnfant: EnfantType = {
      id: `temp-${Date.now()}`, // ID temporaire qui sera remplacé lors de l'enregistrement
      nom: '',
      prenom: '',
      age: '',
      permanent_residence_id: permanentResidenceId || ''
    };
    
    setEnfants(prev => [...prev, newEnfant]);
  };
  
  const updateEnfant = (index: number, field: keyof EnfantType, value: string) => {
    const updatedEnfants = [...enfants];
    updatedEnfants[index] = {
      ...updatedEnfants[index],
      [field]: field === 'age' ? value : value
    };
    
    setEnfants(updatedEnfants);
  };
  
  const removeEnfant = async (index: number, enfantId: string) => {
    // Si l'enfant a un identifiant qui n'est pas temporaire (commence par "temp-"), on le supprime de la base de données
    if (enfantId && !enfantId.startsWith('temp-')) {
      try {
        const { error } = await supabase
          .from('enfants')
          .delete()
          .eq('id', enfantId);
          
        if (error) {
          console.error('Error deleting enfant:', error);
          toast({
            title: "Erreur",
            description: "Impossible de supprimer l'enfant de la base de données.",
            variant: "destructive"
          });
          return;
        }
      } catch (error) {
        console.error('Exception deleting enfant:', error);
        return;
      }
    }
    
    // Supprimer l'enfant de l'état local
    const updatedEnfants = enfants.filter((_, i) => i !== index);
    setEnfants(updatedEnfants);
  };
  
  const saveResidencePermanente = async () => {
    if (!candidateId) {
      toast({
        title: "Erreur",
        description: "ID du candidat manquant, impossible d'enregistrer les informations.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // 1. Enregistrer ou mettre à jour les détails de résidence permanente
      let prId = permanentResidenceId;
      
      if (!prId) {
        // Créer un nouveau record
        const { data: newPR, error: insertError } = await supabase
          .from('permanent_residence_details')
          .insert({
            candidate_id: candidateId,
            immigration_program: formData.immigration_program,
            nombre_personnes: formData.nombre_personnes,
            conjoint_nom: formData.conjoint_nom || null,
            conjoint_prenom: formData.conjoint_prenom || null,
            conjoint_passport: formData.conjoint_passport || null
          })
          .select()
          .single();
          
        if (insertError) {
          throw insertError;
        }
        
        prId = newPR.id;
      } else {
        // Mettre à jour un record existant
        const { error: updateError } = await supabase
          .from('permanent_residence_details')
          .update({
            immigration_program: formData.immigration_program,
            nombre_personnes: formData.nombre_personnes,
            conjoint_nom: formData.conjoint_nom || null,
            conjoint_prenom: formData.conjoint_prenom || null,
            conjoint_passport: formData.conjoint_passport || null
          })
          .eq('id', prId);
          
        if (updateError) {
          throw updateError;
        }
      }
      
      // 2. Enregistrer ou mettre à jour les enfants
      // Séparer les enfants en ceux à créer (sans ID db) et ceux à mettre à jour
      const enfantsToCreate = enfants.filter(e => e.id.startsWith('temp-'));
      const enfantsToUpdate = enfants.filter(e => !e.id.startsWith('temp-'));
      
      // Créer de nouveaux enfants
      if (enfantsToCreate.length > 0) {
        const newEnfantsData = enfantsToCreate.map(enfant => ({
          nom: enfant.nom,
          prenom: enfant.prenom,
          age: parseInt(enfant.age.toString()) || 0, // Convertir en nombre
          permanent_residence_id: prId as string
        }));
        
        const { data: createdEnfants, error: createError } = await supabase
          .from('enfants')
          .insert(newEnfantsData)
          .select();
          
        if (createError) {
          throw createError;
        }
      }
      
      // Mettre à jour les enfants existants
      for (const enfant of enfantsToUpdate) {
        const { error: updateError } = await supabase
          .from('enfants')
          .update({
            nom: enfant.nom,
            prenom: enfant.prenom,
            age: parseInt(enfant.age.toString()) || 0 // Convertir en nombre
          })
          .eq('id', enfant.id);
          
        if (updateError) {
          console.error('Error updating enfant:', updateError);
        }
      }
      
      // 3. Récupérer les données mises à jour
      const { data: updatedData, error: fetchError } = await supabase
        .from('permanent_residence_details')
        .select('*')
        .eq('id', prId)
        .single();
        
      if (fetchError) {
        throw fetchError;
      }
      
      const { data: updatedEnfants, error: fetchEnfantsError } = await supabase
        .from('enfants')
        .select('*')
        .eq('permanent_residence_id', prId);
        
      if (fetchEnfantsError) {
        throw fetchEnfantsError;
      }
      
      // 4. Mettre à jour l'interface utilisateur avec les nouvelles données
      const formattedEnfants = updatedEnfants.map(enfant => ({
        ...enfant,
        age: enfant.age.toString()
      }));
      
      // 5. Appeler le callback de succès
      onSaved(updatedData, formattedEnfants);
    } catch (error) {
      console.error('Error saving permanent residence data:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement des informations de résidence permanente.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="immigration_program">Programme d'immigration</Label>
          <Select 
            value={formData.immigration_program} 
            onValueChange={(value) => handleSelectChange('immigration_program', value)}
          >
            <SelectTrigger id="immigration_program" aria-label="Programme d'immigration">
              <SelectValue placeholder="Sélectionner un programme" />
            </SelectTrigger>
            <SelectContent>
              {immigrationPrograms.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nombre_personnes">Nombre total de personnes</Label>
          <Input 
            type="number" 
            id="nombre_personnes" 
            value={formData.nombre_personnes} 
            readOnly 
            disabled
            min={1}
            aria-label="Nombre total de personnes"
          />
          <p className="text-xs text-gray-500">Ce nombre est calculé automatiquement</p>
        </div>
      </div>
      
      <Accordion type="single" collapsible defaultValue="conjoint">
        <AccordionItem value="conjoint">
          <AccordionTrigger className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Informations du conjoint
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="conjoint_prenom">Prénom du conjoint</Label>
                <Input 
                  id="conjoint_prenom" 
                  name="conjoint_prenom" 
                  value={formData.conjoint_prenom} 
                  onChange={handleInputChange}
                  aria-label="Prénom du conjoint" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="conjoint_nom">Nom du conjoint</Label>
                <Input 
                  id="conjoint_nom" 
                  name="conjoint_nom" 
                  value={formData.conjoint_nom} 
                  onChange={handleInputChange}
                  aria-label="Nom du conjoint" 
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="conjoint_passport">Numéro de passeport du conjoint</Label>
                <Input 
                  id="conjoint_passport" 
                  name="conjoint_passport" 
                  value={formData.conjoint_passport} 
                  onChange={handleInputChange}
                  aria-label="Numéro de passeport du conjoint" 
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="enfants">
          <AccordionTrigger className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Enfants ({enfants.length})
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 space-y-4">
              {enfants.length > 0 ? (
                <div className="space-y-4">
                  {enfants.map((enfant, index) => (
                    <div key={enfant.id} className="border rounded-md p-4 relative">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute right-2 top-2"
                        onClick={() => removeEnfant(index, enfant.id)}
                        aria-label="Supprimer cet enfant"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                        <div className="space-y-2">
                          <Label htmlFor={`enfant-prenom-${index}`}>Prénom</Label>
                          <Input 
                            id={`enfant-prenom-${index}`} 
                            value={enfant.prenom} 
                            onChange={(e) => updateEnfant(index, 'prenom', e.target.value)}
                            aria-label={`Prénom de l'enfant ${index + 1}`}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`enfant-nom-${index}`}>Nom</Label>
                          <Input 
                            id={`enfant-nom-${index}`} 
                            value={enfant.nom} 
                            onChange={(e) => updateEnfant(index, 'nom', e.target.value)}
                            aria-label={`Nom de l'enfant ${index + 1}`}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`enfant-age-${index}`}>Âge</Label>
                          <Input 
                            id={`enfant-age-${index}`} 
                            type="number" 
                            min={0}
                            max={120}
                            value={enfant.age} 
                            onChange={(e) => updateEnfant(index, 'age', e.target.value)}
                            aria-label={`Âge de l'enfant ${index + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Aucun enfant ajouté
                </div>
              )}
              
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={addEnfant}
                aria-label="Ajouter un enfant"
              >
                <Plus className="h-4 w-4" />
                Ajouter un enfant
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="flex justify-end">
        <Button 
          type="button" 
          onClick={saveResidencePermanente} 
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? 'Enregistrement...' : 'Enregistrer les informations'}
          <Save className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResidencePermanenteForm;
