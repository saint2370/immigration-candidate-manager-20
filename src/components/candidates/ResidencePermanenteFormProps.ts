
import type { Database } from '@/integrations/supabase/types';

export type ImmigrationProgramType = 'Express Entry' | 'Programme des travailleurs qualifiés' | 'Regroupement familial' | 'Programme des candidats des provinces' | 'Programme Startup Visa' | 'Autre';

export type EnfantType = {
  id: string;
  nom: string;
  prenom: string;
  age: string | number;
  permanent_residence_id: string;
  created_at?: string;
  updated_at?: string;
};

export interface ResidencePermanenteFormProps {
  candidateId: string;
  isNewCandidate?: boolean;
  existingData: Database['public']['Tables']['permanent_residence_details']['Row'] | null;
  existingEnfants: EnfantType[];
  permanentResidenceId: string | null;
  onSaved: (permanentResidenceData: Database['public']['Tables']['permanent_residence_details']['Row'], enfants: EnfantType[]) => void;
}
