const express = require("express");
const app = express();

app.set("view engine","ejs");

app.get("/",function(req,res) {
  res.render("sign_in");
})

app.listen(3000,function() {
  console.log("working fine");
})
