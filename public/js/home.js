



//  Gathering The Button From The Home Page

const signUp=document.getElementById("signup");
const logIn=document.getElementById("login");
const moveBtn=document.querySelector(".toggle");
const heading=document.querySelector("#heading")

const quickChat=document.querySelector(".quickChat")
const secondChat=document.querySelector(".secondChat")
const loginChat=document.querySelector(".loginChat")

//Requiring The Top Box

const topButtonBox=document.querySelector('.action-btn')

// Requiring The Button For Opening The Login 

const openLoginPage=document.querySelector('#login-secureChat')

// Login Button Event listner ( Moving The Toggle Butoon From Left to Right)

logIn.addEventListener("click",()=>{
    moveBtn.classList.add("right")

    quickChat.classList.add("hideChat")
    secondChat.classList.remove('hideChat')
  
})

// Login Button Event listner ( Moving The Toggle Butoon From right to left)
 

signUp.addEventListener("click",()=>{
    moveBtn.classList.remove("right")
    quickChat.classList.remove("hideChat")
    secondChat.classList.add('hideChat')
    document.querySelector("#heading").innerText="To Enter a Quick Chat"
})

// Log in Page Opening Button
function loginBoxOpen(){
    loginChat.classList.remove('hideChat');
    secondChat.classList.add('hideChat');
    quickChat.classList.add("hideChat");
    topButtonBox.classList.add('hideChat')
}



// AjAX Method For Handeling Get Request of Home Page

$(document).ready(()=>{
    $.ajax({
        url:"/",
        method:"get",
        success:function(){

        },
        error:function(error){
             console.log(`This Is The Error ${error}`);
        }
    })
})

 $(document).ready(()=>{
     $("#quickChatForm").on("submit",(e)=>{
         e.preventDefault();
         let name=document.getElementById("name").value;
         let groupName=document.getElementById("groupName").value;
        
         $.ajax({
             url:`/quickchat?name=${name}&groupName=${groupName}`,
             method:"post",
             success:function(result,error){
                 if(result.status==200){
                   
                     $(location).attr('href',`/quickchat?name=${name}&groupName=${groupName}`)
                     document.getElementById("room").innerText=groupName;

                 }
             }
         })
     })
 })


 // Ajax From For Creating The New Secure Group
 $(document).ready(()=>{
    $('.secondChat').on('submit',(e)=>{
        e.preventDefault();
        const formData=$('.secondChat').serialize();
        console.log(formData);
        $.ajax({
            url:'/createSecureChat',
            method:'post',
            data:formData,
            success:function(result){
                if(result.status==400){
                    alert(result.msg)
                    $('.secondChat').trigger('reset')
                }else if(result.status==201){
                    alert(result.msg);
                    loginBoxOpen();
                }
            }

        })
    })
 })


 // Ajax Method For Login into Secure Chat

 $(document).ready(()=>{
    $('.loginChat').on('submit',(e)=>{
        e.preventDefault();
        let loginUser=document.getElementById('loginUser').value;
        let loginGroupName=document.getElementById('loginGroupName').value;
        const loginFormData=$('.loginChat').serialize();
        console.log(loginFormData);
        $.ajax({
            url:`/securechat?user=${loginUser}&groupName=${loginGroupName}`,
            method:'post',
            data:loginFormData,
            success:function(result){
                if(result.status==400){
                    alert(result.msg);
                    $('.loginChat').trigger('reset');
                }else if(result.status==204){
                    alert(result.msg);
                    $('.loginChat').trigger('reset')
                }else if(result.status==401){
                    alert(result.msg);
                    $('.loginChat').trigger('reset')
                }else if(result.status==200){
                    alert(result.msg);
                    $(location).attr('href',`/securechat?user=${loginUser}&groupName=${loginGroupName}`)
                }
            }

        })
    })
 })