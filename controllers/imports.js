/*

    imports.js

*/



const Groceries = require("./database/groceries");
const Cookies = require("./database/cookies");
const Recipes = require("./database/recipes");
const Data = require("./database/fake_data");
const Ingredients = require("./database/ingredients");
const Processor = require("./processor");
const Mongo = require("./database/mongo");


module.exports = {
    Groceries,
    Cookies,
    Recipes,
    Ingredients,
    Data,
    Processor,
    Mongo
}