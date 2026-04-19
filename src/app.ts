import express, { Express } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import setupSwagger from "../config/swagger";
import healthRoutes from "./api/v1/routes/healthRoutes"

// Initialize Express application
const app: Express = express();

app.use(express.json());

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