/*

    userSessionSchema.js

*/

const Schema = require("mongoose").Schema;
const MealDay = require("./mealDaySchema");

var UserSession = new Schema({
    id:Schema.Types.ObjectId,
    username:String,
    passwordHash:String,
    email:String,
    mealPlan:[MealDay]
});

module.exports = UserSession;