/*

    processor.js

    - this keeps track of database jobs
    - confirmation codes will be handled here

*/

const Imports = require("./imports");
const sqlite3 = require("sqlite3");

let db = sqlite3.Database("./database/sql/databaseJobs.db",(err) => {
    if (err) {
        throw err
    }
    // connected!
});

function initDatabase(){
    // run just once
    let db = sqlite3.Database("./database/sql/databaseJobs.db",(err) => {
        if (err) {
            throw err
        }
        // connected!
    });

    

    db.close();
}

function addJob(req,res,jobType){

    // connect to the database

    let db = sqlite3.Database("./database/sql/databaseJobs.db",(err) => {
        if (err) {
            throw err
        }
        // connected!
        
        // if the table doesnt exist, create it

        db.run(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            name TEXT,
            done INTEGER,
            failed INTEGER
        ) IF NOT EXISTS (SELECT * FROM jobs)`,(err) => {
            if (err) throw err;

            // now insert the job
            let sql = `INSERT INTO jobs (type, name, done,failed) VALUES (?,?,?,?)`;

            let jobName = req.body.name;

            let values = [jobType,jobName,0,0];

            db.run(sql,values,(err) => {
                if (err) throw err;
                let jobID = this.lastID;
                res.redirect(`/${jobType}?confirmation=${jobID}`);
                db.close();
            });

        });
    });
}

// middleware

function checkJob(req,res,next){
    if (!req.query.confirmation){
        next();
        return
    }

    let db = sqlite3.Database("./database/sql/databaseJobs.db",(err) => {
        if (err) {
            throw err
        }
        // connected!
        
        // if the table doesnt exist, create it

        db.run(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT,
            name TEXT,
            done INTEGER
        ) IF NOT EXISTS (SELECT * FROM jobs)`,(err) => {
            if (err) throw err;

            // now check the job status
            let sql = `SELECT (type,name,done,failed) FROM jobs WHERE id = ?`;

            let values = [req.query.confirmation];

            db.run(sql,values,(err,row) => {
                if (err) throw err;
                if (row.done == 0){
                    next();
                    return
                } else {
                    req.confirmation = {
                        name:row.name,
                        type:row.type,
                        failed: (row.failed == 1) ? true : false
                    }
                    next();
                    return
                }
            });

        });
    });
}

module.exports = {
    addJob,
    checkJob
}