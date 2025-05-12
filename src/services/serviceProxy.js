import axios from "axios";

const serviceMap = {
  "/api/notification": process.env.NOTIFICATION_SERVICE_URL,
  "/api/instagram": process.env.INSTAGRAM_URL,
};

const proxyRequest = async (req, res) => {
  try {
    const path = Object.keys(serviceMap).find((prefix) =>
      req.path.startsWith(prefix)
    );

    console.log("Path", path);

    if (!path) return res.status(404).json({ message: "Service not found" });

    const targetURL = `${serviceMap[path]}${req.path}`;

    console.log("Target url", targetURL);

    const response = await axios({
      method: req.method,
      url: targetURL,
      headers: req.headers,
      data: req.body,
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json({ message: err.message, error: err.response?.data });
  }
};

export default proxyRequest;
