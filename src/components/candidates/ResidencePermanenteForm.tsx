
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Trash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  PermanentResidenceDetailsType, 
  EnfantType, 
  ResidencePermanenteFormProps 
} from './ResidencePermanenteFormProps';

const ResidencePermanenteForm: React.FC<ResidencePermanenteFormProps> = ({
  permanentResidence,
  setPermanentResidence,
  enfants,
  setEnfants,
  isEditing,
  onSubmit,
  isSubmitting
}) => {
  const [newEnfant, setNewEnfant] = useState<EnfantType>({ nom: '', prenom: '', age: '' });
  const [showConjointFields, setShowConjointFields] = useState(
    !!permanentResidence.conjoint_nom || !!permanentResidence.conjoint_prenom
  );

  const handleResidenceChange = (name: string, value: string | number) => {
    setPermanentResidence({
      ...permanentResidence,
      [name]: value
    });
  };

  const handleConjointChange = (field: string, value: string) => {
    const updatedData = { ...permanentResidence, [field]: value };
    
    // Mettre à jour le nombre de personnes si nécessaire
    if ((field === 'conjoint_nom' || field === 'conjoint_prenom') && value && !permanentResidence.conjoint_nom && !permanentResidence.conjoint_prenom) {
      updatedData.nombre_personnes = (permanentResidence.nombre_personnes || 1) + 1;
    }
    
    setPermanentResidence(updatedData);
  };

  const handleEnfantChange = (field: string, value: string) => {
    setNewEnfant({ ...newEnfant, [field]: value });
  };

  const addEnfant = () => {
    if (newEnfant.nom && newEnfant.prenom && newEnfant.age) {
      const updatedEnfants = [...enfants, newEnfant];
      setEnfants(updatedEnfants);
      
      // Mettre à jour le nombre de personnes
      setPermanentResidence({
        ...permanentResidence,
        nombre_personnes: (permanentResidence.nombre_personnes || 1) + 1
      });
      
      // Réinitialiser le formulaire d'ajout d'enfant
      setNewEnfant({ nom: '', prenom: '', age: '' });
    }
  };

  const removeEnfant = (index: number) => {
    const updatedEnfants = [...enfants];
    updatedEnfants.splice(index, 1);
    setEnfants(updatedEnfants);
    
    // Mettre à jour le nombre de personnes
    setPermanentResidence({
      ...permanentResidence,
      nombre_personnes: Math.max(1, (permanentResidence.nombre_personnes || 1) - 1)
    });
  };

  const toggleConjointFields = () => {
    setShowConjointFields(!showConjointFields);
    
    // Si on cache les champs du conjoint, on efface les données
    if (showConjointFields) {
      const updatedData = {
        ...permanentResidence,
        conjoint_nom: null,
        conjoint_prenom: null,
        conjoint_passport: null,
        nombre_personnes: Math.max(1, (permanentResidence.nombre_personnes || 1) - 1)
      };
      setPermanentResidence(updatedData);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Détails de la Résidence Permanente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="immigration_program">Programme d'immigration</Label>
              <Select
                value={permanentResidence.immigration_program}
                onValueChange={(value) => handleResidenceChange('immigration_program', value as 'Entrée express' | 'Arrima' | 'Autre')}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un programme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entrée express">Entrée express</SelectItem>
                  <SelectItem value="Arrima">Arrima</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="nombre_personnes">Nombre de personnes</Label>
              <Input
                id="nombre_personnes"
                type="number"
                min="1"
                value={permanentResidence.nombre_personnes || 1}
                onChange={(e) => handleResidenceChange('nombre_personnes', parseInt(e.target.value))}
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Ce nombre est calculé automatiquement en fonction du demandeur principal + conjoint + enfants
              </p>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Conjoint</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={toggleConjointFields}
                disabled={!isEditing}
              >
                {showConjointFields ? 'Retirer le conjoint' : 'Ajouter un conjoint'}
              </Button>
            </div>
            
            {showConjointFields && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="conjoint_prenom">Prénom du conjoint</Label>
                  <Input
                    id="conjoint_prenom"
                    value={permanentResidence.conjoint_prenom || ''}
                    onChange={(e) => handleConjointChange('conjoint_prenom', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="conjoint_nom">Nom du conjoint</Label>
                  <Input
                    id="conjoint_nom"
                    value={permanentResidence.conjoint_nom || ''}
                    onChange={(e) => handleConjointChange('conjoint_nom', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="conjoint_passport">N° Passeport du conjoint</Label>
                  <Input
                    id="conjoint_passport"
                    value={permanentResidence.conjoint_passport || ''}
                    onChange={(e) => handleConjointChange('conjoint_passport', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Enfants (moins de 18 ans)</span>
            <Badge variant="outline">{enfants.length} enfant{enfants.length !== 1 ? 's' : ''}</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {enfants.length > 0 && (
            <div className="space-y-4 mb-6">
              {enfants.map((enfant, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-md border bg-gray-50">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div>
                      <Label className="text-xs">Prénom</Label>
                      <p className="font-medium">{enfant.prenom}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Nom</Label>
                      <p className="font-medium">{enfant.nom}</p>
                    </div>
                    <div>
                      <Label className="text-xs">Age</Label>
                      <p className="font-medium">{enfant.age} ans</p>
                    </div>
                    {enfant.numero_passport && (
                      <div>
                        <Label className="text-xs">N° Passeport</Label>
                        <p className="font-medium">{enfant.numero_passport}</p>
                      </div>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEnfant(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    disabled={!isEditing}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {isEditing && (
            <div className="border rounded-md p-4 bg-gray-50">
              <h4 className="text-sm font-medium mb-3">Ajouter un enfant</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div>
                  <Label htmlFor="enfant_prenom">Prénom</Label>
                  <Input
                    id="enfant_prenom"
                    value={newEnfant.prenom}
                    onChange={(e) => handleEnfantChange('prenom', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="enfant_nom">Nom</Label>
                  <Input
                    id="enfant_nom"
                    value={newEnfant.nom}
                    onChange={(e) => handleEnfantChange('nom', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="enfant_age">Age</Label>
                  <Input
                    id="enfant_age"
                    type="number"
                    min="0"
                    max="17"
                    value={newEnfant.age}
                    onChange={(e) => handleEnfantChange('age', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="enfant_passport">N° Passeport (optionnel)</Label>
                  <Input
                    id="enfant_passport"
                    value={newEnfant.numero_passport || ''}
                    onChange={(e) => handleEnfantChange('numero_passport', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  onClick={addEnfant}
                  size="sm"
                  disabled={!newEnfant.prenom || !newEnfant.nom || !newEnfant.age}
                >
                  <Plus size={16} className="mr-1" /> Ajouter l'enfant
                </Button>
              </div>
            </div>
          )}
          
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={onSubmit}
                disabled={isSubmitting}
              >
                Enregistrer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResidencePermanenteForm;
