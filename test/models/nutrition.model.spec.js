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

            nutritionModel.run(`SELECT * FROM nutrition`,(err) => {
                assert(err === null);
                done();
            });
        });

        it("database should have a table called 'nutrition'",(done) => {
            let nutritionModel = new (require("./../../models/nutrition.model"))();

            let sql = `SELECT * FROM nutrition`;

            nutritionModel.db.get(sql,(err,row) => {
                assert(err === null);
                done();
            })
        });
    })

    describe("SQL Formatting",() => {

        it("model should have 'getColNames' property",() => {
            let nutritionModel = new (require("./../../models/nutrition.model"))();

            nutritionModel.should.have.property("getColNames");
        });

        it("model.getColNames should be a function",() => {
            let nutritionModel = new (require("./../../models/nutrition.model"))();

            nutritionModel.getColNames.should.be.a("function");
        });

        it("model.getColName should properly format objects",() => {
            let nutritionModel = new (require("./../../models/nutrition.model"))();

            let testObject = {
                name:"Test",
                type:"Object"
            };

            let desiredResult = "(name,type)";

            let result = nutritionModel.getColNames(testObject);

            assert(result === desiredResult);
        });

        it("model should have 'getColValues' property",() => {
            let nutritionModel = new (require("./../../models/nutrition.model"))();

            nutritionModel.should.have.property("getColValues");
        });

        it("model.getColValues should be a function",() => {
            let nutritionModel = new (require("./../../models/nutrition.model"))();

            nutritionModel.getColValues.should.be.a("function");
        });

        it("model.getColValues should properly format objects",() => {
            let nutritionModel = new (require("./../../models/nutrition.model"))();

            let testObject = {
                name:"Test",
                type:"Object"
            };

            let desiredResult = "(Test,Object)";

            let result = nutritionModel.getColValues(testObject);

            assert(result === desiredResult);
        });



    })
})