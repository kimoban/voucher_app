import os
import django
from django.conf import settings

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'voucher_project.settings')
django.setup()

print("Django setup successful!")
print("Installed apps:", settings.INSTALLED_APPS)
print("Database:", settings.DATABASES['default']['NAME'])

# Test database connection
from django.db import connection
try:
    with connection.cursor() as cursor:
        cursor.execute("SELECT 1")
        print("Database connection: OK")
except Exception as e:
    print(f"Database connection error: {e}")
    