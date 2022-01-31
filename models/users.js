const mongoose= require('mongoose');
const userSchema= new mongoose.Schema({
    email:{
        type: String, 
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
       type:String,
       required:true
    },
    pincode:{
         type:String, 
         required:true
    },
    phone:{
        type:String,
        required:true 
    },
    all_product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        default:[]
    }]
},{
    timestamps:true
});
const User=mongoose.model('User',userSchema);
module.exports=User;