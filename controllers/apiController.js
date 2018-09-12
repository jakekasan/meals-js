const baseController = require("./baseController");
const recipeModel = require("./../models/recipeModel");
const ingredientModel = require("./../models/ingredientModel");

module.exports = baseController.extends({
    name:"API",
    run: function(req,res,next){
        recipeModel.setMongo(req.mongo);
        ingredientModel.setMongo(req.mongo);
        if (!Object.keys(this.routes).includes(req.path)){
            return res.sendStatus(404);
        }
        this.routes[req.path][req.method];
    },
    routes:{
        "/api/ingredients": {
            GET: function (req,res,next) {
                ingredientModel.retrieve((req.query || {}),(err,data) => {
                    if (err) {
                        return res.sendStatus(500)
                    }
                    return res.json(data);
                })
            },
            POST: function (req,res,next) {
                // post data to model
                if (!(req.body || req.body.name)){
                    return res.sendStatus(400)
                }
                ingredientModel.retrieve({name:req.body.name},(err,data) => {
                    if (err){
                        return res.sendStatus(500)
                    }
                    if (data){
                        ingredientModel.update(data,req.body,(err) => {
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
            get: function (req,res,next) {
                recipeModel.retrieve((req.query || {}),(err,data) => {
                    if (err) {
                        return res.sendStatus(500)
                    }
                    return res.json(data);
                })
            },
            post: function (req,res,next) {
                // post data to model
                if (!(req.body || req.body.name)){
                    return res.sendStatus(400)
                }
                recipeModel.retrieve({name:req.body.name},(err,data) => {
                    if (err){
                        return res.sendStatus(500)
                    }
                    if (data){
                        recipeModel.update(data,req.body,(err) => {
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