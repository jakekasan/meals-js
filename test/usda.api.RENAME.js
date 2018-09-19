const assert = require("chai").assert;
const expect = require("chai").expect;
const should = require("chai").should();
const config = require("../config")("development");

const fetch = require("node-fetch");
const URL = require("url");


const API_KEY = "SmiNNMcfzCRfPXR6mJtiDaUm7Be7VnLaiNigGiKT";

// const URL = new URL("https://api.nal.usda.gov/ndb/list");
// URL = new URLSearchParams({
//     api_key: API_KEY
// });

// const URL = `https://api.nal.usda.gov/ndb/search/?q=beef&api_key=${API_KEY}`;

// fetch(URL,{
    
// }).then(data => data.json())
//     .then(data => {
//         console.log(data);
//         for (let item of data.list.item){
//             console.log(item)
//         }
//     })
//     .catch(e => console.log(e))

describe("USDA API tests",() => {

    describe("/search",() => {

        it("API should return an object", async () => {
            // should return object

            let url = URL.parse(config.usda.address.search);
            url.query = {
                q:"beef",
                api_key:config.usda.apiKey
            }

            url = URL.format(url);

            let response = await fetch(url)
                .then(data => data.json())
                .then(data => {
                    return data
                })
                .catch(e => {
                    return null
                })

            response.should.be.an("object");
        });

        it("API return object should have a property 'list'", async () => {
            // should return object

            let url = URL.parse(config.usda.address.search);
            url.query = {
                q:"beef",
                api_key:config.usda.apiKey
            }

            url = URL.format(url);

            let response = await fetch(url)
                .then(data => data.json())
                .then(data => {
                    return data
                })
                .catch(e => {
                    return null
                })

            if (response.error){
                console.log(response.error);
            }

            response.should.have.property("list");
        });

        

        it("API return object['list'] should have a property 'item'", async () => {

            let url = URL.parse(config.usda.address.search);
            url.query = {
                q:"beef",
                api_key:config.usda.apiKey
            }

            url = URL.format(url);

            let response = await fetch(url)
                .then(data => data.json())
                .then(data => {
                    return data
                })
                .catch(e => {
                    return null
                })

            response["list"].should.have.property("item");
        });

        it("should return object with 'error' value if api_key missing", async () => {
            // should return object
            
            let url = URL.parse(config.usda.address.search);
            url.query = {
                q:"beef"
            }

            url = URL.format(url);

            let response = await fetch(url)
                .then(data => data.json())
                .then(data => {
                    return data
                });
                // .catch(e => {
                //     e.should.be.a("null");
                //     done();
                // })
            response.should.have.property("error");
        });        
    })

    describe("/nutrition",() => {
        
        it("Should return nutrition object with same name as query", async () => {
            // to be implemented...

            let url = URL.parse(config.usda.address.nutrition);
            url.query = {
                q:"beef",
                api_key:config.usda.apiKey
            }

            url = URL.format(url);

            let response = await fetch(url)
                .then(data => data.json())
                .then(data => {
                    return data
                });


        })
    })
})

/*

{ list:
   { q: 'beef',
     sr: '1',
     ds: 'any',
     start: 0,
     end: 150,
     total: 4738,
     group: '',
     sort: 'r',
     item:

*/