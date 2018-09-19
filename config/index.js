let config = {
    development:{
        mode:"development",
        server:{
            hostname:"http://localhost",
            port:"8000"
        },
        databases:{
            mongoDB:"mongodb://temp:password1@ds245512.mlab.com:45512/meals"
        },
        usda:{
            address:{
                search:"https://api.nal.usda.gov/ndb/search/",
                nutrition:"https://api.nal.usda.gov/ndb/nutrients/"
            },
            apiKey:"SmiNNMcfzCRfPXR6mJtiDaUm7Be7VnLaiNigGiKT"
        }
    }
}

module.exports = function(env){
    return config[(env || "development")]
}