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

    if (req.cookies && req.cookies._id) {
        userSessionModel.retrieve({_id:req.cookies._id},(err,data) => {
            if (err) {
                return newUserSession(req,res,next);
            }
            if (data.length < 1) {
                return newUserSession(req,res,next);
            }
            req.userSession = data[0];
            console.log("Retrieved userSession");
            console.log(data[0]);
            next();
        });
        return
    } else {
        newUserSession(req,res,next);
    }
}

newUserSession = function(req,res,next){
    userSessionModel.create({},(err,data) => {
        if (err) {
            if (req.cookies && req.cookies._id){
                req.cookies = null;
            }
            return next();
        }
        req.userSession = data;
        req.cookies._id = data._id;
        res.cookie("_id",data._id);
        console.log("Creating userSession");
        console.log(data);
        next();
    });
    return
}