import express from "express";
import { publicRouter } from "../router/public-api.js";
import proxyRequest from "../services/serviceProxy.js";
import dotenv from "dotenv";
dotenv.config();

export const web = express();
web.use(publicRouter);
web.use(proxyRequest);
web.use(express.json());
