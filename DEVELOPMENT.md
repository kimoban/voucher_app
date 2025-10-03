# Voucher App Development Guide

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Git
- Text editor/IDE

### Setup Instructions

1. **Clone and navigate to the project:**
   ```bash
   cd voucher_app
   ```

2. **Run the setup script:**
   ```bash
   # On Linux/macOS
   chmod +x setup.sh
   ./setup.sh
   
   # On Windows
   setup.bat
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin

## Architecture Overview

### Backend (Django REST Framework)
```
backend/
├── voucher_project/        # Main Django project
│   ├── settings.py        # Configuration
│   ├── urls.py           # URL routing
│   └── wsgi.py           # WSGI application
├── apps/                 # Django applications
│   ├── authentication/   # User auth & JWT
│   ├── users/           # User management
│   ├── vouchers/        # Voucher system
│   ├── payments/        # Payment processing
│   └── analytics/       # Analytics & reporting
├── requirements.txt     # Python dependencies
└── Dockerfile          # Container configuration
```

### Frontend (Next.js + TypeScript)
```
frontend/
├── src/
│   ├── app/             # Next.js 13+ app directory
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React contexts
│   ├── lib/             # Utilities & API client
│   ├── types/           # TypeScript definitions
│   └── styles/          # CSS and styling
├── package.json         # Node dependencies
└── Dockerfile          # Container configuration
```

## Core Features

### 1. User Management
- User registration and authentication
- JWT token-based auth
- Profile management
- Role-based permissions

### 2. Voucher System
- Multiple voucher types (result check, applications, etc.)
- Voucher code generation
- Usage tracking and expiration
- Bulk purchases

### 3. Payment Processing
- Stripe integration
- Payment intent creation
- Transaction history
- Refund management

### 4. Analytics & Reporting
- User dashboard with stats
- Admin analytics
- Revenue tracking
- Usage patterns

## API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/refresh/` - Token refresh

### Vouchers
- `GET /api/vouchers/types/` - List voucher types
- `GET /api/vouchers/my-vouchers/` - User's vouchers
- `POST /api/vouchers/purchase/` - Purchase vouchers
- `POST /api/vouchers/redeem/` - Redeem voucher
- `GET /api/vouchers/stats/` - User statistics

### Payments
- `POST /api/payments/create-intent/` - Create payment intent
- `POST /api/payments/confirm/` - Confirm payment
- `GET /api/payments/history/` - Payment history

### Analytics
- `GET /api/analytics/user/` - User analytics
- `GET /api/analytics/dashboard/` - Admin dashboard

## Development Workflow

### 1. Backend Development

**Start development server:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Create new app:**
```bash
python manage.py startapp app_name
```

**Make migrations:**
```bash
python manage.py makemigrations
python manage.py migrate
```

**Create superuser:**
```bash
python manage.py createsuperuser
```

### 2. Frontend Development

**Start development server:**
```bash
cd frontend
npm install
npm run dev
```

**Build for production:**
```bash
npm run build
npm start
```

**Type checking:**
```bash
npm run type-check
```

### 3. Docker Development

**Start all services:**
```bash
docker-compose up -d
```

**View logs:**
```bash
docker-compose logs -f [service_name]
```

**Execute commands:**
```bash
docker-compose exec backend python manage.py shell
docker-compose exec frontend npm run build
```

**Stop services:**
```bash
docker-compose down
```

## Environment Configuration

### Backend (.env)
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost:5432/voucher_app
REDIS_URL=redis://localhost:6379/0
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
EMAIL_HOST=smtp.gmail.com
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Testing

### Backend Testing
```bash
cd backend
python manage.py test
python manage.py test apps.vouchers
```

### Frontend Testing
```bash
cd frontend
npm test
npm run test:watch
```

## Deployment

### Production Environment Variables

**Backend:**
- Set `DEBUG=False`
- Use production database URL
- Configure email settings
- Set up proper static file serving

**Frontend:**
- Update API URL to production backend
- Use production Stripe keys
- Configure proper domain settings

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Common Tasks

### Add New Voucher Type
1. Create VoucherType instance in admin or shell
2. Update frontend voucher type list
3. Add any specific business logic

### Integrate New Payment Method
1. Add payment method to Payment model choices
2. Implement payment processor in payments/views.py
3. Update frontend payment flow

### Add New API Endpoint
1. Create view in appropriate app
2. Add URL pattern to app's urls.py
3. Update API client in frontend
4. Add TypeScript types if needed

## Troubleshooting

### Common Issues

**Database connection errors:**
- Check DATABASE_URL in .env
- Ensure PostgreSQL is running
- Verify credentials

**Redis connection errors:**
- Check REDIS_URL in .env
- Ensure Redis is running
- Check port availability

**Frontend API errors:**
- Verify NEXT_PUBLIC_API_URL
- Check backend is running
- Confirm CORS settings

**Authentication issues:**
- Check JWT token expiration
- Verify SECRET_KEY consistency
- Clear localStorage if needed

### Logs and Debugging

**View application logs:**
```bash
# Django logs
docker-compose logs backend

# Next.js logs
docker-compose logs frontend

# Database logs
docker-compose logs db
```

**Django debugging:**
```bash
# Access Django shell
docker-compose exec backend python manage.py shell

# Check migrations
docker-compose exec backend python manage.py showmigrations
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Update documentation
6. Submit a pull request

## Support

For issues and questions:
1. Check this documentation
2. Review existing GitHub issues
3. Create a new issue with detailed description
4. Include logs and environment details
