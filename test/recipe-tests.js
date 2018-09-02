/*

    recipe-tests.j

*/

const Recipes = require("./../controllers/imports").Recipes;

function test_recipesMiddleware(req,res,next){
    let test_req = {
        userSession:{
            mealPlan:{
                monday:{
                    name:"Bolognese"
                },
                tuesday:{
                    name:"Scrambled Eggs"
                }
            }
        }
    };

    let test_res = {};

    let test_next = function(){
        console.log("test_next called");
        console.log(JSON.stringify(test_req));
        console.log(test_res);
    }

    Recipes.recipesMiddleware(test_req,test_res,test_next);
}

test_recipesMiddleware();