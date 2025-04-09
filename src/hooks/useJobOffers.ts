
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { JobOffer, JobOfferFormData } from '@/types/jobs';
import { useToast } from '@/hooks/use-toast';

export const useJobOffers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Récupérer toutes les offres d'emploi
  const { data: jobOffers, isLoading, error } = useQuery({
    queryKey: ['jobOffers'],
    queryFn: async () => {
      // Cast the response to any initially to work around TypeScript limitations
      const { data, error } = await supabase
        .from('job_offers')
        .select(`
          *,
          job_offer_categories (
            category_id,
            job_categories (
              id,
              name,
              name_en
            )
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      // Transform data for easier category access
      const processedData = data.map((offer: any) => {
        const categories = offer.job_offer_categories.map((cat: any) => cat.job_categories);
        return {
          ...offer,
          categories,
          job_offer_categories: undefined
        };
      });

      return processedData as JobOffer[];
    }
  });

  // Récupérer une offre d'emploi par ID
  const getJobOfferById = async (id: string) => {
    // Cast the response to any initially to work around TypeScript limitations
    const { data, error } = await supabase
      .from('job_offers')
      .select(`
        *,
        job_offer_categories (
          category_id,
          job_categories (
            id,
            name,
            name_en
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      toast({
        title: 'Erreur',
        description: `Impossible de récupérer l'offre d'emploi: ${error.message}`,
        variant: 'destructive'
      });
      return null;
    }

    // Transformer les données
    const categories = data.job_offer_categories.map((cat: any) => cat.job_categories);
    return {
      ...data,
      categories,
      job_offer_categories: undefined
    } as JobOffer;
  };

  // Créer une nouvelle offre d'emploi
  const createJobOffer = async (data: JobOfferFormData) => {
    setIsSubmitting(true);
    try {
      // Créer l'offre d'emploi (cast to any to work around TypeScript limitations)
      const { data: newOffer, error } = await supabase
        .from('job_offers')
        .insert({
          title: data.title,
          company: data.company,
          location: data.location,
          description: data.description,
          requirements: data.requirements,
          salary_range: data.salary_range,
          contact_email: data.contact_email,
          application_url: data.application_url,
          province: data.province,
          job_type: data.job_type,
          is_active: data.is_active,
          expiry_date: data.expiry_date
        } as any)
        .select('id')
        .single();

      if (error) throw new Error(error.message);

      // Associer les catégories
      if (data.category_ids && data.category_ids.length > 0) {
        const categoryAssociations = data.category_ids.map(categoryId => ({
          job_offer_id: newOffer.id,
          category_id: categoryId
        }));

        // Cast to any to work around TypeScript limitations
        const { error: categoryError } = await supabase
          .from('job_offer_categories')
          .insert(categoryAssociations as any);

        if (categoryError) throw new Error(categoryError.message);
      }

      toast({
        title: 'Succès',
        description: 'Offre d\'emploi créée avec succès'
      });

      return newOffer.id;
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Impossible de créer l'offre d'emploi: ${error.message}`,
        variant: 'destructive'
      });
      return null;
    } finally {
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['jobOffers'] });
    }
  };

  // Mettre à jour une offre d'emploi
  const updateJobOffer = async (id: string, data: JobOfferFormData) => {
    setIsSubmitting(true);
    try {
      // Mettre à jour l'offre d'emploi (cast to any to work around TypeScript limitations)
      const { error } = await supabase
        .from('job_offers')
        .update({
          title: data.title,
          company: data.company,
          location: data.location,
          description: data.description,
          requirements: data.requirements,
          salary_range: data.salary_range,
          contact_email: data.contact_email,
          application_url: data.application_url,
          province: data.province,
          job_type: data.job_type,
          is_active: data.is_active,
          expiry_date: data.expiry_date
        } as any)
        .eq('id', id);

      if (error) throw new Error(error.message);

      // Supprimer les associations de catégories existantes (cast to any)
      const { error: deleteError } = await supabase
        .from('job_offer_categories')
        .delete()
        .eq('job_offer_id', id);

      if (deleteError) throw new Error(deleteError.message);

      // Ajouter les nouvelles associations de catégories
      if (data.category_ids && data.category_ids.length > 0) {
        const categoryAssociations = data.category_ids.map(categoryId => ({
          job_offer_id: id,
          category_id: categoryId
        }));

        // Cast to any to work around TypeScript limitations
        const { error: categoryError } = await supabase
          .from('job_offer_categories')
          .insert(categoryAssociations as any);

        if (categoryError) throw new Error(categoryError.message);
      }

      toast({
        title: 'Succès',
        description: 'Offre d\'emploi mise à jour avec succès'
      });

      return true;
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Impossible de mettre à jour l'offre d'emploi: ${error.message}`,
        variant: 'destructive'
      });
      return false;
    } finally {
      setIsSubmitting(false);
      queryClient.invalidateQueries({ queryKey: ['jobOffers'] });
    }
  };

  // Supprimer une offre d'emploi
  const deleteJobOffer = async (id: string) => {
    try {
      // Cast to any to work around TypeScript limitations
      const { error } = await supabase
        .from('job_offers')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);

      toast({
        title: 'Succès',
        description: 'Offre d\'emploi supprimée avec succès'
      });

      return true;
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Impossible de supprimer l'offre d'emploi: ${error.message}`,
        variant: 'destructive'
      });
      return false;
    } finally {
      queryClient.invalidateQueries({ queryKey: ['jobOffers'] });
    }
  };

  // Changer le statut actif d'une offre d'emploi
  const toggleJobOfferStatus = async (id: string, isActive: boolean) => {
    try {
      // Cast to any to work around TypeScript limitations
      const { error } = await supabase
        .from('job_offers')
        .update({ is_active: isActive } as any)
        .eq('id', id);

      if (error) throw new Error(error.message);

      toast({
        title: 'Succès',
        description: `Offre d'emploi ${isActive ? 'activée' : 'désactivée'} avec succès`
      });

      return true;
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: `Impossible de changer le statut de l'offre d'emploi: ${error.message}`,
        variant: 'destructive'
      });
      return false;
    } finally {
      queryClient.invalidateQueries({ queryKey: ['jobOffers'] });
    }
  };

  return {
    jobOffers,
    isLoading,
    error,
    isSubmitting,
    createJobOffer,
    updateJobOffer,
    deleteJobOffer,
    toggleJobOfferStatus,
    getJobOfferById
  };
};
