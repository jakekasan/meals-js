const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Imports = require("./controllers/imports");

const routes = require("./controllers/routes.js");

app.use(cookieParser());

// globals

const address = "http://localhost:8000"

app.set("view engine","ejs");

app.use(express.static("public"));

app.use(bodyParser.json());

app.use(Imports.Cookies.cookieMiddleware);

app.use(Imports.Recipes.recipesMiddleware);

routes(app,address);

app.listen(8000,() => {
    console.log("Meals up and running.\nListening at 8000");

    //Imports.Cookies.printAllRecords();
});