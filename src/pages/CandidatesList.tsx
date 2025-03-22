
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import CandidateTable from '@/components/dashboard/CandidateTable';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define the correct types from our Database type
type Candidate = Database['public']['Tables']['candidates']['Row'];
type VisaType = Database['public']['Enums']['visa_type'];
type StatusType = Database['public']['Enums']['status_type'];

const CandidatesList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedVisa, setSelectedVisa] = useState<VisaType | 'all'>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    fetchCandidates();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('candidates-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'candidates'
        },
        (payload) => {
          console.log('Realtime update received:', payload);
          
          // Refresh the candidates list when any change occurs
          fetchCandidates();
          
          // Show a toast notification for updates
          if (payload.eventType === 'UPDATE') {
            toast({
              title: "Candidat mis à jour",
              description: "Les informations du candidat ont été mises à jour.",
            });
          } else if (payload.eventType === 'DELETE') {
            toast({
              title: "Candidat supprimé",
              description: "Le candidat a été supprimé avec succès.",
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedVisa]);

  const visaTypes: VisaType[] = ['Visiteur', 'Travail', 'Résidence Permanente'];

  const fetchCandidates = async () => {
    let query = supabase
      .from('candidates')
      .select('*')
      .order('date_soumission', { ascending: false });
    
    if (selectedVisa && selectedVisa !== 'all') {
      query = query.eq('visa_type', selectedVisa as VisaType);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching candidates:', error);
      return;
    }
    
    if (data) {
      setCandidates(data as Candidate[]);
    }
  };

  const handleDeleteCandidate = async () => {
    if (!candidateToDelete) return;

    const { error } = await supabase
      .from('candidates')
      .delete()
      .eq('id', candidateToDelete as string);

    if (error) {
      console.error('Error deleting candidate:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le candidat.",
        variant: "destructive",
      });
      return;
    }

    // Close the dialog and reset the candidate to delete
    setDeleteDialogOpen(false);
    setCandidateToDelete(null);
    
    // Toast is handled by the real-time subscription
  };

  const openDeleteDialog = (id: string) => {
    setCandidateToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleViewCandidate = (id: string) => {
    return `/tableaudebord/candidate/${id}`;
  };

  const handleEditCandidate = (id: string) => {
    return `/tableaudebord/candidates/edit/${id}`;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Liste des candidats</h1>
          <div className="w-full sm:w-auto">
            <Select 
              value={selectedVisa} 
              onValueChange={(value: VisaType | 'all') => setSelectedVisa(value)}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Type de visa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les visas</SelectItem>
                {visaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={() => navigate('/tableaudebord/candidates/new')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau candidat
        </Button>
      </div>

      <CandidateTable 
        candidates={candidates}
        onViewCandidate={handleViewCandidate}
        onEditCandidate={handleEditCandidate}
        onDeleteCandidate={openDeleteDialog}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce candidat ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les informations associées à ce candidat seront définitivement supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteCandidate}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CandidatesList;
