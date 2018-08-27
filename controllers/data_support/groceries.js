const mongoose = require("mongoose");
const daysOfWeek = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

// mealplan

function fillMealPlan(mealPlan){
    if(!isValidMealPlan(mealPlan)){
        return false
    }
}

function fillMealPlanDay(mealPlan){
    
}

// fill recipes and ingredients

function fillRecipe(recipeObj){
    if (!isValidRecipe(recipeObj)){
        return false
    }
    recipeObj.ingredients.map(item => fillIngredient(item));
    return recipeObj
}

function fillIngredient(ingredientObj){
    if (!isValidIngredient){
        return ingredientObj
    }
    return mongoose.find(ingredientObj.name)
}

// validators

function isValidMealPlan(mealPlan){
    let keys = (Object.keys(mealPlan)).map(key => {
        if (!daysOfWeek.includes(key)){
            return false
        }
    })
}

function isValidRecipe(recipeObj){
    // check that recipeObj is properly formatted
    if (!recipeObj.name){
        return false
    }
    if (!recipeObj.ingredients){
        return false
    }
    return true
}

function isValidIngredient(ingredientObj){
    if (!ingredientObj.name){
        return false
    }
    if (!ingredientObj.quantity){
        return false
    }
    return true
}