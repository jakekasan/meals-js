const _ = require("underscore");

function callbackHandler(err,data){
    if (err) {
        return callback(err,data)
    } else {
        return callback(null,data)
    }
}

module.exports = function(model){
    this.model = model;
}

module.exports.prototype = {
    setMongoose: function(mongoose){
        this.model = model;
    },
    extends: function(child){
        return _.extends({},this,child)
    },
    create: function(data,callback){
        this.model.save(data,callbackHandler(err,data));
    },
    retrieve: function(data,callback){
        this.model.find((data || {}),callbackHandler(err,data));
    },
    update: function(data,callback){
        this.model.update(data,callbackHandler(err,data));
    },
    delete: function(data,callback){
        this.model.delete(data,callbackHandler(err,data));
    }
}