# NFT Marketplace

A full-stack NFT marketplace application built with React, TypeScript, Node.js, Express, and MongoDB.

## Project Overview

This is a modern NFT marketplace platform that allows users to create, buy, sell, and trade non-fungible tokens. The application features a responsive frontend built with React and TypeScript, and a robust backend API built with Node.js and Express.

## Features

### User Features
- User authentication and authorization
- Google OAuth integration
- User profile management
- NFT creation and minting
- NFT browsing and discovery
- Marketplace functionality
- Collection management
- Rankings and statistics
- Dark mode support

### Technical Features
- RESTful API architecture
- JWT-based authentication
- Email verification system
- Password reset with OTP
- Secure password hashing
- Responsive design
- Modern UI/UX

## Project Structure

```
my-nft-marketplace/
├── frontend/          # React + TypeScript frontend application
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context providers
│   │   └── utils/        # Utility functions
│   └── public/           # Static assets
│
└── backend/           # Node.js + Express backend API
    ├── controllers/   # Route controllers
    ├── middleware/    # Custom middleware
    ├── models/        # MongoDB models
    ├── routes/        # API routes
    └── utils/         # Utility functions
```

## Technology Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS
- Framer Motion
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Nodemailer for email services
- Cookie Parser

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Environment variables configured

### Installation

1. Clone the repository
2. Navigate to the project directory

### Backend Setup

1. Navigate to the backend directory
2. Install dependencies
3. Create a `.env.local` file with the following variables:
   - MONGO_URI: Your MongoDB connection string
   - SECRET_ACCESS_KEY: JWT secret key
   - PORT: Server port (default: 5000)
   - Email service configuration (for Nodemailer)

4. Start the development server

### Frontend Setup

1. Navigate to the frontend directory
2. Install dependencies
3. Create a `.env` file with:
   - VITE_BASE_URL: Backend API URL

4. Start the development server

## Available Scripts

### Backend Scripts
- `npm start`: Start the production server
- `npm run dev`: Start the development server with nodemon

### Frontend Scripts
- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## API Endpoints

### Authentication
- POST /api/auth/signup - Register a new user
- POST /api/auth/signin - Login user
- GET /api/auth/signout - Logout user
- POST /api/auth/google-auth - Google OAuth authentication
- POST /api/auth/generateOTP - Generate password reset OTP
- POST /api/auth/verifyOTP - Verify OTP
- GET /api/auth/:id/verify/:token - Verify user email
- GET /api/auth/resendVerificationMail/:id - Resend verification email
- POST /api/auth/resetPassword - Reset password (protected)
- POST /api/auth/changePassword - Change password (protected)
- GET /api/auth/read-cookies - Read authentication cookies

## Environment Variables

### Backend (.env.local)
- MONGO_URI: MongoDB connection string
- SECRET_ACCESS_KEY: JWT secret key
- PORT: Server port number
- Email service credentials

### Frontend (.env)
- VITE_BASE_URL: Backend API base URL

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Secure cookie handling
- CORS configuration
- Input validation
- Error handling middleware
- Email verification system

## Development

The project follows modern development practices:
- TypeScript for type safety
- ESLint for code quality
- Component-based architecture
- RESTful API design
- Modular code structure

## Production Build

### Backend
The backend runs directly with Node.js. Ensure environment variables are set in production.

### Frontend
Build the frontend for production using:
```
npm run build
```

The build output will be in the `dist` directory, which can be served statically or integrated with the backend.

## Contributing

When contributing to this project:
1. Follow the existing code style
2. Write clear commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## License

This project is licensed under ISC.

## Notes

- Ensure MongoDB is running before starting the backend
- Configure email service properly for verification emails
- Use strong secret keys in production
- Keep environment variables secure and never commit them to version control

