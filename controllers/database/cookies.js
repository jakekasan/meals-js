/*

    cookies.js

    - All the logic for handling cookies and returning user sessions

*/



const sqlite3 = require("sqlite3");

let db = new sqlite3.Database(":memory",(err) => {
    if (err){
        console.log(err);
        return
    }
    console.log("Connected to SQLite");
});

