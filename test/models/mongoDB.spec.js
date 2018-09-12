const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();

const mongoose = require("mongoose");
const config = require("../../config")("development");

describe("MongoDB Connection",() => {
    it("MongoDB connection error is null",() => {
        mongoose.connect(config.mongo,(err,conn) => {
            err.should.be.equal.to(null);
        });
    });    
})
