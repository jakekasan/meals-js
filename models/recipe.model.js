/*

    recipeModel.js

    TO-DO:
        - add function to check if ingredients in recipe are in ingredients
        - add CRUD
*/


// const Mongoose = require("mongoose");

// Mongoose.connect("mongodb://temp:password1@ds245512.mlab.com:45512/meals",{
//     useNewUrlParser:true
// });

// const Recipe = Mongoose.model("Recipe",RecipeSchema);

// function checkRecipe(recipe){
//     /*
//         - Check that the recipe object is valid.

//         - Also check that all the ingredients are
//         in the database already.
//     */
//    return true
// }

// function getRecipeFromRequestBody(body){
//     /*
//         Takes the body of the request and returns a formatted recipe
//     */

//    return {
//        name:body.name,
//        description:body.description,
//        ingredients:(body.ingredients).map(item => JSON.parse(item))
//    }
// }

// function getRecipeModelFromObject(recipe){
//     return new Recipe(recipe);
// }

// function addRecipe(req,res){
//     let recipe = getRecipeFromRequestBody(req.body);
//     (getRecipeModelFromObject(recipe))
//         .save((err,model) => {
//             if (err) throw err;
//             res.redirect(req.path);
//         });
// }

// function getRecipe(req,res){
//     Recipe.findOne()
// }


const RecipeSchema = require("./schemas/recipe.schema");
const BaseModel = new (require("./base.model"))();

// module.exports = function(mongoose){
//     let model = mongoose.Model("Recipes",RecipeSchema);
//     return (new BaseModel(model));
// }

const recipeModel = BaseModel.extend({
    setMongo:function(mongo){
        //this.setModel(mongo.model("Recipe",RecipeSchema));
        try {
            this.setModel(mongo.model("Recipe"));
        } catch (err) {
            this.setModel(mongo.model("Recipe",RecipeSchema));
        }
        
    }
});

module.exports = recipeModel;