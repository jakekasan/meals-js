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

function addJob(req,res,jobType,jobName){

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
            done INTEGER
        ) IF NOT EXISTS (SELECT * FROM jobs)`,(err) => {
            if (err) throw err;

            // now insert the job
            let sql = `INSERT INTO jobs (type, name, done) VALUES (?,?,?)`;

            let values = [jobType,jobName,0];

            db.run(sql,values,(err) => {
                if (err) throw err;
                let jobID = this.lastID;
                res.redirect(`/${jobType}?confirmation=${jobID}`);
                db.close();
            });

        });
    });
}

function checkJob(req,res,jobID){
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

            // now insert the job
            let sql = `SELECT (type,name,done) FROM jobs WHERE id = ?`;

            let values = [jobID];

            db.run(sql,values,(err,row) => {
                if (err) throw err;
                if (row.done == 0){
                    // on second thought, i'll turn this into middleware
                    res.render();
                }
            });

        });
    });
}