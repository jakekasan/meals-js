/*

    init_fake_data.js

    - Script to put all the recipe and food-product info into mongoDB

*/





const fakeData = require("./fake_data");
const Recipes = fakeData.recipes;
const FoodProducts = fakeData.foodProducts;
const mySchema = require("./schemas");
const RecipeSchema = mySchema.Recipe;
//const IngredientSchema = mySchema.Ingredient;
const FoodProductSchema = mySchema.FoodProduct;
const mongoose = require("mongoose");

mongoose.connect("mongodb://jake:password1@ds235302.mlab.com:35302/sqrt4",{
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on("error",console.error.bind(console,"MongoDB connection error :"));

// now submit the fake data

var FoodProductModel = mongoose.model("Food Product",FoodProductSchema);
//var IngredientModel = mongoose.model("Ingredient",IngredientSchema);
var RecipeModel = mongoose.model("Recipe",RecipeSchema);

for (let ingredient of FoodProducts){
    let model = new FoodProductModel(ingredient);
    model.save((err,data) => {
        if (err) throw err;
        console.log("Ingredient saved:");
        console.log(data);
    });
}

for (let recipe of Recipes){
    let model = new RecipeModel(recipe);
    model.save((err,data) => {
        if (err) throw err;
        console.log("Recipe saved:");
        console.log(data);
    });
}

console.log("Data initialization finished");