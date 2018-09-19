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

    it("Run property be a function",() => {
        BaseController["run"].should.be.a("function");
    });

    it("Should have an extend property",() => {
        BaseController.should.have.property("extend");
    });

    it("Extend property should be a function",() => {
        BaseController["extend"].should.be.a("function");
    });

    it("Extended controller should inherit from base",() => {
        let bC = require("./../../controllers/base.controller");
        let bC2 = bC.extend({});

        bC.name.should.equal(bC2.name);
    });

    it("Extended controller should not be the same as base",() => {
        let bC = require("./../../controllers/base.controller");
        let bC2 = bC.extend({});

        bC.should.not.equal(bC2);
    });

    it("Extended controller be able to modify base properties",() => {
        let bC = require("./../../controllers/base.controller");
        let bC2 = bC.extend({
            name:"Not base controller"
        });

        bC.name.should.not.equal(bC2.name);
    });
});