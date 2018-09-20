/*

    usda.service.js

*/

const config = require("./../config/index");
const fetch = require("node-fetch");

module.exports = {
    debug:false,
    search: function(req,res,next){
        let query = req.query;

        if (this.debug) console.log(`USDA search query: ${req.query} `);

        if (!query instanceof String) return res.sendStatus(400)


        fetch(config.usda.address.search,{
            method:"post",
            body:{
                q:query,
                api_key:config.usda.apiKey
            }
        })
            .then(data => data.json())
            .then(data => res.json(data))
            .catch(e => res.sendStatus(500))
    },
    nutrition: function(req,res,next){
        let query = req.query;
        fetch(config.usda.address.nutrition,{
            method:"post",
            body:{
                q:query,
                api_key:config.usda.apiKey
            }
        })
            .then(data => data.json())
            .then(data => res.json(data))
            .catch(e => res.sendStatus(500))
    }
}