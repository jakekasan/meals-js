const _ = require("underscore");

function callbackHandler(err,data,callback){
    if (err) {
        return callback(err,data)
    } else {
        return callback(null,data)
    }
}

module.exports = function(){
    return
}


module.exports.prototype = {
    setModel:function(model){
        this.model = model;
    },
    extend: function(child){
        return _.extend({},this,child)
    },
    create: function(data,callback){
        let newObject = this.model(data);
        newObject.save(data,callbackHandler(err,data,callback));
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