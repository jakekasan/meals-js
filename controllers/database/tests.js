const Imports = require("../imports");

// first, test that a row is created

console.log("Running test on cookies.js");



function test_loadDatabase(){

    console.log("Testing 'loadDatabase()'...");

    Imports.Cookies.loadDatabase(undefined,undefined);

    console.log("Finished testing 'loadDatabase()'...");

    return
}

function test_createUserSession(){

    console.log("Testing 'createUserSession()'...");

    Imports.Cookies.createUserSession();

    console.log("Finished testing 'createUserSession()'...")
}

test_loadDatabase();
test_createUserSession();

