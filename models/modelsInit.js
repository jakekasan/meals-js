/*

    models.js

    - imports all the models and creates the instances

*/

// const ingredientModel = require("./ingredientModel");
// const recipeModel = require("./recipeModel");
// const userSessionModel = require("./userSessionModel");
const ingredientSchema = require("./schemas/ingredientSchema");
const recipeSchema = require("./schemas/recipeSchema");
const userSessionSchema = require("./schemas/userSessionSchema");
const mongoose = require("mongoose");
const config = (require("./../config/index"))("development");

//var collections = ["ingredients","recipes","userSessions"];

mongoose.Promise = global.Promise;

mongoose.connect(config.databases.mongoDB,{
    useNewUrlParser:true
},(err,db) => {
    if (err){
        throw err
    }

    console.log(db);

    var collectionList = Object.keys(db.collections);

    console.log(collectionList);

    collectionList.map(item => {
        console.log(typeof item);
    });

    if (!collectionList.includes("ingredients")){
        db.model("Ingredient",ingredientSchema);
        console.log("Ingredient schema registered");
    } else {
        console.log("Ingredient schema already registered");
    }

    if (!collectionList.includes("recipes")){
        db.model("Recipe",recipeSchema);
        console.log("Recipe schema registered");
    } else {
        console.log("Recipe schema already registered");
    }

    if (!collectionList.includes("userSessions")) {
        let usModel = db.model("UserSession",userSessionSchema);
        let newModel = usModel({username:"admin",passwordHash:"password"});
        newModel.save((err) => {
            if (err) {
                throw err
            }
        });
        console.log("UserSession schema registered");

    } else {
        console.log("UserSession schema already registered");
    }

    console.log(Object.keys(db.collections));

    return db.close();

})


return