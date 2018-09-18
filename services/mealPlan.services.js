/*

    recipe.services.js

*/

const userSessionModel = require("./../models/userSessionModel");
const mealDayModel = require("./../models/mealDayModel");
const recipeModel = require("./../models/recipeModel");


module.exports = {
    name:"userSession Services",
    debug: false,
    mealPlanChangeDay: function (req,res,next) {
        // get mealPlans
        var self = this;
        (self.debug) ? console.log(req.session) : null;
        userSessionModel.retrieve({_id:req.session.id},(err,data) => {
            if (err) return res.sendStatus(400);
            console.log(`Updating ${data.mealPlan} with ${data.mealPlan} `)
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