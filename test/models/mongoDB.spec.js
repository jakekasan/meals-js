const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();

const mongoose = require("mongoose");
const config = (require("../../config"))("development");

describe("MongoDB Connection",() => {
    it("MongoDB connection error is null",(done) => {
        mongoose.connect(config.databases.mongoDB,{
            useNewUrlParser:true
        },(err,conn) => {
            assert.equal(err,null);
            mongoose.disconnect();
            done();
        });
    });    
})
