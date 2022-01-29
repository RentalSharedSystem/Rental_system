const passport= require('passport');
const LocalStratgy=require('passport-local').Strategy;
const User=require('../models/user');
passport.use(new LocalStratgy({
    usernameField:'email',
    passReqToCallback:true
},
 function(req,email,password,done){
    // find a user and establish identity.
    User.findOne({email:email},function(err,user)
    {
        if(err)
        {
            req.flash('error',err);
            return done(err);
        }
        else
        {
            if(!user||user.password!=password)
            {
                return done(null,false);
            }
            return done(null,user);
        }

    });
 }
 ));

 //serialising the user, deciding the which field to keep in the cookies.
passport.serializeUser(function(user,done){
    done(null,user.id);
})
// desearialising the key to get the user.
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log('error while finding user while desearializing');
            return done(err);
        }
        else
        {
            return done(null,user);
        }
    })
})

passport.checkAuthentication=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else
    {
        res.redirect('/users/sign-in');
    }
}
passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;
