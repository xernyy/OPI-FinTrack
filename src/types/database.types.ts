export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          details: Json | null
          log_id: string
          timestamp: string
          user_id: string | null
        }
        Insert: {
          action: string
          details?: Json | null
          log_id?: string
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          details?: Json | null
          log_id?: string
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      budget_details: {
        Row: {
          allocated_amount: number | null
          budget_id: string | null
          change_order_impact: string | null
          description: string | null
          detail_id: string
          project_id: string | null
          section_name: string | null
        }
        Insert: {
          allocated_amount?: number | null
          budget_id?: string | null
          change_order_impact?: string | null
          description?: string | null
          detail_id?: string
          project_id?: string | null
          section_name?: string | null
        }
        Update: {
          allocated_amount?: number | null
          budget_id?: string | null
          change_order_impact?: string | null
          description?: string | null
          detail_id?: string
          project_id?: string | null
          section_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_details_budget_id_fkey"
            columns: ["budget_id"]
            referencedRelation: "budgets"
            referencedColumns: ["budget_id"]
          },
          {
            foreignKeyName: "budget_details_change_order_impact_fkey"
            columns: ["change_order_impact"]
            referencedRelation: "change_orders"
            referencedColumns: ["change_order_id"]
          },
          {
            foreignKeyName: "budget_details_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          }
        ]
      }
      budgets: {
        Row: {
          budget_id: string
          date_of_revision: string | null
          initial_budget: number | null
          project_id: string | null
          revised_budget: number | null
        }
        Insert: {
          budget_id?: string
          date_of_revision?: string | null
          initial_budget?: number | null
          project_id?: string | null
          revised_budget?: number | null
        }
        Update: {
          budget_id?: string
          date_of_revision?: string | null
          initial_budget?: number | null
          project_id?: string | null
          revised_budget?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "budgets_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          }
        ]
      }
      change_orders: {
        Row: {
          additional_cost: number | null
          approved_by: string | null
          budget_id: string | null
          change_order_id: string
          date: string | null
          description: string | null
          project_id: string | null
          status: string | null
        }
        Insert: {
          additional_cost?: number | null
          approved_by?: string | null
          budget_id?: string | null
          change_order_id?: string
          date?: string | null
          description?: string | null
          project_id?: string | null
          status?: string | null
        }
        Update: {
          additional_cost?: number | null
          approved_by?: string | null
          budget_id?: string | null
          change_order_id?: string
          date?: string | null
          description?: string | null
          project_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "change_orders_budget_id_fkey"
            columns: ["budget_id"]
            referencedRelation: "budgets"
            referencedColumns: ["budget_id"]
          },
          {
            foreignKeyName: "change_orders_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          }
        ]
      }
      clients: {
        Row: {
          address: string | null
          client_id: string
          company_id: string | null
          contact_info: string | null
          name: string
        }
        Insert: {
          address?: string | null
          client_id?: string
          company_id?: string | null
          contact_info?: string | null
          name: string
        }
        Update: {
          address?: string | null
          client_id?: string
          company_id?: string | null
          contact_info?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          }
        ]
      }
      companies: {
        Row: {
          address: string | null
          company_id: string
          credentials: string | null
          industry: string | null
          name: string
          size: number | null
        }
        Insert: {
          address?: string | null
          company_id?: string
          credentials?: string | null
          industry?: string | null
          name: string
          size?: number | null
        }
        Update: {
          address?: string | null
          company_id?: string
          credentials?: string | null
          industry?: string | null
          name?: string
          size?: number | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          company_id: string | null
          country: string | null
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          phone: string | null
        }
        Insert: {
          company_id?: string | null
          country?: string | null
          first_name?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          phone?: string | null
        }
        Update: {
          company_id?: string | null
          country?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profile_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          client_id: string | null
          company_id: string | null
          description: string | null
          end_date: string | null
          name: string
          project_id: string
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          company_id?: string | null
          description?: string | null
          end_date?: string | null
          name: string
          project_id?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          company_id?: string | null
          description?: string | null
          end_date?: string | null
          name?: string
          project_id?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            referencedRelation: "clients"
            referencedColumns: ["client_id"]
          },
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          }
        ]
      }
      reports: {
        Row: {
          content: Json | null
          created_by: string | null
          date_created: string
          project_id: string | null
          report_id: string
          type: string
        }
        Insert: {
          content?: Json | null
          created_by?: string | null
          date_created: string
          project_id?: string | null
          report_id?: string
          type: string
        }
        Update: {
          content?: Json | null
          created_by?: string | null
          date_created?: string
          project_id?: string | null
          report_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          }
        ]
      }
      subcontractors: {
        Row: {
          company_id: string | null
          details: string | null
          name: string
          subcontractor_id: string
        }
        Insert: {
          company_id?: string | null
          details?: string | null
          name: string
          subcontractor_id?: string
        }
        Update: {
          company_id?: string | null
          details?: string | null
          name?: string
          subcontractor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcontractors_company_id_fkey"
            columns: ["company_id"]
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          }
        ]
      }
      transactions: {
        Row: {
          amount: number | null
          categories: string | null
          client_id: string | null
          date: string | null
          description: string | null
          invoice_number: string | null
          project_id: string
          status: string | null
          subcontractor_id: string | null
          transaction_id: number
          transaction_type: string | null
        }
        Insert: {
          amount?: number | null
          categories?: string | null
          client_id?: string | null
          date?: string | null
          description?: string | null
          invoice_number?: string | null
          project_id: string
          status?: string | null
          subcontractor_id?: string | null
          transaction_id?: number
          transaction_type?: string | null
        }
        Update: {
          amount?: number | null
          categories?: string | null
          client_id?: string | null
          date?: string | null
          description?: string | null
          invoice_number?: string | null
          project_id?: string
          status?: string | null
          subcontractor_id?: string | null
          transaction_id?: number
          transaction_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "transactions_subcontractor_id_fkey"
            columns: ["subcontractor_id"]
            referencedRelation: "subcontractors"
            referencedColumns: ["subcontractor_id"]
          }
        ]
      }
    }
    Views: {
      expense_transactions: {
        Row: {
          amount: number | null
          client_id: string | null
          date: string | null
          description: string | null
          project_id: string | null
          status: string | null
          subcontractor_id: string | null
          transaction_id: number | null
          transaction_type: string | null
        }
        Insert: {
          amount?: number | null
          client_id?: string | null
          date?: string | null
          description?: string | null
          project_id?: string | null
          status?: string | null
          subcontractor_id?: string | null
          transaction_id?: number | null
          transaction_type?: string | null
        }
        Update: {
          amount?: number | null
          client_id?: string | null
          date?: string | null
          description?: string | null
          project_id?: string | null
          status?: string | null
          subcontractor_id?: string | null
          transaction_id?: number | null
          transaction_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "transactions_subcontractor_id_fkey"
            columns: ["subcontractor_id"]
            referencedRelation: "subcontractors"
            referencedColumns: ["subcontractor_id"]
          }
        ]
      }
      revenue_transactions: {
        Row: {
          amount: number | null
          client_id: string | null
          date: string | null
          description: string | null
          project_id: string | null
          status: string | null
          subcontractor_id: string | null
          transaction_id: number | null
          transaction_type: string | null
        }
        Insert: {
          amount?: number | null
          client_id?: string | null
          date?: string | null
          description?: string | null
          project_id?: string | null
          status?: string | null
          subcontractor_id?: string | null
          transaction_id?: number | null
          transaction_type?: string | null
        }
        Update: {
          amount?: number | null
          client_id?: string | null
          date?: string | null
          description?: string | null
          project_id?: string | null
          status?: string | null
          subcontractor_id?: string | null
          transaction_id?: number | null
          transaction_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "transactions_subcontractor_id_fkey"
            columns: ["subcontractor_id"]
            referencedRelation: "subcontractors"
            referencedColumns: ["subcontractor_id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

