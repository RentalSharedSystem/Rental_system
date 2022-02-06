const Product=require('../models/product');
const User=require('../models/users');
const multer = require('multer');
const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, './assets/uploads/images');
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

module.exports.rent=(req,res)=>{
   return res.render("rent");
}
module.exports.add=(req,res)=>{
    Product.create({
        cost:req.body.cost,
        owner:req.user._id,
        state:"1",
        pincode:req.body.pincode,
        rating:req.body.rating,
        image:req.file.filename
    });
    console.log("successfully added in the database");
    return res.redirect('/');
}

module.exports.hire= async function (req,res) {
  let products= await Product.find({state:"1"});
    return  res.render("hire",{products:products});

}

module.exports.findByPincode = async function(req,res) {

  let products= await Product.find({pincode: req.body.pincode,state:"1"});
    return  res.render("hire",{products:products});
}

module.exports.details = async function(req,res) {

  let products= await Product.find({_id: req.params.id}).populate('owner').populate('renter');
    return  res.render("detail",{products:products});
}
