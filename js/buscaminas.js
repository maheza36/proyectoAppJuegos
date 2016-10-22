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
  console.log(grilla);
  grilla.style.maxWidth=columnas*47+"px";
  grilla.style.display="inline-block";
  grilla.style.marginTop="20px";
  grilla.innerHTML='';
  juego.board=[];
  for(i=0;i<filas;i++){
    juego.board.push([]);
    for(j=0;j<columnas;j++){
      var casilla = document.createElement("button");
      casilla.setAttribute("type","button");
      casilla.setAttribute("class","btn btn-default");
      casilla.setAttribute("id","casillaF"+i+"C"+j);
      juego.board[i].push(casilla);
      grilla.appendChild(casilla);
    }
  }
  juego.PonerMinas();
};

function marcar(x,y){
  var casilla;
  if (x>=0 && x<=columnas-1 && y>=0 && y<=filas-1){
    casilla=document.querySelector("#casillaF"+x+"C"+y);
    if (casilla.querySelector(".glyphicon")===null){
      casilla.textContent=Number(casilla.textContent)+1;
    }
  }
}

juego.PonerMinas=function(){
  var i=0;
  var casilla;
  var col;
  var fil;
  for(i=0;i<minas;i++){
    var contenido=document.createElement("span");
    do{
      col=(Math.floor(Math.random() * (columnas)));
      fil=(Math.floor(Math.random() * (filas)));
      casilla=document.querySelector("#casillaF"+fil+"C"+col);
    }while(casilla.hasChildNodes());
    casilla.appendChild(contenido);
    contenido.setAttribute("class","glyphicon glyphicon-certificate");
    marcar(fil-1,col-1);
    marcar(fil-1,col);
    marcar(fil-1,col+1);
    marcar(fil,col-1);
    marcar(fil,col+1);
    marcar(fil+1,col-1);
    marcar(fil+1,col);
    marcar(fil+1,col+1);
    //contenido.style.display="none";
  }

  console.log(juego.board);
};
document.addEventListener("DOMContentLoaded",function(){

});
