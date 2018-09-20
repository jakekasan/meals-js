const fetch = require("node-fetch");
const url = require("url");

const config = require("./../config/index")();

async function main(){

    let dbUrl = url.parse(config.usda.address.search);

    dbUrl.query = {
        api_key: config.usda.apiKey,
        q: "ground beef",
        ds: "Standard Reference",
        fg: 1300
    }

    dbUrl = url.format(dbUrl);

    console.log(dbUrl);

    let result = await fetch(dbUrl)
        .then(data => data.json())
        .then(data => {
            if (data.list && data.list.item) return data.list.item
            if (data.errors) return data.errors
        })
        .catch(e => {
            console.log(e);
            return "Problem"
        });
    
    console.log(result);

    let ndbno = result[0].ndbno;

    dbUrl = url.parse(config.usda.address.nutrition);
    dbUrl.query = {
        api_key: config.usda.apiKey,
        ndbno:ndbno,
        type:"b"
    }
    dbUrl = url.format(dbUrl);
    result = await fetch(dbUrl)
        .then(data => data.json())
        .then(data => {
            if (data.errors) return data.errors
            if (data.foods) return (data.foods)[0].food
            return data
        });

    console.log(result);

    if (result.nutrients && result.nutrients[2].measures){
        console.log(result.nutrients[2].measures);
    }
    
}

main()