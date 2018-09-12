const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();
const ApiController = require("./../../controllers/apiController");

describe("Api Controller",() => {
    it("Should have a name of 'Base",() => {
        ApiController.should.have.property("name").equal("API");
    });
    it("Should have a run property",() => {
        ApiController.should.have.property("run");
    });
    it("Should have run property be a function",() => {
        ApiController["run"].should.be.a("function");
    });
    
    it("Should have 'routes' property",() => {
        ApiController.should.have.property("routes");
    })

    const fakeModel = function(){
        this.setMongo = function(mongo){
            this.mongo = mongo;
        };
        this.create = function(data,callback){
            if (data) {
                return callback(null)
            }
            return callback(true)
        };
        this.retrieve = function(query,callback){
            if (!this.mongo){
                return callback(true,null)
            }
            if (query){
                return callback(null,true);
            }
            return callback(true,null);
        };
        this.update = function(query,update,callback){
            if (query && update) {
                return callback(null);
            } else {
                return callback(true);
            }
        };
    }

    const fakeReq = function(query,body,path,method,mongo){
        this.query = query;
        this.body = body;
        this.path = path;
        this.method = method;
        this.mongo = mongo;
    }

    const fakeRes = function(callback){
        this.callback = callback;
        this.sendStatus = function(code){
            this.callback(code);
        };
        this.json = function(data){
            this.callback(data);
        };
    }

    describe("API Routes",() => {

        describe("/api/ingredients",() => {
            it("Should have a route for '/api/ingredients'",() => {
                ApiController.routes.should.have.property("/api/ingredients");
            });

            it("should have a GET method for '/api/ingredients' ",() => {
                ApiController.routes["/api/ingredients"].should.have.property("GET");
            });

            it("should have a POST method for '/api/ingredients' ",() => {
                ApiController.routes["/api/ingredients"].should.have.property("POST");
            });

            it("should handle a GET -> ingredients with empty query",(done) => {
                let tempController = require("./../../controllers/apiController");
                tempController.recipeModel = new fakeModel();
                tempController.ingredientModel = new fakeModel();
                let req = new fakeReq(true,false,"/api/ingredients","GET",true);
                let res = new fakeRes((data) => {
                    data.should.equal(true);
                    done();
                });
                tempController.run(req,res,null);
            });

            it("should return 500 to GET -> ingredients with empty query and bad DB",(done) => {
                let tempController = require("./../../controllers/apiController");
                tempController.recipeModel = new fakeModel();
                tempController.ingredientModel = new fakeModel();
                let req = new fakeReq(true,false,"/api/ingredients","GET",false);
                let res = new fakeRes((code) => {
                    code.should.equal(500);
                    done();
                });
                tempController.run(req,res,null);
            })
        })
    })
});