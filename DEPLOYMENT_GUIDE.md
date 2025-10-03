# 🚀 Deployment Guide

This guide will help you deploy the Voucher App to production using Render (backend) and Vercel (frontend).

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Render account ([https://render.com](https://render.com))
- [ ] Vercel account ([https://vercel.com](https://vercel.com))
- [ ] Stripe account ([https://stripe.com](https://stripe.com))
- [ ] Email service (Gmail with App Password)

---

## 🔧 Part 1: Deploy Backend to Render

### Step 1: Prepare Environment Variables

Create a text file with these environment variables (you'll paste them into Render):

```bash
SECRET_KEY=<generate-a-strong-random-key>
DEBUG=False
ALLOWED_HOSTS=voucher-app-backend.onrender.com,yourdomain.com
DATABASE_URL=<will-be-auto-generated-by-render>
REDIS_URL=<will-be-auto-generated-by-render>
STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
STRIPE_SECRET_KEY=sk_live_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@voucherapp.com
FRONTEND_URL=https://yourdomain.vercel.app
```

**Generate SECRET_KEY:**

```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 2: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Ready for deployment"
git branch -M main
git remote add origin https://github.com/yourusername/voucher-app.git
git push -u origin main
```

### Step 3: Create PostgreSQL Database

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - Name: `voucher-app-db`
   - Database: `voucher_app`
   - User: `voucher_app_user`
   - Region: Oregon (or nearest to you)
   - Plan: Starter ($7/month)
4. Click "Create Database"
5. **Copy the Internal Database URL** (you'll need this)

### Step 4: Create Redis Instance

1. Click "New +" → "Redis"
2. Configure:
   - Name: `voucher-app-redis`
   - Region: Same as database
   - Plan: Starter ($10/month)
   - Maxmemory Policy: `allkeys-lru`
3. Click "Create Redis"
4. **Copy the Internal Redis URL**

### Step 5: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - Name: `voucher-app-backend`
   - Region: Same as database and Redis
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Python 3`
   - Build Command: `./build.sh`
   - Start Command: `gunicorn voucher_project.wsgi:application`
   - Plan: Starter ($7/month)

4. **Add Environment Variables:**
   - Click "Advanced" → "Add Environment Variable"
   - Add all the variables from Step 1
   - Use the Database and Redis URLs from Steps 3 & 4

5. Click "Create Web Service"

### Step 6: Wait for Deployment

- Render will build and deploy your backend
- This takes 5-10 minutes
- Watch the logs for any errors
- Once complete, you'll get a URL like: `https://voucher-app-backend.onrender.com`

### Step 7: Create Superuser

1. Go to your web service in Render dashboard
2. Click "Shell" tab
3. Run:

```bash
python manage.py createsuperuser
```

4. Follow the prompts to create admin user

### Step 8: Test Backend

Visit these URLs to verify:

- Health: `https://voucher-app-backend.onrender.com/api/health/`
- Admin: `https://voucher-app-backend.onrender.com/admin/`
- API: `https://voucher-app-backend.onrender.com/api/vouchers/types/`

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project

1. Click "Add New..." → "Project"
2. Select your voucher-app repository
3. Configure:
   - Framework Preset: `Next.js`
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

### Step 3: Configure Environment Variables

Add these environment variables:

```bash
NEXT_PUBLIC_API_URL=https://voucher-app-backend.onrender.com/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key_here
NEXT_PUBLIC_APP_NAME=Voucher App
NEXT_PUBLIC_APP_URL=https://yourdomain.vercel.app
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://voucher-app-xyz.vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate to provision (automatic)

---

## 🔗 Part 3: Connect Frontend & Backend

### Step 1: Update Backend CORS

1. Go to Render dashboard → Web Service
2. Go to Environment
3. Update `ALLOWED_HOSTS`:

   ```bash
   voucher-app-backend.onrender.com,voucher-app-xyz.vercel.app,yourdomain.com
   ```

4. Update `CORS_ALLOWED_ORIGINS` (add to settings.py):

   ```python
   CORS_ALLOWED_ORIGINS = [
       "https://voucher-app-xyz.vercel.app",
       "https://yourdomain.com",
   ]
   ```

5. Commit changes and push to GitHub (Render will auto-deploy)

### Step 2: Test Integration

1. Visit your Vercel URL
2. Try registering a new user
3. Try logging in
4. Check if API calls work
5. Verify payment flow

---

## ⚙️ Part 4: Configure Services

### Stripe Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://voucher-app-backend.onrender.com/api/payments/webhook/`
4. Events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy the webhook secret
6. Update `STRIPE_WEBHOOK_SECRET` in Render

### Email Configuration

**Using Gmail:**

1. Enable 2-Factor Authentication
2. Go to Google Account → Security → App Passwords
3. Generate new app password for "Mail"
4. Use this as `EMAIL_HOST_PASSWORD`

---

## 🎉 Part 5: Post-Deployment

### Create Sample Data

1. Go to admin panel: `https://voucher-app-backend.onrender.com/admin/`
2. Login with superuser credentials
3. Create Voucher Types (Result Check, Application, etc.)
4. Set pricing and validity

### Monitor Logs

**Render:**

- Go to your service → Logs tab
- Monitor for errors

**Vercel:**

- Go to your project → Deployments → View Function Logs
- Check for frontend errors

### Set Up Monitoring (Optional)

**Sentry for Error Tracking:**

1. Create Sentry account
2. Add Sentry to both frontend and backend
3. Monitor errors in real-time

---

## 📊 Deployment Checklist

### Pre-Deployment

- [x] All deployment files created
- [ ] Environment variables prepared
- [ ] Stripe account configured
- [ ] Email service configured
- [ ] Code pushed to GitHub

### Backend (Render)

- [ ] PostgreSQL database created
- [ ] Redis instance created
- [ ] Web service deployed
- [ ] Environment variables configured
- [ ] Superuser created
- [ ] Sample data added
- [ ] API endpoints tested

### Frontend (Vercel)

- [ ] Project imported
- [ ] Environment variables configured
- [ ] Domain configured (if custom)
- [ ] Build successful
- [ ] Site accessible

### Integration

- [ ] CORS configured
- [ ] API connection working
- [ ] Authentication working
- [ ] Payments working
- [ ] Webhooks configured

---

## 🐛 Troubleshooting

### Backend not starting

- Check logs in Render dashboard
- Verify DATABASE_URL is correct
- Ensure all migrations ran successfully
- Check that all required environment variables are set

### Frontend can't connect to backend

- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings in Django
- Ensure ALLOWED_HOSTS includes frontend domain
- Check browser console for CORS errors

### Database errors

- Verify DATABASE_URL format
- Check if migrations completed
- Ensure database is running (Render shows status)

### Static files not loading

- Run `python manage.py collectstatic` in Render shell
- Check STATIC_ROOT and STATICFILES_DIRS settings
- Verify WhiteNoise is configured

---

## 💰 Monthly Costs

- Render PostgreSQL: $7/month
- Render Redis: $10/month  
- Render Web Service: Free tier or $7/month
- Vercel: Free
- **Total: ~$17-24/month**

---

## 🔐 Security Checklist

- [ ] DEBUG=False in production
- [ ] Strong SECRET_KEY generated
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] Database credentials secured
- [ ] API keys in environment variables
- [ ] Stripe keys are live keys (not test)
- [ ] Email credentials secured

---

## 📚 Additional Resources

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 🆘 Support

If you encounter issues:

1. Check logs in Render and Vercel dashboards
2. Review Django and Next.js documentation
3. Check GitHub Issues
4. Contact support:
   - Render: [support@render.com](mailto:support@render.com)
   - Vercel: [support@vercel.com](mailto:support@vercel.com)

---

## 🎉 Congratulations Your Voucher App is now live
