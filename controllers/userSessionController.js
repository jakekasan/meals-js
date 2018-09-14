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
    // check if session exists and has a user
    if (req.session && req.session.id){
        // check that user is valid
        userSessionModel.retrieve({id:req.session.id},(err,data) => {
            if (err) {
                userSessionModel.create({},(err,data) => {
                    console.log(data.mealPlan);
                    req.userSession = data;
                    req.session.id = data._id;
                    next();
                });
            } else {
                req.userSession = data;
                req.session.id = data._id;
                next();
                return
            }
        });
    } else {
        // create a new userSession
        userSessionModel.create({},(err,data) => {
            console.log(data);
            req.userSession = data;
            req.session.id = data._id;
            next();
        });
        return
    }
}
