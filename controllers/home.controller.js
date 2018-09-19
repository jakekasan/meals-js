/*

    homeController.js
        - extends baseController
        - routes served:
            '/','/index'
                - home page, get content from userSession
            '/ingredients'
                - page to add ingredients
                TO-DO:
                    - add hookup to federal food database
            '/recipes'
                - page to add recipes
                - links to ingredients and only allows for ingredients already in system
*/

var recipeModel = require("../models/recipe.model");
var baseView = require("../views/baseView");
var baseController = require("./base.controller");



module.exports = baseController.extend({
    name:"Home",
    content:null,
    debug:false,
    userSessionModel:null,
    recipeModel:null,
    ingredientsModel:null,
    run: function(req,res,next){
        var self = this;
        recipeModel.setMongo(req.mongo);

        if (self.debug) console.log(`${req.method} to ${req.path}`);

        //self["/"](req,res,next,self);
        if (Object.keys(self).includes(req.path)){
            self[req.path](req,res,next,self);
        } else {
            res.redirect("/");
        }
    },
    getContent: function(req,self,callback){
        if ((!req.userSession) || (!req.userSession.mealPlan)){
            return callback();
        }
        (self.debug) ? console.log(req.userSession.mealPlan) : null;
        let recipes = req.userSession.mealPlan.map(item => item.name);
        (self.debug) ? console.log(recipes) : null;
        if (recipes.length == 0) return callback()
        recipeModel.retrieve({"name":{$in:recipes}},(err,data) => {
            if (err) {
                if (self.debug) console.log("Problem retrieving recipes");
                console.log(err);
                throw err
            }
            return callback(err,data);
        });
    },
    "/": function(req,res,next,self){
        
        
        self.getContent(req,self,(err,data) => {
            if (self.debug) console.log("Logging mealPlan: ",req.userSession.mealPlan[0]);
            if (err) {
                (self.debug) ? console.log("Problem in callback of getContent") : null;
                throw err;
            }
            if (!data){
                self.content = {
                    mealPlan:{}
                };
            } else {
                self.content = {
                    mealPlan: (req.userSession.mealPlan
                                    .reduce((acc,item) => {
                                        acc[item.day] = (data.filter(elem => { return (elem.name == item.name)})).pop();
                                        return acc
                                    },{}))
                };
            }
            
            // now load view

            if (self.debug) console.log(self.content);

            let view = new baseView(res,"home");
            view.render(self.content);
        })
    },
    "/ingredients": function(req,res,next,self){
        res.redirect("/ingredients/home");
    },
    "/recipes": function(req,res,next,self){
        res.redirect("/recipes/home");
    }

})