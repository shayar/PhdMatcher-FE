export interface User {
  id: number
  email: string
  full_name?: string
  is_active: boolean
  education_level?: string
  field_of_study?: string
  research_interests?: string[]
  preferred_locations?: string[]
  target_universities?: string[]
  resume_file_path?: string
  created_at?: string
  updated_at?: string
}

export interface Professor {
  openalex_id: string
  name: string
  display_name?: string
  institution_id?: string
  institution_name?: string
  works_count: number
  cited_by_count: number
  h_index: number
  i10_index: number
  concepts?: ConceptScore[]
  research_summary?: string
  orcid?: string
  homepage_url?: string
  match_score?: number
  match_explanation?: MatchExplanation
}

export interface ConceptScore {
  id: string
  display_name: string
  level: number
  score: number
}

export interface MatchExplanation {
  similarity_score: number
  matching_concepts: string[]
  common_keywords: string[]
}

export interface Institution {
  openalex_id: string
  name: string
  display_name?: string
  country_code?: string
  country?: string
  city?: string
  type?: string
  homepage_url?: string
  works_count: number
}

export interface SearchFilters {
  university?: string
  country?: string
  city?: string
  concepts?: string[]
  min_works_count?: number
  min_citations?: number
}

export interface SearchQuery {
  query?: string
  filters?: SearchFilters
  limit?: number
  offset?: number
}

export interface SearchResult {
  professors: Professor[]
  total_count: number
  query_time_ms: number
}

export interface MatchResult {
  user_id: number
  matches: Professor[]
  total_matches: number
  processing_time_ms: number
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  full_name: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}
