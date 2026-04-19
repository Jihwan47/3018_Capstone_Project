// importing router
import { Router } from "express";
import { healthCheck } from "../controllers/healthController";

// initializing express router 
const router: Router = Router();

// GET endpoint to get health status
/**
 * @openapi
 * /health:
 *   get:
 *     summary: This endpoint check the health status of the API
 *     tags: [health]
 *     responses:
 *       '200':
 *         description: Success response description
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                status:
 *                 type: string
 *                 example: OK
 *                uptime:
 *                 type: number
 *                 example: 123456.78
 *                timestamp:
 *                 type: string
 *                 example: 2023-10-01T12:34:56.789Z
 *                version:
 *                 type: string
 *                 example: 1.0.0
 * 
 */
router.get("/health", healthCheck);

// Export router so that app.ts can use this router
export default router;