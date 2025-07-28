# PhD Advisor Matching Platform - Frontend

Modern, responsive React application built with Next.js 14, providing an intuitive interface for students to find and match with potential PhD advisors using AI-powered recommendations.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Authentication**: Secure JWT-based authentication with protected routes
- **Profile Management**: Comprehensive user profiles with resume upload
- **Smart Search**: Advanced search with filters and natural language queries
- **AI Matching**: Visual display of AI-powered professor matches with explanations
- **Real-time Updates**: Live search results and dynamic filtering
- **Mobile Responsive**: Optimized for all device sizes
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Performance**: Optimized with Next.js 14 App Router and image optimization

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Custom Hooks
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with interceptors
- **Testing**: Jest + React Testing Library
- **File Upload**: React Dropzone
- **Icons**: Lucide React
- **Build Tool**: Webpack (via Next.js)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see backend README)

## 🔧 Installation

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/shayar/PHDMatcher-FE.git
   cd PHDMatcher-FE
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - With Nginx: http://localhost:80

### Manual Installation

1. **Clone and install dependencies**
   ```bash
   git clone https://github.com/shayar/PHDMatcher-FE.git
   cd PHDMatcher-FE
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API URL
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Configuration

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# App Configuration
NEXT_PUBLIC_APP_NAME=PhD Advisor Matching Platform
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional: Analytics, etc.
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run format       # Format code with Prettier
npm run format:check # Check code formatting

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## 📱 Key Features

### Authentication System
- Secure JWT-based authentication
- Password strength validation
- Protected routes with automatic redirects
- Persistent login state

### User Profile Management
- Comprehensive profile forms with validation
- Research interests and preferences
- Resume upload with drag-and-drop
- Profile completion tracking

### Advanced Search
- Natural language search queries
- Multiple filter options (location, university, research area)
- Real-time search results
- Infinite scroll pagination

### AI-Powered Matching
- Visual match scores and explanations
- Research area overlap highlighting
- Publication and citation metrics
- Direct links to professor profiles

### Responsive Design
- Mobile-first responsive design
- Touch-friendly interface
- Optimized for tablets and desktop
- Cross-browser compatibility

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Protected dashboard pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── auth/             # Authentication components
│   ├── profile/          # Profile management
│   ├── search/           # Search functionality
│   ├── matching/         # Matching results
│   └── layout/           # Layout components
├── lib/                  # Utilities and configurations
│   ├── api.ts           # API client
│   ├── types.ts         # TypeScript definitions
│   └── utils.ts         # Helper functions
├── services/             # API service layers
├── hooks/                # Custom React hooks
└── styles/               # Additional stylesheets
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

```
__tests__/
├── components/           # Component tests
│   ├── auth/            # Authentication component tests
│   ├── ui/              # UI component tests
│   └── profile/         # Profile component tests
├── services/            # Service layer tests
├── hooks/               # Custom hook tests
├── utils/               # Utility function tests
└── setup.ts             # Test configuration
```

### Writing Tests

```typescript
// Example component test
import { render, screen } from '@/__tests__/utils/testUtils'
import { LoginForm } from '@/components/auth/LoginForm'

describe('LoginForm', () => {
  it('renders login form correctly', () => {
    render(<LoginForm onSuccess={jest.fn()} />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })
})
```

## 🎨 Styling Guide

### Tailwind CSS Usage

The project uses Tailwind CSS with a custom design system:

```typescript
// Color palette
primary: {
  50: '#eff6ff',
  500: '#3b82f6',
  600: '#2563eb',
}

// Component examples
<Button className="bg-primary-600 hover:bg-primary-700">
  Click me
</Button>

<Card className="p-6 border border-gray-200 rounded-lg">
  Content
</Card>
```

### Custom Components

All UI components follow a consistent API:

```typescript
// Button component
<Button 
  variant="primary" | "secondary" | "outline" | "ghost"
  size="sm" | "md" | "lg"
  disabled={boolean}
>
  Content
</Button>

// Input component
<Input 
  type="text"
  placeholder="Enter text"
  error={boolean}
  className="additional-classes"
/>
```

## 🔌 API Integration

### Service Layer Architecture

```typescript
// Example service usage
import { searchService } from '@/services/searchService'

const searchProfessors = async (query: SearchQuery) => {
  try {
    const results = await searchService.searchProfessors(query)
    return results
  } catch (error) {
    console.error('Search failed:', error)
    throw error
  }
}
```

### Authentication Flow

```typescript
// Using the auth hook
const { user, login, logout, isLoading } = useAuth()

// Login example
const handleLogin = async (email: string, password: string) => {
  try {
    await login(email, password)
    router.push('/dashboard')
  } catch (error) {
    setError('Invalid credentials')
  }
}
```

## 🚀 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Test production build locally
npm run start
```

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Docker Production
```bash
# Build production image
docker build -f docker/Dockerfile -t PHDMatcher-FE .

# Run container
docker run -p 3000:3000 PHDMatcher-FE
```

#### Static Export
```bash
# Add to next.config.js
output: 'export'

# Build static files
npm run build
```

## 🔧 Performance Optimization

### Next.js Optimizations
- **Image Optimization**: Automatic image optimization with next/image
- **Code Splitting**: Automatic code splitting by pages and components
- **Bundle Analysis**: Use `@next/bundle-analyzer` to analyze bundle size
- **Static Generation**: Use ISR for frequently accessed pages

### Best Practices
```typescript
// Dynamic imports for code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />
})

// Image optimization
import Image from 'next/image'

<Image
  src="/professor-photo.jpg"
  alt="Professor Name"
  width={300}
  height={300}
  priority
/>
```

## 🔒 Security

### Authentication Security
- JWT tokens stored in secure HTTP-only cookies
- Automatic token refresh on API calls
- Protected routes with authentication guards
- CSRF protection with SameSite cookies

### Input Validation
```typescript
// Using Zod for validation
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password too short'),
})
```

## 📊 Monitoring & Analytics

### Performance Monitoring
```typescript
// Web Vitals reporting
export function reportWebVitals(metric: any) {
  if (metric.label === 'web-vital') {
    // Send to analytics
    console.log(metric)
  }
}
```

### Error Boundary
```typescript
// Global error handling
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new components
- Use semantic commit messages
- Ensure accessibility compliance
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

**TypeScript Errors**
```bash
# Check types
npm run type-check

# Update TypeScript
npm update typescript @types/react @types/node
```

**API Connection Issues**
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check if backend server is running
- Verify CORS settings in backend

### Support

- **Documentation**: Check the docs/ folder for detailed guides
- **Issues**: [GitHub Issues](https://github.com/shayar/PHDMatcher-FE/issues)
- **Discussions**: [GitHub Discussions](https://github.com/shayar/PHDMatcher-FE/discussions)

---

Built with ❤️ for the academic community