export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidates: {
        Row: {
          adresse: string | null
          bureau: string
          created_at: string
          date_naissance: string
          date_soumission: string
          date_voyage: string | null
          delai_traitement: string | null
          dernier_diplome: string | null
          email: string | null
          emploi_actuel: string | null
          id: string
          identification_number: string | null
          lieu_naissance: string
          nationalite: string
          nom: string
          notes: string | null
          numero_passport: string
          photo_url: string | null
          prenom: string
          procedure: string | null
          status: Database["public"]["Enums"]["status_type"]
          telephone: string | null
          updated_at: string
          visa_type: Database["public"]["Enums"]["visa_type"]
        }
        Insert: {
          adresse?: string | null
          bureau: string
          created_at?: string
          date_naissance: string
          date_soumission: string
          date_voyage?: string | null
          delai_traitement?: string | null
          dernier_diplome?: string | null
          email?: string | null
          emploi_actuel?: string | null
          id?: string
          identification_number?: string | null
          lieu_naissance: string
          nationalite: string
          nom: string
          notes?: string | null
          numero_passport: string
          photo_url?: string | null
          prenom: string
          procedure?: string | null
          status?: Database["public"]["Enums"]["status_type"]
          telephone?: string | null
          updated_at?: string
          visa_type: Database["public"]["Enums"]["visa_type"]
        }
        Update: {
          adresse?: string | null
          bureau?: string
          created_at?: string
          date_naissance?: string
          date_soumission?: string
          date_voyage?: string | null
          delai_traitement?: string | null
          dernier_diplome?: string | null
          email?: string | null
          emploi_actuel?: string | null
          id?: string
          identification_number?: string | null
          lieu_naissance?: string
          nationalite?: string
          nom?: string
          notes?: string | null
          numero_passport?: string
          photo_url?: string | null
          prenom?: string
          procedure?: string | null
          status?: Database["public"]["Enums"]["status_type"]
          telephone?: string | null
          updated_at?: string
          visa_type?: Database["public"]["Enums"]["visa_type"]
        }
        Relationships: []
      }
      details_vol: {
        Row: {
          aeroport_arrivee: string | null
          aeroport_depart: string | null
          candidate_id: string
          compagnie_aerienne: string | null
          created_at: string
          date_arrivee: string | null
          date_depart: string | null
          id: string
          numero_vol: string | null
          updated_at: string
        }
        Insert: {
          aeroport_arrivee?: string | null
          aeroport_depart?: string | null
          candidate_id: string
          compagnie_aerienne?: string | null
          created_at?: string
          date_arrivee?: string | null
          date_depart?: string | null
          id?: string
          numero_vol?: string | null
          updated_at?: string
        }
        Update: {
          aeroport_arrivee?: string | null
          aeroport_depart?: string | null
          candidate_id?: string
          compagnie_aerienne?: string | null
          created_at?: string
          date_arrivee?: string | null
          date_depart?: string | null
          id?: string
          numero_vol?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "details_vol_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      document_types: {
        Row: {
          created_at: string
          id: string
          nom: string
          required: boolean
          updated_at: string
          visa_type: Database["public"]["Enums"]["visa_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          nom: string
          required?: boolean
          updated_at?: string
          visa_type: Database["public"]["Enums"]["visa_type"]
        }
        Update: {
          created_at?: string
          id?: string
          nom?: string
          required?: boolean
          updated_at?: string
          visa_type?: Database["public"]["Enums"]["visa_type"]
        }
        Relationships: []
      }
      documents: {
        Row: {
          candidate_id: string
          created_at: string
          document_type_id: string
          file_path: string | null
          filename: string | null
          id: string
          status: Database["public"]["Enums"]["document_status"]
          updated_at: string
          upload_date: string | null
        }
        Insert: {
          candidate_id: string
          created_at?: string
          document_type_id: string
          file_path?: string | null
          filename?: string | null
          id?: string
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          upload_date?: string | null
        }
        Update: {
          candidate_id?: string
          created_at?: string
          document_type_id?: string
          file_path?: string | null
          filename?: string | null
          id?: string
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          upload_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "document_types"
            referencedColumns: ["id"]
          },
        ]
      }
      enfants: {
        Row: {
          age: number
          created_at: string
          id: string
          nom: string
          permanent_residence_id: string
          prenom: string
          updated_at: string
        }
        Insert: {
          age: number
          created_at?: string
          id?: string
          nom: string
          permanent_residence_id: string
          prenom: string
          updated_at?: string
        }
        Update: {
          age?: number
          created_at?: string
          id?: string
          nom?: string
          permanent_residence_id?: string
          prenom?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "enfants_permanent_residence_id_fkey"
            columns: ["permanent_residence_id"]
            isOneToOne: false
            referencedRelation: "permanent_residence_details"
            referencedColumns: ["id"]
          },
        ]
      }
      history: {
        Row: {
          action: string
          candidate_id: string
          date: string
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          candidate_id: string
          date?: string
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          candidate_id?: string
          date?: string
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "history_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      job_categories: {
        Row: {
          created_at: string
          id: string
          name: string
          name_en: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          name_en: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          name_en?: string
          updated_at?: string
        }
        Relationships: []
      }
      job_offer_categories: {
        Row: {
          category_id: string
          job_offer_id: string
        }
        Insert: {
          category_id: string
          job_offer_id: string
        }
        Update: {
          category_id?: string
          job_offer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_offer_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "job_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_offer_categories_job_offer_id_fkey"
            columns: ["job_offer_id"]
            isOneToOne: false
            referencedRelation: "job_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      job_offers: {
        Row: {
          application_url: string | null
          company: string
          contact_email: string | null
          created_at: string
          description: string
          expiry_date: string | null
          id: string
          is_active: boolean
          job_type: string
          location: string
          province: string | null
          requirements: string | null
          salary_range: string | null
          title: string
          updated_at: string
        }
        Insert: {
          application_url?: string | null
          company: string
          contact_email?: string | null
          created_at?: string
          description: string
          expiry_date?: string | null
          id?: string
          is_active?: boolean
          job_type: string
          location: string
          province?: string | null
          requirements?: string | null
          salary_range?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          application_url?: string | null
          company?: string
          contact_email?: string | null
          created_at?: string
          description?: string
          expiry_date?: string | null
          id?: string
          is_active?: boolean
          job_type?: string
          location?: string
          province?: string | null
          requirements?: string | null
          salary_range?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      permanent_residence_details: {
        Row: {
          candidate_id: string
          conjoint_nom: string | null
          conjoint_passport: string | null
          conjoint_prenom: string | null
          created_at: string
          id: string
          immigration_program: Database["public"]["Enums"]["immigration_program"]
          nombre_personnes: number
          updated_at: string
        }
        Insert: {
          candidate_id: string
          conjoint_nom?: string | null
          conjoint_passport?: string | null
          conjoint_prenom?: string | null
          created_at?: string
          id?: string
          immigration_program: Database["public"]["Enums"]["immigration_program"]
          nombre_personnes?: number
          updated_at?: string
        }
        Update: {
          candidate_id?: string
          conjoint_nom?: string | null
          conjoint_passport?: string | null
          conjoint_prenom?: string | null
          created_at?: string
          id?: string
          immigration_program?: Database["public"]["Enums"]["immigration_program"]
          nombre_personnes?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "permanent_residence_details_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      document_status:
        | "uploaded"
        | "verified"
        | "pending"
        | "rejected"
        | "expired"
      immigration_program: "Entrée express" | "Arrima" | "Autre"
      status_type:
        | "En cours"
        | "Approuvé"
        | "En attente"
        | "Rejeté"
        | "Complété"
        | "Expiré"
      visa_type: "Visiteur" | "Travail" | "Résidence Permanente"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_status: [
        "uploaded",
        "verified",
        "pending",
        "rejected",
        "expired",
      ],
      immigration_program: ["Entrée express", "Arrima", "Autre"],
      status_type: [
        "En cours",
        "Approuvé",
        "En attente",
        "Rejeté",
        "Complété",
        "Expiré",
      ],
      visa_type: ["Visiteur", "Travail", "Résidence Permanente"],
    },
  },
} as const
