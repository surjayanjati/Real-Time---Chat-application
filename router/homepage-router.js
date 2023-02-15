const homeController=require("../controller/homepage-controller");
const express=require('express');
const app=express();

//Handeling The Request For Home Page

module.exports=(app)=>{

    // Get Request For Home Page
    app.get("/",homeController.getHomePage);

      // Get Request For Home Page
      app.post("/quickchat",homeController.postHomePage);

         // Post Request For Home Page
         app.post("/createSecureChat",homeController.createGroup);

          // Post Request For Home Page Login Form
          app.post("/securechat",homeController.postLoginForm);

          // Post Method For secure Login 

}