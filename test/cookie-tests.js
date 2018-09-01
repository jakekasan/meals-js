const Cookies = require("./../controllers/imports").Cookies;

function test_noCookie(){
    console.log("Testing noCookie...")
    let test_req = {
        cookies:{}
    }
    let test_res = {
        cookie: function(key,value){
            this[key] = value;
            console.log(`test_res object : ${key} set to ${value}`)
        }
    }
    let test_next = function(){
        console.log("Next function called");
        console.log(test_req);
        console.log(test_res);
    }
    
    Cookies.noCookie(test_req,test_res,test_next);
}

function test_cookieMiddleware(){
    console.log("Testing cookieMiddleware...")
    let test_req = {
        name:"test_req",
        cookies:{}
    }
    let test_res = {
        name:"test_res",
        cookie: function(key,value){
            this[key] = value;
            console.log(`test_res object : ${key} set to ${value}`)
        }
    }
    let test_next = function(){
        console.log("Next function called");
        console.log(test_req);
        console.log(test_res);
    }

    Cookies.cookieMiddleware(test_req,test_res,test_next);

    // now test an existing cookie

    test_req = {
        name:"test_req_withCookie",
        cookies:{
            _id:0
        }
    }

    test_res = {
        name:"test_res",
        cookie: function(key,value){
            this[key] = value;
            console.log(`test_res object : ${key} set to ${value}`)
        }
    }

    Cookies.cookieMiddleware(test_req,test_res,test_next);
}

test_noCookie();

test_cookieMiddleware();