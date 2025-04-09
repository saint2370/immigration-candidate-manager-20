
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { JobCategory } from '@/types/jobs';
import { useLanguage } from '@/contexts/LanguageContext';

export const useJobCategories = () => {
  const { language } = useLanguage();

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['jobCategories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        throw new Error(error.message);
      }

      return data as JobCategory[];
    }
  });

  // Récupérer le nom de la catégorie en fonction de la langue
  const getCategoryName = (category: JobCategory) => {
    return language === 'fr' ? category.name : category.name_en;
  };

  return {
    categories,
    isLoading,
    error,
    getCategoryName
  };
};
