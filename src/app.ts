import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import healthRoutes from "./api/v1/routes/healthRoutes";
// import {
//     accessLogger,
//     errorLogger,
//     consoleLogger,
// } from "./api/v1/middleware/logger";
// import errorHandler from "./api/v1/middleware/errorHandler";
// import getHelmetConfig from "./api/v1/middleware/helmet";
// import cors from "cors";
// import getCorsOptions from "./api/v1/middleware/cors";
import setupSwagger from "../config/swagger";
//import healthRoutes from "./api/v1/routes/healthRoutes"

// Initialize Express application
const app: Express = express();

// // Enable CORS for all routes
// app.use(cors(getCorsOptions()));

// // helmet for security
// app.use(getHelmetConfig());

app.use(express.json());

// // Logging middleware (should be applied early in the middleware stack)
// if (process.env.NODE_ENV === "production") {
//     // In production, log to files
//     app.use(accessLogger);
//     app.use(errorLogger);
// } else {
//     // In development, log to console for immediate feedback
//     app.use(consoleLogger);
// }

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

// Initialize Swagger
setupSwagger(app);

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1", healthRoutes);

// Global error handling middleware (MUST be applied last)
// app.use(errorHandler);

export default app;