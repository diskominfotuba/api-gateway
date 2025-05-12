// ecosystem.config.js
export default {
  apps: [
    {
      name: "api-gateway",
      script: "./src/app.js",
      exec_mode: "fork",
      watch: false,
      env: {
        NODE_ENV: ".env",
        PORT: 3000,
        INSTAGRAM_URL: "http://192.168.11.2:9913",
        NOTIFICATION_SERVICE_URL: "http://localhost:3003",
        PING_SERVICE: "http://localhost:3004",
        // Tambahkan semua ENV dari file .env kamu di sini
      },
    },
  ],
};
