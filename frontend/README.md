# Frontend - Voucher App

Next.js 14 frontend application for the Voucher App platform. Built with React 18, TypeScript, and Tailwind CSS.

## 🛠 Technology Stack

- **Next.js** 14.1.0 - React framework with App Router
- **React** 18.2.0 - UI library
- **TypeScript** 5.3.3 - Type safety
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **React Query** 5.17.15 - Data fetching and caching
- **Zustand** 4.5.0 - State management
- **Heroicons** 2.1.1 - Icon library
- **Axios** 1.6.5 - HTTP client

## 📁 Project Structure

```plaintext
frontend/
├── src/                            # Source code
│   ├── app/                        # Next.js 14 App Router
│   │   ├── layout.tsx              # Root layout component
│   │   ├── page.tsx                # Homepage
│   │   ├── providers.tsx           # React Query provider
│   │   └── globals.css             # Global styles and Tailwind imports
│   │
│   ├── components/                 # React components
│   │   ├── layout/                 # Layout components
│   │   │   ├── navbar.tsx          # Navigation bar with auth
│   │   │   └── footer.tsx          # Footer with links
│   │   │
│   │   └── home/                   # Homepage sections
│   │       ├── hero-section.tsx    # Hero banner with CTA
│   │       ├── features-section.tsx # Key features grid
│   │       ├── voucher-types-section.tsx # Available voucher types
│   │       ├── how-it-works-section.tsx # Process steps
│   │       ├── testimonials-section.tsx # User testimonials
│   │       └── cta-section.tsx     # Call-to-action banner
│   │
│   ├── contexts/                   # React Context providers
│   │   └── auth-context.tsx        # Authentication context
│   │
│   ├── lib/                        # Utility libraries
│   │   └── api.ts                  # API client (Fetch API)
│   │
│   ├── types/                      # TypeScript type definitions
│   │   └── index.ts                # Shared types and interfaces
│   │
│   └── styles/                     # Additional styles
│       └── globals.css             # Global CSS (Tailwind config)
│
├── public/                         # Static assets
│   ├── favicon.ico                 # Favicon
│   └── images/                     # Image assets
│
├── node_modules/                   # Dependencies (git-ignored)
├── .next/                          # Next.js build output (git-ignored)
│
├── package.json                    # NPM dependencies
├── package-lock.json               # Dependency lock file
├── tsconfig.json                   # TypeScript configuration
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── .eslintrc.js                    # ESLint configuration
├── .gitignore                      # Git ignore rules
├── Dockerfile                      # Container configuration
├── vercel.json                     # Vercel deployment config
├── .env.example                    # Environment variables template
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- Backend API running on `http://127.0.0.1:8000`

### Installation

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy example env file
   cp .env.example .env.local

   # Edit .env.local with your configuration
   ```

   Required variables:

   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

Application will be available at **http://localhost:3000**

### Verify Installation

Open browser and navigate to:

- Homepage: [http://localhost:3000](http://localhost:3000)
- Should see hero section, features, and voucher types

## 🏗️ Application Architecture

### Next.js 14 App Router

This project uses Next.js 14's App Router with the following structure:

```bash
src/app/
├── layout.tsx          # Root layout (wraps all pages)
├── page.tsx            # Homepage (/)
└── providers.tsx       # React Query provider setup
```

**Key Features:**

- Server Components by default
- File-based routing
- Nested layouts
- Built-in API routes (future use)
- Optimized bundle splitting

### Component Organization

#### Layout Components (`components/layout/`)

**Navbar** (`navbar.tsx`)

- Responsive navigation bar
- Authentication state display
- Login/Signup buttons (conditional)
- User profile dropdown (when authenticated)
- Mobile menu support

**Footer** (`footer.tsx`)

- Company information
- Quick links
- Social media links
- Copyright notice

#### Home Page Components (`components/home/`)

**HeroSection** (`hero-section.tsx`)

- Main landing banner
- Value proposition headline
- Primary CTA button
- Eye-catching visuals

**FeaturesSection** (`features-section.tsx`)

- Grid of key features (4 cards)
- Icons from Heroicons
- Feature descriptions

**VoucherTypesSection** (`voucher-types-section.tsx`)

- Display available voucher types
- Fetches data from `/api/vouchers/types/`
- Pricing and descriptions
- Purchase buttons

**HowItWorksSection** (`how-it-works-section.tsx`)

- Step-by-step process (3 steps)
- Visual timeline
- User journey explanation

**TestimonialsSection** (`testimonials-section.tsx`)

- User testimonials (3 cards)
- Star ratings
- User avatars and names

**CTASection** (`cta-section.tsx`)

- Final call-to-action
- Prominent signup/purchase button
- Conversion-focused messaging

### State Management

#### Authentication Context (`contexts/auth-context.tsx`)

Manages global authentication state using React Context:

```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}
```

**Features:**

- JWT token management
- Automatic token refresh
- Persistent authentication (localStorage)
- Protected route logic

**Usage:**

```typescript
import { useAuth } from '@/contexts/auth-context';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  // Access user data, call login/logout
}
```

#### React Query for Data Fetching

Used for server state management:

```typescript
// Example usage in component
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

function VoucherList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['vouchers'],
    queryFn: () => api.get('/api/vouchers/my-vouchers/')
  });
}
```

**Benefits:**

- Automatic caching
- Background refetching
- Optimistic updates
- Loading/error states

### API Client (`lib/api.ts`)

Centralized API client using Fetch API:

```typescript
const api = {
  get: (url: string, options?: RequestInit) => Promise<any>,
  post: (url: string, data: any, options?: RequestInit) => Promise<any>,
  put: (url: string, data: any, options?: RequestInit) => Promise<any>,
  delete: (url: string, options?: RequestInit) => Promise<any>
};
```

**Features:**

- Automatic JWT token injection
- Base URL configuration
- Error handling
- Response parsing

**Example Usage:**

```typescript
import api from '@/lib/api';

// GET request
const vouchers = await api.get('/api/vouchers/my-vouchers/');

// POST request with auth
const newVoucher = await api.post('/api/vouchers/purchase/', {
  voucher_type_id: 1,
  quantity: 1
});
```

## 📦 Type Definitions (`types/index.ts`)

### Core Types

```typescript
// User types
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface UserProfile {
  phone_number?: string;
  address?: string;
  date_of_birth?: string;
  profile_picture?: string;
}

// Voucher types
interface VoucherType {
  id: number;
  name: string;
  description: string;
  price: string;
  service_type: string;
  validity_days: number;
  max_uses: number;
  is_active: boolean;
}

interface Voucher {
  id: number;
  code: string;
  voucher_type: VoucherType;
  is_active: boolean;
  purchase_date: string;
  expiry_date: string;
  uses_remaining: number;
  total_uses: number;
}

// Transaction types
interface Transaction {
  id: number;
  amount: string;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  voucher_type: VoucherType;
}

// Authentication types
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}
```

## 🎨 Styling with Tailwind CSS

### Configuration (`tailwind.config.js`)

```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',    // Blue
        secondary: '#10B981',  // Green
        accent: '#F59E0B',     // Amber
      },
    },
  },
  plugins: [],
}
```

### Usage Examples

```tsx
// Responsive design
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>

// Custom colors
<button className="bg-primary hover:bg-primary/90 text-white">
  Purchase
</button>

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Cards */}
</div>

// Flexbox
<nav className="flex items-center justify-between">
  {/* Nav items */}
</nav>
```

### Global Styles (`src/app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition;
  }
}
```

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "paths": {
      "@/*": ["./src/*"]
    },
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Key Features:**

- Path aliases (`@/` → `src/`)
- Strict type checking
- Next.js plugin integration

### Next.js (`next.config.js`)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'yourdomain.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
}

module.exports = nextConfig
```

### ESLint (`.eslintrc.js`)

```javascript
module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Custom rules
  }
}
```

## 🧪 Development Workflow

### Available Scripts

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check
```

### Adding New Pages

Create a new file in `src/app/`:

```bash
# Create dashboard page
mkdir src/app/dashboard
touch src/app/dashboard/page.tsx
touch src/app/dashboard/layout.tsx  # Optional layout
```

Example page:

```tsx
// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
```

### Adding New Components

```bash
# Create reusable component
mkdir src/components/voucher
touch src/components/voucher/voucher-card.tsx
```

Example component:

```tsx
// src/components/voucher/voucher-card.tsx
import { Voucher } from '@/types';

interface VoucherCardProps {
  voucher: Voucher;
}

export default function VoucherCard({ voucher }: VoucherCardProps) {
  return (
    <div className="card">
      <h3>{voucher.voucher_type.name}</h3>
      <p>Code: {voucher.code}</p>
    </div>
  );
}
```

### Environment Variables

All public environment variables must be prefixed with `NEXT_PUBLIC_`:

```env
# .env.local
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Usage:

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## 🔒 Authentication Flow

### Login Process

1. User submits email and password
2. API call to `/api/auth/login/`
3. Receive JWT tokens (access + refresh)
4. Store tokens in localStorage
5. Update auth context state
6. Redirect to dashboard

```typescript
const { login } = useAuth();

const handleLogin = async (email: string, password: string) => {
  try {
    await login(email, password);
    router.push('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Protected Routes

```typescript
// Example protected page
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return <div>Protected Content</div>;
}
```

## 📊 Data Fetching Patterns

### Server Components (Default)

```tsx
// src/app/vouchers/page.tsx
async function getVouchers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/vouchers/types/`, {
    cache: 'no-store' // or 'force-cache'
  });
  return res.json();
}

export default async function VouchersPage() {
  const vouchers = await getVouchers();
  
  return (
    <div>
      {vouchers.map((v: any) => (
        <div key={v.id}>{v.name}</div>
      ))}
    </div>
  );
}
```

### Client Components with React Query

```tsx
'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export default function MyVouchers() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['my-vouchers'],
    queryFn: () => api.get('/api/vouchers/my-vouchers/')
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading vouchers</div>;

  return (
    <div>
      {data?.map((voucher: any) => (
        <div key={voucher.id}>{voucher.code}</div>
      ))}
    </div>
  );
}
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   vercel --prod
   ```

4. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_API_URL`

### Docker Deployment

Build and run with Docker:

```bash
# Build image
docker build -t voucher-app-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://your-api-url.com \
  voucher-app-frontend
```

### Build Optimization

```bash
# Analyze bundle size
npm run build

# Check output
ls -lh .next/static/
```

**Optimization Tips:**

- Use Next.js Image component for images
- Implement code splitting with dynamic imports
- Enable compression in production
- Use CDN for static assets

## 🐛 Debugging

### React Developer Tools

Install browser extension:

- Chrome: [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- Firefox: [React Developer Tools](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)

### Next.js Debug Mode

```bash
NODE_OPTIONS='--inspect' npm run dev
```

Open Chrome DevTools → Node icon → Inspect

### Common Issues

### Issue: Hydration mismatch

```bash
Error: Text content does not match server-rendered HTML
```

**Solution:** Ensure server and client render the same content. Use `suppressHydrationWarning` if needed.

### Issue: API calls failing

```bash
Failed to fetch
```

**Solution:**

- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend CORS configuration
- Check network tab in DevTools

### Issue: Environment variables not working

```bash
process.env.NEXT_PUBLIC_API_URL is undefined
```

**Solution:**

- Restart dev server after changing `.env.local`
- Ensure variable starts with `NEXT_PUBLIC_`
- Check variable is in `.env.local` not `.env`

## 📝 Best Practices

### Component Structure

```tsx
// 1. Imports
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Types
interface ComponentProps {
  title: string;
}

// 3. Component
export default function Component({ title }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState('');
  const router = useRouter();

  // 5. Effects
  useEffect(() => {
    // Effect logic
  }, []);

  // 6. Handlers
  const handleClick = () => {
    // Handler logic
  };

  // 7. Render
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
}
```

### TypeScript Usage

```tsx
// ✅ Good: Use interfaces for props
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// ✅ Good: Type event handlers
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

// ✅ Good: Use generics
const [items, setItems] = useState<Item[]>([]);
```

### Performance Optimization

```tsx
// 1. Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive render */}</div>;
});

// 2. Use useMemo for expensive calculations
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);

// 3. Use useCallback for function props
const handleClick = useCallback(() => {
  // Handler logic
}, [dependency]);

// 4. Lazy load components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

## 🤝 Contributing

See the main [README.md](../README.md) for contribution guidelines.

## 📄 License

This project is part of the Voucher App and is licensed under the MIT License.

## 👤 Author

### @kimoban

- GitHub: [@kimoban](https://github.com/kimoban)

---

**Frontend Documentation** - For backend API documentation, see [../backend/README.md](../backend/README.md)
