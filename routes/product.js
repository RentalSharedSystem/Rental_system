const express= require('express');
const router=express.Router();
console.log("router loaded sucessfully");
const productController=require('../controllers/product_controllers');
router.get('/rent',productController.rent);
router.get('/hire',productController.hire);
router.post('/add',productController.add);
router.post('/hire',productController.findByPincode);

module.exports=router;
