const web = require("./application/web.js");
const errorMiddleware = require("./middleware/error-middleware.js");

web.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

web.use(errorMiddleware);
