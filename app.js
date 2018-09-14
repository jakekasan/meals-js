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

const homeController = require("./controllers/homeController");
const apiController = require("./controllers/apiController");
const userSessionController = require("./controllers/userSessionController");

//const modelsInit = require("./models/modelsInit");

mongoose.connect(config.databases.mongoDB,{
    useNewUrlParser:true,
    poolSize:20
},(err,db) => {
    if (err) throw err;
    
    app.set("view engine","ejs");

    app.use(express.static("public"));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(session({
        secret:"My first goat",
        cookie:{
            maxAge:20
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

    app.all("/api/*",dbMiddleware,userSessionController,(req,res,next) => {
        console.log(`${req.method} request to ${req.path}`);
        apiController.debug = true;
        apiController.run(req,res,next);
    });

    app.listen(config.server.port,() => {
        console.log(`App running on port ${config.server.port}, in ${config.mode} mode`);
    })
})
