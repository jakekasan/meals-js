const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();

const config = (require("./../config/index"))("development");

//console.log(config);



describe("Config test",() => {
    describe("Initialization",() => {
        it("module with no parameter should return a config",() => {
            let config = (require("./../config/index"))();

            config.should.have.property("mode");
        });

        it("module with no parameter should return development config",() => {
            let config = (require("./../config/index"))();

            config["mode"].should.equal("development");
        });
    });

    describe("Development environment",() => {
        it("config should have 'mode' property",() => {
            let config = (require("./../config/index"))("development");
            
            config.should.have.property("mode");
        });

        it("config should have 'mode' property equal to 'development",() => {
            let config = (require("./../config/index"))("development");

            config["mode"].should.equal("development");
        });

        it("config should have server property",() => {
            let config = (require("./../config/index"))("development");
            config.should.have.property("server");
        })

        it("config server should have property 'hostname'",() => {
            let config = (require("./../config/index"))("development");
            config["server"].should.have.property("hostname");
        });

        it("config server should have property 'port'",() => {
            let config = (require("./../config/index"))("development");
            config["server"].should.have.property("port");
        });

        it("config should have a 'databases' property",() => {
            let config = (require("./../config/index"))("development");
            
            config.should.have.property("databases");
        });

        it("config database should have a 'mongoDB' property",() => {
            let config = (require("./../config/index"))("development");
            
            config["databases"].should.have.property("mongoDB");
        });

        it("config should have a 'usda' property",() => {
            let config = (require("./../config/index"))("development");
            
            config.should.have.property("usda");
        });

        it("config['usda] should have a 'apiKey' property",() => {
            let config = (require("./../config/index"))("development");
            
            config["usda"].should.have.property("apiKey");
        });

        it("config['usda'] should have a 'address' property",() => {
            let config = (require("./../config/index"))("development");
            
            config["usda"].should.have.property("address");
        });
        
        it("config.usda.address should have a 'search' property",() => {
            let config = (require("./../config/index"))("development");
            
            config.usda.address.should.have.property("search");
        });
        
        it("config.usda.address should have a 'search' property",() => {
            let config = (require("./../config/index"))("development");
            
            config.usda.address.should.have.property("nutrition");
        });

    });
    
})