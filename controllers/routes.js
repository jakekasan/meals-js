const data = require("./data");
const fetch = require("node-fetch");

module.exports = (app,address) => {
    app.get("/",(req,res) => {
        res.render("home");
    });

    // data API

    app.get("/api/data/recipe",(req,res) => {
        console.log(req.query);
        if (req.query.q){
            // search for results to recipe
            // still to do...
            console.log("Got req.query.q")
        } else if (req.query.name){
            // search for direct name, return first match
            let result = data.recipes.filter(item => {
                console.log(typeof item.name);
                console.log(typeof req.query.name);
                return ((item.name) == (req.query.name))

            });
            console.log(result);
            console.log(JSON.stringify(result))
            res.send(JSON.stringify(result));
        } else {
            console.log("Sending empty string");
            res.send(JSON.stringify([]));
        }
    });

    app.get("/api/data/recipe/fill", (req,res) => {

        let recipe = data.recipes.filter(item => (item.name == req.query.name)).pop();

        console.log(recipe);

        let ingredientsPromises = recipe.ingredients.map(item => {
            let url = new URL(address+"/api/data/ingredient");
            url.search = new URLSearchParams({
                name:item.name,
                quantity:item.quantity
            });
            return fetch(url).then(data => data.json())
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

        let ingredient = data.ingredients.filter(item => (item.name == query.name)).pop();

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