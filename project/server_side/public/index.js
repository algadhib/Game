
/*
function active(){

  var currentActive = document.querySelector('.active');
  currentActive.classList.remove('active');

  event.target.parentElement.classList.add('active');
  //event.currentTarget.classList.add('active');
}
document.querySelector('.nav').addEventListener('click', active);
*/

function loadtic (){
  var xhr = new XMLHttpRequest();
  if(xhr.readyState == 4 && this.status == 200){
    document.getElementById('main').innerHTML = this.responseXML


  }
  xhr.open("GET", "/tictac", true);
  xhr.send(null);
}
//rewuiest w credintntial = true
//set cookie on browser wi ajax
function loadconnect(){
  var xhr = new XMLHttpRequest();
  if(xhr.readyState == 4 && this.status == 200){
    document.getElementById('main').innerHTML = this.responseXML


  }
  xhr.open("GET", "/connected4", true);
  xhr.send(null);
}

//document.getElementsByClassName('playtic')[0].addEventListener('click', loadtic);
//document.getElementsByClassName('playconnect')[0].addEventListener('click', loadconnect);


//using ajax to use the buttons for login or signup
// document.getElementById('login-btn').addEventListener('click', function()  {
//    var xhr = new XMLHttpRequest();
//    var data = {};
//    data.userName = document.getElementById('userName').value;
//    data.password = document.getElementById('password').value;
//
//    xhr.open('post', "/login");
//    //xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
//    //xhr.send(JSON.stringify({  userName: data.userName,
//    //            password: data.password}));
//    xhr.onload = function()  {    //check the status
//       if(xhr.status == 200)   {
//       }
//    }
//    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//    xhr.send("username=" + data.userName + "&password=" + data.password);
// });

document.getElementById('signup-btn').addEventListener('click', function()  {
   var xhr = new XMLHttpRequest();
   var data = {};
   data.userName = document.getElementById('userName').value;
   data.password = document.getElementById('password').value;

   xhr.onload = function()  {    //check the status
      if(xhr.status == 500)   {
         console.log("error registering");
         alert("error registering");
      }
   }
   xhr.open('post', "/signup");
   xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
   xhr.send(JSON.stringify({  userName: data.userName,
               password: data.password}));


});
