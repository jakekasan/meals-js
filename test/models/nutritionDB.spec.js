/*

    nutritionDB.spec.js

*/

const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();


const sqlite = require("sqlite3");
const config = (require("./../../config/index"))();

describe("Nutrition SQLite3 database model",() => {
    describe("Database Connection",() => {
        it("Connecting to DB should have an error of null", () => {
            let db =  new sqlite.Database(config.databases.nutrition,(err) => {
                assert(err === null);
            })
        });

        it("SQL table should exist in the db file", (done) => {
            let db =  new sqlite.Database(config.databases.nutrition,(err) => {
                if (err) {
                    throw err
                }
            });

            let sql = `CREATE TABLE IF NOT EXISTS ingredients(
                ndbno INTEGER PRIMARY KEY,
                name TEXT,
                calories NUMBER,
                proteins NUMBER,
                carbohydrates NUMBER,
                fats NUMBER
            )`

            db.run(sql,(res,err) => {
                console.log(err);
                assert(err === null);
                done();
            })
        })
    });

    describe("Model tests",() => {

    });
})