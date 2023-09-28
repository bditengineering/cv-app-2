export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          created_at: string;
          created_by: string;
          id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          created_by?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admins_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "admins_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      certifications: {
        Row: {
          certificate_name: string | null;
          created_at: string | null;
          cv_id: string | null;
          description: string;
          id: string;
        };
        Insert: {
          certificate_name?: string | null;
          created_at?: string | null;
          cv_id?: string | null;
          description: string;
          id?: string;
        };
        Update: {
          certificate_name?: string | null;
          created_at?: string | null;
          cv_id?: string | null;
          description?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "certifications_cv_id_fkey";
            columns: ["cv_id"];
            referencedRelation: "cv";
            referencedColumns: ["id"];
          }
        ];
      };
      cv: {
        Row: {
          created_at: string | null;
          created_by: string;
          english_spoken_level: string | null;
          english_written_level: string | null;
          first_name: string;
          id: string;
          is_certified: boolean | null;
          last_name: string;
          personal_qualities: string[] | null;
          summary: string | null;
          title_id: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string;
          english_spoken_level?: string | null;
          english_written_level?: string | null;
          first_name: string;
          id?: string;
          is_certified?: boolean | null;
          last_name: string;
          personal_qualities?: string[] | null;
          summary?: string | null;
          title_id: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string;
          english_spoken_level?: string | null;
          english_written_level?: string | null;
          first_name?: string;
          id?: string;
          is_certified?: boolean | null;
          last_name?: string;
          personal_qualities?: string[] | null;
          summary?: string | null;
          title_id?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cv_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cv_title_id_fkey";
            columns: ["title_id"];
            referencedRelation: "titles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cv_updated_by_fkey";
            columns: ["updated_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      cv_skill: {
        Row: {
          cv_id: string;
          id: string;
          skill_id: string;
        };
        Insert: {
          cv_id: string;
          id?: string;
          skill_id: string;
        };
        Update: {
          cv_id?: string;
          id?: string;
          skill_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cv_skill_cv_id_fkey";
            columns: ["cv_id"];
            referencedRelation: "cv";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cv_skill_skill_id_fkey";
            columns: ["skill_id"];
            referencedRelation: "skill";
            referencedColumns: ["id"];
          }
        ];
      };
      educations: {
        Row: {
          created_at: string | null;
          cv_id: string | null;
          degree: string | null;
          end_year: number | null;
          id: string;
          start_year: number | null;
          university_name: string | null;
        };
        Insert: {
          created_at?: string | null;
          cv_id?: string | null;
          degree?: string | null;
          end_year?: number | null;
          id?: string;
          start_year?: number | null;
          university_name?: string | null;
        };
        Update: {
          created_at?: string | null;
          cv_id?: string | null;
          degree?: string | null;
          end_year?: number | null;
          id?: string;
          start_year?: number | null;
          university_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "educations_cv_id_fkey";
            columns: ["cv_id"];
            referencedRelation: "cv";
            referencedColumns: ["id"];
          }
        ];
      };
      projects: {
        Row: {
          created_at: string | null;
          cv_id: string | null;
          date_end: string | null;
          date_start: string | null;
          description: string | null;
          field: string | null;
          id: string;
          name: string;
          ongoing: boolean;
          position: string | null;
          responsibilities: string[] | null;
          team_size: number | null;
          technologies: string[] | null;
        };
        Insert: {
          created_at?: string | null;
          cv_id?: string | null;
          date_end?: string | null;
          date_start?: string | null;
          description?: string | null;
          field?: string | null;
          id?: string;
          name: string;
          ongoing?: boolean;
          position?: string | null;
          responsibilities?: string[] | null;
          team_size?: number | null;
          technologies?: string[] | null;
        };
        Update: {
          created_at?: string | null;
          cv_id?: string | null;
          date_end?: string | null;
          date_start?: string | null;
          description?: string | null;
          field?: string | null;
          id?: string;
          name?: string;
          ongoing?: boolean;
          position?: string | null;
          responsibilities?: string[] | null;
          team_size?: number | null;
          technologies?: string[] | null;
        };
        Relationships: [
          {
            foreignKeyName: "projects_cv_id_fkey";
            columns: ["cv_id"];
            referencedRelation: "cv";
            referencedColumns: ["id"];
          }
        ];
      };
      skill: {
        Row: {
          id: string;
          name: string;
          skill_group_id: string;
        };
        Insert: {
          id?: string;
          name: string;
          skill_group_id: string;
        };
        Update: {
          id?: string;
          name?: string;
          skill_group_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "skill_skill_group_id_fkey";
            columns: ["skill_group_id"];
            referencedRelation: "skill_group";
            referencedColumns: ["id"];
          }
        ];
      };
      skill_group: {
        Row: {
          id: string;
          name: string | null;
          order: number;
        };
        Insert: {
          id?: string;
          name?: string | null;
          order: number;
        };
        Update: {
          id?: string;
          name?: string | null;
          order?: number;
        };
        Relationships: [];
      };
      titles: {
        Row: {
          created_at: string;
          created_by: string;
          id: string;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          created_by: string;
          id?: string;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          created_by?: string;
          id?: string;
          name?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "titles_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          email: string | null;
          id: string;
        };
        Insert: {
          email?: string | null;
          id: string;
        };
        Update: {
          email?: string | null;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
