const express= require('express');
const router=express.Router();
console.log("router loaded sucessfully");
const homeController=require('../controllers/home_controllers');
router.get('/',homeController.home);
router.use('/users',require('./user.js'));
module.exports=router;
