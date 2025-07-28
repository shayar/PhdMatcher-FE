'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { Card } from '@/components/ui/card'
import { Brain } from 'lucide-react'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegisterSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <Card className="p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Brain className="h-8 w-8 text-primary-600" />
          <span className="text-2xl font-bold text-gray-900">
            PhD Advisor Match
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Get Started</h1>
        <p className="text-gray-600">Create your account to find your perfect PhD advisor</p>
      </div>

      <RegisterForm onSuccess={handleRegisterSuccess} />

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            href="/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Card>
  )
}