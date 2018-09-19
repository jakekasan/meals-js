const _ = require("underscore");

function callbackHandler(err,data,callback){
    if (err) {
        return callback(err,data)
    } else {
        return callback(null,data)
    }
}

module.exports = function(){
    return this
}


module.exports.prototype = {
    name:"Base Model",
    setModel:function(model){
        this.model = model;
    },
    getModel:function(){
        return this.model
    },
    extend: function(child){
        return _.extend({},this,child)
    },
    create: function(data,callback){
        let newObject = this.model(data);
        newObject.save(data,(err,res) => callbackHandler(err,res,callback));
    },
    retrieve: function(data,callback){
        this.model.find((data || {}),(err,res) => callbackHandler(err,res,callback));
    },
    update: function(toUpdate,data,callback){
        this.model.update(toUpdate,data,(err,res) => callbackHandler(err,res,callback));
    },
    delete: function(data,callback){
        this.model.delete(data,(err,res) => callbackHandler(err,res,callback));
    }
}