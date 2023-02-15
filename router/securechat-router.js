// Requiring The SecureChat Controller
const SecureChatController=require('../controller/securechat-controller')

module.exports=(app)=>{

    // Handeling The Get request For securechat page
    app.get('/securechat',SecureChatController.getSecurechatPage)
}