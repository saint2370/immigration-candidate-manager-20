
import { Dispatch, SetStateAction } from 'react';

export interface EnfantType {
  id?: string;
  nom: string;
  prenom: string;
  age: string | number;
  numero_passport?: string;
  permanent_residence_id?: string;
}

export interface PermanentResidenceDetailsType {
  id: string;
  candidate_id: string;
  immigration_program: 'Entrée express' | 'Arrima' | 'Autre';
  nombre_personnes: number;
  conjoint_nom: string | null;
  conjoint_prenom: string | null;
  conjoint_passport: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResidencePermanenteFormProps {
  permanentResidence: PermanentResidenceDetailsType;
  setPermanentResidence: Dispatch<SetStateAction<PermanentResidenceDetailsType>>;
  enfants: EnfantType[];
  setEnfants: Dispatch<SetStateAction<EnfantType[]>>;
  isEditing: boolean;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export default ResidencePermanenteFormProps;
