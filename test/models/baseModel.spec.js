const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();
const baseModel = require("./../../models/base.model");

const fakeMongoose = function(){
    return this
}

fakeMongoose.prototype = {
    create: function(data,callback){
        if (!data){
            return callback(true,false)
        } else {
            return callback(false,true)
        }
    },
    find: function(data,callback){
        if (!data) {
            return callback(true,false)
        }
        return callback(false,true)
    },
    update: function(original,updated,callback){
        if ((!original) || (!updated)) {
            return callback(true,false)
        }
        return callback(false,true)
    },
    delete: function(data,callback){
        if (!data) {
            return callback(true,false)
        }
        return callback(false,true)
    }
}



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
        // object should be a function

        // SAVE

        it("fakeMongoose should have a property 'create'",() => {
            fM = new fakeMongoose();
            fM.should.have.property("create");
        });

        it("fakeMongoose.create should be a function",() => {
            fM = new fakeMongoose();
            fM.create.should.be.a("function");
        });

        // FIND

        it("fakeMongoose should have a property 'find'",() => {
            fM = new fakeMongoose();
            fM.should.have.property("find");
        });

        it("fakeMongoose.find should be a function",() => {
            fM = new fakeMongoose();
            fM.find.should.be.a("function");
        });

        // UPDATE

        it("fakeMongoose should have a property 'update'",() => {
            fM = new fakeMongoose();
            fM.should.have.property("update");
        });

        it("fakeMongoose.update should be a function",() => {
            fM = new fakeMongoose();
            fM.update.should.be.a("function");
        });

        // DELETE

        it("fakeMongoose should have a property 'delete'",() => {
            fM = new fakeMongoose();
            fM.should.have.property("delete");
        });

        it("fakeMongoose.delete should be a function",() => {
            fM = new fakeMongoose();
            fM.delete.should.be.a("function");
        });
    })

    describe("Model functions",() => {
        
        it("Should correctly set this.mongo",() => {
            let mongooseModel = "mongooseModel";

            let model = new (require("./../../models/base.model"))();

            model.setModel(mongooseModel);

            let newMongooseModel = model.getModel();

            newMongooseModel.should.equal(mongooseModel);
        });

        // CREATE

        it("Should have create property",() => {
            let model = new (require("./../../models/base.model"))();

            model.should.have.property("create");
        });

        it("Create property should be a function",() => {
            let model = new (require("./../../models/base.model"))();

            (model.create).should.be.a("function");
        });

        it("getModel should return an object with a 'create' property",() => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();
            (mongo2).should.have.property("create");
        });

        it("this.model.create should be a function",() => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();
            (mongo2)["create"].should.be.a("function");
        });

        it("this.model.create should return an error which is true if data is false", () => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();

            mongo2["create"](false,(err,res) => {
                assert(err === true);
            });
        });

        it("this.model.create should return an error which is false if data is true", () => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();

            (mongo2)["create"](true,(err,res) => {
                assert(err === false);
            });
        });

        

        // RETRIEVE

        it("Should have retrieve property",() => {
            let model = new (require("./../../models/base.model"))();

            model.should.have.property("retrieve");
        });

        it("Retrieve property should be a function",() => {
            let model = new (require("./../../models/base.model"))();

            (model.retrieve).should.be.a("function");
        });

        it("getModel should return an object with a 'find' property",() => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();
            (mongo2).should.have.property("find");
        });

        it("this.model.find should be a function",() => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();
            (mongo2)["find"].should.be.a("function");
        });

        it("this.model.find should return an error which is true if data is false", () => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();

            (mongo2)["find"](false,(err,res) => {
                //err.should.be(true);
                assert(err === true);
            });
        });

        it("this.model.find should return an error which is false if data is true", () => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();

            (mongo2)["find"](true,(err,res) => {
                //err.should.be(false);
                assert(err === false);
            });
        });

        // UPDATE

        it("Should have update property",() => {
            let model = new (require("./../../models/base.model"))();

            model.should.have.property("update");
        });

        it("update property should be a function",() => {
            let model = new (require("./../../models/base.model"))();

            (model.update).should.be.a("function");
        });

        it("getModel should return an object with a 'update' property",() => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();
            (mongo2).should.have.property("update");
        });

        it("this.model.update should be a function",() => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();
            (mongo2)["update"].should.be.a("function");
        });

        it("this.model.update should return an error which is true if data is false", () => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();
            (mongo2)["update"](false,false,(err,res) => {
                assert(err === true)
            });
        });

        it("this.model.update should return an error which is false if data is true", () => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();

            (mongo2)["update"](true,true,(err,res) => {
                assert(err === false);
            });
        });

        // DELETE

        it("Should have delete property",() => {
            let model = new (require("./../../models/base.model"))();

            model.should.have.property("delete");
        });

        it("delete property should be a function",() => {
            let model = new (require("./../../models/base.model"))();

            (model.update).should.be.a("function");
        });

        it("getModel should return an object with a 'delete' property",() => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();

            (mongo2).should.have.property("delete");
        });

        it("this.model.delete should be a function",() => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();

            (mongo2)["delete"].should.be.a("function");
        });

        it("this.model.delete should return an error which is true if data is false", () => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();

            (mongo2)["delete"](false,(err,res) => {
                assert(err === true);
            });
        });

        it("this.model.delete should return an error which is false if data is true", () => {
            let model = new (require("./../../models/base.model"))();

            let mongo = new fakeMongoose();
            model.setModel(mongo)

            let mongo2 = model.getModel();

            (mongo2)["delete"](true,(err,res) => {
                assert(err === false);
            });
        });
    });
});


/*

    Fake objects and whatnot

*/

// const fakeMongoose = function(data){
//     this.data = data;
//     return {
//         data:data,
//         save:function(callback){
//             if (!this.data){
//                 return callback(true)
//             } else {
//                 return callback(false)
//             }
//         }
//     }
// }

