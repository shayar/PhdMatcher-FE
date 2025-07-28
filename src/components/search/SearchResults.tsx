'use client'

import { useState } from 'react'
import { SearchResult, Professor } from '@/lib/types'
import { ProfessorCard } from './ProfessorCard'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Button } from '@/components/ui/button'
import { AlertCircle, Search } from 'lucide-react'

interface SearchResultsProps {
  results: SearchResult | null
  isLoading: boolean
  error: string | null
  onLoadMore?: () => void
  hasMore?: boolean
}

export function SearchResults({ 
  results, 
  isLoading, 
  error, 
  onLoadMore, 
  hasMore 
}: SearchResultsProps) {
  if (isLoading && !results) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Searching professors...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-error-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Search Error</h3>
        <p className="text-gray-600 mb-4">{error}</p>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Your Search</h3>
        <p className="text-gray-600">
          Enter a search query or use filters to find professors that match your interests.
        </p>
      </div>
    )
  }

  if (results.professors.length === 0) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your search query or filters to find more professors.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Search Results
          </h2>
          <p className="text-sm text-gray-600">
            Found {results.total_count} professors 
            {results.query_time_ms && (
              <span> in {Math.round(results.query_time_ms)}ms</span>
            )}
          </p>
        </div>
      </div>

      {/* Professor Cards */}
      <div className="grid gap-6">
        {results.professors.map((professor) => (
          <ProfessorCard
            key={professor.openalex_id}
            professor={professor}
            showMatchScore={!!professor.match_score}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center pt-6">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Loading more...
              </>
            ) : (
              'Load More Results'
            )}
          </Button>
        </div>
      )}
    </div>
  )
}