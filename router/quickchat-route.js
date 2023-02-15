const quickChatController=require("../controller/quickchat-page-controller");

//Handeling The Request For Home Page

module.exports=(app)=>{

    // Get Request For Home Page
    app.get("/quickchat",quickChatController.getChatPage);

    
}