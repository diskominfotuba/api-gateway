export default {
  apps: [
    {
      name: "api-gateway",
      script: "src/app.js",
      type: "module",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
