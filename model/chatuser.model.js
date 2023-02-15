// Requiring The Connection From db.model
const conn=require('./db.model');
const mongoose=require('mongoose');

// Requiring The Bcrypt Module
const bcrypt=require('bcrypt')
// Requiring The Token
const jwt=require('jsonwebtoken');

// Creating The Schema Markup Genarator

const chatDocument =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    room:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
       {
        token:{
            type:String,

        }
       }
    ]
})
// Generating The Token

chatDocument.methods.generateToken= async function(){
  
    const token=await jwt.sign({_id:this._id.toString()},"securechatapplicationwithsurjayanjati/quickchatapplicationwithsurjayanjati")
    this.tokens=this.tokens.concat({token:token});
    
   await this.save();
   return token;
}

// Hshing The Password Before Saving The Schema

chatDocument.pre('save',async function(next){
   if(this.isModified('password')){
    this.password=await bcrypt.hash(this.password,10);
    next();
   }
})

// Creating The Collection
const chatUserCollection=new mongoose.model('users',chatDocument);

// Exporting The Collection which is inside a variable

module.exports=chatUserCollection;