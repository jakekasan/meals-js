/*

    userSessionSchema.js

*/

const Schema = require("mongoose").Schema;
const MealDay = require("./mealDay.schema");

var UserSession = new Schema({
    id:Schema.Types.ObjectId,
    username:String,
    passwordHash:String,
    email:String,
    mealPlan:[{
        day:String,
        name:String,
        people:Number
    }]
});

module.exports = UserSession;