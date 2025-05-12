import express from "express";
import { publicRouter } from "../router/public-api.js";
import proxyRequest from "../services/serviceProxy.js";

export const web = express();
web.use(proxyRequest);
web.use(express.json());

web.use(publicRouter);
