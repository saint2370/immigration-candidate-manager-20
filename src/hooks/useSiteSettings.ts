
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type SiteSettingValue = {
  [key: string]: any;
};

export type SiteSetting = {
  id: string;
  key: string;
  value: SiteSettingValue;
  description: string | null;
  category: string;
  created_at: string;
  updated_at: string;
};

export function useSiteSettings(category?: string) {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  // Fonction pour récupérer les paramètres
  async function fetchSettings() {
    try {
      setLoading(true);
      
      // Utilisons la méthode plus générique pour éviter les problèmes de typage
      let query = supabase.from('site_settings');
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error: fetchError } = await query.order('key');
      
      if (fetchError) {
        throw fetchError;
      }
      
      // Cast explicite des données pour satisfaire TypeScript
      setSettings(data as unknown as SiteSetting[]);
    } catch (err) {
      console.error('Erreur lors de la récupération des paramètres:', err);
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
    } finally {
      setLoading(false);
    }
  }

  // Fonction pour mettre à jour un paramètre
  async function updateSetting(key: string, value: SiteSettingValue) {
    try {
      // Utilisons la méthode plus générique pour éviter les problèmes de typage
      const { error: updateError } = await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key);
      
      if (updateError) {
        throw updateError;
      }
      
      // Mettre à jour le state local
      setSettings(prev => prev.map(setting => 
        setting.key === key ? { ...setting, value } : setting
      ));
      
      toast({
        title: "Paramètre mis à jour",
        description: "Le paramètre a été enregistré avec succès.",
      });
      
      return true;
    } catch (err) {
      console.error('Erreur lors de la mise à jour du paramètre:', err);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le paramètre.",
        variant: "destructive"
      });
      return false;
    }
  }

  // Fonction utilitaire pour obtenir la valeur d'un paramètre spécifique
  function getSettingValue(key: string): SiteSettingValue | undefined {
    const setting = settings.find(s => s.key === key);
    return setting?.value;
  }

  // Fonction utilitaire pour obtenir une valeur localisée
  function getLocalizedValue(key: string, language: string = 'fr'): string {
    const value = getSettingValue(key);
    if (!value) return '';
    
    return value[language] || value['fr'] || '';
  }

  // Charger les paramètres au montage du composant
  useEffect(() => {
    fetchSettings();
  }, [category]);

  return { 
    settings, 
    loading, 
    error, 
    fetchSettings, 
    updateSetting, 
    getSettingValue,
    getLocalizedValue
  };
}
