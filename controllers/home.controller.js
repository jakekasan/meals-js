/*

    homeController.js
        - extends baseController
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
        recipeModel.setMongo(req.mongo);
        var self = this;
        self.getContent(req,(err,data) => {
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
    getContent: function(req,callback){
        if ((!req.userSession) || (!req.userSession.mealPlan)){
            return callback();
        }
        var self = this;
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

})