const User=require('../models/users');
module.exports.signUp=function(req,res)
{
     return res.render('sign_up');
}
module.exports.signIn=function(req,res)
{
     return res.render('sign_in');
}
module.exports.create= function(req,res){
     User.findOne({email:req.body.email},(err,user)=>{
          if(err)
          {
               console.log(err);
               return;
          }
         if(user)
         {
              console.log('user allready there');
              return res.redirect('/users/sign-in');
         }
         else
         {
             User.create({
               email:req.body.email,
               password:req.body.password,
               name:req.body.name,
               pincode:req.body.pincode,
               phone:req.body.phone});
               console.log("user created");
               return res.redirect('/users/sign-in');
         }
     });
}
module.exports.login=function(req,res){
     return res.redirect('/');
}

module.exports.logout=function(req,res){
  req.logout();
  return res.redirect('/');
}
