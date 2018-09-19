const fetch = require("node-fetch");
const http = require("http");

const API_KEY = "SmiNNMcfzCRfPXR6mJtiDaUm7Be7VnLaiNigGiKT";

// const URL = new URL("https://api.nal.usda.gov/ndb/list");
// URL = new URLSearchParams({
//     api_key: API_KEY
// });

const URL = `https://api.nal.usda.gov/ndb/search/?q=beef&api_key=${API_KEY}`;

fetch(URL,{
    
}).then(data => data.json())
    .then(data => {
        console.log(data);
        for (let item of data.list.item){
            console.log(item)
        }
    })
    .catch(e => console.log(e))