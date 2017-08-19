
var count = 0;
var emptySpot = false;
var square = document.getElementsByClassName("square");
var x, y;
var board;

function buildArray(){
    board = new Array (3);
  for(var i=0; i<3;i++){
    board [i] = new Array(3)
  }
}

buildArray();

function buildBoard(x,y){


    if (count%2 == 0){
    board[x][y] = "X"
  }
  else {
    board[x][y] = "O"
  }
  //console.log(board);
    for(var i=0; i<3; i++){
      for(var j=0; j<3; j++){
        //board[i][j]=i;
      }
    }
console.log(board);
}
function addXO(){

  if (count%2 == 0) {

    if(event.target.innerText == ""){
          event.target.innerText = "X"
          x = event.target.parentElement.classList.value;
          y = event.target.id;
          console.log(x);
          console.log(y);
          buildBoard(x,y);
          checkWinner("X");
      }
      else {
        return ;
      }

  }
  else{

      if(event.target.innerText == ""){
        event.target.innerText = "O"
        x = event.target.parentElement.classList.value;
        y = event.target.id;
        console.log(x);
        console.log(y);
        buildBoard(x,y);
        checkWinner("O");
      }
      else {
        return;
      }

    }
   count++;
console.log(count);
   if(count == 9){
     alert("Draw");
   }
}

function AI(){

    if(event.target.innerText == ""){
          event.target.innerText = "X"
          x = event.target.parentElement.classList.value;
          y = event.target.id;
          console.log(x);
          console.log(y);
          buildBoard(x,y);
          checkWinner("X");
      }
count++;
  if(count == 9){
    alert("Game is over");
    return;
  }

  if(count < 9 && checkWinner('X') == false && checkWinner('O') == false){
do{
  var rand = Math.floor(Math.random() * 9);

  if(document.getElementsByClassName('square')[rand].innerText == ''){
     document.getElementsByClassName('square')[rand].innerText = 'O';
    x = square[rand].parentElement.classList.value;
    y = square[rand].id;
    console.log(x);
    console.log(y);
    buildBoard(x,y);
    checkWinner('O');
    emptySpot = true;
}
}while(emptySpot == false);
emptySpot = false;
}
count++;
console.log(count);
}

function friendSwitch(){
  for(let i=0; i<9; i++)  {
    square[i].addEventListener("click", addXO);
  }
}
function AISwitch(){
  for(let i=0; i<9; i++)  {
    square[i].addEventListener("click", AI);
  }
}
document.getElementById("playFriend").addEventListener("click", friendSwitch);
document.getElementById("playAI").addEventListener("click", AISwitch);
//document.getElementById("2").addEventListener("click", addXO);
function checkWinner(p){
  var status = false;
  var counter;
  for(let i = 0; i < 3; i++){
      counter =0;
      for(let j = 0; j < 3; j++)     // checking if player won (vertically)
      {
          if(board[i][j]== p)
              counter++;
      }
      if(counter == 3){
          alert(p+" has won!");
          status = true;
          for(let i=0; i<9; i++)  {
            square[i].removeEventListener("click", addXO);
            square[i].removeEventListener("click", AI);
          }

        }
      counter =0;
      for(let j = 0; j < 3; j++)      // checking if player won (horizontally)
      {
          if(board[j][i]==p){
              counter++;
            }
      }
      if(counter == 3){
          alert(p+" has won!");
          status = true;
          for(let i=0; i<9; i++)  {
            square[i].removeEventListener("click", addXO);
            square[i].removeEventListener("click", AI);
          }
        }
  }


  counter = 0;

  for(let i = 0; i < 3; i++)         // checking if player won (diagnaly)
  {
      if(board[i][i]==p)
          counter++;
  }
  if(counter == 3){
      alert(p+" has won!");
      status = true;
      for(let i=0; i<9; i++)  {
        square[i].removeEventListener("click", addXO);
        square[i].removeEventListener("click", AI);
      }
    }
  counter = 0;
  for(let i = 0; i < 3; i++)     //checking if player won (diagnaly)
  {
      if(board[i][3-i-1]==p)
          counter++;
  }
  if(counter == 3){
      alert(p+" has won!");
      status = true;
      for(let i=0; i<9; i++)  {
        square[i].removeEventListener("click", addXO);
        square[i].removeEventListener("click", AI);
      }
}
      return status;
}

function reset(){
  count = 0;
  for(var i=0; i<3; i++){
    for(var j=0; j<3; j++){
      board[i][j]="";
    }
  }

  for(let i=0; i<9; i++)  {
    document.getElementsByClassName('square')[i].innerText = ''
  }


}
document.getElementById("reset").addEventListener("click", reset);
