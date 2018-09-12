const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();
const HomeController = require("./../../controllers/homeController");

describe("Home Controller",() => {
    it("Should have a name of 'Home",() => {
        HomeController.should.have.property("name").equal("Home");
    });
    it("Should have a run property",() => {
        HomeController.should.have.property("run");
    });
    it("Should have run property be a function",() => {
        HomeController["run"].should.be.a("function");
    });
    it("Should have a getContent property",() => {
        HomeController.should.have.property("getContent");
    });
    it("Should have getContent property be a function",() => {
        HomeController["getContent"].should.be.a("function");
    });
});