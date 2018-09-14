/*

    mealDaySchema.js

*/

const Schema = require("mongoose").Schema;
//const Recipe = require("./recipeSchema");

var MealDaySchema = new Schema({
    day:String,
    name:String,
    people:Number
});

module.exports = MealDaySchema;