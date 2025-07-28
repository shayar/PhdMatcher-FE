import { apiClient } from '@/lib/api'
import { SearchQuery, SearchResult, Professor } from '@/lib/types'

export class SearchService {
  async searchProfessors(query: SearchQuery): Promise<SearchResult> {
    return apiClient.post<SearchResult>('/api/v1/search/', query)
  }

  async getProfessor(professorId: string): Promise<Professor> {
    return apiClient.get<Professor>(`/api/v1/professors/${professorId}`)
  }

  async getProfessors(params?: {
    skip?: number
    limit?: number
    university?: string
    country?: string
    min_works?: number
  }): Promise<Professor[]> {
    const searchParams = new URLSearchParams()
    if (params?.skip) searchParams.append('skip', params.skip.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.university) searchParams.append('university', params.university)
    if (params?.country) searchParams.append('country', params.country)
    if (params?.min_works) searchParams.append('min_works', params.min_works.toString())

    return apiClient.get<Professor[]>(`/api/v1/professors/?${searchParams.toString()}`)
  }
}

export const searchService = new SearchService()