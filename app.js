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

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://fitmantra.onrender.com",
    "http://localhost:9000"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.options("*", (req, res) => {
  console.log("preflight");
  if (
    req.headers.origin === "https://fitmantra.onrender.com" && req.headers.origin === "http://localhost:9000" &&
    allowMethods.includes(req.headers["access-control-request-method"]) &&
    allowHeaders.includes(req.headers["access-control-request-headers"])
  ) {
    console.log("pass");
    return res.status(204).send();
  } else {
    console.log("fail");
  }
});

app.get("/healthz", (req, res) => {
  console.log("health check is processed");
  return res.status(204).send();
});

app.use(cors());
const corsOptions = {
  origin: "http://localhost:9000" &&  "https://fitmantra.onrender.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
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
