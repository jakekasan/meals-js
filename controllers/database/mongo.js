const mongoose = require("mongoose");
const Schemas = require("./schemas");

mongoose.connect("mongodb://<test>:<password1>@ds245512.mlab.com:45512/meals");

const db = mongoose.connection();

mongoose.Promise = global.Promise;

const RecipeModel = mongoose.model("Recipe",Schemas.Recipe);
const IngredientsModel = mongoose.model("Ingredient",Schemas.Ingredient);

function addRecipe(recipe){
    // check recipe
    let newRecipe = new RecipeModel(recipe);
    newRecipe.save((err, savedRecipe) => {
        if (err) return console.error(err);
    })
}

function addIngredient(ingredient){
    // check ingredient
}