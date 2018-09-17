/*

    recipe.services.js

*/

const userSessionModel = require("../models/userSessionModel");
const mealDayModel = require("../models/mealDayModel");
const recipeModel = require("./../models/recipeModel");


module.exports = {
    name:"userSession Services",
    mealPlanChangeDay: function (req,res,next) {
        // get mealPlans
        userSessionModel.retrieve({_id:req.userSession._id},(err,data) => {
            if (err) return res.sendStatus(400);
            data.mealPlan.filter(item => {
                return !(item.day == req.body.day)
            });
            data.mealPlan.push(new mealDayModel({
                day: req.body.day,
                recipe: req.body.recipe,
                people: 1
            }));
            userSessionModel.update({_id:data._id},data,(err,data) => {
                if (err) {
                    return res.sendStatus(400)
                }
                return res.sendStatus(200)
            })
        });
    },
    mealPlanFillRecipes: function(req,res,next){
        if (req.userSession.mealPlan && req.userSession.mealPlan.length && (req.userSession.mealPlan.length > 0)){
            let promises = req.userSession.mealPlan.map(item => {
                return (new Promise((resolve,reject) => {
                    recipeModel.retrieve({name:item.name},(err,data) => {
                        if (err) {
                            return reject(err)
                        }
                        item.recipe = data;
                        return resolve(item)
                    })
                }))
                
            })

            Promise.all(promises)
                .then(values => {
                    req.userSession.mealPlan = values;
                    next();
                })
        } else {
            return next();
        }

        
    }
}