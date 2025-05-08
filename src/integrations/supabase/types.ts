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
      admin_notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          transaction_id: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          transaction_id?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          transaction_id?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_notifications_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_custom"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          adresse: string | null
          bureau: string
          created_at: string
          date_naissance: string
          date_soumission: string
          date_voyage: string
          delai_traitement: string | null
          email: string | null
          id: string
          identification_number: string | null
          lieu_naissance: string
          nationalite: string | null
          nom: string
          notes: string | null
          numero_passport: string
          photo_url: string | null
          prenom: string
          procedure: string | null
          status: Database["public"]["Enums"]["status_type"]
          telephone: string
          visa_type: Database["public"]["Enums"]["visa_type"]
        }
        Insert: {
          adresse?: string | null
          bureau: string
          created_at?: string
          date_naissance: string
          date_soumission: string
          date_voyage: string
          delai_traitement?: string | null
          email?: string | null
          id?: string
          identification_number?: string | null
          lieu_naissance: string
          nationalite?: string | null
          nom: string
          notes?: string | null
          numero_passport: string
          photo_url?: string | null
          prenom: string
          procedure?: string | null
          status?: Database["public"]["Enums"]["status_type"]
          telephone: string
          visa_type: Database["public"]["Enums"]["visa_type"]
        }
        Update: {
          adresse?: string | null
          bureau?: string
          created_at?: string
          date_naissance?: string
          date_soumission?: string
          date_voyage?: string
          delai_traitement?: string | null
          email?: string | null
          id?: string
          identification_number?: string | null
          lieu_naissance?: string
          nationalite?: string | null
          nom?: string
          notes?: string | null
          numero_passport?: string
          photo_url?: string | null
          prenom?: string
          procedure?: string | null
          status?: Database["public"]["Enums"]["status_type"]
          telephone?: string
          visa_type?: Database["public"]["Enums"]["visa_type"]
        }
        Relationships: []
      }
      details_vol: {
        Row: {
          candidate_id: string
          created_at: string
          date_arrivee: string | null
          date_depart: string | null
          id: string
          numero_vol: string
        }
        Insert: {
          candidate_id: string
          created_at?: string
          date_arrivee?: string | null
          date_depart?: string | null
          id?: string
          numero_vol: string
        }
        Update: {
          candidate_id?: string
          created_at?: string
          date_arrivee?: string | null
          date_depart?: string | null
          id?: string
          numero_vol?: string
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
          visa_type: Database["public"]["Enums"]["visa_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          nom: string
          required?: boolean
          visa_type: Database["public"]["Enums"]["visa_type"]
        }
        Update: {
          created_at?: string
          id?: string
          nom?: string
          required?: boolean
          visa_type?: Database["public"]["Enums"]["visa_type"]
        }
        Relationships: []
      }
      documents: {
        Row: {
          candidate_id: string
          document_type_id: string
          file_path: string | null
          filename: string | null
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["document_status"] | null
          upload_date: string
          validation_date: string | null
        }
        Insert: {
          candidate_id: string
          document_type_id: string
          file_path?: string | null
          filename?: string | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          upload_date?: string
          validation_date?: string | null
        }
        Update: {
          candidate_id?: string
          document_type_id?: string
          file_path?: string | null
          filename?: string | null
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          upload_date?: string
          validation_date?: string | null
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
        }
        Insert: {
          age: number
          created_at?: string
          id?: string
          nom: string
          permanent_residence_id: string
          prenom: string
        }
        Update: {
          age?: number
          created_at?: string
          id?: string
          nom?: string
          permanent_residence_id?: string
          prenom?: string
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
          details: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          candidate_id: string
          date?: string
          details?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          candidate_id?: string
          date?: string
          details?: string | null
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
      investment_progress: {
        Row: {
          checkpoint_status: Json
          created_at: string
          current_checkpoint: string
          id: string
          progress_percentage: number
          transaction_id: string
          updated_at: string
        }
        Insert: {
          checkpoint_status?: Json
          created_at?: string
          current_checkpoint?: string
          id?: string
          progress_percentage?: number
          transaction_id: string
          updated_at?: string
        }
        Update: {
          checkpoint_status?: Json
          created_at?: string
          current_checkpoint?: string
          id?: string
          progress_percentage?: number
          transaction_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investment_progress_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      investments: {
        Row: {
          amount: number
          created_at: string
          end_date: string | null
          id: string
          plan_id: number
          start_date: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id: number
          start_date?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          end_date?: string | null
          id?: string
          plan_id?: number
          start_date?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "investments_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
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
      plans: {
        Row: {
          created_at: string
          duration_days: number
          id: number
          name: string
          price: number
          return_rate: number
        }
        Insert: {
          created_at?: string
          duration_days: number
          id?: number
          name: string
          price: number
          return_rate: number
        }
        Update: {
          created_at?: string
          duration_days?: number
          id?: number
          name?: string
          price?: number
          return_rate?: number
        }
        Relationships: []
      }
      pointages: {
        Row: {
          date: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          date?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          date?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pointages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_custom"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string
          duree_jours: number
          id: string
          nom: string
          prix: number
          revenu_quotidien: number
        }
        Insert: {
          created_at?: string
          description: string
          duree_jours: number
          id?: string
          nom: string
          prix: number
          revenu_quotidien: number
        }
        Update: {
          created_at?: string
          description?: string
          duree_jours?: number
          id?: string
          nom?: string
          prix?: number
          revenu_quotidien?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          referral_code: string | null
          referrer_id: string | null
          updated_at: string
          username: string | null
          vip_level: string | null
          vip_status: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          referral_code?: string | null
          referrer_id?: string | null
          updated_at?: string
          username?: string | null
          vip_level?: string | null
          vip_status?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          referral_code?: string | null
          referrer_id?: string | null
          updated_at?: string
          username?: string | null
          vip_level?: string | null
          vip_status?: boolean | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          bonus: number | null
          created_at: string | null
          filleul_id: string
          id: string
          parrain_id: string
        }
        Insert: {
          bonus?: number | null
          created_at?: string | null
          filleul_id: string
          id?: string
          parrain_id: string
        }
        Update: {
          bonus?: number | null
          created_at?: string | null
          filleul_id?: string
          id?: string
          parrain_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_filleul_id_fkey"
            columns: ["filleul_id"]
            isOneToOne: false
            referencedRelation: "users_custom"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_parrain_id_fkey"
            columns: ["parrain_id"]
            isOneToOne: false
            referencedRelation: "users_custom"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          created_at: string
          date_traitement: string | null
          id: string
          montant: number
          numero_paiement: string | null
          operateur_paiement: string | null
          product_id: string | null
          statut: string
          transaction_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date_traitement?: string | null
          id?: string
          montant: number
          numero_paiement?: string | null
          operateur_paiement?: string | null
          product_id?: string | null
          statut?: string
          transaction_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          date_traitement?: string | null
          id?: string
          montant?: number
          numero_paiement?: string | null
          operateur_paiement?: string | null
          product_id?: string | null
          statut?: string
          transaction_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_product"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_custom"
            referencedColumns: ["id"]
          },
        ]
      }
      user_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          session_data: Json | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: string
          session_data?: Json | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          session_data?: Json | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users_custom"
            referencedColumns: ["id"]
          },
        ]
      }
      users_custom: {
        Row: {
          code_parrain: string | null
          created_at: string | null
          email: string | null
          id: string
          is_admin: boolean | null
          lien_parrain: string | null
          mot_de_passe: string
          nom: string
          numero_telephone: string
          parrain_code: string | null
          solde: number | null
        }
        Insert: {
          code_parrain?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_admin?: boolean | null
          lien_parrain?: string | null
          mot_de_passe: string
          nom: string
          numero_telephone: string
          parrain_code?: string | null
          solde?: number | null
        }
        Update: {
          code_parrain?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_admin?: boolean | null
          lien_parrain?: string | null
          mot_de_passe?: string
          nom?: string
          numero_telephone?: string
          parrain_code?: string | null
          solde?: number | null
        }
        Relationships: []
      }
      withdrawals: {
        Row: {
          amount: number
          created_at: string
          fee: number
          final_amount: number
          id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          fee: number
          final_amount: number
          id?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          fee?: number
          final_amount?: number
          id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_stats: {
        Row: {
          total_invested: number | null
          total_investments: number | null
          total_users: number | null
          total_withdrawn: number | null
        }
        Relationships: []
      }
      referral_stats: {
        Row: {
          active_referrals: number | null
          full_name: string | null
          referral_count: number | null
          total_commission: number | null
          user_id: string | null
        }
        Relationships: []
      }
      vip_user_info: {
        Row: {
          full_name: string | null
          id: string | null
          referral_count: number | null
          total_invested: number | null
          vip_level: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      approve_checkpoint: {
        Args: { progress_id: string; checkpoint: string }
        Returns: boolean
      }
      approve_investment_checkpoint: {
        Args: { user_id: string; checkpoint: string }
        Returns: boolean
      }
      authenticate_user: {
        Args: { phone_number: string; user_password: string }
        Returns: string
      }
      buy_product: {
        Args: { user_id: string; product_id: string }
        Returns: boolean
      }
      create_transaction: {
        Args: { user_id: string; transaction_type: string; amount: number }
        Returns: string
      }
      credit_user_balance: {
        Args: { user_id: string; amount: number }
        Returns: boolean
      }
      daily_checkin: {
        Args: { user_id: string }
        Returns: boolean
      }
      get_dashboard_totals: {
        Args: { user_id: string }
        Returns: Json
      }
      get_user_by_phone: {
        Args: { phone_number: string }
        Returns: {
          code_parrain: string | null
          created_at: string | null
          email: string | null
          id: string
          is_admin: boolean | null
          lien_parrain: string | null
          mot_de_passe: string
          nom: string
          numero_telephone: string
          parrain_code: string | null
          solde: number | null
        }[]
      }
      get_user_custom: {
        Args: { user_id: string }
        Returns: {
          code_parrain: string | null
          created_at: string | null
          email: string | null
          id: string
          is_admin: boolean | null
          lien_parrain: string | null
          mot_de_passe: string
          nom: string
          numero_telephone: string
          parrain_code: string | null
          solde: number | null
        }[]
      }
      get_user_referrals: {
        Args: { user_id: string }
        Returns: {
          id: string
          parrain_id: string
          filleul_id: string
          bonus: number
          date_creation: string
          filleul_details: Json
        }[]
      }
      get_user_transactions: {
        Args: { user_id: string }
        Returns: {
          created_at: string
          date_traitement: string | null
          id: string
          montant: number
          numero_paiement: string | null
          operateur_paiement: string | null
          product_id: string | null
          statut: string
          transaction_id: string | null
          type: string
          user_id: string
        }[]
      }
      get_users_with_investment_status: {
        Args: Record<PropertyKey, never>
        Returns: Json[]
      }
      register_user: {
        Args: {
          parrain_code: string
          phone_number: string
          user_nom: string
          user_password: string
        }
        Returns: string
      }
      set_user_balance: {
        Args: { user_id: string; new_balance: number }
        Returns: boolean
      }
      start_investment: {
        Args: { transaction_id: string }
        Returns: string
      }
      update_user_withdraw_code: {
        Args: { user_id: string; code: string }
        Returns: boolean
      }
    }
    Enums: {
      document_status: "uploaded" | "validated" | "rejected" | "pending"
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
      document_status: ["uploaded", "validated", "rejected", "pending"],
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
