
var square = document.getElementsByClassName("square");

var board;
var count = 0;
var x, y;

function buildArray(){
    board = new Array (7);
  for(var i=0; i<7;i++){
    board [i] = new Array(6)
  }
}
buildArray();

function buildBoard(x,y){


  console.log(x);
  console.log(y);
    if (count%2 == 0){
    board[x][y] = "X"
  }
  else {
    board[x][y] = "O"
  }
  //console.log(board);
    for(var i=0; i<7; i++){
      for(var j=0; j<6; j++){
        //console.log(board[i][j]);
      }
    }
console.log(board);
}


function addXO(){

  if (count%2 == 0) {
    //y = event.target.parentElement.classList;
    x = event.target.parentElement;//.id;

    children = x.childNodes;


    for(let i=11; i>0; i=i-2){
      if(children[1].classList.value == "square"){
        if(children[i].classList.value == "square"){

          console.log('x= '+ x.id);
          console.log('y= '+ children[i].id);
          buildBoard(x.id, children[i].id);

          children[i].classList.add("blue");
          count++;
          checkWinner('X');
          break;
        }

      }
      else {
        return ;
      }
    }
  }

  else{
    x = event.target.parentElement;//.id;
    y = event.target.id;
    children = x.childNodes;



    for(let i=11; i>0; i=i-2){
      if(children[1].classList.value == "square"){
        if(children[i].classList.value == "square"){

          console.log('x= '+ x.id);
          console.log('y= '+ children[i].id);
          buildBoard(x.id, children[i].id);
          children[i].classList.add("red");

          count++;
          checkWinner('O');
          break;
        }

      }
      else {
        return ;
      }
    }
  }
//console.log(count);
   if(count == 42){
     alert("Draw");
   }
}






/*var Game = require('connect-four');
var myGame = new Game();

game.play();*/

function checkWinner(p){
  var status = false;
  var counter;
  for(let i = 0; i < 7; i++){
      counter =0;
      for(let j = 0; j < 6; j++)     // checking if player won (vertically)
      {
          if(board[i][j]== p)
              counter++;
      }
      if(counter == 4){
          alert(p+" has won!");
          status = true;
          for(let i=0; i<42; i++)  {
            square[i].removeEventListener("click", addXO);
            //square[i].removeEventListener("click", AI);
          }

        }
      counter =0;
      for(let j = 0; j < 6; j++)      // checking if player won (horizontally)
      {
          if(board[j][i]==p){
              counter++;
            }
      }
      if(counter == 4){
          alert(p+" has won!");
          status = true;
          for(let i=0; i<42; i++)  {
            square[i].removeEventListener("click", addXO);
            //square[i].removeEventListener("click", AI);
          }
        }
  }


  counter = 0;

  for(let i = 0; i < 7; i++)         // checking if player won (diagnaly)
  {
      if(board[i][i]==p)
          counter++;
  }
  if(counter == 4){
      alert(p+" has won!");
      status = true;
      for(let i=0; i<42; i++)  {
        square[i].removeEventListener("click", addXO);
        //square[i].removeEventListener("click", AI);
      }
    }
  counter = 0;
  for(let i = 0; i < 7; i++)     //checking if player won (diagnaly)
  {
      if(board[i][7-i-2]==p)
          counter++;
  }
  if(counter == 4){
      alert(p+" has won!");
      status = true;
      for(let i=0; i<42; i++)  {
        square[i].removeEventListener("click", addXO);
        //square[i].removeEventListener("click", AI);
      }
}
      return status;


}










function friendSwitch(){
  for(var i=0; i<42; i++)  {
    square[i].addEventListener("click", addXO);
  }
}
function AISwitch(){
  for(var i=0; i<42; i++)  {
    square[i].addEventListener("click", AI);
  }
}
document.getElementById("playFriend").addEventListener("click", friendSwitch);
document.getElementById("playAI").addEventListener("click", AISwitch);
