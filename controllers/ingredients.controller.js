/*

    ingredients.controller.js

*/

const baseController = require("./base.controller");
const baseView = require("./../views/baseView");

module.exports = baseController.extend({
    name:"Ingredients Controller",
    debug: false,
    mongo:null,
    run: function(req,res,next){
        var self = this;
        self.mongo = req.mongo;
        if (self.debug) console.log(`${req.method} request for ${req.path}`)
        if (Object.keys(self).includes(req.path) && Object.keys(self[req.path]).includes(req.method)){
            self[req.path][req.method](req,res,next,self);
        } else {
            // redirect to 404 (once implemented)
            if (self.debug) console.log(`${req.path} not found in ${self.name} routes`);
            res.redirect("/");
        }
    },
    "/ingredients": {
        GET: function(req,res,next,self){
            let view = new baseView(res,"ingredients/main");
            view.render({});
        },
        POST: function(req,res,next,self){
            let view = new baseView(res,"ingredients/main");
            view.render({});
        }
    },
    "/ingredients/add":{
        GET: function(req,res,next,self){
            let view = new baseView(res,"ingredients/add");
            view.render({});
        },
        POST: function(req,res,next,self){
            let view = new baseView(res,"ingredients/add");
            view.render({});
        }
    }
})