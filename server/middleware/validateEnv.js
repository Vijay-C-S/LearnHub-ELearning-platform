// server/middleware/validateEnv.js
const logger = require('../utils/logger');

/**
 * Validate that all required environment variables are set
 * This should run at server startup
 */
const validateEnv = () => {
    const required = [
        'MONGODB_URI',
        'JWT_SECRET',
        'FRONTEND_URL',
        'NODE_ENV'
    ];

    const optional = [
        'CLOUDINARY_CLOUD_NAME',
        'EMAIL_SERVICE',
        'GOOGLE_CLIENT_ID',
        'STRIPE_PUBLIC_KEY'
    ];

    const missing = [];
    required.forEach(key => {
        if (!process.env[key]) {
            missing.push(key);
        }
    });

    if (missing.length > 0) {
        logger.error('Missing required environment variables', {
            missing
        });
        throw new Error(`Missing required env vars: ${missing.join(', ')}`);
    }

    const missingOptional = [];
    optional.forEach(key => {
        if (!process.env[key]) {
            missingOptional.push(key);
        }
    });

    if (missingOptional.length > 0) {
        logger.warn('Missing optional environment variables', {
            missing: missingOptional
        });
    }

    logger.info('Environment validation passed');
};

module.exports = validateEnv;
