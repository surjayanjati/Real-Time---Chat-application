// Requiring The Chat Database Collecti
const chatCollection=require('./model/chatuser.model');


// Storing The Total User in the Database

let storage=[];

// Function For Fetching The users who have in this room and their details
   function joiningGroup(socketid,secureChatUser,secureChatGroup){
     let secureUser={socketid,secureChatUser,secureChatGroup};
     storage.push(secureUser);
     return secureUser;
   }

// Function For Getting The Current User
function currentSecurechatUser(socketid){
   return storage.find(storage=>storage.socketid===socketid);
}

// Function For Removing The User who has left the chat from the Storage

function removeUser(socketid){
    let index=storage.findIndex(secureUser=>secureUser.socketid===socketid)

    if(index!=-1){
      return storage.splice(index,1)[0];
    }
}

// Function For all the Users which are right Now in storage ( in the Room )
function findUser(secureChatGroup){
  return storage.filter(secureUser=>secureUser.secureChatGroup===secureChatGroup); ;
}

  module.exports={joiningGroup,removeUser,findUser,currentSecurechatUser};