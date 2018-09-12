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
const config = require("./config/index")("development");
const mongoose = require("mongoose");

const homeController = require("./controllers/homeController");

mongoose.connect(config.mongo,(err,db) => {
    if (err) throw err;
    
    app.set("view engine","ejs");

    app.use(express.static("public"));

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    var dbMiddleware = function(req,res,next){
        req.mongo = db;
    }

    app.all("/",dbMiddleware,(req,res,next) => {
        homeController.run(req,res,next);
    });

    app.all("/api",dbMiddleware,(req,res,next) => {
        
    });

})
