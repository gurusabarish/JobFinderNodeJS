const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// DataBase
const mongoose = require("mongoose");
try {
  mongoose.connect(
    "mongodb+srv://root:root@cluster0.ddj2u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {},
    () => console.log("connected")
  );
} catch (error) {
  console.log("could not connect");
}

// Configurations
const config = require("./src/config.json");

// Routes
const routes = require("./src/routes/index.route");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

app.listen(config.port, () =>
  console.log(`listening on port .... ${config.port}!`)
);
