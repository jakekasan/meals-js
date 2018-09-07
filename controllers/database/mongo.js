const mongoose = require("mongoose");
const Schemas = require("./schemas");
const Imports = require("../imports");
const Processor = require("./../processor");

mongoose.connect("mongodb://temp:password1@ds245512.mlab.com:45512/meals",{
    useNewUrlParser:true
});

//const db = mongoose.connection();

mongoose.Promise = global.Promise;

const RecipeModel = mongoose.model("Recipe",Schemas.Recipe);
const IngredientsModel = mongoose.model("Ingredient",Schemas.Ingredient);

function addRecipe(req,res){
    // check recipe

    let recipe = req.body;

    recipe.ingredients = recipe.ingredients.map(item => JSON.parse(item));

    let newRecipe = new RecipeModel(recipe);

    console.log(newRecipe);

    newRecipe.save((err) => {
        if (err) {
            // model failed to save, ammend job entry
            //Processor.jobFailure(jobID);
            console.log(err);
            console.log("recipe not saved");
            res.redirect("/recipes");
            return
        }
        console.log(`recipe saved`);
        res.redirect("/recipes");
        return
    });

    return

    // function addRecipeCallback(jobID){

    //     let newRecipe = new RecipeModel(recipe);
    //     newRecipe.save((err, savedRecipe) => {
    //         if (err) {
    //             // model failed to save, ammend job entry
    //             Processor.jobFailure(jobID);
    //         }
    //         // model saved, ammend job entry
    //         Processor.jobSuccess(jobID);
    //     });
    // }

    // console.log("addRecipe");

    // console.log(Processor);

    // Processor.addJob(req,res,"recipes",addRecipeCallback);
}

function addIngredient(ingredient){
    // check ingredient
}

module.exports = {
    addRecipe,
    addIngredient
}