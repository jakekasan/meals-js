const baseController = require("./base.controller");
const recipeModel = require("../models/recipe.model");
const ingredientModel = require("../models/ingredient.model");
const userSessionModel = require("../models/userSession.model");
const mealPlanService = require("../services/mealPlan.services");

module.exports = baseController.extend({
    name:"API",
    recipeModel: recipeModel,
    ingredientModel: ingredientModel,
    userSessionModel: userSessionModel,
    debug: false,
    run: function(req,res,next){
        const self = this;

        mealPlanService.debug = self.debug;

        (self.debug) ? console.log(`${req.method} request for ${req.path} `) : null;
        this.recipeModel.setMongo(req.mongo);
        this.ingredientModel.setMongo(req.mongo);
        if (!Object.keys(self.routes).includes(req.path)){
            (self.debug) ? console.log(`Request route ${req.path} not available in ${Object.keys(self.routes)} `) : null;
            return res.sendStatus(404);
        }
        if (!Object.keys(self.routes[req.path]).includes(req.method)){
            (self.debug) ? console.log(`Request method ${req.method} not available in ${Object.keys(self.routes[req.path])} `) : null;
            return res.sendStatus(400);
        }
        self.routes[req.path][req.method](req,res,next,self);
    },
    routes:{
        "/api/ingredients": {
            GET: function (req,res,next,self) {
                self.ingredientModel.retrieve((req.query || {}),(err,data) => {
                    if (err) {
                        return res.sendStatus(500)
                    }
                    return res.json(data);
                })
            },
            POST: function (req,res,next,self) {
                // post data to model
                if (!(req.body || req.body.name)){
                    return res.sendStatus(400)
                }
                self.ingredientModel.retrieve({name:req.body.name},(err,data) => {
                    if (err){
                        return res.sendStatus(500)
                    }
                    if (data){
                        self.ingredientModel.update(data,req.body,(err) => {
                            if (err){
                                return res.sendStatus(400)
                            }
                            return res.sendStatus(200)
                        })
                    }

                })
            }
        },
        "/api/recipes": {
            GET: function (req,res,next,self) {
                self.recipeModel.retrieve((req.query || {}),(err,data) => {
                    if (err) {
                        return res.sendStatus(500)
                    }
                    return res.json(data);
                })
            },
            POST: function (req,res,next,self) {
                // post data to model
                if (!(req.body || req.body.name)){
                    return res.sendStatus(400)
                }
                self.recipeModel.retrieve({name:req.body.name},(err,data) => {
                    if (err){
                        return res.sendStatus(500)
                    }
                    if (data){
                        self.recipeModel.update(data,req.body,(err) => {
                            if (err){
                                return res.sendStatus(400)
                            }
                            return res.sendStatus(200)
                        })
                    }

                })
            }
        },
        "/api/users":{
            GET: function(req,res,next,self){
                
            },
            POST: function(req,res,next,self){
                /*
                    Take a 

                */

                (self.debug) ? console.log(req.cookies,req.body) : null;

                if (!(req.body)){
                    return res.sendStatus(400)
                }
                mealPlanService.mealPlanChangeDay(req,res,next);
            },
            _support: {
                validateUserSession: function(userSession,self){
                    return true
                }
            }
        }
    }
})