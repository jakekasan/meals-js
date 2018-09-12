/*

    userSessions.js

*/

// mongoose.connect("mongodb://temp:password1@ds245512.mlab.com:45512/meals",{
//     useNewUrlParser:true
// });

const BaseModel = new (require("./baseModel"))();
const userSessionSchema = require("./schemas/userSessionSchema");

// module.exports = function(mongoose){
//     let model = mongoose.model("userSession",userSessionSchema);
//     return (new BaseModel(model))
// }

const userSessionModel = BaseModel.extend({
    setMongo: function(mongo){
        this.setModel(mongo.model("userSession",userSessionSchema)); 
    }
})

module.exports = userSessionModel;