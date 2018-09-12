const baseController = require("./baseController");
const recipeModel = require("./../models/recipeModel");
const ingredientModel = require("./../models/ingredientModel");

module.exports = baseController.extends({
    name:"API",
    run: function(req,res,next){

    },
    routes:{
        "api/ingredients": {
            get: function (req,res,next) {
                recipeModel.setMongo(req.mongo);
                recipeModel.retrieve()
            },
            post: function (req,res,next) {
                // post data to model
            }
        }
    }
})