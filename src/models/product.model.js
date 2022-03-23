
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title : {type : String, required : true},
    price : {type : Number, required : true},
    UserId : 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : false,
    }

},
{
    timestamps : true,
    versionKey : false,
});

const Product1 = mongoose.model("product", ProductSchema);

module.exports = Product1;