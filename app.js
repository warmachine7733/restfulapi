const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const url = "mongodb://localhost/restproject";
const opts = { useNewUrlParser: true };
mongoose.connect(url,opts);

//for .env file read
require("dotenv").config();

const app = express();

//getting router
const users = require("./routes/users");

//middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

//using routes
app.use("/users", users);

//catch 404 error and forward to error handler function
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//error handler function
app.use((req, res, err, next) => {

const error = app.get('env') === 'developement' ? err : {};
const status = err.status || status;

//client 
res.status(status).json({
  error:{
    message:error.message
  }
})

console.log(err)
});

//server
//console.log(process.env)
const port = app.get("PORT") || process.env.PORT;
app.listen(port, () => console.log(`server is running at ${port}`));
