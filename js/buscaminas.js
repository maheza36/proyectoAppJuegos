var filas = 0;
var columnas = 0;
var minas = 0;
var grilla = null;
var nivel = function (nivel) {
  grilla = document.querySelector("#game");
  contador=0;
  if (nivel === "principiante") {
    filas = 8;
    columnas = 8;
    minas = 10;
    grilla.style.maxWidth = "376px";
  } else {
    if (nivel === "medio") {
      filas = 16;
      columnas = 16;
      minas = 40;
      grilla.style.maxWidth = "712px";
    } else {
      filas = 16;
      columnas = 30;
      minas = 99;
      grilla.style.maxWidth = "1300px";
    }
  }
  juego.cargar();
};


var juego = {};
juego.cargar = function () {
  var i = 0;
  var j = 0;
  grilla.style.display = "inline-block";
  grilla.style.marginTop = "20px";
  grilla.innerHTML = '';
  for (i = 0; i < filas; i++) {
    for (j = 0; j < columnas; j++) {
      var casilla = document.createElement("button");
      casilla.setAttribute("type", "button");
      casilla.setAttribute("class", "btn btn-default");
      casilla.setAttribute("id", "casillaF" + i + "C" + j);
      casilla.addEventListener("click", presionarBoton);
      casilla.visitado = false;
      grilla.appendChild(casilla);
    }
  }
  juego.ponerMinas();
};

var contador=0;

function llamadaRecursiva(x,y){
  if (x >= 0 && x <= filas - 1 && y >= 0 && y <= columnas - 1) {
    accionarCasilla(document.querySelector("#casillaF"+x+"C"+y));
  }
}
var contador;
function accionarCasilla(boton) {
  if (!boton.visitado){
    boton.setAttribute("disabled","true");
    boton.style.background="rgba(209, 217, 234, 0.4)";
    boton.visitado = true;
    contador++;
    if(contador===filas*columnas-minas){
      $('#gano').modal({backdrop: 'static', keyboard: false});
    }else{
      if (boton.querySelector("span") === null){
        var temp = boton.id.substring(8, boton.id.lenght).split("C");
        llamadaRecursiva(Number(temp[0]-1),Number(temp[1]-1));
        llamadaRecursiva(Number(temp[0]-1),Number(temp[1]));
        llamadaRecursiva(Number(temp[0]-1),Number(temp[1])-1+2);
        llamadaRecursiva(Number(temp[0]),Number(temp[1]-1));
        llamadaRecursiva(Number(temp[0]),Number(temp[1])-1+2);
        llamadaRecursiva(Number(temp[0]-1+2),Number(temp[1]-1));
        llamadaRecursiva(Number(temp[0]-1+2),Number(temp[1]));
        llamadaRecursiva(Number(temp[0]-1+2),Number(temp[1]-1+2));
      } else {
        contenido=boton.querySelector("span");
        if (boton.querySelector(".glyphicon") !== null) {
          boton.style.background="rgb(215, 0, 0)";
          contenido.style.display="inline";     
          var todo=grilla.querySelectorAll("button");
          for (var i = 0; i < todo.length; i++) {
            todo[i].setAttribute("disabled","true");
            if(todo[i].querySelector(".glyphicon") !== null){
              todo[i].querySelector("span").style.display="inline";
            }
          }
          $('#perdio').modal({backdrop: 'static', keyboard: false});
        } else {
          console.log("TIENE EL NÚMERO " + boton.querySelector("span").textContent);
          console.log(boton.id.substring(8, boton.id.lenght));
          contenido.style.display="inline";
        }
    }
  }
  }
}

function presionarBoton(button) {
  var boton = button.currentTarget;
  accionarCasilla(boton);
}

function marcar(x, y) {
  var casilla;
  if (x >= 0 && x <= filas - 1 && y >= 0 && y <= columnas - 1) {
    casilla = document.querySelector("#casillaF" + x + "C" + y);
    var contenido;
    if (casilla.querySelector("span")) {
      contenido = casilla.querySelector("span");
    } else {
      contenido = document.createElement("span");
      casilla.appendChild(contenido);
    }
    if (casilla.querySelector(".glyphicon") === null) {
      contenido.textContent = Number(contenido.textContent) + 1;
    }
    contenido.style.display="none";
  }
}


var arrMinas=[];
juego.ponerMinas = function () {
  var i = 0;
  var casilla;
  var col;
  var fil;
  for (i = 0; i < minas; i++) {
    var contenido;
    do {
      col = (Math.floor(Math.random() * (columnas)));
      fil = (Math.floor(Math.random() * (filas)));
      casilla = document.querySelector("#casillaF" + fil + "C" + col);
    } while (casilla.querySelector(".glyphicon") !== null);
    arrMinas.push(casilla);
    if (casilla.querySelector("span")) {
      contenido = casilla.querySelector("span");
      contenido.textContent = null;
    } else {
      contenido = document.createElement("span");
      casilla.appendChild(contenido);
    }
    contenido.setAttribute("class", "glyphicon glyphicon-certificate");
    marcar(fil - 1, col - 1);
    marcar(fil - 1, col);
    marcar(fil - 1, col + 1);
    marcar(fil, col - 1);
    marcar(fil, col + 1);
    marcar(fil + 1, col - 1);
    marcar(fil + 1, col);
    marcar(fil + 1, col + 1);
    contenido.style.display="none";
  }
};
document.addEventListener("DOMContentLoaded", function () {

});
