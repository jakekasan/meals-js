const baseController = require("./baseController");
const recipeModel = require("./../models/recipeModel");
const ingredientModel = require("./../models/ingredientModel");

module.exports = baseController.extend({
    name:"API",
    recipeModel: recipeModel,
    ingredientModel: ingredientModel,
    run: function(req,res,next){
        const self = this;
        this.recipeModel.setMongo(req.mongo);
        this.ingredientModel.setMongo(req.mongo);
        if (!Object.keys(this.routes).includes(req.path)){
            return res.sendStatus(404);
        }
        if (!Object.keys(this.routes[req.path]).includes(req.method)){
            return res.sendStatus(400);
        }
        this.routes[req.path][req.method](req,res,next,self);
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
            get: function (req,res,next,self) {
                self.recipeModel.retrieve((req.query || {}),(err,data) => {
                    if (err) {
                        return res.sendStatus(500)
                    }
                    return res.json(data);
                })
            },
            post: function (req,res,next,self) {
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
        }
    }
})