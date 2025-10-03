# Voucher App - Academic Services Platform

A comprehensive platform where users can purchase voucher codes for various academic services including:

- Checking academic results
- School applications
- Placement applications
- Other educational services

## Tech Stack

### Backend

- **Django REST Framework** - API development
- **PostgreSQL** - Primary database
- **Redis** - Caching and session storage
- **Celery** - Background task processing
- **Stripe** - Payment processing

### Frontend

- **Next.js 14** - React framework with SSR
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Query** - Data fetching and caching
- **Zustand** - State management

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Local development
- **GitHub Actions** - CI/CD

## Features

### Core Features

1. **User Management**
   - User registration and authentication
   - Profile management
   - Role-based access control

2. **Voucher System**
   - Multiple voucher types (result checking, school application, placement)
   - Voucher code generation and validation
   - Usage tracking and expiration

3. **Payment Processing**
   - Secure payment with Stripe
   - Multiple payment methods
   - Transaction history

4. **Admin Dashboard**
   - Voucher management
   - User management
   - Analytics and reporting
   - Payment monitoring

5. **User Dashboard**
   - Purchase history
   - Active vouchers
   - Service access

## Project Structure

```plaintext
voucher_app/
├── backend/                 # Django REST API
│   ├── voucher_project/    # Main Django project
│   ├── apps/               # Django apps
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile         # Backend container
├── frontend/               # Next.js application
│   ├── src/               # Source code
│   ├── public/            # Static assets
│   ├── package.json       # Node dependencies
│   └── Dockerfile         # Frontend container
├── docker-compose.yml     # Development environment
└── docs/                  # Documentation
```markdown

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Redis
- Docker (optional)

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd voucher_app
   ```

1. **Backend Setup**

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

2. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Using Docker (Recommended)**

   ```bash
   docker-compose up -d
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/refresh/` - Token refresh

### Vouchers

- `GET /api/vouchers/` - List voucher types
- `POST /api/vouchers/purchase/` - Purchase voucher
- `POST /api/vouchers/redeem/` - Redeem voucher code
- `GET /api/vouchers/my-vouchers/` - User's vouchers

### Payments

- `POST /api/payments/create-intent/` - Create payment intent
- `POST /api/payments/confirm/` - Confirm payment
- `GET /api/payments/history/` - Payment history

## Environment Variables

Create `.env` files in both backend and frontend directories:

### Backend (.env)

```
 DEBUG=True
 SECRET_KEY=your-secret-key
 DATABASE_URL=postgresql://user:password@localhost:5432/voucher_app
 REDIS_URL=redis://localhost:6379/0
 STRIPE_PUBLISHABLE_KEY=pk_test_...
 STRIPE_SECRET_KEY=sk_test_...
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

@kimoban
