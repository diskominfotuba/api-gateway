import { createClient } from "redis";

const redisClient = createClient();

redisClient.on("error", (err) => console.error("Redis error:", err));
await redisClient.connect();

/**
 * Middleware cache reusable
 * @param {number} ttlInSeconds - waktu hidup cache dalam detik
 */
export const cacheMiddleware = (ttlInSeconds = 60) => {
  return async (req, res, next) => {
    try {
      const cacheKey = req.originalUrl;

      console.log("permintaan masuk");

      const cachedData = await redisClient.get(cacheKey);

      if (cachedData) {
        console.log("Cache hit for:", cacheKey);
        return res.status(200).json(JSON.parse(cachedData));
      }

      // Override res.json to intercept the response and store in Redis
      const originalJson = res.json.bind(res);
      res.json = (body) => {
        redisClient.setEx(cacheKey, ttlInSeconds, JSON.stringify(body));
        return originalJson(body);
      };

      next();
    } catch (err) {
      console.error("Cache middleware error:", err);
      next(); // fallback ke route handler meskipun Redis gagal
    }
  };
};
