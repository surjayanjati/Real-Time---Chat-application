// Requiring The Database Collection of Users
const chatCollection=require("../model/chatuser.model");


// Get Method of SecureChat Page

exports.getSecurechatPage=(req,res)=>{
   if(req.cookies.loginCookie){
    res.render("securechat")
   }else{
    res.redirect('/');
   }


 
}