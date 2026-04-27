# Vercel Deployment Configuration Template

## For Backend Deployment

Create `vercel.json` in `all fit backend/` folder on Vercel:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

## For Frontend Deployment

Create `vercel.json` in `frontend/` folder on Vercel:

```json
{
  "buildCommand": "echo 'Frontend built'",
  "outputDirectory": ".",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ]
}
```

## Vercel Dashboard Setup

### Backend Project
1. Name: `all-fit-backend`
2. Root Directory: `all fit backend`
3. Environment Variables:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/allfit?retryWrites=true&w=majority
   PORT = 5000
   NODE_ENV = production
   ```

### Frontend Project
1. Name: `all-fit-frontend`
2. Root Directory: `frontend`
3. Environment Variables:
   ```
   REACT_APP_API_URL = https://all-fit-backend.vercel.app
   ```

## After Deployment

1. Test backend health: `https://your-backend.vercel.app/challenges`
2. Test frontend: `https://your-frontend.vercel.app`
3. Test authentication flow (register → login → dashboard)
