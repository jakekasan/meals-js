const _ = require("underscore");

function callbackHandler(err,data,callback){
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
    setModel:function(model){
        this.model = model;
    },
    extends: function(child){
        return _.extends({},this,child)
    },
    create: function(data,callback){
        this.model.save(data,callbackHandler(err,data,callback));
    },
    retrieve: function(data,callback){
        this.model.find((data || {}),callbackHandler(err,data,callback));
    },
    update: function(data,callback){
        this.model.update(data,callbackHandler(err,data,callback));
    },
    delete: function(data,callback){
        this.model.delete(data,callbackHandler(err,data,callback));
    }
}