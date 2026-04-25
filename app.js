const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectdb = require("./config/db");
// rest object

// confg
dotenv.config();

//db connection
connectdb();
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/resturant", require("./routes/resturantroute"));
app.use("/api/v1/category", require("./routes/categeoryroute"));
app.use("/api/v1/foodcategory", require("./routes/foodroutes"));
app.get("/", (req, res) => {
  return res
    .status(200)
    .json("<h1>welcome to food Server  App api server </h1>");
});

// port

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.white.bgYellow);
});
