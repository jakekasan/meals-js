const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();
const baseModel = require("./../../models/base.model");

describe("baseModel",() => {

    describe("Basic parameters",() => {

        it("module should be a function", () => {
            let baseModel = (require("./../../models/base.model"));

            baseModel.should.be.a("function");
        });

        it("running module function should return an object", () => {
            let baseModel = (require("./../../models/base.model"));

            let bM = new baseModel();

            (bM).should.be.an("object");
        });

        it("should have a name attribute",() => {
            let baseModel = new (require("./../../models/base.model"))();

            baseModel.should.have.property("name");
        });

    });

    describe("Test fake objects and whatnot",() => {

        it("fakeMongoose should have a property 'save'",() => {
            fakeMongoose.should.have.property("save");
        });

        it("fakeMongoose.save should be a function",() => {
            fakeMongoose.save.should.be.a("function");
        })
    })

    describe("Model functions",() => {
        
        it("Should correctly set this.mongo",() => {
            let mongooseModel = "mongooseModel";

            let model = new (require("./../../models/base.model"))();

            model.setModel(mongooseModel);

            let newMongooseModel = model.getModel();

            newMongooseModel.should.equal(mongooseModel);
        });

        it("Should have create property",() => {
            let model = new (require("./../../models/base.model"))();

            model.should.have.property("create");
        });

        it("Create property should be a function",() => {
            let model = new (require("./../../models/base.model"))();

            (model.create).should.be.a("function");
        });

        it("this.model should return an object with a 'save' property",() => {
            let model = new (require("./../../models/base.model"))();

            
        })
    });
});


/*

    Fake objects and whatnot

*/

const fakeMongoose = {
    save: function(data,callback){
        return null
    },
    find: function(data,callback){
        return null
    },
    update: function(original,updated,callback){
        return null
    },
    delete: function(data,callback){
        return null
    }
}