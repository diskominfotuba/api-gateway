import axios from "axios";

const serviceMap = {
  "/ping": process.env.PING_SERVICE,
  "/api/notification": process.env.NOTIFICATION_SERVICE_URL,
};

const proxyRequest = async (req, res) => {
  try {
    const path = Object.keys(serviceMap).find((prefix) =>
      req.path.startsWith(prefix)
    );

    if (!path) return res.status(404).json({ message: "Service not found" });

    const targetURL = `${serviceMap[path]}${req.path.replace(path, "")}`;
    const response = await axios({
      method: req.method,
      url: targetURL,
      headers: req.headers,
      data: req,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json({ message: err.message, error: err.response?.data });
  }
};

export default proxyRequest;
