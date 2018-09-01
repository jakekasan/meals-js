const Cookies = require("./../controllers/imports").Cookies;

function test_noCookie(){
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
}

test_noCookie();