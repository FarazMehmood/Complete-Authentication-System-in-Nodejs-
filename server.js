const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
require("dotenv").config();
const auth = require("./Auth");

app.use(express.json());
app.use(cors({ origin: "*" }));

const userRoutes = require("./ROUTES/userRoutes");

app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  res.status(404);
  res.json({ message: "ROUTE NOT FOUND" });
  return next();
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }

  res
    .status(err.code || 500)
    .json({ message: err.message || "SOMETHING WENT WRONG" });
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGOOSE CONNECTED");
  } catch (err) {
    console.log("ERROR" + " " + err);
  }
};

connectDB();

app.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING");
});
