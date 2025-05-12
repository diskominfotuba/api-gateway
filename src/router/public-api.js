import express from "express";
import healthController from "../controller/healthController.js";

const publicRouter = new express.Router();
// publicRouter.get("/ping", healthController.ping);

export { publicRouter };
