
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Settings, 
  Globe, 
  Image, 
  Home, 
  Phone, 
  BarChart, 
  Save, 
  Info,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useSiteSettings, SiteSetting, SiteSettingValue } from '@/hooks/useSiteSettings';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const SiteManagement: React.FC = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const { 
    settings, 
    loading, 
    error, 
    updateSetting, 
    fetchSettings 
  } = useSiteSettings();
  const [activeTab, setActiveTab] = useState('home');
  const [editValues, setEditValues] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});

  // Grouper les paramètres par catégorie
  const settingsByCategory = useMemo(() => {
    const grouped: Record<string, SiteSetting[]> = {};
    
    if (settings) {
      settings.forEach(setting => {
        if (!grouped[setting.category]) {
          grouped[setting.category] = [];
        }
        grouped[setting.category].push(setting);
      });
    }
    
    return grouped;
  }, [settings]);

  // Initialiser les valeurs d'édition à partir des paramètres
  useEffect(() => {
    const initialValues: Record<string, any> = {};
    
    settings.forEach(setting => {
      initialValues[setting.key] = setting.value;
    });
    
    setEditValues(initialValues);
  }, [settings]);

  // Fonction pour mettre à jour un paramètre localisé
  const handleLocalizedChange = (settingKey: string, lang: string, value: string) => {
    const currentValue = { ...editValues[settingKey] };
    currentValue[lang] = value;
    
    setEditValues({
      ...editValues,
      [settingKey]: currentValue
    });
  };

  // Fonction pour mettre à jour un paramètre JSON standard
  const handleJsonValueChange = (settingKey: string, fieldKey: string, value: any) => {
    const currentValue = { ...editValues[settingKey] };
    currentValue[fieldKey] = value;
    
    setEditValues({
      ...editValues,
      [settingKey]: currentValue
    });
  };

  // Fonction pour mettre à jour un paramètre tableau (comme les images)
  const handleArrayChange = (settingKey: string, index: number, value: string) => {
    const currentArray = [...editValues[settingKey]];
    currentArray[index] = value;
    
    setEditValues({
      ...editValues,
      [settingKey]: currentArray
    });
  };

  // Fonction pour ajouter un élément à un tableau
  const handleAddArrayItem = (settingKey: string) => {
    const currentArray = [...editValues[settingKey]];
    currentArray.push('');
    
    setEditValues({
      ...editValues,
      [settingKey]: currentArray
    });
  };

  // Fonction pour supprimer un élément d'un tableau
  const handleRemoveArrayItem = (settingKey: string, index: number) => {
    const currentArray = [...editValues[settingKey]];
    currentArray.splice(index, 1);
    
    setEditValues({
      ...editValues,
      [settingKey]: currentArray
    });
  };

  // Fonction pour enregistrer un paramètre
  const handleSaveSetting = async (settingKey: string) => {
    setSaving({ ...saving, [settingKey]: true });
    
    try {
      const success = await updateSetting(settingKey, editValues[settingKey]);
      
      if (!success) {
        throw new Error("Échec de la mise à jour");
      }
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err);
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer le paramètre.",
        variant: "destructive"
      });
    } finally {
      setSaving({ ...saving, [settingKey]: false });
    }
  };

  // Fonction pour obtenir le type de paramètre et son éditeur approprié
  const renderSettingEditor = (setting: SiteSetting) => {
    // Traiter les valeurs JSON avec traductions (fr/en)
    if (setting.value && (setting.value.fr !== undefined || setting.value.en !== undefined)) {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <span>Français</span> 
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">FR</span>
            </Label>
            <Textarea 
              value={editValues[setting.key]?.fr || ''} 
              onChange={(e) => handleLocalizedChange(setting.key, 'fr', e.target.value)}
              rows={3}
              className="resize-y"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <span>English</span>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">EN</span>
            </Label>
            <Textarea 
              value={editValues[setting.key]?.en || ''} 
              onChange={(e) => handleLocalizedChange(setting.key, 'en', e.target.value)}
              rows={3}
              className="resize-y"
            />
          </div>
        </div>
      );
    }
    
    // Traiter les tableaux (comme les images)
    if (Array.isArray(editValues[setting.key])) {
      return (
        <div className="space-y-2">
          {editValues[setting.key].map((item: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input 
                value={item} 
                onChange={(e) => handleArrayChange(setting.key, index, e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="destructive" 
                size="icon"
                onClick={() => handleRemoveArrayItem(setting.key, index)}
              >
                &times;
              </Button>
            </div>
          ))}
          <Button 
            variant="outline" 
            onClick={() => handleAddArrayItem(setting.key)}
            className="mt-2 w-full"
          >
            Ajouter
          </Button>
        </div>
      );
    }
    
    // Traiter le compteur de visas spécifiquement
    if (setting.key === 'visas_counter') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre de visas</Label>
            <Input 
              type="number"
              value={editValues[setting.key]?.value || 0} 
              onChange={(e) => handleJsonValueChange(setting.key, 'value', parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Texte en français</Label>
            <Input 
              value={editValues[setting.key]?.text_fr || ''} 
              onChange={(e) => handleJsonValueChange(setting.key, 'text_fr', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Texte en anglais</Label>
            <Input 
              value={editValues[setting.key]?.text_en || ''} 
              onChange={(e) => handleJsonValueChange(setting.key, 'text_en', e.target.value)}
            />
          </div>
        </div>
      );
    }
    
    // Traiter les informations de contact
    if (setting.key === 'contact_info') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Téléphone</Label>
            <Input 
              value={editValues[setting.key]?.phone || ''} 
              onChange={(e) => handleJsonValueChange(setting.key, 'phone', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Email</Label>
            <Input 
              value={editValues[setting.key]?.email || ''} 
              onChange={(e) => handleJsonValueChange(setting.key, 'email', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>WhatsApp</Label>
            <Input 
              value={editValues[setting.key]?.whatsapp || ''} 
              onChange={(e) => handleJsonValueChange(setting.key, 'whatsapp', e.target.value)}
            />
          </div>
        </div>
      );
    }
    
    // Valeur simple par défaut
    return (
      <Textarea 
        value={JSON.stringify(editValues[setting.key], null, 2)} 
        onChange={(e) => {
          try {
            const value = JSON.parse(e.target.value);
            setEditValues({
              ...editValues,
              [setting.key]: value
            });
          } catch (err) {
            // Ignorer les erreurs de parsing
          }
        }}
        rows={5}
        className="font-mono text-sm"
      />
    );
  };

  // Fonction pour obtenir l'icône appropriée pour chaque catégorie
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'home':
        return <Home size={18} />;
      case 'statistics':
        return <BarChart size={18} />;
      case 'contact':
        return <Phone size={18} />;
      default:
        return <Settings size={18} />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ircc-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle size={20} />
            Erreur
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p>Impossible de charger les paramètres du site. Veuillez réessayer plus tard.</p>
          <Button 
            variant="outline" 
            onClick={() => fetchSettings()} 
            className="mt-4"
          >
            Réessayer
          </Button>
        </CardContent>
      </Card>
    );
  }

  const categories = Object.keys(settingsByCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Globe size={24} className="text-ircc-blue" />
          Gestion du site
        </h1>
      </div>
      
      <Card>
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle>Configuration du site web</CardTitle>
          <CardDescription>
            Modifiez les textes et paramètres qui apparaissent sur le site public
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {categories.length > 0 ? (
            <Tabs 
              defaultValue={categories[0]} 
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="mb-6">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="flex items-center gap-2"
                  >
                    {getCategoryIcon(category)}
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {categories.map(category => (
                <TabsContent key={category} value={category} className="space-y-6">
                  {settingsByCategory[category].map(setting => (
                    <Card key={setting.id} className="overflow-hidden">
                      <CardHeader className="bg-gray-50 pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base font-medium">
                            {setting.key}
                          </CardTitle>
                          <Button 
                            onClick={() => handleSaveSetting(setting.key)}
                            disabled={saving[setting.key]}
                            className="bg-ircc-blue hover:bg-ircc-dark-blue"
                            size="sm"
                          >
                            {saving[setting.key] ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                            ) : (
                              <Save size={16} className="mr-2" />
                            )}
                            Enregistrer
                          </Button>
                        </div>
                        {setting.description && (
                          <CardDescription className="flex items-center gap-1">
                            <Info size={14} />
                            {setting.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="pt-4">
                        {renderSettingEditor(setting)}
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="text-center py-8">
              <p>Aucun paramètre trouvé.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteManagement;
