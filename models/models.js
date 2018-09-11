/*

    models.js

    - imports all the models and creates the instances

*/

const ingredientModel = require("./ingredientModel");
const recipeModel = require("./recipeModel");
const userSessionModel = require("./userSessionModel");

module.exports = function(mongoose){
    return {
        ingredientModel:(new ingredientModel())
    }
}