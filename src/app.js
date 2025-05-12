import dotenv from "dotenv";
dotenv.config();
import { web } from "./application/web.js";
import { errorMiddleware } from "./middleware/error-middleware.js";
const PORT = process.env.PORT;
web.listen(PORT, () => {
  console.log("Server started on http://localhost:" + PORT);
});

web.use(errorMiddleware);
