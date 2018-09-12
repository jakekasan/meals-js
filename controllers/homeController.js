/*

    homeController.js
        - extends baseController
*/

var userSessionModel = require("./../models/userSessionModel")();
var recipeModel = require("./../models/recipeModel");
var baseView = require("./../views/baseView");

module.exports = {
    name:"Home",
    content:null,
    userSessionModel:null,
    recipeModel:null,
    ingredientsModel:null,
    run: function(req,res,next){
        recipeModel.setMongo(req.mongo);
        var self = this;
        self.getContent((err,data) => {
            if (err) {
                throw err;
            }
            self.content.mealPlan = Object.entries(req.userSessionModel.mealPlan)
                .reduce((acc,[key,item]) => {
                    acc[key] = data.filter(elem => elem.name == item).pop();
            },{})
            
            // now load view

            let view = new baseView(res,"home");
            view.render(self.content);
        })
        
    },
    getContent: function(req,callback){
        var self = this;
        let recipes = Object.values(req.userSessionModel.mealPlan);
        recipeModel.retrieve({name:{$in:recipes}},(err,data) => {
            callback(err,data);
        });
    },

}