const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const booksRoutes = require("./routes/books");
const userRoutes = require("./routes/user");
const searchRoute = require("./routes/search");
const siteRoute = require("./routes/site");
const site = require("./index.html");
const path = require("path");
require("dotenv").config();
console.log(process.env); // remove this after you've confirmed it is working

mongoose
  .connect(process.env.CLUSTER_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/search", searchRoute);
app.use("/api/site", siteRoute);


module.exports = app;
