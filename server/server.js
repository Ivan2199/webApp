const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const usersRoute = require("./routes/user");
const songsRoutes = require("./routes/song.js");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", usersRoute);
app.use("/song", songsRoutes);

const port = 8000;

const mongodbURI =
  "mongodb+srv://*****************@cluster0.msydduz.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
