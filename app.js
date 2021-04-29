const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes
app.use(require("./routes/index"))
app.use(require("./routes/compose"))
app.use(require("./routes/blog"))

app.use('/uploads', express.static('uploads'));

// server configurations are here....
app.listen(3000, () => console.log("Server started listening on port: 3000"));
