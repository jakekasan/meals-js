const mongoose = require("mongoose");
const Schemas = require("./schemas");
const Imports = require("../imports");
const Processor = require("./../processor");

mongoose.connect("mongodb://temp:password1@ds245512.mlab.com:45512/meals",{
    useNewUrlParser:true
});

//const db = mongoose.connection();

mongoose.Promise = global.Promise;

const RecipesModel = mongoose.model("Recipe",Schemas.Recipe);
const IngredientsModel = mongoose.model("Ingredient",Schemas.Ingredient);

function addRecipe(req,res){
    // check recipe

    let recipe = req.body;

    recipe.ingredients = recipe.ingredients.map(item => JSON.parse(item));

    let newRecipe = new RecipesModel(recipe);

    console.log(newRecipe);

    newRecipe.save((err) => {
        if (err) {
            // model failed to save, ammend job entry
            //Processor.jobFailure(jobID);
            console.log(err);
            // console.log("recipe not saved");
            res.redirect(req.path);
            return
        }
        // console.log(`recipe saved`);
        res.redirect(req.path);
        return
    });
    return
}

function addIngredient(req,res){
    // check ingredient
    let ingredient = {
        name: req.body.name,
        description: req.body.description,
        nutrition:{
            proteins:req.body.proteins,
            fats:req.body.fats,
            carbohydrates:req.body.carbohydrates,
            grams:(req.body.grams == "true") ? true : false
        },
        cost:req.body.cost,
        quantity:1
    }

    let newIngredient = new IngredientsModel(ingredient);

    newIngredient.save((err) => {
        if (err) {
            console.log("Ingredient failed to save");
            res.redirect(req.path);
            throw err;
        }
        console.log("Ingredient saved");
        res.redirect(req.path);
        return
    });
    return
}

// getters

function getAllIngredients(req,res){
    IngredientsModel.find((err,ingredients) => {
        res.json(ingredients);
    });
}

function getAllRecipes(req,res){
    RecipesModel.find((err,recipes) => {
        res.json(recipes);
    });
}

module.exports = {
    addRecipe,
    addIngredient,
    getAllIngredients,
    getAllRecipes
}