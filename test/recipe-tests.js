/*

    recipe-tests.j

*/

const Recipes = require("./../controllers/imports").Recipes;

function test_recipesMiddleware(){
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

function test_getRawGroceries(){
    let mealPlan = {
        monday:{
            name:"Bolognese",
            ingredients:[
                {
                    name:"Beef",
                    quantity:200
                },
                {
                    name:"Chopped Tomatoes",
                    quantity:400
                },
                {
                    name:"Pasta",
                    quantity:300
                }
            ]
        },
        tuesday:{
            name:"Bolognese",
            ingredients:[
                {
                    name:"Beef",
                    quantity:200
                },
                {
                    name:"Chopped Tomatoes",
                    quantity:400
                },
                {
                    name:"Pasta",
                    quantity:300
                }
            ]
        }
    };

    console.log(Recipes.getRawGroceries(mealPlan));

}

//test_recipesMiddleware();

test_getRawGroceries();