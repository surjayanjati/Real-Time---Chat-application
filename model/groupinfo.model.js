// Requiring The mongoose
const mongoose=require('mongoose');
// Requiring The database Connection
const conn=require('./db.model');

const groupInfoSchema=new mongoose.Schema({
    groupname:{
        type:String,
        required:true
    },
    creationdate:{
        type:Date,
        required:true
    },
    users:[{
        user:{
         type:String,

    },
}
    
    ]
})
// Saving The User Inside The Group Before Saving The Group
groupInfoSchema.methods.saveUser=async function(name){
  this.users=this.users.concat({user:name});
 await this.save();
 return "done";
}

const groupInfoCollection=new mongoose.model('AllGroups',groupInfoSchema);

module.exports=groupInfoCollection;