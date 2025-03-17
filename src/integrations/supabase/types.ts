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
          email: string | null
          id: string
          lieu_naissance: string
          nationalite: string
          nom: string
          notes: string | null
          numero_passport: string
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
          email?: string | null
          id?: string
          lieu_naissance: string
          nationalite: string
          nom: string
          notes?: string | null
          numero_passport: string
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
          email?: string | null
          id?: string
          lieu_naissance?: string
          nationalite?: string
          nom?: string
          notes?: string | null
          numero_passport?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
