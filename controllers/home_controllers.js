const Product=require('../models/product');
const User = require('../models/users');

const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: 'rzp_test_QOtM8eAamDFzZq',
  key_secret: 'G5ABvNDK4KOCHNygS0by7siN'
})


module.exports.home=function(req,res){
   return res.render("home");
}

module.exports.profile= async function(req,res) {
  let x= await User.findById(req.user._id);
  return res.render("profile",{user:x});
}

module.exports.rent_products= async function(req,res) {
    let rented_products = await Product.find({owner: req.user._id,state: "1"});
    return res.render("rent_product",{products:rented_products});
}

module.exports.purchased_products= async function(req,res) {
    let rented1_products = await Product.find({owner: req.user._id,state: "2"}).populate('renter');
    return res.render("purchased_product",{products:rented1_products});
}

module.exports.hire_products= async function(req,res) {
    let hired_products = await Product.find({renter: req.user._id,state: "2"}).populate('owner');
    return res.render("hired_product",{products:hired_products});
}

module.exports.return_product = async function(req,res) {
  Product.findByIdAndUpdate(req.params.id,{ $set:{state:"1",renter: null}},(err,prdct)=>{
    if(err)
    {
       console.log(err);
    }
    else
    console.log("updated");
  });
  return res.redirect("/profile");
}

module.exports.edit = function(req,res) {
  User.findByIdAndUpdate(req.user._id,{ $set:{name:req.body.name,password: req.body.password}},(err,prdct)=>{
    if(err)
    {
       console.log(err);
    }
    else
    console.log("updated");
  });
  return res.redirect("/profile");
}

module.exports.order=async function(req,res){
   let products=await Product.findById(req.params.id);
   console.log(products);
     return res.render("order",{products:products});
}

module.exports.pay =function(req,res) {

  var options = {
    amount:req.params.price,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2"
    }
  }

  razorpay.orders.create(options,function(err,order) {
    console.log(order);
    res.json(order);
  })
}

module.exports.complete_payment = function(req,res) {
  razorpay.payments.fetch(req.body.razorpay_payment_id).then((doc) => {
    if(doc.status === 'captured') {

      Product.findByIdAndUpdate(req.params.id,{ $set:{state:"2",renter: req.user._id}},(err,prdct)=>{
        if(err)
        {
           console.log(err);
        }
        else
        console.log("updated");
      });
      return res.render("success");
    } else {
      return res.redirect("/");
    }
  });
}
