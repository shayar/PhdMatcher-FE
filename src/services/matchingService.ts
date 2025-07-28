import { apiClient } from '@/lib/api'
import { MatchResult, SearchFilters } from '@/lib/types'

export class MatchingService {
  async findMatches(params?: {
    user_id?: number
    filters?: SearchFilters
    top_k?: number
  }): Promise<MatchResult> {
    return apiClient.post<MatchResult>('/api/v1/matching/', params)
  }

  async getMyMatches(topK: number = 50): Promise<MatchResult> {
    return apiClient.get<MatchResult>(`/api/v1/matching/me?top_k=${topK}`)
  }
}

export const matchingService = new MatchingService()