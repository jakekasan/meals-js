/*

    recipes.js

    - this file includes (will include) all the logic for taking a query, getting relevant session and returning full recipe data

*/

const Processor = require("../processor");
const Imports = require("../imports");
const fakeData = require("./fake_data");

const Mongoose = require("mongoose");

function getAllRecipes(res){
    res.json(fakeData.recipes);
}

function getRecipeByName(name,res){
    return fakeData.recipes
        .filter(item => (item.name == name))
        .pop();
}

function recipesMiddleware(req,res,next){
    let rawGroceries = [];
    for (let key in req.userSession.mealPlan){
        let recipeName = req.userSession.mealPlan[key].name;
        
    }
}

function fillRecipe(recipeName){
    let recipe = getRecipeByName(recipeName);
    let groceries = getGroceries(recipe);
    return {
        recipe,
        groceries
    }
}

function getRecipeByName(recipeName){
    // find recipe by name... maybe async?
}

function getGroceries(recipe){
    let ingredients = recipe.ingredients.map(item => fillGrocery(item));
    
}


// function getMealPlan(req,res,userSession){
//     userSession.mealPlan
//     let mealPlanPromises = Object.keys(userSession.mealPlan).map(key => {
//         let nameOfRecipe = userSession.mealPlan[key];
//         if (nameOfRecipe){
//             return fillMealDay(nameOfRecipe)
//         } else {
//             return nameOfRecipe
//         }
//     });

//     Processor.main(req,res,userSession);
// }

// function fillMealDay(data){
//     // check if data is not null
//     if (!data){
//         return
//     }

//     fetch("https://localhost:8080/api/data/recipe")


// }

module.exports = {
    getAllRecipes,
    getRecipeByName
};