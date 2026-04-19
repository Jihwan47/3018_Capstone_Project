import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import setupSwagger from "../config/swagger";
import healthRoutes from "./api/v1/routes/healthRoutes"
import errorHandler from "./api/v1/middleware/errorHandler";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import getHelmetConfig from "./api/v1/middleware/helmet";
import cors from "cors";
import restaurantRoutes from "./api/v1/routes/restaurantRoutes";
import orderRoutes from "./api/v1/routes/orderRoutes";
import menuRoutes from "./api/v1/routes/menuRoutes";
import { apiLimiter } from "./api/v1/middleware/rateLimit";
import adminRoutes from "./api/v1/routes/adminRoutes";
import getCorsOptions from "./api/v1/middleware/cors";

// Initialize Express application
const app: Express = express();

// Enable CORS for all routes
app.use(cors(getCorsOptions()));

// helmet for security
app.use(getHelmetConfig());

app.use(express.json());

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}
// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Initialize Swagger
setupSwagger(app);

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Mount the health routes
app.use("/api/v1", healthRoutes);

// Mout api limiter to all api routes and endpoints
app.use("/api", apiLimiter);

// Mount the menu, order, and restaurant routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1", menuRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", restaurantRoutes);

// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;