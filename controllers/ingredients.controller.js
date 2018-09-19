/*

    ingredients.controller.js

*/

const baseController = require("./base.controller");
const baseView = require("./../views/baseView");

module.exports = baseController.extend({
    name:"Ingredients Controller",
    run: function(req,res,next){

    },
    "ingredients": {
        GET: function(req,res,next,self){
            let view = new baseView(res,"ingredients/main");
            view.render({});
        },
        POST: function(req,res,next,self){

        }
    },
    "ingredients/add":{
        GET: function(req,res,next,self){
            let view = new baseView(res,"ingredients/add");
            view.render({});
        },
        POST: function(req,res,next,self){

        }
    }
})