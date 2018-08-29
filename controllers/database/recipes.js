/*

    recipes.js

    - this file includes (will include) all the logic for taking a query, getting relevant session and returning full recipe data

*/

function getMealPlan(req,res,userSession){
    userSession.mealplan = Object.keys(userSession.mealPlan).map(key => {
        let data = userSession.mealPlan[key];
        if (data){
            return fillMealDay(data)
        } else {
            return data
        }
    })
}

module.exports = "Nothing yet...";