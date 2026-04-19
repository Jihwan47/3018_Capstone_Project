import { rateLimit } from 'express-rate-limit'

/**
 * Basic rate-limiting middleware for Express.
 * This middleware is used to limit repeated requests to public APIs and endpoints such as password reset, login attempts,
 * and this case, limit the number of order requests. 
 *
 * orderLimiterPerHour:
 * - windowMs: 1 hour time window
 * - max: maximum 10 requests per hour per user (based on IP address)
 * - message: will be printed if the user exceeds the limit
 * - handler: Request handler that sends back a response when a user is rate limited with status code 429 and message via option.
 * - standardHeaders (draft-7): will include a combined RateLimit header is set containing limit, remaining, reset values, and a RateLimit Policy.
 * - skip: no special case for skipping the rate limit, so it always returns false
 */
const orderLimiterPerHour = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10, 
    message: 'Too many orders created from this IP, please try again after an hour or contact the restaurant directly if you need assistance.',
    handler: (req, res, next, options) => {
        res.status(429).json({
            message: options.message,
        });
    },
    standardHeaders: 'draft-7',
    skip: (req, res) => false,
});

/**
 * Basic rate-limiting middleware for Express.
 * This middleware is used to limit repeated requests to public APIs and endpoints such as password reset, login attempts,
 * and this case, limit the number of order requests. 
 *
 * orderLimiterPerDay:
 * - windowMs: 24 hour time window
 * - max: maximum 10 requests per day per user (based on IP address)
 * - message: will be printed if the user exceeds the limit
 * - handler: Request handler that sends back a response when a user is rate limited with status code 429 and message via option.
 * - standardHeaders (draft-7): will include a combined RateLimit header is set containing limit, remaining, reset values, and a RateLimit Policy.
 * - skip: no special case for skipping the rate limit, so it always returns false
 */
const orderLimiterPerDay = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 20, // limit each user to 10 orders per day
    message: 'You have exceeded the daily order limit. Please try again after 24 hours or contact the restaurant directly if you need assistance.',
    handler: (req, res, next, options) => {
        res.status(429).json({
            message: options.message,
        });
    },
    standardHeaders: 'draft-7', // Return rate limit info in the `RateLimit-*` headers
    skip: (req, res) => false, // there is no special case for skipping the rate limit
});

/**
 * Basic rate-limiting middleware for Express.
 * This middleware is used to limit repeated requests to public APIs and endpoints such as password reset, login attempts,
 * and this case, limit the number of order requests. 
 *
 * apiLimiter:
 * - windowMs: 10 minutes time window
 * - max: maximum 50 requests per 10 minutes per IP (based on IP address)
 * - message: will be printed if the user exceeds the limit
 * - handler: Request handler that sends back a response when a user is rate limited with status code 429 and message via option.
 * - standardHeaders (draft-7): will include a combined RateLimit header is set containing limit, remaining, reset values, and a RateLimit Policy.
 * - skip: no special case for skipping the rate limit, so it always returns false
 */
const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50,
    message: 'Too many requests from this IP, please try again after 10 minutes.',
    handler: (req, res, next, options) => {
        res.status(429).json({
            message: options.message,
        });
    },
    standardHeaders: 'draft-7',
    skip: (req, res) => false,
});

export { orderLimiterPerHour, orderLimiterPerDay, apiLimiter };
