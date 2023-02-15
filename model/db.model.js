const mongoose=require('mongoose');
const conn=mongoose.connect('mongodb://localhost:27017/chatbox',{useNewUrlParser:true ,useUnifiedTopology:true,}).then(()=>{
    console.log("Connection to Database Successfull");
}).catch((error)=>{
    console.log('Error in Connecting With Database'+error);
})

// Exporting The Connection 

module.exports=conn;