const _ = require("underscore");

module.exports = {
    name:"Base",
    content: null,
    run: function(){
        return
    },
    extend: function(child){
        return _.extend({},this,child)
    }
}