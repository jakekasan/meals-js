const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();
const BaseController = require("./../../controllers/base.controller");

describe("Base Controller",() => {
    it("Should have a name of 'Base",() => {
        BaseController.should.have.property("name").equal("Base");
    });
    it("Should have a run property",() => {
        BaseController.should.have.property("run");
    });
    it("Should have run property be a function",() => {
        BaseController["run"].should.be.a("function");
    });
});