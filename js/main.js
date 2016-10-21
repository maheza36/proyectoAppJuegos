/* jslint esversion:6 */
$(document).ready(function(){
  $(document.querySelectorAll("[data-toggle='tooltip']")).tooltip();
});
var status_game1;
var status_game2;
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
  //inicio de validación de casillas jugadas
  //check rows
  game.board.forEach(function(row){
    if(row[0].textContent === row[1].textContent &&
      row[1].textContent === row[2].textContent &&
      row[0].textContent && row[0].textContent !== ''){
        game.winner = row[0].textContent;
      }
    });
    //check columns
    var i=0;
    for(i=0;i<game.board.length;i++){
      if(game.board[0][i].textContent === game.board[1][i].textContent &&
        game.board[1][i].textContent === game.board[2][i].textContent  &&
        game.board[0][i].textContent !==''
      ){
        game.winner = game.board[0][i].textContent;
      }
    }
    //check diagonas 1
    if(game.board[0][0].textContent === game.board[1][1].textContent &&
      game.board[1][1].textContent === game.board[2][2].textContent  &&
      game.board[0][0].textContent !==''
    ){
      game.winner = game.board[0][0].textContent;
    }
    //2 diagonal
    if(game.board[0][2].textContent === game.board[1][1].textContent &&
      game.board[1][1].textContent === game.board[2][0].textContent  &&
      game.board[0][2].textContent !==''
    ){
      game.winner = game.board[0][2].textContent;
    }
    //imprime el ganador
    if(game.winner !==null){
      console.log("ganador");
      console.log(game.winner);
      if(game.winner === "X"){
        status_game1[0].textContent = parseInt(status_game1[0].textContent) + 1;
        status_game1[1].textContent = parseInt(status_game1[1].textContent) + 1;
      }else {
        status_game2[0].textContent = parseInt(status_game2[0].textContent) + 1;
        status_game2[1].textContent = parseInt(status_game2[1].textContent) + 1;
      }
      alert("gano " + game.winner);
    }
    //final de validación de casillas jugadas
  };
  //resetear tablero
  game.clearBoard = function(){
    if(game.board.dom_ready === false){
      return;
    }else {
      game.board.forEach(function(row){
        row.forEach(function(cell){
          cell.textContent="";
          cell.style.background ="#fff";
          game.winner = null;
          console.log(game.winner);
        });
      });
    }
  };
  document.addEventListener("DOMContentLoaded",function(){
    //cargar los puntajes
    status_game1 = document.querySelectorAll("#player1 p");
    status_game2 = document.querySelectorAll("#player2 p");
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
          if(cell.textContent !== "" || game.winner !== null){ //valida que esa posición no se halla jugado
            return;
          }
          //valida el jugador que tiene el turno
          if(game.turn === gamer1){
            cell.textContent=game.turn; //agrega el contenido del jugador
            cell.style.background = "#0099ff";//cambia el color según jugador
          }
          else {
            cell.textContent=game.turn; //agrega el contenido del jugador
            cell.style.background = "#ff9900";//cambia el color según jugador
          }
          //valida si hay ganador
          game.checkWinner();
          //resetear el tablero
          if(game.winner !== null){
            game.clearBoard();
          }
          //invoca el siguiente turno
          if(game.nextTurn() === gamer1){
            player_info[0].textContent="Juega gamer1"; //cambia el jugador correspondiente
          }else {
            player_info[0].textContent="Juega gamer2"; //cambia el jugador correspondiente
          }
        });
      });
    });
  });
