const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const users = require("./models/Users");
const thoughts = require("./models/Thought");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

mongoose.connect("mongodb://localhost/thought-network-db");

users.syncIndexes();
thoughts.syncIndexes();

mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
