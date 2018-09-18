/*

    recipe.services.js

*/

const userSessionModel = require("./../models/userSessionModel");
const mealDayModel = require("./../models/mealDayModel");
const mealDaySchema = require("./../models/schemas/mealDaySchema");
const recipeModel = require("./../models/recipeModel");


module.exports = {
    name:"mealPlan Services",
    debug: false,
    mealPlanChangeDay: function (req,res,next) {
        // get mealPlans
        var self = this;
        (self.debug) ? console.log("Logging cookies") : null;
        (self.debug) ? console.log(req.cookies) : null;
        (self.debug) ? console.log(req.userSession) : null;

        if (!req.userSession.mealPlan) {
            req.userSession.mealPlan = [];
        }

        req.userSession.mealPlan.filter(item => {
            return !(item.day == req.body.day)
        });

        // let newMealDay = new (mealDayModel.model)({
        //     day: req.body.day,
        //     recipe: req.body.recipe,
        //     people: 1
        // });

        if (self.debug) console.log("MealDay to add:",req.body);

        // req.userSession.mealPlan.push(newMealDay);
        req.userSession.mealPlan.push({
            day: req.body.day,
            name: req.body.recipe,
            people: 1
        });

        if (self.debug) console.log("Updated userSession:",req.userSession);

        userSessionModel.update({_id:req.userSession._id},req.userSession,(err,data) => {
            if (err) {
                if (self.debug) console.log("Failed to update");
                return res.sendStatus(400)
            }
            if (self.debug) console.log("Successfully updated",data);
            return res.sendStatus(200)
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
                    // sort the values
                    let days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];

                    values = values.sort((a,b) => {
                        if (days.indexOf(a.day) < days.indexOf(b.day)){
                            return -1
                        }
                        if (days.indexOf(a.day) > days.indexOf(b.day)){
                            return 1
                        }
                        return 0
                    });

                    let mealPlan = values.reduce((acc,item) => {
                        return (acc[item.day] = item)
                    },{});

                    req.userSession.mealPlan = mealPlan;
                    next();
                })
        } else {
            return next();
        }

        
    }
}