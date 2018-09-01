const Cookies = require("./../controllers/imports").Cookies;

function test_noCookie(){
    test_req = {
        cookies:{}
    }
    test_res = {
        cookie = function(key,value){
            this[key] = value;
            console.log(`test_res object : ${key} set to ${value}`)
        }
    }
    let test_next = function(){
        console.log("Next function called");
        console.log(test_req);
        console.log(test_res);
    }
    function test_next(){
        // print res and req
        console.log(req);
        console.log(res);
    }
    Cookies.noCookie(req,res,next);
}

test_noCookie(1,2,3);