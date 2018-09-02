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

    let db = new sqlite3.Database("./user_sessions.db",(err) => {
        if (err){
            console.log("Connection to SQLite unsuccessful")
            console.log(err);
            return
        }
        console.log("Connection to SQLite successful");
        return
    });

    let sql = `CREATE TABLE IF NOT EXISTS user_sessions(
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

/*

        MIDDLEWARE

*/


function cookieMiddleware(req,res,next){
    // if the cookie has an _id attribute, pass it to get checked
    if (!req.cookies._id){
        noCookie(req,res,next);
    } else {
        yesCookie(req,res,next);
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
            let cookieID = Object.values(row).pop() + 1;

            
            setCookieInDatabase(cookieID,req,res,next);
        });
    }

    loadDatabase(noCookieCallback);
}

function setCookieInDatabase(cookieID,req,res,next){
    

    function setCookieInDatabaseCallback(db){
        let sql = `INSERT INTO user_sessions(cookieID) VALUES(?)`;

        db.run(sql,[cookieID],(err) => {
            if (err){
                console.log(err.message);
            } else {
                console.log(`cookieID ${cookieID} successfully added`);
                console.log("Setting cookieID to",cookieID);
                let userSession = {
                    mealPlan:{},
                    groceries:[]
                };
                req.cookies._id = cookieID;
                req.userSession = userSession;
                res.cookie("_id",cookieID);
                res.userSession = userSession;
            }
            next();
        })
    }

    loadDatabase(setCookieInDatabaseCallback);
}

function yesCookie(req,res,next){
    /*
        Check if the cookieID exists in the database.
        If yes, add the session to the request object
        If not, run noCookie.
    */

    let yesCookieCallback = function(db){
        let sql = `SELECT * FROM user_sessions WHERE cookieID = ?`;
        console.log(`Attempting to get cookie id ${req.cookies._id} from table...`)
        db.get(sql,[req.cookies._id],(err,row) => {
            
            if (err) {
                // for now, just log error and create new blank user session
                console.log("Error trying to find cookie...")
                req.userSession = {
                    mealPlan: {},
                    groceries: []
                }
            } else {
                console.log(row);
                req.userSession = assembleUserSession(row);
            }
            
            next();
        });
    }

    loadDatabase(yesCookieCallback);
}

function assembleUserSession(row){
    console.log("Assembling user session...")
    console.log(row);
    if (!row){
        return {
            mealPlan: {},
            groceries: []
        }
    }
    let mealPlan = {};
    for (let key in row){
        if (typeof row[key] == String){
            mealPlan[key] = row[key];
        }
    }
    return {
        mealPlan: mealPlan,
        groceries: []
    }
}

function updateUserSession(req,res){
    // update user session
    // pull relevant row from DB and update it

    console.log("Updating User Session with data...")
    
    let data = req.body;

    console.log(data);

    if (data == {}){
        res.send(400);
        return
    }

    function updateUserSessionCallback(db){
        let sql = `UPDATE user_sessions SET ${data.day} = ? WHERE cookieID = ?`;

        let day = data.day;
        let recipe = data.recipe;

        console.log(`Attempting to update record ${req.cookies._id} with ${recipe} for ${day} `)

        db.run(sql,[recipe,req.cookies._id],(err) => {
            if (err){
                console.log("Cannot update user session...");
                console.log(err.message);
                return
            } else {
                console.log("DB successfully updated")
                // res.send("hi!");
            }
        });
    }

    loadDatabase(updateUserSessionCallback);
}


module.exports = {
    loadDatabase,
    getUserSession,
    createUserSession,
    cookieMiddleware,
    noCookie,
    yesCookie,
    updateUserSession
}