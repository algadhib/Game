
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
document.getElementById('login-btn').addEventListener('click', function()  {
   var xhr = new XMLHttpRequest();
   var data = {};
   data.userName = document.getElementById('userName').value;
   data.password = document.getElementById('password').value;

   xhr.open('post', "/login");
   xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
   xhr.send(JSON.stringify({  userName: data.userName,
               password: data.password}));

});

document.getElementById('signup-btn').addEventListener('click', function()  {
   var xhr = new XMLHttpRequest();
   var data = {};
   data.userName = document.getElementById('userName').value;
   data.password = document.getElementById('password').value;

   xhr.open('post', "/signup");
   xhr.setRequestHeader("content-type", "application/json;charset=UTF-8");
   xhr.send(JSON.stringify({  userName: data.userName,
               password: data.password}));

});
