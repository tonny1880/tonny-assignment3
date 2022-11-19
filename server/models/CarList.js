let mongoose = require('mongoose');
// create a car models
let carModel = mongoose.Schema({
    Make:String, 
    Model:String,
    Color:String,
    Year:String,
    Price:Number,
    Description:String 
},
{
    collection: "cars"
}
)
module.exports = mongoose.model('CarBuy', carModel);

