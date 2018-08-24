const express = require("express");
const app = express();

const routes = require("./controllers/routes.js");

// globals

const address = "http://localhost:8000"

app.set("view engine","ejs");

app.use(express.static("public"));

routes(app,address);

app.listen(8000,() => {
    console.log("Meals up and running.\nListening at 8000");
});