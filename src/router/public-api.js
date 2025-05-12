const express = require("express");
const healthController = require("../controller/healthController");

const publicRouter = new express.Router();
publicRouter.get("/ping", healthController.ping);

export { publicRouter };
