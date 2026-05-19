// server/middleware/requestValidator.js
const logger = require('../utils/logger');

/**
 * Validates common input patterns to prevent injection attacks
 */
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
};

const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    
    // Remove dangerous characters
    return input
        .replace(/[<>\"']/g, '')
        .trim();
};

/**
 * Middleware to validate email format
 */
const validateEmailMiddleware = (req, res, next) => {
    if (req.body.email && !validateEmail(req.body.email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }
    next();
};

/**
 * Middleware to validate password strength
 */
const validatePasswordStrengthMiddleware = (req, res, next) => {
    if (req.body.password && !validatePassword(req.body.password)) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 8 characters with uppercase, lowercase, and numbers'
        });
    }
    next();
};

module.exports = {
    validateEmail,
    validatePassword,
    sanitizeInput,
    validateEmailMiddleware,
    validatePasswordStrengthMiddleware
};
