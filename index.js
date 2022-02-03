const express = require("express");
const db=require('./config/mongoose');
const app = express();
const port=process.env.PORT || 3000;
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-stratagies');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended:true}));
app.use(express.static('./assets'));
app.set("view engine","ejs");
app.set('views','./views');
app.use(session({
  name:'Rental_system',
  secret:'jchdhdcsjhndksh',
  saveUninitialized:false,
  resave:false,
  cookie:{
      maxAge:(1000*60*100)
  },
  store: MongoStore.create({
      mongoUrl:'mongodb+srv://Shubham:shubhamkumar@cluster0.fwbpo.mongodb.net/rental?retryWrites=true&w=majority',
          autoRemove:'disabled',
  },(err)=>{
      console.log(err);
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/',require('./routes/index.js'));
app.listen(port,function(err){
  if(err)
  {
     console.log(err)
  }
  else
  console.log(`working fine on port: ${port}`);
})
