


// Gather The Socket Io
const Socket=io();

let chat=document.querySelector("#chat");
const sendBtn=document.getElementById("sendBtn");
// Capturing The Leave Butoon
const leaveBtn=document.getElementById("leaveBtn")

// Captruing The Where Room Name will be showed
let room=document.getElementById("room")

// Container For Displaying The Message
let messageContainer=document.getElementById("message-box");
// Container For Displaying The Username
let userContainer=document.getElementById("name-box-container")
// Getting The Form Data
const urlParams = new URLSearchParams(location.search);
let userName=urlParams.get("name");
let roomName=urlParams.get("groupName")


// Creating The Append Function For Creating The Message Div
const append=(message,position)=>{
    const messageElement=document.createElement("div");
    messageElement.innerText=message;
    messageElement.classList.add("msgBox");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

}
// Function For Showing Data on the Sidebar

const sideUser=(array)=>{
    let html="";
    for(i=0;i<array.length;i++){
        html+= `<div class="user-name-box"> - ${array[i].userName}</div>`
    }
    userContainer.innerHTML=html;
}

// // // Joining The Room For Each New User
Socket.emit('join-room',{userName,roomName});

  // Listening Socket From Server Side For showing a new user has Joined on the message box

  Socket.on('newUser-join',function(userName){
    append(`${userName} has Joined`,'left')
  })

  // Emiting The Message With the Form To Server side with socket
 
  $(document).ready(()=>{
         $("#chatMsg").on("submit",(e)=>{
             e.preventDefault()
         let message=chat.value;
         append(`You:${message}`,'right');
         Socket.emit('send-message',message);
         chat.value='';
         })
        })

   // Socket For Listening The Messages with show Message from server side to show the Message on chat box
   
   Socket.on('show-message',function(details){
    append(`${details.name}:${details.message}`,'left')
   })

   // Showing The User who has Left On the Chat Box with Listening the emit From server Side

   Socket.on('showUser-left',function(name){
    append(`${name} has Left The Chat`,'left')
   })

   

// Socket For listening the Users who are inside this room

Socket.on('show-user',function(details){
   sideUser(details.users)
})

// Socket For Showing All Users

// Socket.on('show-user',function(users){
//   console.log(users);
// })





// // // New User Showing On The Page To everyone
// // Socket.on('new-user-show',function(name){
  
// //     append(`${name} has joined Chat-Box`,'left')
// //     addUser(`${name}`);
// // })

// // // Sending The Message in Chat Box
// // $(document).ready(()=>{
// //     $("#chatMsg").on("submit",(e)=>{
// //         e.preventDefault()
// //     let message=chat.value;
// //     append(`You:${message}`,'right');
// //     Socket.emit('send',message);
// //     chat.value='';
// //     })
// // })


// // Listening The Emit Message Event
// Socket.on("recieve",function(data){
//   append(`${data.name}:  ${data.message}`,'left')
// })

// // Room Leaving Sockets

// // Using The Leaving Button to Add an event
// leaveBtn.addEventListener("click",()=>{
    
//     Socket.emit('leave-room',userName)
//     $(location).attr('href','/')

// })

// Listening The User who has left From Server side emit

// Socket.on('user-left',function(userName){
//     append(`${userName} has been left`,'left')
// })

// AjAX Method For Handeling Get Request of Home Page

$(document).ready(()=>{
    $.ajax({
        url:"/quickchat",
        method:"get",
        success:function(){
            room.innerText=roomName;
        },
        error:function(error){
             console.log(`This Is The Error ${error}`);
        }
    })
})