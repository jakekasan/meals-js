/*

    cookies.js

    - All the logic for handling cookies and returning user sessions

    - user session:

        userID, userName, cookieID, monday, tuesday, wednesday, thursday, friday, saturday, sunday
*/


// placeholder stuff

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

function loadDatabase(){
    let db = new sqlite3.Database("./db/userSessions.db",(err) => {
        if (err){
            console.log(err);
            return false
        }
        console.log("Connected to SQLite");
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

    db.run(sql);

    console.log(db);

    return db
}

function getUserSession(cookieID){
    /*

        Takes a cookie object from req.query and returns a user session object (if it exists)

        If a user session does not exist, redirect to login

    */

    let db = loadDatabase();

    let sql =   `SELECT * FROM user_sessions
                 WHERE cookieID == ?`

    db.get(sql,[cookieID],(err,row) => {
        if (err) {
            return console.error(err.message)
        }
        console.log(row);
        return
    });

    db.close();
}

function createUserSession(userName){
    /*
        Return a new cookieID
    */

    // to be completed...
    let cookieID = 0;

    let sql = `INSERT INTO user_sessions(cookieID,userName) VALUES (?,?)`;

    let db = loadDatabase();

    db.run(sql,[cookieID,"jeff"],(err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Added ${this.changes} rows`);
    });

    db.close();
}


module.exports = {
    initDatabase,
    loadDatabase,
    getUserSession,
    createUserSession
}