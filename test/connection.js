const mongoose = require("mongoose");

// connecting

mongoose.connect("mongodb://jake:password1@ds235302.mlab.com:35302/sqrt4",{
    useNewUrlParser: true
});

mongoose.connection.once("open",() => {
    console.log("Connected to MongoDB");
}).on("error",(error) => {
    console.log("Connection error:",error);
});