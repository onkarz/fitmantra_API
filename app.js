const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./auth/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const dataSetRouter = require("./routes/dataSet");
require("dotenv").config();

app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
  })
);
app.use(cors());
const corsOptions ={
  origin:'http://localhost:9000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/datasets", dataSetRouter);
app.use("/api/v1/posts", postRouter);
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ error: "Bad request - request entity too large" });
  } else {
    next();
  }
});

mongoose
  .connect(
    "mongodb+srv://onkar:Onkar1234@cluster0.0garn5z.mongodb.net/?retryWrites=true&w=majority"
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
