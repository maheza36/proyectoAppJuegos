var filas=0;
var columnas=0;
var minas=0;

var nivel=function(nivel){

  if(nivel==="principiante"){
    filas=8;
    columnas=8;
    minas=10;
  }else{
    if(nivel==="medio"){
      filas=16;
      columnas=16;
      minas=40;
    }else{
      filas=16;
      columnas=30;
      minas=99;
    }
  }
  juego.cargar();
};


var juego={};
juego.board=[];
juego.cargar=function(){
  var i=0;
  var j=0;
  var grilla = document.querySelector("#game");
  grilla.innerHTML='';
  juego.board=[];
  for(i=0;i<filas;i++){
    juego.board.push([]);
    for(j=0;j<columnas;j++){
      var casilla = document.createElement("button");
      casilla.setAttribute("type","button");
      casilla.setAttribute("class","btn btn-default");
      casilla.setAttribute("id","casilla"+i+j);
      juego.board[i].push(casilla);
      grilla.appendChild(casilla);
    }
  }
  juego.minas();
  console.log(juego.board);
};
/*
juego.cargar=function(){
  var i=0;
  for(i=0;i<minas;i++){

  }
};*/
document.addEventListener("DOMContentLoaded",function(){

});
