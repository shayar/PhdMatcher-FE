import { apiClient } from '@/lib/api'
import { User } from '@/lib/types'

export class UserService {
  async updateProfile(userData: Partial<User>): Promise<User> {
    return apiClient.put<User>('/api/v1/users/me', userData)
  }

  async uploadResume(file: File, onProgress?: (progress: number) => void): Promise<any> {
    return apiClient.uploadFile('/api/v1/users/upload-resume', file, onProgress)
  }
}

export const userService = new UserService()