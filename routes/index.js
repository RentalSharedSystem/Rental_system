const express= require('express');
const router=express.Router();
console.log("router loaded sucessfully");
const homeController=require('../controllers/home_controllers');
const usersController=require('../controllers/users_controller');
router.get('/',homeController.home);
router.get('/logout',usersController.logout);
router.use('/users',require('./user.js'));

module.exports=router;
