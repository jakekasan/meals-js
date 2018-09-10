/*

    recipes.js

*/

const RecipeSchema = require("./schemas/recipeSchema");
const Mongoose = require("mongoose");

Mongoose.connect("mongodb://temp:password1@ds245512.mlab.com:45512/meals",{
    useNewUrlParser:true
});

const Recipe = Mongoose.model("Recipe",RecipeSchema);

function checkRecipe(recipe){
    /*
        - Check that the recipe object is valid.

        - Also check that all the ingredients are
        in the database already.
    */
   return true
}

function getRecipeFromRequestBody(body){
    /*
        Takes the body of the request and returns a formatted recipe
    */

   return {
       name:body.name,
       description:body.description,
       ingredients:(body.ingredients).map(item => JSON.parse(item))
   }
}

function getRecipeModelFromObject(recipe){
    return new Recipe(recipe);
}

function addRecipe(req,res){
    let recipe = getRecipeFromRequestBody(req.body);
    (getRecipeModelFromObject(recipe))
        .save((err,model) => {
            if (err) throw err;
            res.redirect(req.path);
        });
}

function getRecipe(req,res){
    Recipe.findOne()
}


