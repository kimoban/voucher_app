# Voucher App - Academic Services Platform

[![Django](https://img.shields.io/badge/Django-5.2.4-green.svg)](https://www.djangoproject.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black.svg)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.11.7-blue.svg)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A comprehensive full-stack platform where users can purchase voucher codes for various academic services including exam result checking, school applications, placement applications, and other educational services.

## 🌟 Features

### Core Functionality

- **🎫 Voucher System**
  - Multiple voucher types (Result Checking, School Application, Placement, Document Verification)
  - Unique code generation with UUID-based security
  - Real-time validation and redemption
  - Usage tracking and expiration management
  - Bulk voucher purchase support

- **👤 User Management**
  - Email-based authentication with JWT tokens
  - Custom user model with extended profile
  - Secure password handling
  - Token refresh mechanism (60-minute access, 7-day refresh)
  - Profile management and updates

- **💳 Payment Processing**
  - Stripe integration for secure payments
  - Multiple payment methods support
  - Payment intent creation and confirmation
  - Transaction history and receipts
  - Webhook handling for payment events

- **📊 Analytics Dashboard**
  - User statistics and activity tracking
  - Revenue analytics and reporting
  - Voucher usage metrics
  - Purchase pattern analysis
  - Real-time dashboard updates

- **🔐 Security**
  - JWT-based authentication
  - CORS configuration
  - Environment variable management
  - SQL injection protection
  - XSS prevention

## 🛠 Tech Stack

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Django | 5.2.4 | Web framework |
| Django REST Framework | 3.16.0 | API development |
| PostgreSQL | 15+ | Primary database (production) |
| SQLite | 3.x | Development database |
| Redis | 6.4.0 | Caching & session storage |
| Celery | 5.5.3 | Background task processing |
| Stripe | 12.3.0 | Payment processing |
| Gunicorn | 23.0.0 | WSGI HTTP server |
| WhiteNoise | 6.11.0 | Static file serving |

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.1.0 | React framework with SSR |
| React | 18.2.0 | UI library |
| TypeScript | 5.3.3 | Type safety |
| Tailwind CSS | 3.4.1 | Styling framework |
| React Query | 5.17.15 | Data fetching & caching |
| Zustand | 4.5.0 | State management |
| Heroicons | 2.1.1 | Icon library |
| React Hook Form | 7.49.3 | Form handling |
| Zod | 3.22.4 | Schema validation |

### DevOps & Deployment

- **Docker** - Containerization
- **Docker Compose** - Local development orchestration
- **Render** - Backend hosting (Infrastructure as Code)
- **Vercel** - Frontend hosting
- **GitHub Actions** - CI/CD (ready for setup)

## 📁 Project Structure

```plaintext
voucher_app/
├── .git/                           # Git version control
├── .gitignore                      # Git ignore rules
├── .vscode/                        # VS Code settings
├── README.md                       # This file
├── docker-compose.yml              # Docker orchestration
├── render.yaml                     # Render infrastructure as code
├── setup.sh                        # Unix setup script
├── setup.bat                       # Windows setup script
│
├── 📚 Documentation/
│   ├── API_ENDPOINTS_GUIDE.md      # API documentation
│   ├── DEPLOYMENT_GUIDE.md         # Deployment instructions
│   ├── DEPLOYMENT_READY.md         # Pre-deployment checklist
│   ├── DEVELOPMENT.md              # Development guide
│   ├── PROJECT_SUMMARY.md          # Project overview
│   ├── TESTING_RESULTS.md          # Test results
│   ├── LINT_FIXES.md               # Code quality fixes
│   ├── GIT_VERIFICATION_REPORT.md  # Git security audit
│   └── GITHUB_PUSH_SUMMARY.md      # Git commit history
│
├── 🔧 backend/                     # Django REST API
│   ├── manage.py                   # Django management script
│   ├── requirements.txt            # Python dependencies
│   ├── Dockerfile                  # Backend container config
│   ├── Procfile                    # Render process config
│   ├── runtime.txt                 # Python version spec
│   ├── build.sh                    # Build script for deployment
│   ├── .env.example                # Environment variables template
│   ├── .gitignore                  # Backend-specific ignores
│   ├── db.sqlite3                  # Development database
│   │
│   ├── voucher_project/            # Main Django project
│   │   ├── __init__.py
│   │   ├── settings.py             # Django settings
│   │   ├── urls.py                 # URL routing
│   │   ├── wsgi.py                 # WSGI entry point
│   │   ├── asgi.py                 # ASGI entry point
│   │   └── celery.py               # Celery configuration
│   │
│   ├── apps/                       # Django applications
│   │   ├── __init__.py
│   │   │
│   │   ├── authentication/         # Auth endpoints
│   │   │   ├── __init__.py
│   │   │   ├── apps.py
│   │   │   ├── views.py            # Login, Register, Token Refresh
│   │   │   ├── serializers.py      # User data serialization
│   │   │   └── urls.py             # Auth URL patterns
│   │   │
│   │   ├── users/                  # User management
│   │   │   ├── __init__.py
│   │   │   ├── apps.py
│   │   │   ├── models.py           # Custom User & UserProfile
│   │   │   ├── admin.py            # Django admin config
│   │   │   ├── views.py            # Profile management
│   │   │   ├── serializers.py      # User serializers
│   │   │   ├── signals.py          # User signals
│   │   │   ├── urls.py             # User URL patterns
│   │   │   └── migrations/         # Database migrations
│   │   │       └── 0001_initial.py
│   │   │
│   │   ├── vouchers/               # Voucher system
│   │   │   ├── __init__.py
│   │   │   ├── apps.py
│   │   │   ├── models.py           # VoucherType, Voucher, VoucherUsage
│   │   │   ├── admin.py            # Admin interface
│   │   │   ├── views.py            # Purchase, Redeem, Stats
│   │   │   ├── serializers.py      # Voucher serializers
│   │   │   ├── urls.py             # Voucher URL patterns
│   │   │   ├── management/         # Management commands
│   │   │   │   └── commands/
│   │   │   │       └── create_sample_vouchers.py
│   │   │   └── migrations/
│   │   │       └── 0001_initial.py
│   │   │
│   │   ├── payments/               # Payment processing
│   │   │   ├── __init__.py
│   │   │   ├── apps.py
│   │   │   ├── models.py           # Transaction model
│   │   │   ├── views.py            # Stripe integration
│   │   │   ├── serializers.py      # Payment serializers
│   │   │   ├── urls.py             # Payment URL patterns
│   │   │   └── migrations/
│   │   │       └── 0001_initial.py
│   │   │
│   │   └── analytics/              # Analytics & reporting
│   │       ├── __init__.py
│   │       ├── apps.py
│   │       ├── views.py            # Dashboard analytics
│   │       └── urls.py             # Analytics URL patterns
│   │
│   ├── static/                     # Static files (CSS, JS, images)
│   │   └── .gitkeep
│   ├── media/                      # User uploads
│   │   └── .gitkeep
│   ├── logs/                       # Application logs
│   │   └── .gitkeep
│   └── staticfiles/                # Collected static files (production)
│
└── 💻 frontend/                    # Next.js Application
    ├── package.json                # Node dependencies
    ├── package-lock.json           # Dependency lock file
    ├── next.config.js              # Next.js configuration
    ├── tsconfig.json               # TypeScript configuration
    ├── tailwind.config.js          # Tailwind CSS configuration
    ├── .eslintrc.js                # ESLint configuration
    ├── .env.local.example          # Environment variables template
    ├── .gitignore                  # Frontend-specific ignores
    ├── Dockerfile                  # Frontend container config
    ├── vercel.json                 # Vercel deployment config
    │
    └── src/                        # Source code
        ├── app/                    # Next.js 14 App Router
        │   ├── layout.tsx          # Root layout
        │   ├── page.tsx            # Homepage
        │   └── globals.css         # Global styles
        │
        ├── components/             # React components
        │   ├── layout/             # Layout components
        │   │   ├── navbar.tsx      # Navigation bar
        │   │   └── footer.tsx      # Footer
        │   │
        │   └── home/               # Homepage sections
        │       ├── hero-section.tsx
        │       ├── features-section.tsx
        │       ├── voucher-types-section.tsx
        │       ├── how-it-works-section.tsx
        │       ├── testimonials-section.tsx
        │       └── cta-section.tsx
        │
        ├── contexts/               # React contexts
        │   └── auth-context.tsx    # Authentication context
        │
        ├── lib/                    # Utility functions
        │   └── api.ts              # API client with auth
        │
        ├── types/                  # TypeScript definitions
        │   └── index.ts            # Type definitions
        │
        └── styles/                 # Additional styles
            └── globals.css         # Custom global styles
```markdown

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python** 3.11.7 or higher
- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **PostgreSQL** 15+ (for production) or **SQLite** (development)
- **Redis** 6+ (optional, for caching and Celery)
- **Git** for version control
- **Docker** & **Docker Compose** (optional, for containerized development)

### Quick Start (Development)

#### 1. Clone the Repository

```bash
git clone https://github.com/kimoban/voucher_app.git
cd voucher_app
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run migrations
python manage.py migrate

# Create sample voucher types
python manage.py create_sample_vouchers

# Create superuser for admin access
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

Backend will be available at [**http://127.0.0.1:8000/**](http://127.0.0.1:8000/)

#### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your API URL

# Start development server
npm run dev
# or
yarn dev
```

Frontend will be available at [**http://localhost:3000/**](http://localhost:3000/)

#### 4. Access the Application

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)
- **Admin Panel:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
- **API Health Check:** [http://127.0.0.1:8000/api/health/](http://127.0.0.1:8000/api/health/)

### Docker Setup (Alternative)

For a containerized development environment:

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Services will be available at the same URLs as manual setup.

## 📚 API Documentation

### Base URL

- **Development:** `http://127.0.0.1:8000/api/`
- **Production:** `https://your-render-app.onrender.com/api/`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register/` | User registration | No |
| POST | `/api/auth/login/` | User login | No |
| POST | `/api/auth/token/refresh/` | Refresh JWT token | No |
| GET | `/api/auth/profile/` | Get user profile | Yes |
| PUT | `/api/auth/profile/` | Update user profile | Yes |

### Voucher Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/vouchers/types/` | List all voucher types | No |
| GET | `/api/vouchers/my-vouchers/` | List user's vouchers | Yes |
| POST | `/api/vouchers/purchase/` | Purchase voucher | Yes |
| POST | `/api/vouchers/redeem/` | Redeem voucher code | Yes |
| GET | `/api/vouchers/detail/<code>/` | Get voucher details | Yes |
| GET | `/api/vouchers/stats/` | Get voucher statistics | Yes |
| GET | `/api/vouchers/usage-history/` | Get usage history | Yes |

### Payment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/payments/create-payment-intent/` | Create Stripe payment intent | Yes |
| POST | `/api/payments/confirm-payment/` | Confirm payment | Yes |
| GET | `/api/payments/history/` | Get payment history | Yes |
| GET | `/api/payments/transaction/<id>/` | Get transaction details | Yes |

### Analytics Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/analytics/dashboard/` | Get dashboard analytics | Yes |

### Utility Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health/` | API health check | No |
| GET | `/api/test/` | API test endpoint | No |

For detailed API documentation with request/response examples, see [API_ENDPOINTS_GUIDE.md](./API_ENDPOINTS_GUIDE.md).

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Django Settings
DEBUG=True
SECRET_KEY=your-super-secret-key-change-this-in-production
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (PostgreSQL for production)
DATABASE_URL=postgresql://user:password@localhost:5432/voucher_app

# Redis (optional, for caching and Celery)
REDIS_URL=redis://localhost:6379/0

# Celery
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# Stripe Payment
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Email (optional, for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key

# App Configuration
NEXT_PUBLIC_APP_NAME=Voucher App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
python manage.py test

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend Tests

```bash
cd frontend
npm run test

# Run with coverage
npm run test:coverage
```

## 📦 Deployment

### Backend Deployment (Render)

1. **Connect Repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`

2. **Set Environment Variables**
   - Add all production environment variables
   - Set `DEBUG=False`
   - Configure production database URL
   - Add Stripe production keys

3. **Deploy**
   - Render will automatically build and deploy
   - Monitor logs for any issues

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

### Frontend Deployment (Vercel)

1. **Connect Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Set Environment Variables**
   - `NEXT_PUBLIC_API_URL` → Your Render backend URL
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → Stripe production key

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at `https://your-app.vercel.app`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**

   ```bash
   git clone https://github.com/kimoban/voucher_app.git
   cd voucher_app
   ```

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Write tests for new features
   - Update documentation as needed

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` - New features
   - `fix:` - Bug fixes
   - `docs:` - Documentation changes
   - `chore:` - Maintenance tasks
   - `refactor:` - Code refactoring
   - `test:` - Test additions

5. **Push and Create Pull Request**

   ```bash
   git push origin feature/your-feature-name
   ```

## 📄 Documentation

- [API Endpoints Guide](./API_ENDPOINTS_GUIDE.md) - Complete API documentation
- [Deployment Guide](./DEPLOYMENT_GUIDE.md) - Deployment instructions
- [Development Guide](./DEVELOPMENT.md) - Development best practices
- [Project Summary](./PROJECT_SUMMARY.md) - Technical architecture overview
- [Testing Results](./TESTING_RESULTS.md) - Test coverage and results

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

### @kimoban

- GitHub: [@kimoban](https://github.com/kimoban)
- Repository: [voucher_app](https://github.com/kimoban/voucher_app)

## 🙏 Acknowledgments

- Django REST Framework documentation
- Next.js documentation
- Stripe API documentation
- All contributors and users of this project

## 📞 Support

If you encounter any issues or have questions:

1. Check the [documentation](./API_ENDPOINTS_GUIDE.md)
2. Search [existing issues](https://github.com/kimoban/voucher_app/issues)
3. Create a [new issue](https://github.com/kimoban/voucher_app/issues/new)

---

Made with ❤️ by @kimoban
