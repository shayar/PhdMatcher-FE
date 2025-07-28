import { authService } from '@/services/authService'
import { apiClient } from '@/lib/api'
import Cookies from 'js-cookie'

jest.mock('@/lib/api')
jest.mock('js-cookie')

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>
const mockCookies = Cookies as jest.Mocked<typeof Cookies>

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('login', () => {
    it('should login user and store token', async () => {
      const mockResponse = {
        access_token: 'test-token',
        token_type: 'bearer',
      }
      
      mockApiClient.post.mockResolvedValue(mockResponse)
      
      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      })
      
      expect(mockApiClient.post).toHaveBeenCalledWith(
        '/api/v1/auth/login',
        expect.any(FormData),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      
      expect(mockCookies.set).toHaveBeenCalledWith(
        'access_token',
        'test-token',
        {
          expires: 7,
          secure: false,
          sameSite: 'strict',
        }
      )
      
      expect(result).toEqual(mockResponse)
    })
  })

  describe('register', () => {
    it('should register user and store token', async () => {
      const mockResponse = {
        access_token: 'test-token',
        token_type: 'bearer',
      }
      
      mockApiClient.post.mockResolvedValue(mockResponse)
      
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        full_name: 'Test User',
      }
      
      const result = await authService.register(userData)
      
      expect(mockApiClient.post).toHaveBeenCalledWith('/api/v1/auth/register', userData)
      expect(mockCookies.set).toHaveBeenCalledWith(
        'access_token',
        'test-token',
        expect.any(Object)
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getCurrentUser', () => {
    it('should get current user data', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        full_name: 'Test User',
        is_active: true,
      }
      
      mockApiClient.get.mockResolvedValue(mockUser)
      
      const result = await authService.getCurrentUser()
      
      expect(mockApiClient.get).toHaveBeenCalledWith('/api/v1/users/me')
      expect(result).toEqual(mockUser)
    })
  })

  describe('logout', () => {
    it('should remove token from cookies', () => {
      authService.logout()
      expect(mockCookies.remove).toHaveBeenCalledWith('access_token')
    })
  })

  describe('isAuthenticated', () => {
    it('should return true if token exists', () => {
      mockCookies.get.mockReturnValue('test-token')
      expect(authService.isAuthenticated()).toBe(true)
    })

    it('should return false if token does not exist', () => {
      mockCookies.get.mockReturnValue(undefined)
      expect(authService.isAuthenticated()).toBe(false)
    })
  })
})