/*

    userSessionController.js

    TO-DO:
        - create the middleware
            - check for cookie in request
                - if cookie, pull userSession from model
                - if no cookie, create new userSession
            -

*/

const userSessionModel = require("./../models/userSessionModel");

module.exports = function(req,res,next){
    userSessionModel.setMongo(req.mongo);
    // express-session not persisting

    

    // check if session exists and has a user
    console.log("Initial req.session",req.session);
    if (req.session && req.session.user){
        // check that user is valid
        userSessionModel.retrieve({_id:req.session.user._id},(err,data) => {
            if (err) {
                userSessionModel.create({},(err,data) => {
                    //console.log(data.mealPlan);
                    console.log("Error retrieving userSession");
                    console.log(req.session);
                    console.log("Now the data...");
                    console.log(data);
                    req.userSession = data;
                    req.session.user = data;
                    req.session.save(() => {
                        console.log(req.session);
                        return next();
                    });
                    return
                });
            } else {
                console.log("Retrieved userSession");
                console.log(req.session);
                console.log("Now the data...");
                console.log(data);
                req.userSession = data;
                req.session.user = data;
                req.session.save(() => {
                    console.log(req.session);
                    return next();
                });
                
            }
        });
    } else {
        // create a new userSession
        userSessionModel.create({},(err,data) => {
            console.log("Creating new userSession..");
            console.log(req.session);
            console.log("Now the data...");
            console.log(data);
            req.userSession = data;
            req.session.user = data;
            req.session.save(() => {
                if (req.count) {
                    req.session.count++;
                } else {
                    req.session.count = 1;
                }
                console.log(req.session);
                return next();
            });
            
        });
    }
}
