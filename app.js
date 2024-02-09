const express = require("express");
const bodyParser = require("body-parser");
const httpProxy = require('http-proxy');
const OpenAIApi = require('openai');
const Configuration = require('openai');
const server = require('http').createServer();
const cors = require("cors");
const app = express();
const proxy = httpProxy.createProxyServer();
const mongoose = require("mongoose");
const authRouter = require("./auth/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const dataSetRouter = require("./routes/dataSet");
const preferenceRouter = require("./routes/preference");
const dayWiseWorkout = require("./routes/dayWise");
require("dotenv").config();

// const targetURL = 'https://fitmantra.onrender.com';

// app.all('/api/v1/*', (req, res) => {
//   // Forward the request to the target URL
//   proxy.web(req, res, { target: targetURL });
// });

app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
  })
);






app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:8100",
    "capacitor://localhost",
    "ionic://localhost",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8100",
    "http://127.0.0.1:8080",
    "https://fitmantra.onrender.com",
    "https://fitmantra.onrender.com/api/v1/posts",
    "https://fitmantra.onrender.com/api/v1/auth/login",
    "https://fitmantra.onrender.com/api/v1/auth/register",
    "https://fitmantraapi-production.up.railway.app/api/v1/auth/login",
    "https://fitmantraapi-production.up.railway.app/api/v1/auth/register",
    ""
  ); // Replace with your frontend URL
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Origin", "*");
  // Additional headers you might need
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

const allowedOrigins = [
  "capacitor://localhost",
  "ionic://localhost",
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:8100",
  "http://127.0.0.1:8080",
  "https://fitmantra.onrender.com",
  "https://fitmantra.onrender.com/api/v1/posts",
  "https://fitmantra.onrender.com/api/v1/auth/login",
  "https://fitmantra.onrender.com/api/v1/auth/register",
  "https://fitmantraapi-production.up.railway.app/api/v1/auth/login",
  "https://fitmantraapi-production.up.railway.app/api/v1/auth/register"
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};

// Enable preflight requests for all routes
app.options("*", cors(corsOptions));

app.get("/", cors(corsOptions), (req, res, next) => {
  res.json({ message: "This route is CORS-enabled for an allowed origin." });
});

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/datasets", dataSetRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/preference", preferenceRouter);
app.use("/api/v1/daywiseworkout", dayWiseWorkout);
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

  app.listen(8080, () => { 
    console.log('Server up and running!'); 
  });

//   server.listen(8080, 'localhost'); 
// server.on('listening', function() {
//     console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// });
