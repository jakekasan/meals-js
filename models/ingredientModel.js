/*

    ingredientModel.js

    TO-DO:
        - add CRUD
        - add function to check existance of ingredients
*/

const Mongoose = require("mongoose");

Mongoose.Promise = global.Promise;

Mongoose.connect("mongodb://temp:password1@ds245512.mlab.com:45512/meals",{
    useNewUrlParser:true
});

const IngredientSchema = require("./schemas/ingredientSchema");
//const IngredientModel = Mongoose.model("Ingredient",IngredientSchema);

const baseModel = require("./baseModel");

module.exports = function(mongoose){
    let model = mongoose.model("Ingredients",IngredientSchema);
    return (new baseModel(model))
}

