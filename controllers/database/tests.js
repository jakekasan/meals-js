const Imports = require("../imports");

// first, test that a row is created

console.log("Running test on cookies.js");

console.log("Testing 'loadDatabase()'...");

function test_loadDatabase(){
    Imports.Cookies.loadDatabase();

    console.log("End of test...");
}

