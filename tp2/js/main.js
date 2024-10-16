window.onload = function () {

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height


const tableroOcupado= [
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
];

let isMouseDown = false;
let lastClickedFicha = null;
let fichas = []
const cant_fichas = 42;


const tablero = new Tablero(80,6,7);

tablero.dibujarTablero(context, canvasWidth, canvasHeight);


let gameStarted = false;
let gameTimer=null;
let startButton = document.getElementById('startButton');
startButton.addEventListener('click', iniciarJuego);
let turnoDisplay = document.getElementById('turnoDisplay');


//inicia juego cuando toco boton de iniciar juego
function iniciarJuego() {
    gameStarted = true;
    startGameTimer(180); // 180 segundos = 3 minutos
    document.querySelector('.buttonContainer').style.display = 'none';//oculto el boton de iniciar juego
    document.getElementById('endButton').style.display = 'block';//muestro el boton de finalizar
    turnoDisplay.style.display='block'//muestro de quien es el turno

}

document.getElementById('endButton').addEventListener('click', function() { //al hacer click en el boton de finalizar, llamo a funcion end
    endGame();
});

//empieza a correr el tiempo
function startGameTimer(seconds) {
    let timerDisplay = document.getElementById('timer'); // Selecciona el elemento timerDisplay
    timerDisplay.style.display = 'block'; // Muestra el contador de tiempo
    
    let startButton = document.getElementById('startButton');
    let endButton = document.getElementById('endButton');
    
    timerDisplay.textContent = formatTime(seconds);
    
    gameTimer = setInterval(function() {
        seconds--;
        timerDisplay.textContent = formatTime(seconds);
        
        if (seconds <= 0) {
            endGame(); // Se acabó el tiempo
        }
    }, 1000);
    
    startButton.style.display = 'none';//oculto boton start
    endButton.style.display = 'block';//muestro boton finalizar
    endButton.style.marginLeft = "400px";
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

//finaliza el juego tocando el boton de finalizar o cuando se acaba el tiempo
function endGame() {

    gameStarted = false;
    clearInterval(gameTimer);//vuelvo tiempo a 0:00
    gameTimer = null;
    mostrarGanador();
    
    let endButton = document.getElementById('endButton');
    endButton.style.display = 'none';
    turnoDisplay.style.display='none'
    reiniciarJuego();

}

//muestra el boton para comenzar juego
function mostrarBotonInicio(){
    const buttonContainer = document.querySelector('.buttonContainer');
    buttonContainer.style.display = 'block';
    startButton.style.display = 'block';
}


//agrega ficha al arreglo
function addFicha() {
    if(fichas.length < cant_fichas/2){
        addFichaApple();
    }else{
        addFichaAndroid();
    }
        drawFichas();
    
}


function findClickedFicha(x, y) {
    for (let i = fichas.length - 1; i >= 0; i--) {
      const element = fichas[i];
      if (element.isPointInside(x, y)) {
        if (element instanceof fichaApple) {
          console.log('Es una ficha Apple');
          // Realiza acciones específicas para fichaApple
        } 
    else if (element instanceof fichaAndroid) {
          console.log('Es una ficha Android');
          // Realiza acciones específicas para fichaAndroid
        }
        return element;
      }
    }
    return null;
  }
  
//dibuja fichas en el tablero
function drawFichas() {
    clearCanvas();
    tablero.dibujarTablero(context,canvasWidth,canvasHeight);
    for (let i = 0; i < fichas.length; i++) {
        fichas[i].draw(context);
    }
}


let posYApple = 100;
function addFichaApple() {
    let posX = 100;
    let color = 'red';
    let name = "apple";
    let apple = new fichaApple(posX, posYApple, 30, color, context,name);
    fichas.push(apple);
    posYApple+=20;
}
let posYAndroid=100;
function addFichaAndroid() {
    let posX = 800;
    let color = 'green';
    let name = "android";
    let android = new fichaAndroid(posX, posYAndroid, 30, color, context,name);
    fichas.push(android);
    posYAndroid+=20;
}


let jugadorApple = new Jugador(fichaApple);
let jugadorAndroid = new Jugador(fichaAndroid);
jugadorApple.setJugadorActual();//el juego comienza con apple como actual

//cuando apple se pone false, le cede el turno a android
function cambiarTurno(){
    var turnoDisplay = document.getElementById('turnoDisplay');
    var turnoTextoElement = document.getElementById('turnoTexto');
   
    if(jugadorApple.esTurno()){
        turnoTextoElement.textContent = 'android';
        jugadorApple.desactivarJugador();
        jugadorAndroid.setJugadorActual();
    } else{
        turnoTextoElement.textContent = 'apple';
        jugadorAndroid.desactivarJugador();
        jugadorApple.setJugadorActual();
    }
    turnoDisplay.style.display = 'block';
}


// presiono en la ficha
let posInicialX;
let posInicialY;
function onMouseDown(e){
        isMouseDown = true;
    if(gameStarted===true){

    if(lastClickedFicha != null){
        lastClickedFicha.setResaltado(false);
        lastClickedFicha = null;
    }
    //captura pos en x e y donde hago click
    posInicialX = e.offsetX;
    posInicialY= e.offsetY;

    let clickFig = findClickedFicha(posInicialX, posInicialY);
    if(jugadorApple.esTurno() ){
        if(clickFig != null && clickFig instanceof fichaApple && clickFig.getDisponible()){
            clickFig.setResaltado(true);
            lastClickedFicha = clickFig;
        }
    }    
    if(jugadorAndroid.esTurno()){
        if(clickFig != null && clickFig instanceof fichaAndroid&& clickFig.getDisponible()){
            clickFig.setResaltado(true);
            lastClickedFicha = clickFig;
        }
    }
    drawFichas();
    }

}

//muevo la ficha
function onMouseMove(e){
        if(isMouseDown && lastClickedFicha!=null){
        const x = e.offsetX;
        const y = e.offsetY;
        lastClickedFicha.setPosition(x,y);
        drawFichas();
        }
    
}

//desclickeo la ficha
function onMouseUp(e){
    isMouseDown = false;
    const x = e.offsetX;
    const y = e.offsetY;

    if(lastClickedFicha !== null){
    //si suelta la ficha en una zona permitida
    if((x<810 && x>170) && (y>60 && y< 140) ){
        //calcula en que columna la solto
        const columna = tablero.calculateColumn(x);
        if(columna>-1 && columna<7){
            //si la columna coincide con el tablero, la coloca en la ultima posicion disponible en la columna
            let fila = coincideColumna(columna, lastClickedFicha);
            colocarFicha(fila,columna,posInicialX,posInicialY);
            //por cada ficha, chequea si hay ganador
            const resultado = verificarCuatroEnLinea(tableroOcupado, fila, columna);
            drawFichas();
            lastClickedFicha.setDisponible();
            //si lo encontro, lo muestra
            if(resultado === true){
              mostrarGanador(lastClickedFicha);
            }
            else
            //si no lo encontro, es turno del siguiente jugador
              cambiarTurno();

        }
        //si lo suelta fuera de las columnas, la vuelve a su posicion original
        else{
            lastClickedFicha.setPosition(posInicialX,posInicialY);
            drawFichas();
        }

      } 
      //si lo suelta en una posicion no permitida, vuelve a la pila
      else{
        lastClickedFicha.setPosition(posInicialX,posInicialY)
        drawFichas();
      }
         lastClickedFicha.setResaltado(false); 
    }

}
 // chequeo de 4 en linea
  function verificarCuatroEnLinea(tableroOcupado, fila, columna) {
  const filas = tableroOcupado.length;
  const columnas = tableroOcupado[0].length;
  if (fila < 0 || fila >= filas || columna < 0 || columna >= columnas) {
      return false;
    }
  const elemento = tableroOcupado[fila][columna];

  // Verificar hacia la derecha
  if (columna <= columnas - 4) {
    let contador = 0;
    let aux = columna;
    while(aux< columna+4) {
      let p1 = tableroOcupado[fila][aux];
      if(p1 !== null){
        if (p1 && elemento) {
            if(p1.getName() === elemento.getName())
                contador++;
            }
          }
      aux++;
    }
    if (contador === 4) {
      return true;
      
    }
  }

  // Verificar hacia la izquierda
  if (columna >= 3) {
    let contador = 0;
    let aux = columna;
    while (aux > columna - 4) {
      let p1 = tableroOcupado[fila][aux];
      if (p1 && elemento) {
          if(p1.getName() === elemento.getName())
              contador++;
          }
      aux--;
    }
    if (contador === 4) {
      return true;
    }
  }

  // Verificar hacia abajo
  if (fila <= 3) {
    let contador = 0;
    let aux = fila;
    while(aux < fila + 4 && aux<filas) {
      let p1 = tableroOcupado[aux][columna];
      if(p1 != null){
        if (p1 && elemento) {
            if(p1.getName() === elemento.getName())
                contador++;
            }
        }
      aux++;
    }
    if (contador === 4) {
      return true;
    }
  }

  // Verificar en diagonal hacia la derecha y abajo
  if (fila <= filas - 4 && columna <= columnas - 4) {
    let contador = 0;
    for (let i = 0; i < 4; i++) {
      let p1 = tableroOcupado[fila + i][columna + i];
      if(p1 != null){
          if(p1.getName() === elemento.getName()){
              contador++;
              }
            }
    }
    if (contador === 4) {
      return true;
    }
  }

  // Verificar en diagonal hacia la derecha y arriba
  if (fila >= 3 && columna <= columnas - 4) {
    let contador = 0;
    for (let i = 0; i < 4; i++) {
      let p1 = tableroOcupado[fila - i][columna + i];
      if(p1 != null){
          if(p1.getName() === elemento.getName()){
              contador++;
              }
            }
    }
    if (contador === 4) {
      return true;
    }
  }

  // Verificar en diagonal hacia la izquierda y abajo
  if (fila <= filas - 4 && columna >= 3) {
    let contador = 0;
    for (let i = 0; i < 4; i++) {
      let p1 = tableroOcupado[fila + i][columna - i];
      if(p1 != null){
          if(p1.getName() === elemento.getName()){
              contador++;
              }
            }
    }
    if (contador === 4) {
      return true;
    }
  }

  // Verificar en diagonal hacia la izquierda y arriba
  if (fila >= 3 && columna >= 3) {
    let contador = 0;
    for (let i = 0; i < 4; i++) {
      let p1 = tableroOcupado[fila - i][columna - i];
      if(p1 != null){
          if(p1.getName() === elemento.getName()){
              contador++;
              }
            }
    }
    if (contador === 4) {
      return true;
    }
  } 

  return false; // No se encontraron cuatro en línea 
}
      
          
//coloca la ficha en la ultima posicion disponible de la columna


function colocarFicha(fila,columna,posInicialX,posInicialY){
    if(fila === -1){
        lastClickedFicha.setPosition(posInicialX,posInicialY);

    }
    else{
        let x;
        if(columna===0){
            x=210;
        }
        if(columna===1){
            x=290;
        }
        if(columna===2){
            x=370;
        }
        if(columna===3){
            x=450;
        }
        if(columna===4){
            x=530;
        }
        if(columna===5){
            x=610;
        }
        if(columna===6){
            x=690;
        }

        let i = (fila*100);
        switch(fila){
            case 0:
                lastClickedFicha.setPosition(x,i+100);
                break;

            case 1:
                lastClickedFicha.setPosition(x,i+80);
                break;

            case 2:
                lastClickedFicha.setPosition(x,i+60);
                break;

            case 3:
                lastClickedFicha.setPosition(x,i+40);
                break;

            case 4:
                lastClickedFicha.setPosition(x,i+20);
                break;

            case 5:
                lastClickedFicha.setPosition(x,i);
                break;
        }
    }
    
}


//retorna la fila y la agrega en el tablero 
function coincideColumna(columna, lastClickedFicha){
    let filas = tableroOcupado.length;
    let i = 0;
    while (i < filas) {
        if(i === filas - 1 && tableroOcupado[i][columna] === null) {//comprueba que si la ultima posicion es 0, se coloca ahi
            tableroOcupado[i][columna] = lastClickedFicha; // Colocar en la última posición si es 0
            return i;
        }
        else if(i=== 0 && tableroOcupado[i][columna]!==null){// si la primera posicion esta ocupada, retorna negativo
            return null;
        }
        else if (tableroOcupado[i][columna] === null) {
            i++;
        }
        
        else {
            tableroOcupado[i-1][columna] = lastClickedFicha;
            return i-1;
        }
    }
    return null;
}

//muestra quien gano, si paso o el tiempo o se completo el tablero muestra empate
function mostrarGanador(lastClickedFicha){
  if(lastClickedFicha instanceof fichaAndroid){
    let text = "El ganador es Android";
    context.font="50px Arial";
    context.strokeStyle = "black"; // Color del borde
    context.lineWidth = 2; // Ancho del borde
    var x = 300;
    var y = 300;
    context.fillText(text, x, y);
  } else if(gameStarted === false){
    let text = "empate, se acabo el tiempo"
    context.font="50px Arial";
    context.fillStyle="red"
    context.strokeStyle = "black"; // Color del borde
    context.lineWidth = 2; // Ancho del borde

    var x = 300;
    var y = 300;
    context.fillText(text, x, y);
  }
  else {
    let text = "El ganador es Apple";
    context.font="50px Arial";
    context.fillStyle="red"
    context.strokeStyle = "black"; // Color del borde
    context.lineWidth = 2; // Ancho del borde

    var x = 300;
    var y = 300;
    context.fillText(text, x, y);
  }
  setTimeout(reiniciarJuego, 2000);

}

//reinicia el juego a su original
function reiniciarJuego() {
    //vuelve tiempo a 0:00
  clearInterval(gameTimer);
  gameTimer = null;
  //muestra el boton de iniciar juego
  mostrarBotonInicio();
  // Restablece el arreglo tableroOcupado a su estado inicial
  for (let fila = 0; fila < tableroOcupado.length; fila++) {
      for (let columna = 0; columna < tableroOcupado[fila].length; columna++) {
          tableroOcupado[fila][columna] = null;
      }
  }

  // Elimina todas las fichas del arreglo fichas
  fichas = [];

  // Vuelve a dibujar el tablero y agregar fichas iniciales
  tablero.dibujarTablero(context, canvasWidth, canvasHeight);
  posYAndroid= 100;
  posYApple = 100;
  addFichas();
}

// Evento temporal para agregar figuras
function addFichas() {
    addFicha();
    if (fichas.length < cant_fichas) {
        setTimeout(addFichas, 0);
    }
}

setTimeout(() => {
    addFichas();
}, 0)
// Fin Evento temporal para agregar figuras



function clearCanvas() {
    context.fillStyle = '#1D2429';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}
canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);


}