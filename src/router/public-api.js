import express from "express";
import healthController from "../controller/healthController.js";
import { cacheMiddleware } from "../middleware/cache-middleware.js";

const publicRouter = new express.Router();
publicRouter.get("/api/ping", healthController.ping);

//instagram
publicRouter.get("/api/instagram", cacheMiddleware(60));
publicRouter.get("/api/instagram/:id", cacheMiddleware(60));

export { publicRouter };
