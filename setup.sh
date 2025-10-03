#!/bin/bash

# Voucher App Setup Script

echo "🚀 Setting up Voucher App..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment files from examples
echo "📝 Creating environment files..."

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env from example"
    echo "⚠️  Please update the environment variables in backend/.env"
fi

if [ ! -f "frontend/.env.local" ]; then
    cp frontend/.env.local.example frontend/.env.local
    echo "✅ Created frontend/.env.local from example"
    echo "⚠️  Please update the environment variables in frontend/.env.local"
fi

# Build and start the application
echo "🏗️  Building Docker containers..."
docker-compose build

echo "🌱 Starting the application..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10

# Run database migrations
echo "🗃️  Running database migrations..."
docker-compose exec backend python manage.py migrate

# Create superuser (optional)
echo "👤 Creating superuser (optional)..."
echo "You can skip this step by pressing Ctrl+C"
docker-compose exec backend python manage.py createsuperuser || echo "Skipped superuser creation"

# Load sample data (optional)
echo "📦 Loading sample voucher types..."
docker-compose exec backend python manage.py shell << EOF
from apps.vouchers.models import VoucherType

# Create sample voucher types
voucher_types = [
    {
        'name': 'Result Check Voucher',
        'type_code': 'result_check',
        'description': 'Check your academic results online',
        'price': 10.00,
        'validity_days': 30,
        'usage_limit': 3
    },
    {
        'name': 'School Application Voucher',
        'type_code': 'school_application',
        'description': 'Apply to schools and universities',
        'price': 25.00,
        'validity_days': 60,
        'usage_limit': 1
    },
    {
        'name': 'Placement Application Voucher',
        'type_code': 'placement_application',
        'description': 'Apply for job placements and internships',
        'price': 15.00,
        'validity_days': 45,
        'usage_limit': 2
    },
    {
        'name': 'Certificate Verification',
        'type_code': 'certificate_verification',
        'description': 'Verify academic certificates',
        'price': 8.00,
        'validity_days': 14,
        'usage_limit': 1
    },
    {
        'name': 'Transcript Request',
        'type_code': 'transcript_request',
        'description': 'Request official transcripts',
        'price': 20.00,
        'validity_days': 30,
        'usage_limit': 1
    }
]

for vt_data in voucher_types:
    vt, created = VoucherType.objects.get_or_create(
        type_code=vt_data['type_code'],
        defaults=vt_data
    )
    if created:
        print(f"Created voucher type: {vt.name}")
    else:
        print(f"Voucher type already exists: {vt.name}")
EOF

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📱 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   Admin Panel: http://localhost:8000/admin"
echo ""
echo "🔧 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Access backend shell: docker-compose exec backend python manage.py shell"
echo ""
echo "⚠️  Don't forget to:"
echo "   1. Update environment variables in .env files"
echo "   2. Configure Stripe keys for payments"
echo "   3. Set up email configuration for notifications"
