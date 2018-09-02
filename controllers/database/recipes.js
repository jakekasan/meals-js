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

function getRecipeByName(name){
    return fakeData.recipes
        .filter(item => (item.name == name))
        .pop();
}

function recipesMiddleware(req,res,next){
    let rawGroceries = [];
    for (let key in req.userSession.mealPlan){
        let recipeName = req.userSession.mealPlan[key].name;
        
        // get recipe and groceries
        let {recipe, groceries} = fillRecipe(recipeName);

        req.userSession.mealPlan[key] = recipe;
        rawGroceries.concat(recipe.ingredients);
    }
    // now concatenate groceries, add them to the userSession object
    rawGroceries = rawGroceries.reduce((acc,item) => {
        if ((Object.keys(acc)).includes(item.name)){
            acc[item.name] += item.quantity;
        } else {
            acc[item.name] = item.quantity;
        }
    });

    // TO-DO: fill groceries from using vendors



    next();
}

function fillRecipe(recipeName){
    let recipe = getRecipeByName(recipeName);
    //let ingredients = recipe.ingredients    //getGroceries(recipe);
    return recipe
}

function getGroceries(rawGroceries){
    let filledGroceries = [];

    for (let key of rawGroceries){
        if (rawGroceries.hasOwnProperty){
            filledGroceries.push(fillGrocery({
                name:key,
                quantity:rawGroceries[key]
            }));
        }
    }
}

function fillGrocery(rawGrocery){
    // look up similar goods being sold. Return minimum amount to satisfy 

    let amount = Math.ceil(ingredient.quantity / grocery.quantity)*grocery.quantity

    return {
        name: grocery.name,
        amount: amount
    }

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
    getRecipeByName,
    recipesMiddleware,
    fillRecipe,
    getGroceries,
    fillGrocery
};