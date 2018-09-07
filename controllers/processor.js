/*

    processor.js

    - this keeps track of database jobs
    - confirmation codes will be handled here

*/

const Imports = require("./imports");
const sqlite3 = require("sqlite3");
const Path = require("path");

const dbPath = Path.resolve(__dirname,"jobs.db");

const boilerPlateSQL = `CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    name TEXT,
    done INTEGER,
    failed INTEGER
);`

// let db = sqlite3.Database("./database/sql/databaseJobs.db",(err) => {
//     if (err) {
//         throw err
//     }
//     // connected!
// });

function initDatabase(){
    // run just once
    let db = new sqlite3.Database(dbPath,(err) => {
        if (err) {
            throw err
        }
        // connected!
    });

    

    db.close();
}

function addJob(req,res,jobType,callback){

    // connect to the database

    let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,(err) => {
        if (err) {
            throw err
        }
        // connected!
        
        // if the table doesnt exist, create it

        

        db.run(boilerPlateSQL,[],(err) => {
            if (err) {
                console.log(err.message);
                return
            }

            // now insert the job
            let sql = `INSERT INTO jobs (type, name, done,failed) VALUES (?,?,?,?)`;

            let jobName = req.body.name;

            let values = [jobType,jobName,0,0];

            db.run(sql,values,(err) => {
                if (err) {
                    throw err;
                }
                let jobID = this.lastID;

                console.log("Logging this");

                console.log(this);

                console.log(`LastID: ${this.lastID}, Changes: ${this.changes} `)

                callback(jobID);
                db.close();
                res.redirect(`/${jobType}?confirmation=${jobID}`);
                
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

    let db = new sqlite3.Database(dbPath,(err) => {
        if (err) {
            throw err
        }
        // connected!
        
        // if the table doesnt exist, create it

        db.run(boilerPlateSQL,(err) => {
            if (err) throw err;

            // now check the job status
            let sql = `SELECT type type, name name, done done, failed failed FROM jobs WHERE id = ?`;

            let values = [req.query.confirmation];

            db.get(sql,values,(err,row) => {
                if (err) throw err;
                if (!row) {
                    db.close();
                    next();
                    return
                }
                if (row.done == 0){
                    db.close();
                    next();
                    return
                } else {
                    req.confirmation = {
                        name:row.name,
                        type:row.type,
                        failed: (row.failed == 1) ? true : false
                    }
                    db.close();
                    next();
                    return
                }
            });
        });
    });
}

function jobSuccess(jobID){
    let db = new sqlite3.Database(dbPath,(err) => {
        if (err) {
            throw err
        }

        db.run(boilerPlateSQL,(err) => {
            if (err) throw err;

            let sql = `UPDATE jobs SET done = 1 WHERE id = ?`;

            db.run(sql,[jobID],(err) => {
                if (err) throw err;
                db.close();
            });
        });
    });
}

function jobFailure(jobID){
    
    let db = new sqlite3.Database(dbPath,(err) => {
        if (err) {
            throw err;
        }

        let sql = `UPDATE jobs SET failed = 1 WHERE id = ?`;

        db.run(sql,[jobID],(err) => {
            if (err) throw err;
            db.close();
        });
    });

    return
}

module.exports = {
    addJob,
    checkJob,
    jobSuccess,
    jobFailure
};