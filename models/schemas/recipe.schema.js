/*

    recipeSchema.js

*/

const Schema = require("mongoose").Schema;
const Ingredient = require("./ingredient.schema");

var Recipe = new Schema({
    id:Schema.Types.ObjectId,
    name:String,
    description:String,
    ingredients:[Ingredient]
});

module.exports = Recipe;