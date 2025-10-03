# Voucher App API Endpoints Guide

## Base URL

- **Development:** `http://127.0.0.1:8000`
- **Frontend:** `http://localhost:3000`

## Quick Test Endpoints

### 1. Health Check (Public)

```url
GET http://127.0.0.1:8000/api/health/
```

**Expected Response:**

```json
{
  "status": "healthy",
  "django": "running"
}
```

### 2. Test Endpoint (Public)

```url
GET http://127.0.0.1:8000/api/test/
```

**Expected Response:**

```json
{
  "message": "API is working!",
  "version": "1.0.0"
}
```

### 3. Voucher Types (Public)

```url
GET http://127.0.0.1:8000/api/vouchers/types/
```

**Expected Response:** Array of voucher types with pricing and details

## Authentication Endpoints

### Register New User

```url
POST http://127.0.0.1:8000/api/auth/register/
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "SecurePass123!",
  "password_confirm": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe"
}
```

### Login (PowerShell)

```url
POST http://127.0.0.1:8000/api/auth/login/
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "SecurePass123!"
}
```

**Response includes:**

- `access` - JWT access token (valid for 60 minutes)
- `refresh` - JWT refresh token (valid for 7 days)
- `user` - User profile information

### Refresh Token

```url
POST http://127.0.0.1:8000/api/auth/token/refresh/
Content-Type: application/json

{
  "refresh": "your-refresh-token-here"
}
```

### Get User Profile (Protected)

```url
GET http://127.0.0.1:8000/api/auth/profile/
Authorization: Bearer your-access-token-here
```

## Voucher Endpoints

### List All Voucher Types (Public)

```url
GET http://127.0.0.1:8000/api/vouchers/types/
```

### List My Vouchers (Protected)

```url
GET http://127.0.0.1:8000/api/vouchers/my-vouchers/
Authorization: Bearer your-access-token-here
```

### Purchase Voucher (Protected)

```url
POST http://127.0.0.1:8000/api/vouchers/purchase/
Authorization: Bearer your-access-token-here
Content-Type: application/json

{
  "voucher_type_id": 1,
  "quantity": 1
}
```

### Redeem Voucher (Protected)

```url
POST http://127.0.0.1:8000/api/vouchers/redeem/
Authorization: Bearer your-access-token-here
Content-Type: application/json

{
  "code": "VOUCHER-CODE-HERE",
  "service_type": "exam_results"
}
```

### Get Voucher Details (Protected)

```url
GET http://127.0.0.1:8000/api/vouchers/detail/VOUCHER-CODE/
Authorization: Bearer your-access-token-here
```

### Get Voucher Statistics (Protected)

```url
GET http://127.0.0.1:8000/api/vouchers/stats/
Authorization: Bearer your-access-token-here
```

### Get Usage History (Protected)

```url
GET http://127.0.0.1:8000/api/vouchers/usage-history/
Authorization: Bearer your-access-token-here
```

## Payment Endpoints

### Create Payment Intent (Protected)

```url
POST http://127.0.0.1:8000/api/payments/create-payment-intent/
Authorization: Bearer your-access-token-here
Content-Type: application/json

{
  "voucher_type_id": 1,
  "quantity": 1
}
```

### Confirm Payment (Protected)

```url
POST http://127.0.0.1:8000/api/payments/confirm-payment/
Authorization: Bearer your-access-token-here
Content-Type: application/json

{
  "payment_intent_id": "pi_xxxxx",
  "voucher_type_id": 1,
  "quantity": 1
}
```

### Payment History (Protected)

```url
GET http://127.0.0.1:8000/api/payments/history/
Authorization: Bearer your-access-token-here
```

### Get Transaction Details (Protected)

```url
GET http://127.0.0.1:8000/api/payments/transaction/123/
Authorization: Bearer your-access-token-here
```

## Analytics Endpoints

### Dashboard Analytics (Protected)

```url
GET http://127.0.0.1:8000/api/analytics/dashboard/
Authorization: Bearer your-access-token-here
```

## Admin Panel

```url
http://127.0.0.1:8000/admin/
```

**Note:** You need to create a superuser first:

```bash
python manage.py createsuperuser
```

## Testing with cURL (PowerShell)

### Test Health Endpoint

```powershell
Invoke-WebRequest -Uri http://127.0.0.1:8000/api/health/ -UseBasicParsing | Select-Object StatusCode, Content
```

### Test Voucher Types

```powershell
Invoke-WebRequest -Uri http://127.0.0.1:8000/api/vouchers/types/ -UseBasicParsing | ConvertFrom-Json
```

### Register a User

```powershell
$body = @{
    email = "test@example.com"
    password = "SecurePass123!"
    password_confirm = "SecurePass123!"
    first_name = "John"
    last_name = "Doe"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://127.0.0.1:8000/api/auth/register/ -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
```

### Login

```powershell
$body = @{
    email = "test@example.com"
    password = "SecurePass123!"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri http://127.0.0.1:8000/api/auth/login/ -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
$response.Content | ConvertFrom-Json
```

## Testing with Python

```python
import requests

# Test health
response = requests.get('http://127.0.0.1:8000/api/health/')
print(f"Health: {response.json()}")

# Get voucher types
response = requests.get('http://127.0.0.1:8000/api/vouchers/types/')
print(f"Voucher Types: {response.json()}")

# Register user
response = requests.post('http://127.0.0.1:8000/api/auth/register/', json={
    'email': 'test@example.com',
    'password': 'SecurePass123!',
    'password_confirm': 'SecurePass123!',
    'first_name': 'John',
    'last_name': 'Doe'
})
print(f"Register: {response.status_code}")

# Login
response = requests.post('http://127.0.0.1:8000/api/auth/login/', json={
    'email': 'test@example.com',
    'password': 'SecurePass123!'
})
tokens = response.json()
access_token = tokens['access']

# Get profile (authenticated)
headers = {'Authorization': f'Bearer {access_token}'}
response = requests.get('http://127.0.0.1:8000/api/auth/profile/', headers=headers)
print(f"Profile: {response.json()}")
```

## Common Response Codes

- **200 OK** - Request successful
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid data sent
- **401 Unauthorized** - Authentication required or token invalid
- **403 Forbidden** - Permission denied
- **404 Not Found** - Endpoint or resource not found
- **500 Internal Server Error** - Server error

## Important Notes

1. **Trailing Slashes:** Django requires trailing slashes on endpoints (e.g., `/api/health/` not `/api/health`)

2. **Authentication:** Protected endpoints require a Bearer token in the Authorization header:

   ```bash
   Authorization: Bearer your-jwt-access-token
   ```

3. **CORS:** The backend is configured to accept requests from `http://localhost:3000` (frontend)

4. **Content-Type:** Always include `Content-Type: application/json` for POST/PUT requests

5. **Token Expiry:**
   - Access tokens expire after 60 minutes
   - Refresh tokens expire after 7 days
   - Use the refresh endpoint to get a new access token

## Frontend Integration

The frontend uses the API through `src/lib/api.ts` which handles:

- Automatic token refresh when access token expires
- Authorization headers
- Error handling
- Type-safe requests

Example usage in frontend:

```typescript
import { authApi, vouchersApi } from '@/lib/api';

// Login
const { access, refresh, user } = await authApi.login(email, password);

// Get voucher types
const types = await vouchersApi.getVoucherTypes();

// Purchase voucher (authenticated)
const result = await vouchersApi.purchaseVoucher(voucherTypeId, quantity);
```
