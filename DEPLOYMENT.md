# Deployment Guide for ALL-FIT

## Quick Start

Your application is now ready for production deployment on Vercel!

### What Has Been Done

✅ Backend refactored with:
- Moved `server.js` → `index.js` at backend root
- Added environment variable support (`.env` file)
- Added MongoDB connection via `MONGODB_URI` env var
- Created `vercel.json` configuration for backend
- Added `dotenv` package for environment management

✅ Frontend configured with:
- API endpoint configuration (`config.js`)
- Dynamic API URL from environment variables
- Updated all API calls to use `API_BASE_URL`
- Created `vercel.json` for static file serving
- Added config script to HTML files

✅ Project cleanup:
- Created `.gitignore` with proper exclusions
- Removed all comments and emojis
- Added `.env.example` files for both frontend and backend
- Created comprehensive README.md

## Deployment Steps

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Make project production-ready for Vercel deployment"
git push origin main
```

### Step 2: Deploy Backend on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. **Important**: In "Root Directory", select `all fit backend`
5. Click "Environment Variables" and add:
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://username:password@cluster.mongodb.net/allfit`
6. Click "Deploy"
7. **Note the deployed URL** (e.g., `https://your-backend.vercel.app`)

### Step 3: Deploy Frontend on Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import the same GitHub repository
4. **Important**: In "Root Directory", select `frontend`
5. Click "Environment Variables" and add:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend.vercel.app` (use the URL from Step 2)
6. Click "Deploy"

## Local Development

### Run Backend Locally
```bash
cd "all fit backend"
npm install
npm start
```
Backend runs at: `http://localhost:5000`

### Run Frontend Locally
```bash
cd frontend
npx http-server "Home page"
```
Frontend accessible at: `http://localhost:8080/Home page/index.html`

## File Structure After Setup

```
all-fit/
├── all fit backend/
│   ├── models/
│   │   ├── user.js
│   │   ├── plan.js
│   │   ├── task.js
│   │   └── progress.js
│   ├── index.js              (NEW - main server)
│   ├── package.json          (UPDATED)
│   ├── vercel.json           (NEW)
│   ├── .env                  (NEW - local)
│   └── .env.example          (NEW - template)
├── frontend/
│   ├── Home page/
│   │   ├── index.html
│   │   ├── login.html        (UPDATED)
│   │   ├── register.html     (UPDATED)
│   │   ├── dashboard.html
│   │   ├── script.js         (UPDATED)
│   │   └── ...
│   ├── config.js             (NEW)
│   ├── vercel.json           (NEW)
│   └── .env.example          (NEW)
├── .gitignore                (NEW)
├── README.md                 (NEW)
└── DEPLOYMENT.md             (This file)
```

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/allfit
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend.vercel.app
```

## Important Notes

1. **CORS**: Backend has CORS enabled for all origins. For production, consider restricting to specific domains.

2. **MongoDB**: You need a MongoDB Atlas account (free tier available):
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get your connection string
   - Add it to Vercel environment variables

3. **Security**: Make sure to:
   - Never commit `.env` file (only `.env.example`)
   - Use strong passwords in MongoDB
   - Enable IP whitelist in MongoDB Atlas

4. **Testing API**: After deployment, test your endpoints:
   ```bash
   curl https://your-backend.vercel.app/challenges
   ```

## Troubleshooting

### Backend won't deploy
- Check that `index.js` exists in backend root
- Verify `vercel.json` is correct
- Check build logs in Vercel dashboard

### Frontend API calls fail
- Ensure `REACT_APP_API_URL` is set correctly
- Check browser console for CORS errors
- Verify backend is accessible

### MongoDB connection fails
- Test connection string locally
- Check IP whitelist in MongoDB Atlas
- Verify credentials are correct

## Next Steps

1. Configure MongoDB Atlas
2. Deploy both services
3. Test authentication flow
4. Monitor Vercel dashboard for errors
5. Set up custom domain (optional)

For detailed API documentation, see README.md
