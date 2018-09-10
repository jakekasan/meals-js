/*

    ingredientModel.js

    TO-DO:
        - add CRUD
        - add function to check existance of ingredients
*/

const Mongoose = require("mongoose");
const IngredientSchema = require("./schemas/ingredientSchema");
const IngredientModel = Mongoose.model("Ingredient",IngredientSchema);

// CRUD

function addIngredient(ingredient){

}

function updateIngredient(ingredient){

}

function replaceIngredient(oldIngredient,newIngredient){

}

function deleteIngredient(ingredient){

}

function ingredientExists(ingredient){

}