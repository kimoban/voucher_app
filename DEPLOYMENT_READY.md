# 🚀 Quick Deployment Reference

## Files Created for Deployment

### Backend (Render)

✅ `backend/Procfile` - Process configuration
✅ `backend/runtime.txt` - Python version
✅ `backend/build.sh` - Build script
✅ `backend/voucher_project/celery.py` - Celery configuration
✅ `backend/static/` - Static files directory
✅ `backend/logs/` - Logs directory
✅ `backend/media/` - Media files directory
✅ `backend/.gitignore` - Git ignore rules

### Frontend (Vercel)

✅ `frontend/vercel.json` - Vercel configuration
✅ `frontend/.gitignore` - Git ignore rules

### Root Level

✅ `render.yaml` - Infrastructure as code
✅ `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
✅ `.gitignore` - Root git ignore

## URLs Configuration

✅ All app URLs properly configured:

```bash
   - `apps/authentication/urls.py`
   - `apps/vouchers/urls.py`
   - `apps/payments/urls.py`
   - `apps/analytics/urls.py`
   - `voucher_project/urls.py` (main URLs updated)
   ```

## Environment Variables Needed

### Backend (.env)

```bash
SECRET_KEY=<generate-strong-key>
DEBUG=False
ALLOWED_HOSTS=your-backend-domain.onrender.com
DATABASE_URL=<from-render-postgres>
REDIS_URL=<from-render-redis>
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
NEXT_PUBLIC_APP_NAME=Voucher App
NEXT_PUBLIC_APP_URL=https://your-frontend.vercel.app
```

## Quick Deploy Commands

### 1. Test Backend Locally

```bash
cd backend
python manage.py check --deploy
python manage.py migrate
python manage.py collectstatic
python manage.py runserver
```

### 2. Test Frontend Locally

```bash
cd frontend
npm run build
npm start
```

### 3. Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 4. Deploy Backend (Render)

- Create PostgreSQL database
- Create Redis instance
- Create Web Service
- Add environment variables
- Deploy automatically from GitHub

### 5. Deploy Frontend (Vercel)

- Import GitHub repository
- Set root directory to `frontend`
- Add environment variables
- Deploy

## Post-Deployment Tasks

1. **Create Superuser:**

   ```bash
   # In Render Shell
   python manage.py createsuperuser
   ```

2. **Create Sample Data:**
   - Login to admin: `https://your-backend.onrender.com/admin/`
   - Create Voucher Types

3. **Test Everything:**
   - Visit frontend: `https://your-frontend.vercel.app`
   - Test registration/login
   - Test voucher purchase
   - Test payment flow

## Health Check URLs

- Backend Health: `https://your-backend.onrender.com/api/health/`
- Backend Admin: `https://your-backend.onrender.com/admin/`
- Frontend: `https://your-frontend.vercel.app`

## Cost Estimate

- Render PostgreSQL: $7/month
- Render Redis: $10/month
- Render Web Service: Free or $7/month
- Vercel: Free
- **Total: $17-24/month**

## Troubleshooting

### Backend Won't Start

1. Check Render logs
2. Verify DATABASE_URL
3. Check environment variables
4. Verify migrations ran

### Frontend Can't Connect

1. Check NEXT_PUBLIC_API_URL
2. Verify CORS settings
3. Check ALLOWED_HOSTS
4. Review browser console

### Database Issues

1. Check DATABASE_URL format
2. Verify migrations
3. Check database status in Render

## Support Links

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/)

---

## Your project is 100% deployment-ready! 🎉

See DEPLOYMENT_GUIDE.md for detailed step-by-step instructions.
