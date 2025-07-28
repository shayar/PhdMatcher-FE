import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { authService } from '@/services/authService'
import { render } from '@/__tests__/utils/testUtils'

jest.mock('@/services/authService')

const mockAuthService = authService as jest.Mocked<typeof authService>

describe('RegisterForm', () => {
  const mockOnSuccess = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders register form correctly', () => {
    render(<RegisterForm onSuccess={mockOnSuccess} />)
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('validates password confirmation', async () => {
    const user = userEvent.setup()
    render(<RegisterForm onSuccess={mockOnSuccess} />)
    
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i)
    const submitButton = screen.getByRole('button', { name: /create account/i })
    
    await user.type(passwordInput, 'password123')
    await user.type(confirmPasswordInput, 'differentpassword')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/passwords don't match/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    mockAuthService.register.mockResolvedValue({
      access_token: 'test-token',
      token_type: 'bearer',
    })
    mockAuthService.getCurrentUser.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      full_name: 'Test User',
      is_active: true,
    })

    render(<RegisterForm onSuccess={mockOnSuccess} />)
    
    await user.type(screen.getByLabelText(/full name/i), 'Test User')
    await user.type(screen.getByLabelText(/^email$/i), 'test@example.com')
    await user.type(screen.getByLabelText(/^password$/i), 'password123')
    await user.type(screen.getByLabelText(/confirm password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /create account/i }))
    
    await waitFor(() => {
      expect(mockAuthService.register).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        full_name: 'Test User',
      })
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })
})
