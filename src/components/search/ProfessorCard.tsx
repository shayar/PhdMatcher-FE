'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Professor } from '@/lib/types'
import { formatNumber } from '@/lib/utils'
import { 
  MapPin, 
  BookOpen, 
  Quote, 
  ExternalLink, 
  User,
  TrendingUp 
} from 'lucide-react'

interface ProfessorCardProps {
  professor: Professor
  showMatchScore?: boolean
}

export function ProfessorCard({ professor, showMatchScore }: ProfessorCardProps) {
  const matchPercentage = professor.match_score 
    ? Math.round(professor.match_score * 100) 
    : null

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {professor.display_name || professor.name}
                </h3>
                {professor.institution_name && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{professor.institution_name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showMatchScore && matchPercentage && (
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {matchPercentage}%
              </div>
              <div className="text-xs text-gray-500">Match</div>
            </div>
          )}
        </div>

        {/* Research Areas */}
        {professor.concepts && professor.concepts.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {professor.concepts.slice(0, 4).map((concept, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded-full"
                >
                  {concept.display_name}
                </span>
              ))}
              {professor.concepts.length > 4 && (
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                  +{professor.concepts.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Research Summary */}
        {professor.research_summary && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 line-clamp-2">
              {professor.research_summary}
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {formatNumber(professor.works_count)}
            </div>
            <div className="text-xs text-gray-600 flex items-center justify-center">
              <BookOpen className="h-3 w-3 mr-1" />
              Publications
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {formatNumber(professor.cited_by_count)}
            </div>
            <div className="text-xs text-gray-600 flex items-center justify-center">
              <Quote className="h-3 w-3 mr-1" />
              Citations
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {professor.h_index}
            </div>
            <div className="text-xs text-gray-600 flex items-center justify-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              H-Index
            </div>
          </div>
        </div>

        {/* Match Explanation */}
        {professor.match_explanation && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">Why this match?</h4>
            {professor.match_explanation.matching_concepts.length > 0 && (
              <div className="mb-2">
                <span className="text-xs text-blue-700">Common research areas: </span>
                <span className="text-xs text-blue-600">
                  {professor.match_explanation.matching_concepts.join(', ')}
                </span>
              </div>
            )}
            {professor.match_explanation.common_keywords.length > 0 && (
              <div>
                <span className="text-xs text-blue-700">Shared keywords: </span>
                <span className="text-xs text-blue-600">
                  {professor.match_explanation.common_keywords.slice(0, 5).join(', ')}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {professor.homepage_url && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(professor.homepage_url, '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Website
              </Button>
            )}
            {professor.orcid && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.open(`https://orcid.org/${professor.orcid}`, '_blank')}
              >
                ORCID
              </Button>
            )}
          </div>
          <Link href={`/dashboard/professors/${professor.openalex_id}`}>
            <Button size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}