// server/middleware/cacheControl.js
/**
 * Middleware to set appropriate cache headers
 * Improves performance for static assets and API responses
 */

const cacheControl = (req, res, next) => {
    // Static assets - cache for 1 year
    if (req.path.match(/\.(js|css|img|font)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    // API responses - no cache (or short cache for non-sensitive data)
    else if (req.path.startsWith('/api')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
    }
    // HTML pages - cache for 1 hour
    else {
        res.setHeader('Cache-Control', 'public, max-age=3600');
    }
    next();
};

/**
 * Conditional request support for better caching
 */
const eTag = (req, res, next) => {
    res.setHeader('ETag', `W/"${Date.now()}"`);
    next();
};

module.exports = {
    cacheControl,
    eTag
};
