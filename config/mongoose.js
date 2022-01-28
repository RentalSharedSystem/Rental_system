const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/connectii');
const db=mongoose.connection;
//error
db.on('error',console.error.bind(console,'error while connecting'));
//up and running then print the message.
db.once('open',()=>{
    console.log('connection successfully');
})