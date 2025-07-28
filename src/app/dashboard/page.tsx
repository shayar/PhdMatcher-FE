'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useMatchingService } from '@/services/matchingService'
import { Search, Users, TrendingUp, Upload } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useAuth()
  const { getMyMatches } = useMatchingService()
  const [stats, setStats] = useState({
    totalMatches: 0,
    newMatches: 0,
    profileComplete: 0,
  })

  useEffect(() => {
    // Load dashboard data
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const matches = await getMyMatches()
      setStats({
        totalMatches: matches.total_matches,
        newMatches: matches.matches.filter(m => m.match_score > 0.8).length,
        profileComplete: calculateProfileCompleteness(),
      })
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    }
  }

  const calculateProfileCompleteness = () => {
    if (!user) return 0
    let score = 0
    if (user.full_name) score += 20
    if (user.email) score += 20
    if (user.field_of_study) score += 20
    if (user.research_interests?.length) score += 20
    if (user.resume_file_path) score += 20
    return score
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.full_name || 'Student'}!
        </h1>
        <p className="text-gray-600">
          Here's your academic matching dashboard. Ready to find your perfect PhD advisor?
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.totalMatches}</p>
              <p className="text-gray-600">Total Matches</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.newMatches}</p>
              <p className="text-gray-600">High Matches</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <Upload className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.profileComplete}%</p>
              <p className="text-gray-600">Profile Complete</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link href="/dashboard/search">
              <Button className="w-full justify-start" variant="outline">
                <Search className="mr-2 h-4 w-4" />
                Search Professors
              </Button>
            </Link>
            <Link href="/dashboard/matches">
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View My Matches
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button className="w-full justify-start" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Profile Completion
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Overall Progress</span>
              <span className="text-sm font-medium">{stats.profileComplete}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.profileComplete}%` }}
              ></div>
            </div>
            {stats.profileComplete < 100 && (
              <p className="text-sm text-gray-600">
                Complete your profile to get better matches!
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}