const express= require('express');
const router=express.Router();
const multer = require('multer');
const passport=require('passport');
console.log("router loaded sucessfully");

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

const productController=require('../controllers/product_controllers');
router.get('/rent',passport.checkAuthentication,productController.rent);
router.get('/hire',passport.checkAuthentication,productController.hire);
router.post('/add',passport.checkAuthentication,upload.single('image'),productController.add);
router.post('/hire',passport.checkAuthentication,productController.findByPincode);
router.get('/hire/:id',passport.checkAuthentication,productController.details);

module.exports=router;
