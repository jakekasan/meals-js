/*

    usda.service.spec.js

*/

const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();



describe("usda.service test",() => {
    
    describe("search function",() => {

        it("should have a property 'search'",() => {
            let usdaService = require("./../../services/usda.service");

            usdaService.should.have.property("search");
        });

        it("should have a property 'search'",() => {
            let usdaService = require("./../../services/usda.service");

            usdaService.search.should.be.a("function");
        });
    })


})