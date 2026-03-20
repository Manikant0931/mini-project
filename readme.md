ALL FIT – Fitness & Nutrition Web Application
Project Overview

ALL FIT is a web-based application designed to help users manage their fitness journey in a simple and structured way. It provides personalized workout plans and vegetarian meal suggestions based on user details such as age, height, weight, and fitness goals.

The main goal of this project is to reduce confusion, save time, and help users maintain consistency in their fitness routine.

Objectives

To design and develop a web-based fitness platform

To collect and analyze user-specific fitness data

To generate personalized workout and diet plans

To track user progress over time

To provide a simple and user-friendly interface

Features

User registration and login system

Personalized workout plans

Fitness level detection (beginner, intermediate, advanced)

Vegetarian meal planning

Structured workout routines

Progress tracking

Limited and effective exercise recommendations

Data storage and management

Tech Stack
Frontend

HTML

CSS

JavaScript

Backend

Node.js

Express.js

Database

MongoDB

System Workflow

User enters basic details such as age, height, weight, and fitness goals

The system analyzes the data and determines the fitness level

A personalized workout plan and meal plan are generated

Data is stored in the database

User progress is tracked over time

The data flow diagram (page 3 of the synopsis) shows how user input is processed and stored in the system.

System Design

The application follows a three-tier architecture:

Frontend: User interface for interaction

Backend: Handles business logic and API requests

Database: Stores user data, plans, and progress

The ER diagram (page 3) includes entities such as User, Workout Plan, Meal Plan, and Progress.

Implementation Plan

Requirement Analysis

System Design

Frontend Development

Backend Development

Database Integration

Feature Implementation

Testing and Debugging

Deployment

Team Members

Frontend:

Yashwant Rai

Suryansh Gupta

Backend:

Harikesh Singh

Manikant

Database:

Manvendra Singh

Requirements
Software Requirements

Visual Studio Code

Web Browser (Chrome or Edge)

Node.js

MongoDB

Git (optional)

Hardware Requirements

Computer/Laptop with minimum 4GB RAM

Stable Internet connection

Expected Outcome

The project will result in a fully functional web-based application that provides users with effective and personalized fitness and nutrition guidance. It will help users save time, reduce confusion, and maintain consistency in their fitness journey.

Future Scope

Improved recommendation system using AI

Mobile application development

Advanced analytics and insights

Integration with wearable devices

Conclusion

This project focuses on building a simple, user-friendly, and efficient fitness and nutrition planning system. It combines workout and diet planning in one platform, helping users achieve their fitness goals without confusion or unnecessary effort.

If you want next level improvement, I can add:

deployment steps (very important for GitHub)

screenshots section

API routes documentation (to impress evaluator)

API routes documentation (to impress evaluator) add and generat ein a foormta so that i whave to just copy paste

Here is your final README.md with API documentation added (clean, professional, copy-paste ready):

ALL FIT – Fitness & Nutrition Web Application
Project Overview

ALL FIT is a web-based application designed to help users manage their fitness journey in a simple and structured way. It provides personalized workout plans and vegetarian meal suggestions based on user details such as age, height, weight, and fitness goals.

The main goal of this project is to reduce confusion, save time, and help users maintain consistency in their fitness routine.

Objectives

To design and develop a web-based fitness platform

To collect and analyze user-specific fitness data

To generate personalized workout and diet plans

To track user progress over time

To provide a simple and user-friendly interface

Features

User registration and login system

Personalized workout plans

Fitness level detection (beginner, intermediate, advanced)

Vegetarian meal planning

Structured workout routines

Progress tracking

Limited and effective exercise recommendations

Data storage and management

Tech Stack
Frontend

HTML

CSS

JavaScript

Backend

Node.js

Express.js

Database

MongoDB

System Workflow

User enters basic details such as age, height, weight, and fitness goals

The system analyzes the data and determines the fitness level

A personalized workout plan and meal plan are generated

Data is stored in the database

User progress is tracked over time

The data flow diagram (page 3 of the synopsis) shows how user input is processed and stored in the system.

System Design

The application follows a three-tier architecture:

Frontend: User interface for interaction

Backend: Handles business logic and API requests

Database: Stores user data, plans, and progress

The ER diagram (page 3) includes entities such as User, Workout Plan, Meal Plan, and Progress.

API Routes Documentation
Base URL
http://localhost:5000/api
Authentication Routes
Register User
POST /auth/register

Request Body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}

Response:

{
  "message": "User registered successfully"
}
Login User
POST /auth/login

Request Body:

{
  "email": "john@example.com",
  "password": "123456"
}

Response:

{
  "message": "Login successful",
  "token": "jwt_token_here"
}
User Routes
Get User Profile
GET /users/profile

Headers:

Authorization: Bearer <token>

Response:

{
  "name": "John Doe",
  "age": 22,
  "height": 170,
  "weight": 65,
  "goal": "Weight Loss"
}
Update User Data
PUT /users/update

Headers:

Authorization: Bearer <token>

Request Body:

{
  "age": 23,
  "height": 172,
  "weight": 68,
  "goal": "Muscle Gain"
}
Workout Routes
Get Workout Plan
GET /workout

Response:

{
  "level": "Beginner",
  "exercises": [
    "Push-ups",
    "Squats",
    "Plank"
  ]
}
Meal Plan Routes
Get Meal Plan
GET /meals

Response:

{
  "type": "Vegetarian",
  "meals": [
    "Oats",
    "Dal",
    "Vegetable Salad"
  ]
}
Progress Routes
Add Progress
POST /progress

Request Body:

{
  "date": "2026-03-20",
  "weight": 64,
  "status": "Improving"
}
Get Progress
GET /progress

Response:

[
  {
    "date": "2026-03-19",
    "weight": 65,
    "status": "Stable"
  },
  {
    "date": "2026-03-20",
    "weight": 64,
    "status": "Improving"
  }
]
Implementation Plan

Requirement Analysis

System Design

Frontend Development

Backend Development

Database Integration

Feature Implementation

Testing and Debugging

Deployment

Team Members

Frontend:

Yashwant Rai

Suryansh Gupta

Backend:

Harikesh Singh

Manikant

Database:

Manvendra Singh

Requirements
Software Requirements

Visual Studio Code

Web Browser (Chrome or Edge)

Node.js

MongoDB

Git (optional)

Hardware Requirements

Computer/Laptop with minimum 4GB RAM

Stable Internet connection

Expected Outcome

The project will result in a fully functional web-based application that provides users with effective and personalized fitness and nutrition guidance. It will help users save time, reduce confusion, and maintain consistency in their fitness journey.

Future Scope

Improved recommendation system using AI

Mobile application development

Advanced analytics and insights

Integration with wearable devices

Conclusion

This project focuses on building a simple, user-friendly, and efficient fitness and nutrition planning system. It combines workout and diet planning in one platform, helping users achieve their fitness goals without confusion or unnecessary effort.