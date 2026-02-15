const express = require("express");
const bodyParser = require("body-parser")

const path = require("path");

// Controllers & Routes
const errorController = require("./controller/errors");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Route handling
app.use(todoRoutes);

// 404 Error Handler
app.use(errorController.get404);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


