const express = require("express");
const { publicRouter } = require("../router/public-api.js");
const proxyRequest = require("../services/serviceProxy.js");
const dotenv = require("dotenv");

dotenv.config();

const web = express();
web.use(proxyRequest);
web.use(express.json());

web.use(publicRouter);

module.exports = { web };
