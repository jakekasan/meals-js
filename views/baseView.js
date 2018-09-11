module.exports = function(response,templateName){
    this.response = response;
    this.templateName = templateName;
}

module.exports.prototype = {
    render: function(data){
        if (this.response || this.templateName){
            this.response.render(this.templateName,data);
        }
    }
}