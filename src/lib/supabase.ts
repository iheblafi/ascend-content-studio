import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database types
export interface Profile {
  id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: 'free' | 'pro' | 'enterprise'
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
  current_period_start: string | null
  current_period_end: string | null
  stripe_subscription_id: string | null
  stripe_customer_id: string | null
  created_at: string
  updated_at: string
}

export interface ContentEntry {
  id: string
  user_id: string
  title: string
  content_type: string
  content: string | null
  ai_optimization_score: number | null
  status: string
  created_at: string
  updated_at: string
}

// Analysis result interface for storing analysis data
export interface AnalysisResult {
  overall_score: number | null
  seo_score: number | null
  readability_score: number | null
  engagement_score: number | null
  keyword_density: any | null
  extracted_keywords: string[] | null
  sentiment_score: number | null
  sentiment_label: 'positive' | 'negative' | 'neutral' | null
  tone_analysis: any | null
  semantic_topics: string[] | null
  content_categories: string[] | null
  suggestions: any | null
}

