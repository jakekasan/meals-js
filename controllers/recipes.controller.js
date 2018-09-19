/*

    recipes.controller.js

*/

const baseController = require("./base.controller");
const baseView = require("./../views/baseView");

module.exports = baseController.extend({
    name:"Recipes Controller",
    debug: false,
    mongo:null,
    run: function(req,res,next){
        var self = this;
        self.mongo = req.mongo;
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
            let view = new baseView(res,"recipes/add");
            view.render({});
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