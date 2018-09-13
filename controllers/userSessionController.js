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
    if (req.session && req.session.user){
        // check that user is valid
        userSessionModel.retrieve({name:req.session.user.name},(err,data) => {
            if (err) {
                req.userSession = {}
                next();
            } else {
                req.userSession = data;
                next();
            }
        });
    } else {
        req.userSession = {};
        next();
    }
}
/*
module.exports = {
    run: function(req,res,next){
        userSessionModel.setMongo(req.mongo);
        // check if session exists and has a user
        if (req.session && req.session.user){
            // check that user is valid
            userSessionModel.retrieve({name:req.session.user.name},(err,data) => {
                if (err) {
                    req.userSession = {}
                    next();
                } else {
                    req.userSession = data;
                    next();
                }
            });
        } else {
            req.userSession = {};
            next();
        }
    },
    checkSession: function(req,callback){
        
    }
}
*/