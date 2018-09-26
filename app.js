const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// mongoose.Promise = global.Promise;
const helmet = require("helmet");

const url = "mongodb://ds115283.mlab.com:15283/restproject";
const opts = { useNewUrlParser: true };
console.log("url is", url);
mongoose.connect(
  url,
  {
    auth: {
      user: "prateekjena7733",
      password: "home@123"
    }
  }
);

//for .env file read
require("dotenv").config();

const app = express();
app.use(helmet());

//getting routes
const cars = require("./routes/cars");
const users = require("./routes/users");

//middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

//using routes
app.use("/cars", cars);
app.use("/users", users);

//catch 404 error and forward to error handler function
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// //error handler function
// app.use((req, res, err, next) => {
//   const error = err;
//   if(err){
//     console.log("error")

//   }
//    res.sendStatus(404).json(err)
//   console.log("error is", error);
// });

//error handler function
app.use((req, res, err, next) => {
  const error = app.get("env") === "developement" ? err : {};
  const status = err.status || status;

  //client
  res.status(status).json({
    error: {
      message: error.message
    }
  });

  console.log(err);
});

//server
//console.log(process.env)
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server is running at ${port}`));
