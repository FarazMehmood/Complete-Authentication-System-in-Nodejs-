const http = require("http");
const express = require("express");
const app = express();
const PORT = 4500;
const bodyParser = require("body-parser");
const { uri } = require("./Keys");
const mongoose = require("mongoose");
require("./models/User");
const authRoute = require("./Routes/authRoute");
require("dotenv/config");

app.use(bodyParser.json());

app.use(authRoute);

const categoriesRoutes = require("./Routes/Categories");
//const productRoutes = require("./Routes/");

const api = process.env.API_URL;
console.log(api);

app.use(`${api}/categories`, categoriesRoutes);
mongoose.connect(uri);

mongoose.connection.on("connected", () => {
  console.log("connect to moongb yeahhh");
});

mongoose.connection.on("err", (err) => {
  console.log("This is an eroor", err);
});

app.listen(4500);
