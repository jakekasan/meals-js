/*

    ingredientSchema.js

*/

const Schema = require("mongoose").Schema;

var Ingredient = new Schema({
    id:Schema.Types.ObjectId,
    name:String,
    description:String,
    nutrition:{
        proteins:Number,
        fats:Number,
        carbohydrates:Number,
        calories:Number,
        grams:Boolean
    },
    cost:Number,
    quantity:Number
});

module.exports = Ingredient;
