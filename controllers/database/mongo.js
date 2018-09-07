const mongoose = require("mongoose");
const Schemas = require("./schemas");
const Imports = require("./../imports");

mongoose.connect("mongodb://<test>:<password1>@ds245512.mlab.com:45512/meals");

const db = mongoose.connection();

mongoose.Promise = global.Promise;

const RecipeModel = mongoose.model("Recipe",Schemas.Recipe);
const IngredientsModel = mongoose.model("Ingredient",Schemas.Ingredient);

function addRecipe(req,res){
    // check recipe

    let recipe = req.body;

    function addRecipeCallback(jobID){

        let newRecipe = new RecipeModel(recipe);
        newRecipe.save((err, savedRecipe) => {
            if (err) {
                // model failed to save, ammend job entry
                Imports.Processor.jobFailure(jobID);
            }
            // model saved, ammend job entry
            Imports.Processor.jobSuccess(jobID);
        });
    }

    Imports.Processor.addJob(req,res,addRecipeCallback);
}

function addIngredient(ingredient){
    // check ingredient
}