require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); //จะคอยบอกว่า request ส่งอะไรมาบ้าง
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./routes/auth-route");
<<<<<<< HEAD
const menuRoute = require("./routes/menu-route");
const orderRoute = require("./routes/order-route");
=======
const menuRoute=require("./routes/menu-route")
const orderRoute=require("./routes/order-route")
const categoryRoute=require("./routes/category-route")

>>>>>>> 4078dd9

const notFoundMiddleware = require("./middlewares/not-found.js");
const errorMiddleware = require("./middlewares/error");
const authenticate = require("./middlewares/authenticate");

const app = express();
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 request per `window` (here, per 15 minutes)
    message: { message: "too many request" },
  })
);
app.use(helmet());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/menu",authenticate, menuRoute);
app.use("/order",authenticate, orderRoute)
app.use("/category",categoryRoute)


app.use(notFoundMiddleware);
app.use(errorMiddleware);
////============ เปิดให้ Server run ==========////
const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server running on port:" + port));
