// Collecting The Database Collection From chatuser.model.js
const chatUserCollection = require("../model/chatuser.model");

// Collecting The Database Collection From chatuser.model.js
const groupInfoCollection = require("../model/groupinfo.model");
// Requiring The Bcrypt For Password
const bcrypt = require("bcrypt");
// Requiring The Token
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const conn=require('../model/db.model');

// Handeling The Controller For Get Request For Home Page

exports.getHomePage = (req, res) => {
  res.render("index");
};

// // Handeling The Controller For Get Request For Home Page

exports.postHomePage = (req, res) => {
  res.send({ msg: "success", status: 200 });
};

// // Handeling The Controller For Post Request For Home Page on Creating new Group

exports.createGroup = async (req, res) => {
  if (req.body.user == "" || req.body.group == "" || req.body.password == "") {
    res.send({ msg: "Kindly Fill all the Details", status: 400 });
  } else {
    let user = req.body.user;
    let groupName = req.body.group;
    let password = req.body.password;

    let userSave = new chatUserCollection({
      name: user,
      room: groupName,
      password: password,
    });
    //Creating The Token Before Saving The Data
 
    let result = await userSave.save();

    if (result) {
      let groupInfoSave=new groupInfoCollection({
        groupname:groupName,
        creationdate:new Date(),
       
      })
     // Saving The Username inside The Group
    let   groupUserSave=await groupInfoSave.saveUser(user);
      if(groupUserSave=="done"){
        let groupSave=await groupInfoSave.save();
        if(groupSave){
          res.send({ msg: "Group Has Been Created, Login to Chat", status: 201 });
        }
      }
      

    }
  }
};

// Handeling The Home Page Post Request For Login Page Data

exports.postLoginForm = async (req, res) => {
  //   if((req.body.loginUser=="") (req.body.loginGroupName=="") && (req.body.loginPassword=="")){
  //    res.send({msg:"Kindly Fill all the Fields",status:400})
  //   }else{
  //    let loginUser=req.body.loginUser;
  //    let loginGroupName=req.body.loginGroupName;
  //    let loginPassword=req.body.loginPassword;

  //    let totalInfo=await chatUserCollection.findOne({name:loginUser});
  //    if(!totalInfo.name==""){
  //      let passwordMatch=await bcrypt.compare(loginPassword,totalInfo.password);
  //       if(passwordMatch||totalInfo.room==loginGroupName){
  //          console.log("Login Success full");
  //       }else{
  //          console.log("Login Failed");
  //       }
  //    }else{
  //       res.send({msg:"User does Not Exist",status:204})
  //    }
  //   }
  if (
    req.body.loginUser != "" &&
    req.body.loginGroupName != "" &&
    req.body.loginPassword != ""
  ) {
  
          let loginUser=req.body.loginUser;
          let loginGroupName=req.body.loginGroupName;
          let loginPassword=req.body.loginPassword;
    
          let totalInfo=await chatUserCollection.findOne({room:loginGroupName});

          if(totalInfo!=null){
            let passwordMatch=await bcrypt.compare(loginPassword,totalInfo.password);
             if(passwordMatch){
              if(totalInfo.name==loginUser){
                
                generatedToken=await totalInfo.generateToken();
              res.cookie('loginCookie',generatedToken,{expires: new Date(Date.now()+30000)})
              res.send({msg:`Login Successfull${loginUser}`,status:200})
              }else{
 // Saving The New User
 let userSave = new chatUserCollection({
  name: loginUser,
  room: loginGroupName,
  password: loginPassword,
});
//Creating The Token Before Saving The Data
const newUserToken=await userSave.generateToken();
let result = await userSave.save();
if(result){
  let totalInfo=await groupInfoCollection.findOne({groupname:loginGroupName});
 // Saving The Username inside The Group
let   groupUserSave=await totalInfo.saveUser(loginUser);
if(groupUserSave=="done"){
  // Creating an individual Collection with The Group Name to Store The Message
 
  let success=await conn.chatbox.createCollection('surjo')
  if(success){
    res.cookie('loginCookie',newUserToken,{expires: new Date(Date.now()+30000)})
    res.send({msg:`Login Successfull ${loginUser}`,status:200})
  }else{

  }

}else{
  res.send({msg:`Kindly Check Your Password or Group name you have entered`,status:401})
}
}else{
        res.send({msg:`Kindly Check Your Password or Group name you have entered`,status:401})
}

              }
             
             
           
             }else{
               res.send({msg:`Kindly Check Your Password or Group name you have entered`,status:401})
             }
          }else{
             res.send({msg:"User does Not Exist",status:204})
          }
  } else {
    res.send({ msg: "Kindly Fill all the Fields", status: 400 });
  }
};
