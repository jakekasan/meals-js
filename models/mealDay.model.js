/*

    mealDayModel.js

*/

const mealDaySchema = require("./schemas/mealDay.schema");
const BaseModel = new (require("./base.model"))();

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