const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const errorHandler = require('./middleware/errorHandler');
const validateEnv = require('./middleware/validateEnv');

// Validate environment variables on startup
validateEnv();

const app = express();

// Security & Performance Middleware
// CORS Configuration - Only allow specified origins
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:3000'
];

app.use(cors({
    origin: (origin, callback) => {
        const isLocalhostDev =
            process.env.NODE_ENV !== 'production' &&
            typeof origin === 'string' &&
            /^http:\/\/localhost:\d+$/.test(origin);

        if (!origin || allowedOrigins.includes(origin) || isLocalhostDev) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization']
}));

// Body parser with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`, { ip: req.ip });
    next();
});

// Connect to Database
connectDB();

// API Routes with versioning
app.use('/api/v1/users', require('./routes/user'));
app.use('/api/v1/instructors', require('./routes/instructor'));
app.use('/api/v1/admin', require('./routes/admin'));
app.use('/api/v1/forums', require('./routes/forum'));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path
    });
});

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`, { environment: NODE_ENV });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', { promise, reason });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});