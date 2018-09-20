/*

    usda.service.js

*/

const config = require("./../config/index")();
const fetch = require("node-fetch");
const url = require("url");

const ingredientsModel = require("./../models/ingredient.model");

module.exports = {
    debug:true,
    search: function(req,res,next){
        let query = req.query;

        if (this.debug) console.log(`USDA search query: ${JSON.stringify(req.query)} `);

        if (!query instanceof String) return res.sendStatus(400)

        let dbUrl = url.parse(config.usda.address.search);
        dbUrl.query = {
            api_key: config.usda.apiKey,
            q:query.q,
            ds:"Standard Reference",
            type:"b"
        }
        dbUrl = url.format(dbUrl);

        fetch(dbUrl)
            .then(data => data.json())
            .then(data => {
                // send the data off to ingredients for processing before sending response
                if (data.list && data.list.item){
                    res.json(data.list.item);
                } else {
                    res.json(data);
                }
                
            })
            .catch(e => res.sendStatus(500))
    },
    nutrition: function(req,res,next){

        if (this.debug) console.log(`USDA nutrition query: ${JSON.stringify(req.query)} `);


        let dbUrl = url.parse(config.usda.address.nutrition);
        dbUrl.query = {
            api_key: config.usda.apiKey,
            ndbno:req.query.ndbno,
            type:"b"
        }
        dbUrl = url.format(dbUrl);

        fetch(dbUrl)
            .then(data => data.json())
            .then(data => {
                // submit nutrition to model
                this.processNutrition(data);
                res.json(data);
            })
            .catch(e => {
                console.log(e);
                return res.json(e);
            })
    },
    searchByQuery: async function(query){
        return (new Promise((resolve,reject) => {
            let url = URL.parse(config.usda.address.search)
            url.query = {
                q:query
            }
            url = URL.format(url);
            fetch(url)
                .then(data => data.json())
                .then(data => resolve(data))
                .catch(error => reject(error));
        }))
    },
    processNutrition: function(data){
        /*
            nutrient        ID
            protein:        203
            calories:       208
            fat:            204
            carbohydrates:  205
        */

        data = data.foods[0].food;

        console.log(data);

        let protein = data.nutrients.filter(item => (item.nutrient_id == 203))[0];
        let calories = data.nutrients.filter(item => (item.nutrient_id == 208))[0];
        let fat = data.nutrients.filter(item => (item.nutrient_id == 204))[0];
        let carbohydrates = data.nutrients.filter(item => (item.nutrient_id == 205))[0];

        let newIngredient = {
            name:data.desc.name,
            nutrition:{
                proteins:protein.value,
                fats:fat.value,
                carbohydrates:carbohydrates.value,
                calories:calories.value,
                grams:true
            },
            cost:0,
            quantity:100
        };

        ingredientsModel.create(newIngredient,(err) => {
            if (err) console.log(err);
        });
    }
}