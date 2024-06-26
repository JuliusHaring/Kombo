export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      combination_element_constraints: {
        Row: {
          dance_id: number;
          element_1: number;
          element_2: number;
          id: number;
          is_positive: boolean;
          user_id: string | null;
        };
        Insert: {
          dance_id: number;
          element_1: number;
          element_2: number;
          id?: number;
          is_positive: boolean;
          user_id?: string | null;
        };
        Update: {
          dance_id?: number;
          element_1?: number;
          element_2?: number;
          id?: number;
          is_positive?: boolean;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'combination_element_constraints_dance_id_fkey';
            columns: ['dance_id'];
            isOneToOne: false;
            referencedRelation: 'dances';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'combination_element_constraints_element_1_fkey';
            columns: ['element_1'];
            isOneToOne: false;
            referencedRelation: 'combination_elements';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'combination_element_constraints_element_2_fkey';
            columns: ['element_2'];
            isOneToOne: false;
            referencedRelation: 'combination_elements';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'combination_element_constraints_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      combination_elements: {
        Row: {
          dance_id: number;
          difficulty: number | null;
          id: number;
          name: string;
          redancability: number | null;
          type: string;
          user_id: string | null;
        };
        Insert: {
          dance_id: number;
          difficulty?: number | null;
          id?: number;
          name: string;
          redancability?: number | null;
          type: string;
          user_id?: string | null;
        };
        Update: {
          dance_id?: number;
          difficulty?: number | null;
          id?: number;
          name?: string;
          redancability?: number | null;
          type?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'combination_elements_dance_id_fkey';
            columns: ['dance_id'];
            isOneToOne: false;
            referencedRelation: 'dances';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'combination_elements_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      dances: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;
