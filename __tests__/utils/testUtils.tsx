import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { AuthProvider } from '@/hooks/useAuth'

// Mock user data
export const mockUser = {
  id: 1,
  email: 'test@example.com',
  full_name: 'Test User',
  is_active: true,
  education_level: "Master's",
  field_of_study: 'Computer Science',
  research_interests: ['machine learning', 'artificial intelligence'],
  preferred_locations: ['California', 'New York'],
  target_universities: ['Stanford', 'MIT'],
}

// Mock professor data
export const mockProfessor = {
  openalex_id: 'A123456789',
  name: 'Dr. Jane Smith',
  display_name: 'Dr. Jane Smith',
  institution_id: 'I987654321',
  institution_name: 'Stanford University',
  works_count: 150,
  cited_by_count: 5000,
  h_index: 45,
  i10_index: 120,
  concepts: [
    { id: 'C1', display_name: 'Machine Learning', level: 1, score: 0.9 },
    { id: 'C2', display_name: 'Artificial Intelligence', level: 1, score: 0.8 },
  ],
  research_summary: 'Leading researcher in machine learning and AI applications.',
  match_score: 0.85,
}

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }