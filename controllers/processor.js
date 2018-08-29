/*

    processor.js

    - Here is where requests are processed

    ideal user session:

    {
        cookie: // user session cookie
        mealPlan: {
            monday: // recipe
        }
        groceries: [
            // list of groceries
        ]
    }

*/

const Imports = require("./imports");

function main(req,res,userSession){
    if (!userSession){
        // no userSession given, get one

        Imports.Cookies.getUserSession(req,res);
        return
    }

    if (!userSession.mealPlan){
        Imports.Recipes.getMealPlan(req,res,userSession);
        return
    }

    if (!userSession.groceries){
        Imports.Groceries.getGroceries(req,res,userSession);
        return
    }

    // maybe some validation?

    // then respond

    res.cookie = userSession.cookie;
    res.render("home",{data:userSession});
}

module.exports = {
    main
}