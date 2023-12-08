const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./auth/auth");
const userRouter = require("./routes/user");
require("dotenv").config();

app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
  })
);
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ error: "Bad request - request entity too large" });
  } else {
    next();
  }
});

mongoose
  .connect(
    "mongodb+srv://fitmantra:eRKMT8sN8j8Qhk92@cluster0.rrbhllj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(9000, () => {
  console.log("server is running");
});









