'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { SearchFilters as SearchFiltersType, SearchQuery } from '@/lib/types'
import { Search, Filter } from 'lucide-react'

interface SearchFormProps {
  onSearch: (query: SearchQuery) => void
  isLoading?: boolean
}

export function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFiltersType>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({
      query: query.trim() || undefined,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
      limit: 50,
      offset: 0,
    })
  }

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined,
    }))
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Main Search */}
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search professors by research area, university, or name..."
                className="pl-10"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Search'
              )}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    University
                  </label>
                  <Input
                    value={filters.university || ''}
                    onChange={(e) => handleFilterChange('university', e.target.value)}
                    placeholder="e.g., Stanford University"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <Input
                    value={filters.country || ''}
                    onChange={(e) => handleFilterChange('country', e.target.value)}
                    placeholder="e.g., United States"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <Input
                    value={filters.city || ''}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    placeholder="e.g., Palo Alto"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Publications
                  </label>
                  <Input
                    type="number"
                    value={filters.min_works_count || ''}
                    onChange={(e) => handleFilterChange('min_works_count', parseInt(e.target.value) || undefined)}
                    placeholder="e.g., 10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Citations
                  </label>
                  <Input
                    type="number"
                    value={filters.min_citations || ''}
                    onChange={(e) => handleFilterChange('min_citations', parseInt(e.target.value) || undefined)}
                    placeholder="e.g., 100"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFilters({})
                    setQuery('')
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}