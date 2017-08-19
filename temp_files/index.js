

function active(){

  var currentActive = document.querySelector('.active');
  currentActive.classList.remove('active');

  event.target.parentElement.classList.add('active');
  //event.currentTarget.classList.add('active');
}
document.querySelector('.nav').addEventListener('click', active);


function loadtic (){
  var xhr = new XMLHttpRequest();
  if(xhr.readyState == 4 && this.status == 200){
    document.getElementById('main').innerHTML = this.responseXML


  }
  xhr.open("GET", "tictaktoe", true);
  xhr.send(null);
}

function loadconnect(){
  var xhr = new XMLHttpRequest();
  if(xhr.readyState == 4 && this.status == 200){
    document.getElementById('main').innerHTML = this.responseXML


  }
  xhr.open("GET", "connected4", true);
  xhr.send(null);
}

document.getElementsByClassName('playtic')[0].addEventListener('click', loadtic);
document.getElementsByClassName('playconnect')[0].addEventListener('click', loadconnect);
