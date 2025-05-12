module.exports = {
  apps: [
    {
      name: "api-gateway",
      script: "app.js",
      env: {
        NODE_ENV: "development",
        ...require("dotenv").config({ path: "/path/ke/.env" }).parsed,
      },
      env_production: {
        NODE_ENV: "production",
        ...require("dotenv").config({ path: ".env" }).parsed,
      },
    },
  ],
};
