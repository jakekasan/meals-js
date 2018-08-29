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

function initDatabase(){
    /* 
        Check if database exists
        If not, create it
    */

    let sql =   `CREATE TABLE user_sessions(
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

    let db = loadDatabase();

    db.run(sql,[],(err) => {
        if (err){
            console.log(err);
            db.close();
            return
        }
        console.log("User session database created")
    });

    db.close();
}

function loadDatabase(callback){

    let db = new sqlite3.Database(":memory:",(err) => {
        if (err){
            console.log(err);
            return false
        }
        console.log("Connected to SQLite");
        return
    });

    let sql = `CREATE TABLE IF NOT EXISTS user_session(
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
        console.log(this);
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
                        sunday:row.saturday
                    }
                }
                Processor.main(req,res,userSession);
            }
    
            // if user session exists, make the object and return it
            
            return
        });
    
        db.close();

        
    }

    

    
    
    


    

    return {userSession,cookie};
}

function createUserSession(req,res){
    /*
        Return a new cookieID
    */

    // first, get the current cookie ID + 1

    let sql = `SELECT MAX(cookieID)+1 FROM user_sessions WHERE EXISTS(SELECT * FROM user_sessions)`

    let db = loadDatabase();

    db.get(sql,[],(err,row) => {
        if (err){
            console.log(err);
            return
        }
        console.log(row);
        return
    });
    return

    // let sql = `INSERT INTO user_sessions(cookieID) VALUES (?,?)`;

    // let db = loadDatabase();

    // db.run(sql,[cookieID,"jeff"],(err) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log(`Added ${this.changes} rows`);


    // });

    // db.close();
}

function generateNewCoookie(){
    let sql = `SELECT MAX(cookieID) FROM user_sessions`;

    let db = loadDatabase();

    db.run(sql);
}


module.exports = {
    initDatabase,
    loadDatabase,
    getUserSession,
    createUserSession
}