import { apiClient } from '@/lib/api'
import { AuthResponse, LoginRequest, RegisterRequest, User } from '@/lib/types'
import Cookies from 'js-cookie'

export class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const formData = new FormData()
    formData.append('username', credentials.email)
    formData.append('password', credentials.password)

    const response = await apiClient.post<AuthResponse>('/api/v1/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    // Store token in cookie
    Cookies.set('access_token', response.access_token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return response
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth/register', userData)

    // Store token in cookie
    Cookies.set('access_token', response.access_token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })

    return response
  }

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/api/v1/users/me')
  }

  async testToken(): Promise<User> {
    return apiClient.post<User>('/api/v1/auth/test-token')
  }

  logout(): void {
    Cookies.remove('access_token')
  }

  isAuthenticated(): boolean {
    return !!Cookies.get('access_token')
  }

  getToken(): string | undefined {
    return Cookies.get('access_token')
  }
}

export const authService = new AuthService()