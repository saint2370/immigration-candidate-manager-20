
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { JobOffer, JobOfferFormData, JobFilterParams } from '@/types/jobs';
import { format } from 'date-fns';

export const useJobOffers = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Récupérer toutes les offres d'emploi
  const { data: jobOffers, isLoading, error } = useQuery({
    queryKey: ['jobOffers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_offers')
        .select(`
          *,
          job_offer_categories (
            job_categories (
              id, name, name_en
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
    const { data, error } = await supabase
      .from('job_offers')
      .select(`
        *,
        job_offer_categories (
          job_categories (
            id, name, name_en
          )
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

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
      // Créer l'offre d'emploi
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

      // Ajouter les catégories si sélectionnées
      if (data.category_ids && data.category_ids.length > 0) {
        const categoryAssociations = data.category_ids.map(categoryId => ({
          job_offer_id: newOffer.id,
          category_id: categoryId
        }));

        const { error: categoryError } = await supabase
          .from('job_offer_categories')
          .insert(categoryAssociations as any);

        if (categoryError) throw new Error(categoryError.message);
      }

      // Invalidate the cache to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['jobOffers'] });
      
      return newOffer.id;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('Une erreur est survenue lors de la création de l\'offre d\'emploi');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mettre à jour une offre d'emploi
  const updateJobOffer = async (id: string, data: JobOfferFormData) => {
    setIsSubmitting(true);
    try {
      // Mettre à jour l'offre d'emploi
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

      // Supprimer les associations de catégories existantes
      const { error: deleteError } = await supabase
        .from('job_offer_categories')
        .delete()
        .eq('job_offer_id', id);

      if (deleteError) throw new Error(deleteError.message);

      // Ajouter les nouvelles catégories si sélectionnées
      if (data.category_ids && data.category_ids.length > 0) {
        const categoryAssociations = data.category_ids.map(categoryId => ({
          job_offer_id: id,
          category_id: categoryId
        }));

        const { error: categoryError } = await supabase
          .from('job_offer_categories')
          .insert(categoryAssociations as any);

        if (categoryError) throw new Error(categoryError.message);
      }

      // Invalidate the cache to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['jobOffers'] });
      queryClient.invalidateQueries({ queryKey: ['jobOffer', id] });
      
      return id;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('Une erreur est survenue lors de la mise à jour de l\'offre d\'emploi');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Supprimer une offre d'emploi
  const deleteJobOffer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('job_offers')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);

      // Invalidate the cache to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['jobOffers'] });
      
      return true;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('Une erreur est survenue lors de la suppression de l\'offre d\'emploi');
    }
  };

  // Changer le statut actif d'une offre d'emploi
  const toggleJobOfferStatus = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('job_offers')
        .update({ is_active: isActive } as any)
        .eq('id', id);

      if (error) throw new Error(error.message);

      // Invalidate the cache to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['jobOffers'] });
      queryClient.invalidateQueries({ queryKey: ['jobOffer', id] });
      
      return true;
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
      throw new Error('Une erreur est survenue lors de la mise à jour du statut de l\'offre d\'emploi');
    }
  };

  // Filtrer les offres d'emploi (pour l'affichage côté utilisateur)
  const filterJobOffers = (offers: JobOffer[] | undefined, filters: JobFilterParams): JobOffer[] => {
    if (!offers) return [];
    
    return offers.filter(offer => {
      // Filter by active status first
      if (!offer.is_active) return false;
      
      // Filter by category
      if (filters.category && offer.categories && offer.categories.length > 0) {
        if (!offer.categories.some(cat => cat.id === filters.category)) {
          return false;
        }
      }
      
      // Filter by location
      if (filters.location && offer.location.toLowerCase() !== filters.location.toLowerCase()) {
        return false;
      }
      
      // Filter by job type
      if (filters.jobType && offer.job_type.toLowerCase() !== filters.jobType.toLowerCase()) {
        return false;
      }
      
      // Filter by search query
      if (filters.query) {
        const query = filters.query.toLowerCase();
        return (
          offer.title.toLowerCase().includes(query) ||
          offer.company.toLowerCase().includes(query) ||
          offer.description.toLowerCase().includes(query) ||
          (offer.requirements && offer.requirements.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  };

  // Format human-readable dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return 'Date invalide';
    }
  };

  return {
    jobOffers,
    isLoading,
    error,
    isSubmitting,
    getJobOfferById,
    createJobOffer,
    updateJobOffer,
    deleteJobOffer,
    toggleJobOfferStatus,
    filterJobOffers,
    formatDate
  };
};
