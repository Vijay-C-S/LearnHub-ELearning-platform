// server/utils/logger.js
const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logLevels = {
    ERROR: 'ERROR',
    WARN: 'WARN',
    INFO: 'INFO',
    DEBUG: 'DEBUG'
};

const getTimestamp = () => new Date().toISOString();

const formatLog = (level, message, data = {}) => {
    return JSON.stringify({
        timestamp: getTimestamp(),
        level,
        message,
        ...data
    });
};

const logger = {
    error: (message, error = null) => {
        const log = formatLog(logLevels.ERROR, message, { 
            error: error?.message || error 
        });
        console.error(`[${getTimestamp()}] ${message}`, error);
        fs.appendFileSync(path.join(logsDir, 'error.log'), log + '\n');
    },

    warn: (message, data = {}) => {
        const log = formatLog(logLevels.WARN, message, data);
        console.warn(`[${getTimestamp()}] ${message}`, data);
        fs.appendFileSync(path.join(logsDir, 'warn.log'), log + '\n');
    },

    info: (message, data = {}) => {
        const log = formatLog(logLevels.INFO, message, data);
        if (process.env.NODE_ENV === 'development') {
            console.log(`[${getTimestamp()}] ${message}`, data);
        }
        fs.appendFileSync(path.join(logsDir, 'info.log'), log + '\n');
    },

    debug: (message, data = {}) => {
        if (process.env.NODE_ENV === 'development') {
            const log = formatLog(logLevels.DEBUG, message, data);
            console.log(`[${getTimestamp()}] ${message}`, data);
            fs.appendFileSync(path.join(logsDir, 'debug.log'), log + '\n');
        }
    }
};

module.exports = logger;
