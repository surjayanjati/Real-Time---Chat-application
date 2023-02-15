// Requiring The Express
const express=require("express");
// Requiring The Http server
const http=require("http");
//Requring The Socket io
const socketio=require("socket.io");
// Requiring The Path Module
const path=require("path");
// Requiring The Redis Module

// Requiring The Cookie
const cookie=require('cookie-parser');

// Requiring The Path Of Quickchat User Storage
const {userJoin,getCurrentUser,userLeave,roomUser}=require("./public/quickchat-storage/users");

// Requiring The Secure Chat Group Database work
const {joiningGroup,removeUser,findUser,currentSecurechatUser}=require('./securechat-storage');



// Creating The Server
const app=express();
const server=http.createServer(app);

const io=socketio(server);
// Middlewear For Pushing The Json Data in req body

app.use(express.json());

app.use(cookie());

app.use(express.urlencoded({extended:false}))


 
//Requiring the Router for home page
require("./router/homepage-router")(app)

//Requiring the Router for Quick Chat page
require("./router/quickchat-route")(app)

//Requiring the Router for Secure Chat page
require("./router/securechat-router")(app)


// Creating The Static Path For Public Folder
app.use(express.static(path.join(__dirname,"public")))
//Creating The View Directory

app.set("view engine", "ejs")



// Socket Connenction Coding

io.on('connection',socket=>{
   
    socket.on('join-room',function({userName,roomName}){
      const user =userJoin(socket.id,userName,roomName)
  
      socket.join(user.roomName)
      
      // Socket For showing a new user has Joined on the message box

      socket.broadcast.to(user.roomName).emit('newUser-join',user.userName)

         // Socket For showing The Message

        socket.on('send-message',function(message){
            
          let user=getCurrentUser(socket.id)
         
   
       
         socket.broadcast.to(user.roomName).emit('show-message',{name:user.userName,message:message}) ;
        })
        
        // Socket For Leaving The Chat  
        socket.on('disconnect',()=>{
        let user=userLeave(socket.id);
        console.log(user);
        if(user){
          socket.broadcast.to(user.roomName).emit('showUser-left',user.userName)
          //  Socket For Sending the user who are there in a particular room

       io.to(user.roomName).emit('show-user',{users:roomUser(user.roomName)})
        }
         
        })

        //  Socket For Sending the user who are there in a particular room

       io.to(user.roomName).emit('show-user',{users:roomUser(user.roomName)})

      // // Socket For User Joing in The Room

      // socket.to(user.roomName).emit('show-user',users);

      //  //  User Joining Listening
     
     
      //   socket.broadcast.to(user.roomName).emit('new-user-show',user.userName);
 

      //  // Message Listening From Client Side And Then Emiting To everyone
      //  socket.on('send',function(message){
      
      //   socket.broadcast.to(user.roomName).emit('recieve',{name:user.userName,message:message});
      })
      
     

    //  Socket For Secure Chat System -------------------------------------------/////////////////////////////

       socket.on('secure-chat',function({secureChatUser,secureChatGroup}){
        const secureUser=joiningGroup(socket.id,secureChatUser,secureChatGroup);
        socket.join(secureUser.secureChatGroup);
        
        // Emiting The User Who has Joined Recentrly
        socket.broadcast.to(secureUser.secureChatGroup).emit('newUser-joined',secureUser);

        // SocKET fOr Showing The Messages 
        socket.on('send-message',function(message){
             const user=currentSecurechatUser(socket.id);
  
             socket.broadcast.to(secureUser.secureChatGroup).emit('recieve-msg',{userName:user.secureChatUser,message:message})
        })
        

       // Socket For Disconnection 
        socket.on('disconnect',function(){
         const result=removeUser(socket.id);
           socket.to(secureUser.secureChatGroup).emit('user-left',result);

           // Calling The Event So That After a user Left The Sidebar which has Users Can Change too
      io.to(secureUser.secureChatGroup).emit('show-users',{data:findUser(secureUser.secureChatGroup)})
          
        })
      // Emiting For Showing The User Who Have Joined on th Side bar

      io.to(secureUser.secureChatGroup).emit('show-users',{data:findUser(secureUser.secureChatGroup)})
         
       })




    })


     

      

      





server.listen("6500",()=>{
    console.log("Server is Listening at Port Number 6500");
})
