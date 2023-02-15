// Requiring The Socket
let Socket=io();

// Requiring The Message Container Where The Chats will be shown
const messageBox=document.querySelector('#message-box')
// Reuiring The Container Where Group Mmbers Name will be Shown
const userBox=document.querySelector("#name-box-container");
// Requiring The Form For Sending The Messages
const chatMsg=document.getElementById('chatMsg')


///  Client Side Socket Handeling For Secure Chat Page

const urlParams = new URLSearchParams(location.search);
let secureChatUser=urlParams.get("user");
let secureChatGroup=urlParams.get("groupName");



// Append Function For Showing The Chat Messages on message Container
function append(message,position){
    const messageElement=document.createElement("div")
    messageElement.innerText=message;
    messageElement.classList.add("msgBox")
    messageElement.classList.add(position);
    messageBox.append(messageElement);
}

// Function For Showing User on the Side Bar

 function sideBar(array){
   let html="";
   for(i=0;i<array.length;i++){
    html +=`<div class="user-name-box" > - ${array[i].secureChatUser}</div>`
   }
   userBox.innerHTML=html;
 }

 // Function For Collecting The Messages And Emiting Them
$(document).ready(()=>{
    $('#chatMsg').on('submit',(e)=>{
        e.preventDefault();
        let message=document.getElementById('chat').value;
        append(`You:${message}`,'right')
        // Sending The Emit To server Side with The Message
        Socket.emit('send-message',message);
        document.getElementById('chat').value="";
    })
})



// Emitig The username and groupname
Socket.emit('secure-chat',{secureChatGroup,secureChatUser})


// Listening The new user who has joined and showing it on the Chat Box

Socket.on('newUser-joined',function(details){
   append(`${details.secureChatUser} has joined the Chat`,'left');
})
// Listening The Recive emit event From the Client Side to Display The Messages
Socket.on('recieve-msg',function(details){
    append(`${details.userName}: ${details.message}`,'left')
  })

// Listening The Event From Server Side Where User has left 

Socket.on('user-left',function(details){
   append(`${details.secureChatUser} has Left the Chat`,'left')
})

// Listening The EVent For Showing The Users on the Side Bar
Socket.on('show-users',function(array){
   sideBar(array.data)
  
})