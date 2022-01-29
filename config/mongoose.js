const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://Shubham:shubhamkumar@cluster0.fwbpo.mongodb.net/rental?retryWrites=true&w=majority');
const db=mongoose.connection;
//error
db.on('error',console.error.bind(console,'error while connecting'));
//up and running then print the message.
db.once('open',()=>{
    console.log('connection successfully');
})