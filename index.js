const express = require("express");
const db=require('./config/mongoose');
const port=process.env.PORT || 3000;
const app = express();

app.set("view engine","ejs");
app.set('views','./views');
app.use('/',require('./routes/index.js'));
app.listen(port,function(err){
  if(err)
  {
     console.log(err)
  }
  else
  console.log(`working fine on port: ${port}`);
})