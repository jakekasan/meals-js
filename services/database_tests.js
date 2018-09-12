const fetch = require("node-fetch");
const Mongo = require("../controllers/imports").Mongo;

class ResponseObject{
    constructor(){
        // nothing
    }

    json(data){
        console.log(JSON.stringify(data,null,2));
    }
}


function viewAllRecipes(){

    let res = new ResponseObject();

    Mongo.getAllRecipes(null,res);
    // let data = await fetch("http://localhost:8000/api/recipes")
    //     .then(data => data.json())
    //     .catch(e => {
    //         throw e
    //     })

    // console.log(JSON.stringify(data,null,2));
}

function viewAllIngredients(){

    let res = new ResponseObject();

    Mongo.getAllIngredients(null,res);
}

//viewAllRecipes();

viewAllIngredients();