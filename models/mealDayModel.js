/*

    mealDayModel.js

*/

const mealDaySchema = require("./schemas/mealDaySchema");
const BaseModel = new (require("./baseModel"))();

module.exports = BaseModel.extend({
    setMongo: function (mongo) {
        try {
            this.setModel(mongo.model("MealDay",mealDaySchema));
        } catch (error) {
            this.setModel(mongo.model("MealDay"));
        }
        return this.model;
    }
})