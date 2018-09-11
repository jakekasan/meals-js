/*

    homeController.js
        - extends baseController
*/

var userSessionModel = require("./../models/userSessionModel")();



module.exports = {
    name:"Home",
    content:null,
    userSessionModel:null,
    recipeModel:null,
    ingredientsModel:null,
    run: function(req,res,next){
        userSessionModel.setMongo(req.mongo);
        recipeModel.setMongo(req.mongo)
        
    },
    getContent: function(callback){
        var self = this;
        this.userSessionModel.retrieve(null,(err,data) => {
            self.content = data;
            this.recipeModel
        })
    },

}