const users=[];

function userJoin(id,userName,roomName){
 const  user={id,userName,roomName};
 users.push(user);
 return user;
}

// Function Tog Get The Current User with Socket Id

function getCurrentUser(socketid){
   return users.find(user=>user.id===socketid)

}

// Function For Leaving User and Pull That From the ARRAY OF Users

function userLeave(socketid){
   const index=users.findIndex(user=> user.id===socketid);

   if(index !== -1){
    
    return users.splice(index,1)[0];
   
   }
}

// Function to find The Users who are inside a particular room

function roomUser(room){

   return users.filter(user=>user.roomName===room)
  
}

module.exports={userJoin,getCurrentUser,userLeave,roomUser};