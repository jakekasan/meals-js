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
    // first mealPlan
    let mealPlan = fillMealPlan(req.userSession.mealPlan);
    
    let rawGroceries = getRawGroceries(mealPlan);

    // TO-DO: fill groceries from using vendors

    req.userSession.groceries = getGroceries(rawGroceries);

    next();
}

function fillMealPlan(mealPlan){
    if (!mealPlan){
        return {}
    }
    for (let key in mealPlan){
        let recipeName = mealPlan[key].name;
        
        // get recipe and groceries
        let recipe = fillRecipe(recipeName);

        mealPlan[key] = recipe;
    }
    return mealPlan
}

function fillRecipe(recipeName){
    let recipe = getRecipeByName(recipeName);
    //let ingredients = recipe.ingredients    //getGroceries(recipe);
    return recipe
}

function getRawGroceries(mealPlan){
    if (mealPlan == {}){
        return []
    }
    let result = (Object.keys(mealPlan))
            .map(key => mealPlan[key])
            .map(item => item.ingredients)
            .reduce((ingredients,item) => {
                return ingredients.concat(item)
            },[])
            .reduce((rawGroceries,item) => {
                if(rawGroceries[item.name]){
                    rawGroceries[item.name] += item.quantity;
                } else {
                    rawGroceries[item.name] = item.quantity;
                }
                return rawGroceries
            },{});
    return (Object.keys(result))
                .map(key => {
                    return {
                        name: key,
                        quantity: result[key]
                    }
                });
}

function getGroceries(rawGroceries){
    let filledGroceries = [];

    for (let item of rawGroceries){
        filledGroceries.push(fillGrocery(item));
    }

    filledGroceries = filledGroceries.filter(item => { return (item) });

    return filledGroceries
}

function fillGrocery(rawGrocery){
    // look up similar goods being sold. Return minimum amount to satisfy 

    let grocery = fakeData.foodProducts.filter(item => (item.name == rawGrocery.name)).pop();

    if (!grocery){
        // if the product was not found, return undefined
        return undefined
    }

    let amount = Math.ceil(rawGrocery.quantity / grocery.quantity)*grocery.quantity

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
    fillGrocery,
    getRawGroceries
};