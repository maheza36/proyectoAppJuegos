/* jslint esversion:6 */
$(document).ready(function(){
  $(document.querySelectorAll("[data-toggle='tooltip']")).tooltip();
});

const gamer1 = "X";
const gamer2 = "O";
var game={};//new Object();
game.turn = gamer1; //takes values beetwen 0 and 1, if 0 turn of x, if 1 turn of O
game.over = false; //edita quien gana y pierde
game.winner = null;
game.board = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];
game.board.dom_ready = false;
game.nextTurn = function(){
  if(game.turn === gamer1){
    game.turn = gamer2;
  }
  else {
    game.turn = gamer1;
  }
  return game.turn;
};
game.board.dom_ready = false;
game.checkWinner = function(){
  if(game.board.dom_ready !== true){
    return null;
  }
};

document.addEventListener("DOMContentLoaded",function(){
  //cargar los botones para jugar X - O
  var row0  = document.querySelectorAll("#game-panel button[data-y='0']");
  var row1  = document.querySelectorAll("#game-panel button[data-y='1']");
  var row2  = document.querySelectorAll("#game-panel button[data-y='2']");
  var player_info = document.querySelectorAll("#status-game .status");//cargar el <p> de quien juega
  player_info=Array.from(player_info);//agregar quien juega
  //agregar array del tablero
  game.board[0] = Array.from(row0);
  game.board[1] = Array.from(row1);
  game.board[2] = Array.from(row2);

  game.board.dom_ready = true;//cargar el tablero y retornar true

  //recorrer el tablero
  game.board.forEach(function(row,index,board){
    row.forEach(function(cell,index,row){ //recorrer las filas
      cell.addEventListener("click",function(){
        if(cell.textContent !== ""){ //valida que esa posición no se halla jugado
          return;
        }
        //cell.textContent=game.turn; //agrega el contenido del jugador
        //cell.style.background = "#0099ff";
        if(game.turn === gamer1){
          cell.textContent=game.turn; //agrega el contenido del jugador
          cell.style.background = "#0099ff";
        }
        else {
          cell.textContent=game.turn; //agrega el contenido del jugador
          cell.style.background = "#ff9900";
        }

        if(game.nextTurn() === gamer1){
          player_info[0].textContent="Juega gamer1";
        }else {
          player_info[0].textContent="Juega gamer2";
        }
      });
    });
  });
});
