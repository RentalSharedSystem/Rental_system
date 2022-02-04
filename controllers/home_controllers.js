const Product=require('../models/product');

const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: 'rzp_test_QOtM8eAamDFzZq',
  key_secret: 'G5ABvNDK4KOCHNygS0by7siN'
})


module.exports.home=function(req,res){
   return res.render("home");
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
      
      Product.findByIdAndUpdate(req.params.id,{ $set:{state:"2"}},(err,prdct)=>{
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
