/*

    nutrition.model.js

    does NOT inherit from basemodel

*/

const sqlite3 = require("sqlite3");

const config = (require("./../config/index"))();
const path = require("path");

module.exports = function(callback){
    var self = this;
    this.db = new sqlite3.Database(path.join(__dirname,"..","db","nutrition.db"),( (callback) ? (err) => callback(err) : (err) => {if (err) console.log(err)} ));

    this.db.run(`CREATE TABLE IF NOT EXISTS nutrition (
        ndbno INTEGER PRIMARY KEY,
        name TEXT,
        calories NUMBER,
        proteins NUMBER,
        fats NUMBER,
        carbohydrates NUMBER
    )`,(err) => {
        if (err) console.log(err);
    });
    return
}

module.exports.prototype = {
    name:"Nutrition Model",
    tableName:"nutrition",
    debug: false,
    dbErr:null,
    run: function(sql,callback){
        this.db.run(sql,(err) => callback(err));
    },
    loadDB: function(callback){
        callback(this.db,this.dbErr);
    },
    getColNames: function(data){
        return (Object.keys(data)).reduce((acc,elem,i,arr) => {
            return acc.slice(0,-1) + ( (i == (arr.length - 1)) ? elem : `${elem},` ) + acc.slice(-1)
        },"()");
    },
    getColValues: function(data){
        return (Object.values(data)).reduce((acc,elem,i,arr) => {
            return acc.slice(0,-1) + ( (i == (arr.length - 1)) ? elem : `${elem},` ) + acc.slice(-1)
        },"()");
    },
    create: function(data,callback){
        let sql = `INSERT INTO ${this.tableName} ${this.getColNames(data)}
        VALUES ${this.getColValues(data)};`;
    },
    retrieve: function(data,callback){
        return
    },
    update: function(oldData,newData,callback){
        return
    },
    delete: function(data,callback){
        return
    }
}