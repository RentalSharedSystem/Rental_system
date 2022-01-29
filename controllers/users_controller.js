const User=require('../models/user');
module.exports.signUp=function(req,res)
{
     return res.render('sign_up');
}
module.exports.signIn=function(req,res)
{
     return res.render('sign_in');
}
module.exports.create=function(req,res){
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
               name:req.body.username,
               pincode:req.body.Pincode,
               phone:req.body.phone});
               return res.redirect('/users/sign-in');
         }
     });
}

module.exports.login = function(req,res) {
    req.login(req.body,function(err) {
      if(err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req,res,() => {
          return res.redirect('/');
        })
      }
    })
}
