**Express-rate-limit for basic rate limiting - ADds rate limitingg to endpoints to control API usage.**

    This is a simple and effective way to prevent users to order items multiple times in a short period of time which can lead fraud or abuse of the system.
    The user intentionally try to shut the server down or try to disrupt the business which may damange the business and cause loss of revenue.
    By implementing rate limiting, we can avoid these issues and ensure that the system is used in a fair and responsible manner.
    Order rate: 3 orders per hour and 10 orders per day per user, if the number of orders exceeds daily limit, the user will be blocked for the next 24 hours.