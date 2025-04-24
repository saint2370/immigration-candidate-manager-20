
import type { Database } from '@/integrations/supabase/types';

type Document = Database['public']['Tables']['documents']['Row'] & {
  document_types: {
    nom: string;
    required: boolean;
  } | null;
};

export const calculateProgressFromDocuments = (
  documents: Document[],
  status: string
): number => {
  // If status is final, return 100%
  if (['Complété', 'Rejeté', 'Expiré'].includes(status)) {
    return 100;
  }

  // Count required documents
  const requiredDocuments = documents.filter(doc => doc.document_types?.required).length;
  const submittedDocuments = documents.filter(doc => 
    doc.document_types?.required && doc.file_path
  ).length;

  // Calculate base progress from documents
  const documentProgress = requiredDocuments > 0 
    ? (submittedDocuments / requiredDocuments) * 100 
    : 0;

  // Adjust final progress based on status
  switch (status) {
    case 'Approuvé':
      return 85;
    case 'En cours':
      return Math.max(45, documentProgress);
    case 'En attente':
      return Math.min(15, documentProgress);
    default:
      return documentProgress;
  }
};
