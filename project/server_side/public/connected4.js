
var square = document.getElementsByClassName("square");

var board;
var count = 0;
var x, y;

function buildArray(){
    board = new Array (6);
  for(var i=0; i<6;i++){
    board [i] = new Array(7)
  }
  for(var i=0; i<6; i++){
    for(var j=0; j<7; j++){
      board[i][j]= i+"-"+j;
    }
  }
}
buildArray();

function buildBoard(x,y){


  console.log(x);
  console.log(y);
    if (count%2 == 0){
    board[x][y] = "blue"
  }
  else {
    board[x][y] = "red"
  }
  //console.log(board);
    for(var i=0; i<6; i++){
      for(var j=0; j<7; j++){
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
          //buildBoard(x.id, children[i].id);
          buildBoard(children[i].id, x.id);

          children[i].classList.add("blue");
          count++;
          checkWinner('blue');
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
          buildBoard(children[i].id, x.id);
          children[i].classList.add("red");

          count++;
          checkWinner('red');
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
     square[i].removeEventListener("click", addXO);
   }
}

function AI(){

    //y = event.target.parentElement.classList;
    x = event.target.parentElement;//.id;

    children = x.childNodes;


    for(let i=11; i>0; i=i-2){
      if(children[1].classList.value == "square"){
        if(children[i].classList.value == "square"){

          console.log('x= '+ x.id);
          console.log('y= '+ children[i].id);
          //buildBoard(x.id, children[i].id);
          buildBoard(children[i].id, x.id);

          children[i].classList.add("blue");
          count++;
          checkWinner('blue');
          break;
        }

      }
      else {
        return ;
      }
    }

/*AI turn*/

    if(count < 42 && checkWinner('X') == false && checkWinner('O') == false){
  do{
    var rand = Math.floor(Math.random() * 7);

    x = document.getElementsByClassName('col')[rand];//.id;

    children = x.childNodes;




    for(let i=11; i>0; i=i-2){
      if(children[1].classList.value == "square"){
        emptySpot = true;
        if(children[i].classList.value == "square"){

          console.log('AI x= '+ x.id);
          console.log('AI y= '+ children[i].id);
          //buildBoard(x.id, children[i].id);
          buildBoard(children[i].id, x.id);

          children[i].classList.add("red");
          count++;
          checkWinner('red');
          break;
        }

      }

    }

  }while(emptySpot == false);
  emptySpot = false;

}



  if(count == 42){
    alert("Draw");
    square[i].removeEventListener("click", AI);
  }

}






/*var Game = require('connect-four');
var myGame = new Game();

game.play();*/

function checkWinner(p){
  var status = false;
  var win=0;

var r,c,i,j,z=0;



    /*check winner vertically*/
    for(let j=0; j<7; j++) {
       win = 0;
       if(status != true){
       for(let i=0; i<6; i++)  {
        //  console.log('i: '+ i);
        //  console.log('j: '+ j);
         if(board[i][j] == p)
            win++;
         else win = 0;

 		  if(win == 4)   {
        alert(p+" has won vertically!");
                status = true;
                for(let i=0; i<42; i++)  {
                  square[i].removeEventListener("click", addXO);
                  square[i].removeEventListener("click", AI);
                }
                addWinnerPoints(p);
                return status;

         }
     }
   }
 }
      /*check winner horizontally*/
      for(let j=0; j<6; j++) {
         win = 0;
        if(status != true){
         for(let i=0; i<7; i++)  {
          //  console.log('i: '+ i);
          //  console.log('j: '+ j);
           if(board[j][i] == p)
              win++;
           else win = 0;

   		  if(win == 4)   {
          alert(p+" has won horizontally!");
                  status = true;
                  for(let i=0; i<42; i++)  {
                    square[i].removeEventListener("click", addXO);
                    square[i].removeEventListener("click", AI);
                  }
                  addWinnerPoints(p);
                  return status;
           }
       }
     }
   }



      /*Check winner diagnaly*/
        win=0;
        for(r=0, c=3; r <= 2, c>=0; )  {
          i=r; j=c; win=0;
          ++z;
          while(i<=5 && j>=0){

            if(board[i][j]==p) win++;
            else win = 0;

            if(win == 4)   {
              alert(p+" has won! diagnoly1");
              status = true;
              for(let i=0; i<42; i++)  {
                square[i].removeEventListener("click", addXO);
                square[i].removeEventListener("click", AI);

              }
              addWinnerPoints(p);
              return status;
            }
            i++; j--;

          }

          if(z==5 || z==6) ++r;
          if(z<=3) ++c;
          if(z==7||x==1) break;

        }


/*Check diagnolly 2*/

        r=0;
        c=0,i=0,j=0,z=0;
        for(r=0, c=3; r <= 2, c>=0; )  {
           i=r; j=c; win=0;
           ++z;
           while(i<=5 && j<=6){
            //  console.log('i: '+ i);
            //  console.log('j: '+ j);
              if(board[i][j] == p)
                win++;
             else win = 0;

     		  if(win == 4)   {
            alert(p+" has won! diagnoly2");
            status = true;
            for(let i=0; i<42; i++)  {
              square[i].removeEventListener("click", addXO);
              square[i].removeEventListener("click", AI);
            }
            addWinnerPoints(p);
            return status;
             }
              i++; j++;

           }

           if(z==5 || z==6) ++r;
           if(j=6 && c!=0) --c;
           if(z==7) break;

        }

      return status;


}



function addWinnerPoints(p){
    if(p=='blue'){
      var xhr = new XMLHttpRequest();
      xhr.open("Post", "/score");
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send("score=20");
    }
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

function reset(){
  count = 0;
  for(var i=0; i<6; i++){
    for(var j=0; j<7; j++){
      board[i][j]="";
    }
  }

  for(let i=0; i<42; i++)  {
    document.getElementsByClassName('square')[i].classList.remove('blue');
    document.getElementsByClassName('square')[i].classList.remove('red');
    square[i].removeEventListener("click", addXO);
    square[i].removeEventListener("click", AI);
  }


}
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("playFriend").addEventListener("click", friendSwitch);
document.getElementById("playAI").addEventListener("click", AISwitch);
