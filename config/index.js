let config = {
    development:{
        mode:"development",
        server:{
            hostname:"http://localhost",
            port:"8000"
        },
        databases:{
            mongoDB:"mongodb://temp:password1@ds245512.mlab.com:45512/meals"
        }
    },
    production:{
        mode:"development",
        hostname:"http://mealplan.io",
        port:"80",
        mongoDB:"mongodb://temp:password1@ds245512.mlab.com:45512/meals"
    }
}

module.exports = function(env){
    return config[(env || process.argv[2] || "development")]
}