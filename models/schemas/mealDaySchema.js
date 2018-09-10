/*

    mealDaySchema.js

*/

const Schema = require("mongoose").Schema;
const Recipe = require("./recipeSchema");

var MealDaySchema = new Schema({
    day:String,
    recipe:Recipe,
    people:Number
});

module.exports = MealDaySchema;