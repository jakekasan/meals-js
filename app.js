const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Imports = require("./controllers/imports");

const routes = require("./controllers/routes.js");

//app.use(cookieParser());

// globals

// const address = "http://localhost:8000"

// app.set("view engine","ejs");

// app.use(express.static("public"));

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());

// app.use(Imports.Cookies.cookieMiddleware);

// app.use(Imports.Recipes.recipesMiddleware);

// app.use(Imports.Processor.checkJob);

// routes(app,address);

// app.listen(8000,() => {
//     console.log("Meals up and running.\nListening at 8000");

//     //Imports.Cookies.printAllRecords();
// });

// alternative application

// const express = require("express");
// const app = express();
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const config = (require("./config/index"))("development");
const mongoose = require("mongoose");
const session = require("express-session");

const homeController = require("./controllers/home.controller");
const apiController = require("./controllers/api.controller");
const userSessionController = require("./controllers/userSession.controller");
const ingredientsController = require("./controllers/ingredients.controller");
const recipesController = require("./controllers/recipes.controller");

//const modelsInit = require("./models/modelsInit");

mongoose.connect(config.databases.mongoDB,{
    useNewUrlParser:true,
    poolSize:20
},(err,db) => {
    if (err) throw err;
    
    app.set("view engine","ejs");

    app.use(express.static("public"));

    app.use(cookieParser());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(session({
        secret:"My first goat",
        cookie:{
            maxAge:20,
            httpOnly:false,
            secure:false
        }
    }))

    var dbMiddleware = function(req,res,next){
        req.mongo = db;
        next();
    }

    app.all("/",dbMiddleware,userSessionController,(req,res,next) => {
        homeController.debug = true;
        homeController.run(req,res,next);
    });

    app.all("/ingredients*",dbMiddleware,userSessionController,(req,res,next) => {
        ingredientsController.debug = true;
        ingredientsController.run(req,res,next);
    });

    app.all("/recipes*",dbMiddleware,userSessionController,(req,res,next) => {
        recipesController.debug = true;
        recipesController.run(req,res,next);
    });

    app.all("/api/*",dbMiddleware,userSessionController,(req,res,next) => {
        console.log(`${req.method} request to ${req.path}`);
        apiController.debug = true;
        apiController.run(req,res,next);
    });

    app.listen(config.server.port,() => {
        console.log(`App running on port ${config.server.port}, in ${config.mode} mode`);
    })
})
