/*

    routes.js

    - handles routing for the app

*/

// Imports

const database = require("./database/fake_data");
const Imports = require("./Imports");

const Cookies = Imports.Cookies;
const Recipes = Imports.Recipes;
const Processor = Imports.Processor;


const fetch = require("node-fetch");


module.exports = (app,address) => {

    /*

        Routes for the front-end

    */

    app.get("/",(req,res) => {

        // let's just try to load an empty page

        console.log(req.userSession);

        res.render("home",{data:req.userSession});

       
    });

    /*

        Routes for the back-end

    */

    app.get("/api/recipes",(req,res) => {
        
        if ((Object.keys(req.query)).length < 1){
            // get all
            Imports.Recipes.getAllRecipes(res);
            return
        } else if (req.query.name){
            Imports.Recipes.getAllRecipes(req.query.name,res);
        }
    });

    app.get("/api/ingredients",(req,res) => {
        if ((Object.keys(req.query)).length < 1){
            // get all
            Imports.Ingredients.getAllRecipes(res);
            return
        } else if (req.query.name){
            Imports.Ingredients
        }
    });

    app.post("/api/user",(req,res) => {
        
        console.log(`Cookie ID: ${JSON.stringify(req.cookies)}\nData: ${JSON.stringify(req.body)}`)
        res.sendStatus(200);
        //Imports.Processor.updateUserSession(req,res);

        Imports.Cookies.updateUserSession(req,res);
    });
}