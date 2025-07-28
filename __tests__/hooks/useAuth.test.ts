import { renderHook, act } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import { authService } from '@/services/authService'

jest.mock('@/services/authService')

const mockAuthService = authService as jest.Mocked<typeof authService>

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with loading state', () => {
    mockAuthService.isAuthenticated.mockReturnValue(false)
    
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.isLoading).toBe(true)
    expect(result.current.user).toBe(null)
  })

  it('should login user successfully', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      full_name: 'Test User',
      is_active: true,
    }
    
    mockAuthService.login.mockResolvedValue({
      access_token: 'test-token',
      token_type: 'bearer',
    })
    mockAuthService.getCurrentUser.mockResolvedValue(mockUser)
    
    const { result } = renderHook(() => useAuth())
    
    await act(async () => {
      await result.current.login('test@example.com', 'password123')
    })
    
    expect(result.current.user).toEqual(mockUser)
    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    })
  })

  it('should logout user', async () => {
    const { result } = renderHook(() => useAuth())
    
    await act(async () => {
      await result.current.logout()
    })
    
    expect(result.current.user).toBe(null)
    expect(mockAuthService.logout).toHaveBeenCalled()
  })
})