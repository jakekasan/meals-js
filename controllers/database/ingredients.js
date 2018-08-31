/*

    ingredients.js

*/

const Imports = require("../imports");

function getAllIngredients(res){
    res.json(Imports.Data.foodProducts);
}

function getIngredientByName(name,res){
    res.json(Imports.Data.foodProducts
        .filter(item => (item.name == name)))
        .pop();
}

module.exports = {
    getAllIngredients,
    getIngredientByName
};