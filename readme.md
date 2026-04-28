# ALL-FIT - Fitness Application

A full-stack fitness application with workout plans, progress tracking, and personalized fitness recommendations.

## Project Structure

```
all-fit/
├── all fit backend/          # Express.js backend
│   ├── models/               # MongoDB schemas
│   ├── index.js             # Main server file
│   ├── package.json       
│   └── .env.example         # Environment variables example
├── frontend/                # Static HTML/CSS/JS frontend
│   ├── Home page/          # Frontend files
│   ├── config.js           # API configuration
│   └── .env.example        # Environment variables example
└── .gitignore
```

## Features

- User authentication (Register/Login)
- Personalized workout plans
- Progress tracking
- Task management
- Diet recommendations
- Daily challenges

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git
- Vercel Account (for deployment)

## Local Setup

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd "all fit backend"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/allfit
   PORT=5000
   ```

5. Start the server:
   ```bash
   npm start
   ```

   Server will run at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` if needed:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Open `Home page/index.html` in your browser or use a local server:
   ```bash
   npx http-server "Home page"
   ```

## Running the Application

### Development

1. Start MongoDB (if running locally)
2. Start backend: `cd "all fit backend" && npm start`
3. Open frontend: Open `Home page/index.html` in browser or serve with http-server

### Production

The application is configured for Vercel deployment with both backend and frontend.

## Deployment to Vercel

### Backend Deployment

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "New Project"

4. Import your GitHub repository

5. Select the `all fit backend` folder as the root directory

6. Add environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string

7. Deploy

### Frontend Deployment

1. Go to [Vercel](https://vercel.com) and create a new project

2. Import the same GitHub repository

3. Select the `frontend` folder as the root directory

4. Add environment variables:
   - `REACT_APP_API_URL`: Your deployed backend URL (from backend deployment)

5. Deploy

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/allfit
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.vercel.app
```

## API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - Login user

### User
- `GET /user?email=email` - Get user profile
- `PUT /user` - Update user profile

### Workout Plans
- `GET /plans?email=email` - Get user plans
- `GET /plans/:id` - Get specific plan
- `POST /plans` - Create new plan
- `POST /plans/regenerate` - Generate AI plan
- `DELETE /plans/:id` - Delete plan

### Tasks
- `GET /tasks?email=email` - Get user tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Progress
- `GET /progress?email=email` - Get progress records
- `POST /progress` - Add progress record
- `PUT /progress/:id` - Update progress
- `DELETE /progress/:id` - Delete progress

### Other
- `GET /challenges` - Get daily challenges
- `POST /diet/regenerate` - Get diet recommendations

## Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  age: Number,
  height: Number,
  weight: Number,
  goal: String,
  time: Number,
  level: String
}
```

### Plan
```javascript
{
  ownerEmail: String,
  title: String,
  createdAt: Date,
  days: [{
    dayIndex: Number,
    workouts: [{
      name: String,
      sets: Number,
      reps: String,
      durationMin: Number,
      notes: String
    }]
  }]
}
```

## Technologies Used

### Backend
- Express.js
- MongoDB
- Mongoose
- bcrypt (password hashing)
- CORS

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

## Security Notes

- Passwords are hashed using bcrypt
- CORS is enabled for cross-origin requests
- MongoDB connection uses environment variables
- Sensitive data is not exposed to frontend

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally or MongoDB Atlas is accessible
- Check MONGODB_URI in .env file
- Verify network access in MongoDB Atlas

### API Not Responding
- Check if backend is running on correct port
- Verify REACT_APP_API_URL in frontend .env
- Check browser console for CORS errors

### Build/Deploy Issues
- Clear node_modules and reinstall: `npm install`
- Check Vercel build logs
- Ensure all environment variables are set

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Push and create a pull request

## License

MIT

## Support

For issues and questions, please open an issue in the repository.
