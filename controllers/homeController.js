/*

    homeController.js
        - extends baseController
*/

var recipeModel = require("./../models/recipeModel");
var baseView = require("./../views/baseView");
var baseController = require("./baseController");

module.exports = baseController.extend({
    name:"Home",
    content:null,
    userSessionModel:null,
    recipeModel:null,
    ingredientsModel:null,
    run: function(req,res,next){
        recipeModel.setMongo(req.mongo);
        var self = this;
        self.getContent(req,(err,data) => {
            if (err) {
                throw err;
            }
            if (!data){
                self.content = {
                    mealPlan:{}
                };
            } else {
                self.content = {
                    mealPlan: Object.entries(req.userSession.mealPlan)
                    .reduce((acc,[key,item]) => {
                        acc[key] = data.filter(elem => elem.name == item).pop();
                    },{})
                };
            }
            
            // now load view

            let view = new baseView(res,"home");
            view.render(self.content);
        })
        
    },
    getContent: function(req,callback){
        if ((!req.userSession) || (!req.userSession.mealPlan)){
            callback();
        }
        var self = this;
        let recipes = Object.values(req.userSessionModel.mealPlan);
        recipeModel.retrieve({name:{$in:recipes}},(err,data) => {
            callback(err,data);
        });
    },

})