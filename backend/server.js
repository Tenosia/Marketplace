// Import required modules using ES module syntax
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Import route modules
import authRoutes from './routes/auth.route.js';
import { errorHandler } from './middleware/error.middleware.js';

// Load environment variables
dotenv.config({ path: './.env.local' });
const __dirname = path.resolve();

// Create Express app
const app = express();

// Security: Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Parse incoming JSON requests with size limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// Set payload size limit for body-parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Mount authentication routes at /api/auth
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('NFT Marketplace API is running'); // Simple response to verify server is running
});

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
// })

// Error handling middleware
app.use(errorHandler);

// Start the Express server
const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  autoIndex: process.env.NODE_ENV !== 'production',
})
.then(() => {
    console.log('Connected to database');
  
    // Listen for requests after connection has been made to the database
    app.listen(PORT, () => {
        console.log(`Server started listening on port ${PORT}`);
    });
})
.catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});
