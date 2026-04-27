# MongoDB Atlas Setup Guide - Step by Step

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign Up"
3. Create account with email or Google/GitHub
4. Verify your email

## Step 2: Create a Cluster

1. After login, click "Create" button
2. Choose "M0" (Free tier) - includes 512 MB storage
3. Select your cloud provider (AWS recommended)
4. Choose region closest to you
5. Click "Create Deployment"

## Step 3: Security - Create Database User

1. In the "Security" section, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username: `allfit_user` (or your preference)
5. Enter password: **Save this password securely**
6. Select role: "Atlas admin" (for development)
7. Click "Add User"

## Step 4: Whitelist IP Address

1. Go to "Network Access" tab
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - For production: Enter your Vercel IP or office IP
4. Click "Confirm"

## Step 5: Get Connection String

1. Go back to "Databases" section
2. Click "Connect" button on your cluster
3. Select "Drivers" option
4. Choose "Node.js" driver
5. Copy the connection string
   
   Format: `mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority`

## Step 6: Replace Credentials

Replace in the connection string:
- `<username>` → Your database user (e.g., allfit_user)
- `<password>` → Your database password (URL encode special chars)
- `<cluster-name>` → Your cluster name (shown in connection string)
- `<database-name>` → allfit (our database name)

**Example:**
```
mongodb+srv://allfit_user:myPassword123@cluster0.abc123.mongodb.net/allfit?retryWrites=true&w=majority
```

## Step 7: Test Connection Locally

1. Update `.env` file with your connection string:
   ```
   MONGODB_URI=mongodb+srv://allfit_user:myPassword123@cluster0.abc123.mongodb.net/allfit?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=production
   ```

2. Start backend:
   ```bash
   cd "all fit backend"
   npm start
   ```

3. Check console for "DB Connected" message

## Step 8: Set Environment Variable in Vercel

1. Go to Vercel project settings
2. Go to "Environment Variables"
3. Add new variable:
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://allfit_user:myPassword123@cluster0.abc123.mongodb.net/allfit?retryWrites=true&w=majority`
4. Select environment: Production, Preview, Development
5. Click "Save"

## Important Security Notes

1. **Never commit `.env` file to Git** - Only commit `.env.example`
2. **URL Encode passwords** with special characters:
   - `@` → `%40`
   - `#` → `%23`
   - `:` → `%3A`
   - Use: https://www.urlencoder.org/

3. **Production Security**:
   - Use strong passwords (20+ characters)
   - In production, whitelist only Vercel's IP
   - Regularly rotate database passwords
   - Monitor cluster usage in Atlas dashboard

4. **Connection Pooling**:
   - MongoDB Atlas automatically handles connection pooling
   - Default max connections: 100 for free tier
   - Sufficient for most applications

## Troubleshooting Connection Issues

### "Authentication failed" error
- Check username and password are correct
- Verify IP is whitelisted
- Check database name is correct
- URL encode special characters in password

### "Connection timeout"
- Verify IP whitelist includes your address
- Check MongoDB cluster is running
- Try "Allow Access from Anywhere" temporarily for testing

### "Cannot find module" errors
- Run `npm install` to install dependencies
- Check all required packages in package.json

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| DB not connecting | Check IP whitelist, credentials, connection string |
| Slow connection | Choose region closest to Vercel deployment |
| Connection drops | Enable "retryWrites=true" in connection string |
| Too many connections | Check for connection leaks in code |

## Database Schema

Your database will auto-create collections:
- `users` - User accounts and profiles
- `plans` - Workout plans
- `tasks` - User tasks
- `progresses` - Progress records

## Next Steps After Setup

1. Test all API endpoints locally
2. Verify authentication (register/login) works
3. Deploy backend to Vercel with MONGODB_URI
4. Deploy frontend with correct API URL
5. Test end-to-end on Vercel deployment
