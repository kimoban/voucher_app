# Backend - Voucher App API

Django REST Framework API for the Voucher App platform. This backend handles user authentication, voucher management, payment processing, and analytics.

## 🛠 Technology Stack

- **Django** 5.2.4 - Web framework
- **Django REST Framework** 3.16.0 - API framework
- **PostgreSQL** 15+ - Production database
- **SQLite** 3.x - Development database
- **Redis** 6.4.0 - Caching and Celery broker
- **Celery** 5.5.3 - Background task processing
- **Stripe** 12.3.0 - Payment processing
- **Gunicorn** 23.0.0 - WSGI HTTP server
- **WhiteNoise** 6.11.0 - Static file serving
- **JWT** - Token-based authentication

## 📁 Project Structure

```plaintext
backend/
├── manage.py                       # Django management script
├── requirements.txt                # Python dependencies
├── Dockerfile                      # Container configuration
├── Procfile                        # Render process definitions
├── runtime.txt                     # Python version (3.11.7)
├── build.sh                        # Deployment build script
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── db.sqlite3                      # Development database
│
├── voucher_project/                # Main Django project
│   ├── __init__.py                 # Python package marker
│   ├── settings.py                 # Django configuration
│   ├── urls.py                     # Root URL routing
│   ├── wsgi.py                     # WSGI application entry
│   ├── asgi.py                     # ASGI application entry
│   └── celery.py                   # Celery configuration
│
├── apps/                           # Django applications
│   ├── __init__.py
│   │
│   ├── authentication/             # Authentication endpoints
│   │   ├── __init__.py
│   │   ├── apps.py                 # App configuration
│   │   ├── views.py                # Login, Register, Token views
│   │   ├── serializers.py          # User data serialization
│   │   └── urls.py                 # Auth URL patterns
│   │
│   ├── users/                      # User management
│   │   ├── __init__.py
│   │   ├── apps.py                 # App configuration
│   │   ├── models.py               # User & UserProfile models
│   │   ├── admin.py                # Django admin configuration
│   │   ├── views.py                # Profile management views
│   │   ├── serializers.py          # User data serializers
│   │   ├── signals.py              # Post-save signals
│   │   ├── urls.py                 # User URL patterns
│   │   └── migrations/             # Database migrations
│   │       ├── __init__.py
│   │       └── 0001_initial.py     # Initial migration
│   │
│   ├── vouchers/                   # Voucher system
│   │   ├── __init__.py
│   │   ├── apps.py                 # App configuration
│   │   ├── models.py               # VoucherType, Voucher, VoucherUsage
│   │   ├── admin.py                # Admin interface
│   │   ├── views.py                # CRUD and business logic
│   │   ├── serializers.py          # Voucher serializers
│   │   ├── urls.py                 # Voucher URL patterns
│   │   ├── management/             # Management commands
│   │   │   ├── __init__.py
│   │   │   └── commands/
│   │   │       ├── __init__.py
│   │   │       └── create_sample_vouchers.py
│   │   └── migrations/
│   │       ├── __init__.py
│   │       └── 0001_initial.py
│   │
│   ├── payments/                   # Payment processing
│   │   ├── __init__.py
│   │   ├── apps.py                 # App configuration
│   │   ├── models.py               # Transaction model
│   │   ├── views.py                # Stripe integration
│   │   ├── serializers.py          # Payment serializers
│   │   ├── urls.py                 # Payment URL patterns
│   │   └── migrations/
│   │       ├── __init__.py
│   │       └── 0001_initial.py
│   │
│   └── analytics/                  # Analytics and reporting
│       ├── __init__.py
│       ├── apps.py                 # App configuration
│       ├── views.py                # Dashboard analytics
│       └── urls.py                 # Analytics URL patterns
│
├── static/                         # Static files (collected)
│   └── .gitkeep
├── media/                          # User uploaded files
│   └── .gitkeep
├── logs/                           # Application logs
│   ├── .gitkeep
│   └── django.log                  # Django log file
└── staticfiles/                    # WhiteNoise static files (production)
```

## 🚀 Getting Started

### Prerequisites

- Python 3.11.7 or higher
- pip (Python package manager)
- PostgreSQL 15+ (for production) or SQLite (for development)
- Redis 6+ (optional, for Celery)

### Installation

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**

   ```bash
   # Create virtual environment
   python -m venv venv
   
   # Activate on Windows
   .\venv\Scripts\activate
   
   # Activate on macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**

   ```bash
   # Copy example env file
   cp .env.example .env
   
   # Edit .env with your configuration
   # Required: SECRET_KEY, DATABASE_URL (for production), STRIPE keys
   ```

5. **Run database migrations**

   ```bash
   python manage.py migrate
   ```

6. **Create sample voucher types**

   ```bash
   python manage.py create_sample_vouchers
   ```

7. **Create superuser for admin access**

   ```bash
   python manage.py createsuperuser
   ```

8. **Start development server**

   ```bash
   python manage.py runserver
   ```

API will be available at [**http://127.0.0.1:8000/**](http://127.0.0.1:8000/)

### Verify Installation

Test the health endpoint:

```bash
curl http://127.0.0.1:8000/api/health/
```

Expected response:

```json
{
  "status": "healthy",
  "django": "running"
}
```

## 🗄️ Database Models

### User Model (users app)

Custom user model with email-based authentication.

**Fields:**

- `email` - Unique email address (primary identifier)
- `first_name` - User's first name
- `last_name` - User's last name
- `is_active` - Account active status
- `is_staff` - Staff status
- `is_superuser` - Superuser status
- `date_joined` - Registration timestamp

### UserProfile Model

Extended user information.

**Fields:**

- `user` - OneToOne relationship with User
- `phone_number` - Contact phone
- `address` - Physical address
- `date_of_birth` - User's date of birth
- `profile_picture` - Avatar image

### VoucherType Model (vouchers app)

Defines types of services available.

**Fields:**

- `name` - Service name (e.g., "Exam Results")
- `description` - Service description
- `price` - Cost per voucher (Decimal)
- `service_type` - Type identifier
- `is_active` - Availability status
- `validity_days` - Days until expiration
- `max_uses` - Maximum redemptions per voucher

### Voucher Model

Individual voucher instances.

**Fields:**

- `code` - Unique voucher code (UUID-based)
- `voucher_type` - ForeignKey to VoucherType
- `user` - ForeignKey to User (owner)
- `is_active` - Active status
- `purchase_date` - Creation timestamp
- `expiry_date` - Expiration timestamp
- `uses_remaining` - Remaining redemptions
- `total_uses` - Total allowed uses

### VoucherUsage Model

Tracks voucher redemptions.

**Fields:**

- `voucher` - ForeignKey to Voucher
- `user` - ForeignKey to User
- `service_type` - Service accessed
- `used_at` - Redemption timestamp
- `details` - JSON field for additional data

### Transaction Model (payments app)

Payment transaction records.

**Fields:**

- `user` - ForeignKey to User
- `voucher_type` - ForeignKey to VoucherType
- `amount` - Transaction amount
- `currency` - Currency code (default: USD)
- `status` - Payment status (pending/completed/failed)
- `stripe_payment_intent_id` - Stripe identifier
- `created_at` - Transaction timestamp
- `updated_at` - Last update timestamp

## 🔌 API Endpoints

### Authentication (`/api/auth/`)

```http
POST   /api/auth/register/           # Register new user
POST   /api/auth/login/              # Login user
POST   /api/auth/token/refresh/      # Refresh JWT token
GET    /api/auth/profile/            # Get user profile
PUT    /api/auth/profile/            # Update user profile
```

### Users (`/api/users/`)

```http
GET    /api/users/profile/           # Get authenticated user profile
PUT    /api/users/profile/           # Update user profile
```

### Vouchers (`/api/vouchers/`)

```http
GET    /api/vouchers/types/          # List all voucher types
GET    /api/vouchers/my-vouchers/    # List user's vouchers
POST   /api/vouchers/purchase/       # Purchase new voucher
POST   /api/vouchers/redeem/         # Redeem voucher code
GET    /api/vouchers/detail/<code>/  # Get voucher details
GET    /api/vouchers/stats/          # Get user statistics
GET    /api/vouchers/usage-history/  # Get usage history
```

### Payments (`/api/payments/`)

```http
POST   /api/payments/create-payment-intent/    # Create Stripe payment
POST   /api/payments/confirm-payment/          # Confirm payment
GET    /api/payments/history/                  # Payment history
GET    /api/payments/transaction/<id>/         # Transaction details
```

### Analytics (`/api/analytics/`)

```http
GET    /api/analytics/dashboard/     # Get dashboard analytics
```

### Utility Endpoints

```http
GET    /api/health/                  # API health check
GET    /api/test/                    # API test endpoint
GET    /admin/                       # Django admin interface
```

For detailed API documentation, see [API_ENDPOINTS_GUIDE.md](../API_ENDPOINTS_GUIDE.md).

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Django Core Settings
DEBUG=True
SECRET_KEY=your-super-secret-key-change-in-production
ALLOWED_HOSTS=localhost,127.0.0.1
DJANGO_SETTINGS_MODULE=voucher_project.settings

# Database Configuration
# For development (SQLite - default)
DATABASE_URL=sqlite:///db.sqlite3

# For production (PostgreSQL)
DATABASE_URL=postgresql://username:password@host:port/database_name

# Redis Configuration (optional)
REDIS_URL=redis://localhost:6379/0

# Celery Configuration
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# Stripe Payment Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Email Configuration (optional)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-specific-password
DEFAULT_FROM_EMAIL=noreply@voucherapp.com

# JWT Token Settings (already configured in settings.py)
# ACCESS_TOKEN_LIFETIME=60 minutes
# REFRESH_TOKEN_LIFETIME=7 days
```

### Database Setup

#### Development (SQLite)

SQLite is used by default for development. No additional configuration needed.

#### Production (PostgreSQL)

1. Install PostgreSQL
2. Create database:

   ```sql
   CREATE DATABASE voucher_app;
   CREATE USER voucher_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE voucher_app TO voucher_user;
   ```

3. Update `DATABASE_URL` in `.env`:

   ```env
   DATABASE_URL=postgresql://voucher_user:your_password@localhost:5432/voucher_app
   ```

4. Run migrations:

   ```bash
   python manage.py migrate
   ```

### Redis Setup (Optional)

For Celery background tasks and caching:

1. Install Redis:

   ```bash
   # macOS
   brew install redis
   brew services start redis
   
   # Ubuntu/Debian
   sudo apt-get install redis-server
   sudo systemctl start redis
   
   # Windows
   # Download from https://redis.io/download
   ```

2. Verify Redis is running:

   ```bash
   redis-cli ping
   # Should return: PONG
   ```

## 🔧 Management Commands

### Create Sample Voucher Types

```bash
python manage.py create_sample_vouchers
```

Creates 4 sample voucher types:

- Exam Results Checking ($10)
- School Application ($25)
- Placement Application ($35)
- Document Verification ($15)

### Database Operations

```bash
# Create new migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Show all migrations
python manage.py showmigrations

# Rollback migration
python manage.py migrate app_name migration_name
```

### User Management

```bash
# Create superuser
python manage.py createsuperuser

# Change user password
python manage.py changepassword username
```

### Static Files

```bash
# Collect static files (for production)
python manage.py collectstatic --noinput

# Clear collected static files
python manage.py collectstatic --clear --noinput
```

### Development Server

```bash
# Run development server (default port 8000)
python manage.py runserver

# Run on custom port
python manage.py runserver 8080

# Run on custom host and port
python manage.py runserver 0.0.0.0:8000
```

### Django Shell

```bash
# Open Django shell
python manage.py shell

# Open Django shell with IPython
python manage.py shell -i ipython
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test apps.users
python manage.py test apps.vouchers

# Run with verbosity
python manage.py test --verbosity=2

# Keep test database
python manage.py test --keepdb
```

### Test Coverage

```bash
# Install coverage
pip install coverage

# Run tests with coverage
coverage run --source='.' manage.py test

# Generate coverage report
coverage report

# Generate HTML coverage report
coverage html
# Open htmlcov/index.html in browser
```

## 🐛 Debugging

### Django Debug Toolbar

For development debugging:

```bash
pip install django-debug-toolbar
```

Add to `INSTALLED_APPS` in settings.py and configure middleware.

### Logging

Logs are stored in `logs/django.log`. Configure logging level in `settings.py`:

```python
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'logs/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}
```

### Common Issues

#### Issue: Port already in use

```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

#### Issue: Migration conflicts

```bash
# Reset migrations (development only!)
python manage.py migrate --fake app_name zero
python manage.py migrate app_name
```

#### Issue: Static files not loading

```bash
# Collect static files
python manage.py collectstatic --noinput

# Check STATIC_URL and STATIC_ROOT in settings.py
```

## 📦 Deployment

### Render Deployment

1. **Prepare deployment files**
   - `Procfile` - Process definitions
   - `runtime.txt` - Python version
   - `build.sh` - Build script
   - `render.yaml` - Infrastructure as code

2. **Connect to Render**
   - Create account at [render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repository
   - Select `backend` as root directory

3. **Configure environment variables**
   Set all variables from `.env.example` in Render dashboard

4. **Deploy**
   Render will automatically build and deploy using `build.sh`

For detailed deployment instructions, see [../DEPLOYMENT_GUIDE.md](../DEPLOYMENT_GUIDE.md).

## 🔒 Security

### Best Practices

- ✅ Use strong `SECRET_KEY` in production
- ✅ Set `DEBUG=False` in production
- ✅ Use environment variables for sensitive data
- ✅ Enable HTTPS in production
- ✅ Configure CORS properly
- ✅ Use PostgreSQL in production (not SQLite)
- ✅ Regular security updates: `pip install --upgrade`
- ✅ Validate and sanitize user input
- ✅ Use Django's built-in protections (CSRF, XSS, SQL injection)

### JWT Token Security

- Access tokens expire after 60 minutes
- Refresh tokens expire after 7 days
- Tokens are stored in HTTP-only cookies (recommended)
- Use HTTPS to prevent token interception

## 📝 API Authentication

### JWT Token Flow

1. **Login/Register** - Get access and refresh tokens
2. **API Requests** - Include access token in header:

   ```bash
   Authorization: Bearer <access_token>
   ```

3. **Token Refresh** - When access token expires, use refresh token
4. **Logout** - Invalidate refresh token

### Example Authentication

```python
import requests

# Login
response = requests.post('http://127.0.0.1:8000/api/auth/login/', json={
    'email': 'user@example.com',
    'password': 'password123'
})
tokens = response.json()
access_token = tokens['access']

# Authenticated request
headers = {'Authorization': f'Bearer {access_token}'}
response = requests.get('http://127.0.0.1:8000/api/auth/profile/', headers=headers)
```

## 🤝 Contributing

See the main [README.md](../README.md) for contribution guidelines.

## 📄 License

This project is part of the Voucher App and is licensed under the MIT License.

## 👤 Author

### @kimoban

- GitHub: [@kimoban](https://github.com/kimoban)

---

**Backend API Documentation** - For frontend integration, see [../frontend/README.md](../frontend/README.md)
