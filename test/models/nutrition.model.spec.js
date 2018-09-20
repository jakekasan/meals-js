/*

    nutritionDB.spec.js

*/

const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();

const nutritionModel = require("./../../models/nutrition.model");

describe("nutrition.model tests",() => {

    describe("Basic model tests", () => {


    });

    describe("Database connection", () => {
        it("should connect to the database without an error",(done) => {
            let nutritionModel = new (require("./../../models/nutrition.model"))();

            nutritionModel.loadDB((db,err) => {
                console.log(err);
                assert(err === null);
                done();
            });
        });

        it("database should have a table called 'nutrition'",(done) => {
            let nutritionModel = new (require("./../../models/nutrition.model"))();

            let sql = `SELECT * FROM table_list`;

            nutritionModel.db.all(sql,(err,row) => {
                assert(err === null);
                done();
            })
        });
    })

    describe("SQL Formatting",() => {

        it("model should have 'getColNames' property",() => {
            let nutritionModel = new (require("./../../models/nutrition.model"))();

            nutritionModel.should.have.property("getColNames");
        })

    })
})