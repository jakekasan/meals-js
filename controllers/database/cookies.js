/*

    cookies.js

    - All the logic for handling cookies and returning user sessions

    - user session:

        userID, userName, cookieID, monday, tuesday, wednesday, thursday, friday, saturday, sunday
*/


// placeholder stuff

const Imports = require("../imports");
const Processor = require("../processor");

const sqlite3 = require("sqlite3");

// function initDatabase(){
//     /* 
//         Check if database exists
//         If not, create it
//     */

//     let sql =   `CREATE TABLE user_sessions(
//                     userID number,
//                     userName text,
//                     cookieID number,
//                     monday text,
//                     tuesday text
//                     wednesday text,
//                     thursday text,
//                     friday text,
//                     saturday text,
//                     sunday text
//                 );`

//     let db = loadDatabase();

//     db.run(sql,[],(err) => {
//         if (err){
//             console.log(err);
//             db.close();
//             return
//         }
//         console.log("User session database created")
//     });

//     db.close();
// }

function loadDatabase(callback){

    let db = new sqlite3.Database(":memory:",(err) => {
        if (err){
            console.log("Connection to SQLite unsuccessful")
            console.log(err);
            return
        }
        console.log("Connection to SQLite successful");
        return
    });

    let sql = `CREATE TABLE IF NOT EXISTS user_sessions(
        userID number,
        userName text,
        cookieID number,
        monday text,
        tuesday text
        wednesday text,
        thursday text,
        friday text,
        saturday text,
        sunday text
    );`

    db.run(sql,[],(err) => {
        if (err){
            console.log(err);
            return
        }
        console.log();
        callback(db);
    });
}

function getUserSession(req,res){
    /*

        Takes a cookie object from req.query and returns a user session object (if it exists)

        If a user session does not exist, redirect to login

    */

    // callback to be run if successfull connected to database

    let userSessionCallback = function(db){
        let sql =   `SELECT * FROM user_sessions
        WHERE cookieID == ?`;

        db.get(sql,[cookieID],(err,row) => {
            if (err) {
                return console.error(err.message)
            }
            // if cookie did not exist, row should be empty

            console.log(row);
    
            // if row is empty, create user session
            if (!row){
                createUserSession(req,res);
            } else {
                // assemble userSession object
                let userSession = {
                    cookie: row.cookieID,
                    mealPlan:{
                        monday:row.monday,
                        tuesday:row.tuesday,
                        wednesday:row.wednesday,
                        thursday:row.thursday,
                        friday:row.friday,
                        saturday:row.saturday,
                        sunday:row.sunday
                    }
                }
                Processor.main(req,res,userSession);
            }
            db.close();
    
            // if user session exists, make the object and return it
            
            return
        });


    
        

        
    }

    

    
    
    


    

    return {userSession,cookie};
}

function createUserSession(req,res){
    /*
        Return a new cookieID
    */

    // construct callback

    function createUserSessionCallback(db){
        let sql = `SELECT MAX(cookieID)+1 FROM user_sessions WHERE EXISTS(SELECT * FROM user_sessions)`;

        db.get(sql,[],(err,cookieID) => {
            if (err){
                console.log(err);
                return
            }
            // we've got the max cookieID (if it exists)
            console.log(cookieID);

            let sql = `INSERT INTO user_sessions VALUES((?));`

            db.run(sql,[cookieID],(err) => {
                if (err) throw err;
                db.close();
            });
        });
        return

    }
    // first, get the current cookie ID + 1

    

    loadDatabase(createUserSessionCallback);
}

function generateNewCoookie(){
    let sql = `SELECT MAX(cookieID) FROM user_sessions`;

    let db = loadDatabase();

    db.run(sql);
}

// new middleware


function cookieMiddleware(req,res,next){
    if (!req.cookies._id){
        // no cookie ID, grab new cookie ID
    }
}

function noCookie(req,res,next){
    console.log("noCookie called");
    // put new user session in the database, and on completion pass the request and response down

    let noCookieCallback = function(db){
        console.log("Running noCookie callback...")
        // callback to be finished...
        let sql = `SELECT MAX(cookieID) FROM user_sessions`;
        db.get(sql,[],(err,row) => {
            if (err){
                console.log(err);
                return
            }
            let maxCookieID = Object.values(row).pop();

            req.cookies._id = maxCookieID+1;
            res.cookie("_id",maxCookieID+1);
            next();
        });
    }

    loadDatabase(noCookieCallback);


}

function yesCookie(req,res,next){
    /*
        Check if the cookieID exists in the database.
        If yes, add the session to the request object
        If not, run noCookie.
    */

    let yesCookieCallback = function(db){
        let sql = `SELECT * FROM user_sessions WHERE cookieID == (?)`;
        db.get(sql,[req.cookies._id],(err,row) => {
            if (err) {
                // for now, just log error and create new cookie
            }
        });
    }
}

module.exports = {
    loadDatabase,
    getUserSession,
    createUserSession,
    cookieMiddleware,
    noCookie,
    yesCookie
}