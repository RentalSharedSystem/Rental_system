const express= require('express');
const passport=require('passport');
const router=express.Router();
const usersController=require('../controllers/users_controller');
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',passport.checkAuthentication1,usersController.signIn);
router.post('/sign-up',usersController.create);
router.post('/login',passport.authenticate(
    'local',{failureRedirect:'/users/sign-in'},
),usersController.login);
router.get('/logout',usersController.logout);
module.exports=router;
