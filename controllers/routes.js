const database = require("./data");
const fetch = require("node-fetch");

module.exports = (app,address) => {
    app.get("/",(req,res) => {
        let url = new URL(address+"/api/data");
        url.search = new URLSearchParams(req.query);
        fetch(url)
            .then(result => result.json())
            .then(result => {
                res.render("home",{data:result});
            });
    });

    // data API

    app.get("/api/data",(req,res) => {
        console.log("/api/data");
        console.log(req.query);
        let dow = ["monday","tuesday","wednesday","thrusday","friday","saturday","sunday"];
        let filledDays = req.query;
        let required = dow.filter(item => {
            return !(Object.keys(filledDays)).includes(item)
        });

        console.log("Filled days:");
        console.log(filledDays);

        let promises = [];

        for (let day of required){
            console.log("Filling",day);
            let includedRecipes = (Object.keys(req.query)).map(key => { return req.query[key] });
            let available = (database.recipes.filter(item => !includedRecipes.includes(item.name))).map(item => item.name);
            let chosenRecipe = available.pop(Math.floor(Math.random() * available.length));
            console.log(chosenRecipe);
            includedRecipes.push(chosenRecipe);
            filledDays[day] = chosenRecipe;
            let url = new URL(address+"/api/data/recipe");
            url.search = new URLSearchParams({
                name:chosenRecipe
            })
            let promise = fetch(url)
                                .then(data => {
                                    data.json();
                                })
                                .then(data => {
                                    console.log("Data for",day);
                                    console.log(data);
                                    return {
                                        day:day,
                                        data:data
                                    }
                                });
            promises.push(promise);
        }

        Promise.all(promises)
                .then(values => {
                    console.log("Promises resolved");
                    console.log(values);
                    for (let value in values){
                        filledDays[value.day] = value.data;
                    }

                    res.send(filledDays);
                })


    });

    app.get("/api/data/recipe",(req,res) => {
        console.log("/api/data/recipe");
        console.log(req.query);

        if (req.query.random){
            // say we want a completely random recipe
            let result = database.recipes[Math.floor(Math.random()*database.recipes.length)];
            console.log("/api/data/recipe random");
            result.ingredients = result.ingredients.map(item => JSON.stringify(item));
            let url = new URL(address+"/api/data/recipe/fill");
            url.search = new URLSearchParams(result);
            fetch(url)
                .then(data => data.json())
                .then(data => {
                    res.send(data);
                });
        } else if (req.query.q){
            // search for results to recipe
            // still to do...
            console.log("Got req.query.q")
        } else if (req.query.name){
            // search for direct name, return first match
            let result = database.recipes.filter(item => {
                return ((item.name) == (req.query.name))
            }).pop();

            let url = new URL(address+"/api/data/recipe/fill");

            url.search = new URLSearchParams(result);
            fetch(url)
                .then(data => data.json())
                .then(data => {
                    res.send(data);
                });
        } else {
            console.log("Sending empty string");
            res.send(JSON.stringify([]));
        }
    });

    app.get("/api/data/recipe/fill", (req,res) => {

        console.log("/api/data/recipe/fill");
        console.log(req.query);
        //console.log(database.ingredients);

        let recipe = database.recipes.filter(item => (item.name == req.query.name)).pop();

        console.log("/api/data/recipe/fill recipe");
        console.log(recipe);

        let ingredientsPromises = recipe.ingredients.map(item => {
            let url = new URL(address+"/api/data/ingredient");
            url.search = new URLSearchParams({
                name:item.name,
                quantity:item.quantity
            });
            return fetch(url).then(data => JSON.stringify(data.json()))
        });

        Promise.all(ingredientsPromises)
                            .then(values => {
                                res.send(JSON.stringify(values));
                            })
                            .catch(e => {
                                console.log(e);
                            });


    })

    app.get("/api/data/ingredient",(req,res) => {
        console.log(req.query);
        if (!(req.query.name)){
            res.send(JSON.stringify([]));
            return
        }

        let query = {
            name:req.query.name,
            quantity:((req.query.quantity) ? req.query.quantity : undefined)
        };

        let ingredient = database.ingredients.filter(item => (item.name == query.name)).pop();

        if (!ingredient){
            res.send(JSON.stringify([]));
            return
        }

        if (!query.quantity){
            res.send(JSON.stringify(ingredient));
        }

        let requiredAmount = (Math.ceil(query.quantity / ingredient.quantity)) * ingredient.quantity;

        res.send(JSON.stringify({
            name:query.name,
            quantity:requiredAmount
        }));
    });
}