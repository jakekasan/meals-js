/*

    mealDayModel.js

*/

const BaseModel = (require("./baseModel"))

module.exports = BaseModel.extends({
    setMongo: function (mongo) {
        try {
            this.setModel(mongo.model("MealDay",mealDaySchema));
        } catch (error) {
            this.setModel(mongo.model("MealDay"));
        }
    }
})