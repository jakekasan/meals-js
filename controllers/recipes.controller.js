/*

    recipes.controller.js

*/

const baseController = require("./base.controller");
const recipesModel = require("./../models/recipe.model");
const baseView = require("./../views/baseView");

module.exports = baseController.extend({
    name:"Recipes Controller",
    debug: false,
    mongo:null,
    run: function(req,res,next){
        var self = this;
        self.mongo = req.mongo;
        recipesModel.setMongo(req.mongo);
        if (Object.keys(self).includes(req.path) && Object.keys(self[req.path]).includes(req.method)){
            self[req.path][req.method](req,res,next,self);
        } else {
            // redirect to 404 (once implemented)
            if (self.debug) console.log(`${req.path} not found in ${self.name} routes`);
            res.redirect("/");
            return
        }
    },
    "/recipes": {
        GET: function(req,res,next,self){
            let view = new baseView(res,"recipes/main");
            view.render({});
        },
        POST: function(req,res,next,self){
            let view = new baseView(res,"recipes/main");
        }
    },
    "/recipes/add":{
        GET: function(req,res,next,self){
            let view = new baseView(res,"recipes/add");
            view.render({});
        },
        POST: function(req,res,next,self){
            // console.log(req.body.ingredients);
            // console.log(JSON.parse(req.body.ingredients[0]))
            req.body.ingredients = req.body.ingredients.map(item => JSON.parse(item));
            console.log(req.body);
            recipesModel.retrieve({name:req.body.name},(err,result) => {
                if (false){
                    recipesModel.update(result,req.body,(err) => {
                        if (err) console.log(err);
                        res.redirect("/recipes/add");
                        // let view = new baseView(res,"recipes/add");
                        // view.render({});
                    });
                } else {
                    recipesModel.create(req.body,(err) => {
                        if (err) {
                            let view = new baseView(res,"recipes/add");
                            return view.render({});
                        } else {
                            let view = new baseView(res,"recipes/add");
                            return view.render({});
                        }
                    })
                }
            })
            // let view = new baseView(res,"recipes/add");
            // view.render({});
        }
    },
    "/recipes/alt":{
        GET: function(req,res,next,self){
            let view = new baseView(res,"recipes/alt");
            view.render({});
        },
        POST: function(req,res,next,self){
            let view = new baseView(res,"recipes/alt");
            view.render({});
        }
    }
})