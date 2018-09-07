const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var FoodProduct = new Schema({
    id:Schema.Types.ObjectId,
    name:String,
    vendor:String,
    quantity:Number,
    cost:Number
});

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

var Recipe = new Schema({
    id:Schema.Types.ObjectId,
    name:String,
    description:String,
    ingredients:[Ingredient]
});


module.exports = {
    Recipe,
    FoodProduct,
    Ingredient
}