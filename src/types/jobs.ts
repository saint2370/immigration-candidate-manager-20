
export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements?: string;
  salary_range?: string;
  contact_email?: string;
  application_url?: string;
  province?: string;
  job_type: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  expiry_date?: string;
  categories?: JobCategory[];
}

export interface JobCategory {
  id: string;
  name: string;
  name_en: string;
  created_at: string;
  updated_at: string;
}

export interface JobOfferFormData {
  title: string;
  company: string;
  location: string;
  description: string;
  requirements?: string;
  salary_range?: string;
  contact_email?: string;
  application_url?: string;
  province?: string;
  job_type: string;
  is_active: boolean;
  expiry_date?: string;
  category_ids: string[];
}
