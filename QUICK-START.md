# ⚡ Quick Start - Jal Samarthya

## 🏠 Localhost (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file (pre-configured)
cp .env.example .env

# 3. Setup database
npm run db:push

# 4. Start development
npm run dev
```

**Open:** http://localhost:5000

---

## 🌐 Netlify Deployment (10 minutes)

### 1. Build Project
```bash
npm run build
```

### 2. Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) → Sign up
2. **Drag entire project folder** to deploy area
3. Wait 2-3 minutes

### 3. Add Environment Variables
In **Site Settings → Environment Variables**, add:

```
DATABASE_URL = postgresql://neondb_owner:npg_zf5e4wxbyFWc@ep-sparkling-frost-aela9u1m.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require

GEE_API_KEY = 963435663114-sqn02ilohrkq64nql6oldp8up57dt98m.apps.googleusercontent.com

SESSION_SECRET = jal_samarthya_secure_session_key_2024

NODE_ENV = production
```

### 4. Redeploy
**Deploys tab** → **Trigger deploy** → Wait 3 minutes

---

## ✅ Test Features

- **Logo**: New custom logo in header
- **Map**: Interactive satellite analysis
- **Reports**: Community environmental reporting
- **Analytics**: Data visualization charts
- **Mobile**: Responsive design

---

## 📚 Detailed Guides

- **Localhost**: See `LOCALHOST-SETUP-GUIDE.md`
- **Netlify**: See `NETLIFY-DEPLOYMENT-GUIDE.md`

**Your environmental monitoring platform supporting Namami Gange is ready!**