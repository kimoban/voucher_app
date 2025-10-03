#!/bin/bash
# Build script for Render deployment

set -o errexit  # Exit on error

echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo "🗄️  Running migrations..."
python manage.py migrate --no-input

echo "📊 Collecting static files..."
python manage.py collectstatic --no-input --clear

echo "✅ Build completed successfully!"
