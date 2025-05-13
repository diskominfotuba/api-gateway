import axios from "axios";
import redisClient from "./redisClient.js";

const getServiceMap = () => ({
  "/api/notification": process.env.NOTIFICATION_SERVICE_URL,
  "/api/instagram": process.env.INSTAGRAM_URL,
});

const proxyRequest = async (req, res) => {
  try {
    const serviceMap = getServiceMap();
    const path = Object.keys(serviceMap).find((prefix) =>
      req.path.startsWith(prefix)
    );

    console.log("Path", path);

    if (!path) return res.status(404).json({ message: "Service not found" });

    const targetURL = `${serviceMap[path]}${req.path}`;

    if (req.method === "GET") {
      const cached = await redisClient.get(targetURL);
      if (cached) {
        console.log("⏪ Data dari cache:", targetURL);
        return res.json(JSON.parse(cached));
      }
    }

    console.log("Path", targetURL);
    const response = await axios({
      method: req.method,
      url: targetURL,
      headers: req.headers,
      data: req.body,
    });

    if (req.method === "GET") {
      await redisClient.setEx(targetURL, 60, JSON.stringify(response.data)); // TTL: 60 detik
    }

    res.status(response.status).json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json({ message: err.message, error: err.response?.data });
  }
};

export default proxyRequest;
