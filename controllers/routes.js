const database = require("./data/fake_data");

const fetch = require("node-fetch");

module.exports = (app,address) => {
    app.get("/",(req,res) => {

        res.render("home",{data:{
            mealPlan:[
                {
                    day:"monday"
                },
                {
                    day:"tuesday"
                },
                {
                    day:"wednesday"
                },
                {
                    day:"thursday"
                },
                {
                    day:"friday"
                },
                {
                    day:"saturday"
                },
                {
                    day:"sunday"
                }
            ],
            groceries:[]
        }});
        /*
        let url = new URL(address+"/api/data");
        url.search = new URLSearchParams(req.query);
        fetch(url)
            .then(result => result.json())
            .then(result => {
                // first, we seperate the data
                
                let ingredients = ((Object.keys(result)).map(key => result[key])).map(item => item.ingredients).reduce((acc,ele) => {
                    acc = acc.concat(ele);
                    return acc
                },[]);
                
                let groceries = ingredients.reduce((acc,ele) => {
                    acc[ele.name] = ((acc[ele.name]) ? acc[ele.name] : 0) + ele.quantity;
                    return acc
                },{});

                groceries = Object.keys(groceries).map(key => {
                    return {
                        name:key,
                        quantity:groceries[key]
                    }
                });

                let mealPlan = (Object.keys(result)).map(item => {
                    return {
                        day:item,
                        recipe:result[item]
                    }
                });
                
                let responseObject = {
                    mealPlan:mealPlan,
                    groceries:groceries
                }

                console.log(mealPlan);

                res.render("home",{data:responseObject});
            });
        */
    });

    // data API

    app.get("/api/data",(req,res) => {
        // console.log("/api/data");
        // console.log(req.query);
        let dow = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
        let filledDays = req.query;
        let required = dow.filter(item => {
            return !(Object.keys(filledDays)).includes(item)
        });

        // console.log("Filled days:");
        // console.log(filledDays);

        let promises = [];

        for (let day of required){
            //console.log("Filling",day);
            let includedRecipes = (Object.keys(req.query)).map(key => { return req.query[key] });
            let available = (database.recipes.filter(item => !includedRecipes.includes(item.name))).map(item => item.name);
            let randomIndex = Math.floor(Math.random() * available.length);
            //console.log(`Selected random index ${randomIndex}`);
            let chosenRecipe = (available.splice(randomIndex,1)).pop();
            
            includedRecipes.push(chosenRecipe);
            filledDays[day] = chosenRecipe;
            let url = new URL(address+"/api/data/recipe/fill");
            url.search = new URLSearchParams({
                name:chosenRecipe
            });
            let promise = fetch(url)
                                .then(data => data.json())
                                .then(data => {
                                    // console.log("Data for",day);
                                    // console.log(data);
                                    let responseObject = {
                                        day:day,
                                        data:data
                                    }
                                    // console.log(responseObject);
                                    return responseObject
                                });
            promises.push(promise);
        }

        Promise.all(promises)
                .then(values => {
                    // console.log("Promises resolved");
                    // console.log(values);
                    for (let value of values){
                        filledDays[value.day] = value.data;
                    }

                    res.json(filledDays);
                })


    });

    app.get("/api/data/recipe",(req,res) => {
        // console.log("/api/data/recipe");
        // console.log(req.query);

        if (req.query.random){
            // say we want a completely random recipe
            let result = database.recipes[Math.floor(Math.random()*database.recipes.length)];
            // console.log("/api/data/recipe random");
            result.ingredients = result.ingredients.map(item => JSON.stringify(item));
            let url = new URL(address+"/api/data/recipe/fill");
            url.search = new URLSearchParams(result);
            fetch(url)
                .then(data => data.json())
                .then(data => {
                    res.json(data);
                });
        } else if (req.query.q){
            // search for results to recipe
            // still to do...
            // console.log("Got req.query.q")
            res.json({});
        } else if (req.query.name){
            // search for direct name, return first match
            let result = database.recipes.filter(item => {
                return ((item.name) == (req.query.name))
            }).pop();

            let url = new URL(address+"/api/data/recipe/fill");

            url.search = new URLSearchParams({
                name:result.name
            });
            // console.log("/api/data/recipe/fill - getting recipe filled");
            fetch(url)
                .then(data => data.json())
                .then(data => {
                    // console.log("/api/data/recipe/fill - Response");
                    // console.log(data);
                    res.json(data);
                });
        } else {
            // console.log("Sending empty string");
            res.json({});
        }
    });

    app.get("/api/data/recipe/fill", (req,res) => {

        // console.log("/api/data/recipe/fill");
        // console.log(req.query);
        //console.log(database.ingredients);

        let recipe = database.recipes.filter(item => (item.name == req.query.name)).pop();

        // console.log("/api/data/recipe/fill recipe");
        // console.log(recipe);

        let ingredientsPromises = recipe.ingredients.map(item => {
            let url = new URL(address+"/api/data/ingredient");
            url.search = new URLSearchParams({
                name:item.name,
                quantity:item.quantity
            });
            return fetch(url).then(data => data.json())
        });

        // console.log("/api/data/recipe/fill solving all Promises");

        Promise.all(ingredientsPromises)
                            .then(values => {
                                // console.log("/api/data/recipe/fill ingredientsPromises")
                                //console.log(values);
                                let responseObject = {
                                    name: recipe.name,
                                    ingredients:values
                                };
                                // console.log(responseObject);
                                res.json(responseObject);
                            })
                            .catch(e => {
                                console.log(e);
                            });


    })

    app.get("/api/data/ingredient",(req,res) => {
        // console.log("/api/data/ingredient");
        // console.log(req.query);
        if (!(req.query.name)){
            // console.log("/api/data/ingredient - query name not given")
            res.json({});
            return
        }

        let query = {
            name:req.query.name,
            quantity:((req.query.quantity) ? req.query.quantity : undefined)
        };

        let ingredient = database.ingredients.filter(item => (item.name == query.name)).pop();

        if (!ingredient){
            // console.log("/api/data/ingredient - no such ingredient");
            res.json({});
            return
        }

        if (!query.quantity){
            // console.log("/api/data/ingredient - no quantity specified, returning ingredient");
            res.json({});
        }

        let requiredAmount = (Math.ceil(query.quantity / ingredient.quantity)) * ingredient.quantity;

        // console.log("/api/data/ingredient - found ingredient and sending required amount");
        let response = {
            name:query.name,
            quantity:requiredAmount
        };
        res.json(response);
    });
}