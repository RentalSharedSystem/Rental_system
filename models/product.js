const mongoose= require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const productSchema= new mongoose.Schema({
    cost:{
        type:Number,
        required:true
    },
    owner:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    state:{
        type:String,
        required:true
    },
     pincode:{
         type:String,
         required:true
    },
    rating:{
        type:Number,
        required:true
    },
    renter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const Product=mongoose.model('Product',productSchema);
module.exports=Product;
