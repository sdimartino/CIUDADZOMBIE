/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */

var rangoMovSup= {
  "desdeX": 0, 
  "hastaX": 960, 
  "desdeY": 50, 
  "hastaY": 350
};
var rangoMovInf= {
  "desdeX": 0, 
  "hastaX": 960, 
  "desdeY": 350, 
  "hastaY": 550
};
var rangoMovConductorVertical1 = { 
  "desdeX": 635,
  "hastaX": 635,
  "desdeY": 0,
  "hastaY": 577
};
var rangoMovConductorVertical2 = { 
  "desdeX": 635,
  "hastaX": 635,
  "desdeY": 0,
  "hastaY": 577
};
var rangoMovConductorHorizontal = {
  "desdeX": 0,
  "hastaX": 960,
  "desdeY": 400,
  "hastaY": 400  
};
var Juego = {
  // Aca se configura el tamanio del canvas del juego
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  // Indica si el jugador gano
  ganador: false,

  obstaculosCarretera: [
    /*Aca se van a agregar los obstaculos visibles. Tenemos una valla horizontal
    de ejemplo, pero podras agregar muchos mas. */
    new Obstaculo('imagenes/bache.png', 70, 230, 30, 30, 1, false),
    new Obstaculo('imagenes/valla_horizontal.png', 70, 430, 30, 30, 1, false),
    new Obstaculo('imagenes/valla_horizontal.png', 100, 430, 30, 30, 1, false),
    new Obstaculo('imagenes/valla_horizontal.png', 850, 230, 30, 30, 1, false),
    new Obstaculo('imagenes/valla_vertical.png', 300, 430, 30, 30, 1, false),
    //new Obstaculo('imagenes/valla_vertical.png', 390, 400, 30, 30, 1, false),
    new Obstaculo('imagenes/bache.png', 550, 400, 30, 30, 1, false),
    new Obstaculo('imagenes/auto_verde_derecha.png', 450, 450, 30, 15, 2, false),
    new Obstaculo('imagenes/inmune.png', 500, 450, 20, 20, 2, true),
  ],
  /* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
   Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
   que son invisibles. No tenes que preocuparte por ellos.*/
  bordes: [
    // // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0, false),
    new Obstaculo('', 0, 559, 961, 18, 0, false),
    new Obstaculo('', 0, 5, 18, 572, 0, false),
    new Obstaculo('', 943, 5, 18, 572, 0, false),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 0, false),
    new Obstaculo('', 69, 507, 690, 52, 0, false),
    new Obstaculo('', 587, 147, 173, 360, 0, false),
    new Obstaculo('', 346, 147, 241, 52, 0, false),
    new Obstaculo('', 196, 267, 263, 112, 0, false),
    new Obstaculo('', 196, 23, 83, 244, 0, false),
    new Obstaculo('', 279, 23, 664, 56, 0, false),
    new Obstaculo('', 887, 79, 56, 480, 0, false)
  ],
  // Los enemigos se agregaran en este arreglo.
  enemigos: [
    new ZombieCaminante('imagenes/zombie1.png',961,100,20,20,5,rangoMovSup, 2),
    new ZombieCaminante('imagenes/zombie2.png',960,100,20,20,1,rangoMovSup, 1),
    new ZombieCaminante('imagenes/zombie3.png',958,300,20,20,1,rangoMovSup, 1),
    new ZombieCaminante('imagenes/zombie4.png',957,550,20,20,1,rangoMovSup, 1),
    new ZombieCaminante('imagenes/zombie4.png',490,450,20,20,1,rangoMovInf, 1),
    new ZombieConductor('imagenes/tren_vertical.png', 635, 20, 35, 95, 5, rangoMovConductorVertical1, 0, "vertical"),
    new ZombieConductor('imagenes/tren_vertical.png', 660, 20, 30, 65, 10,rangoMovConductorVertical2, 0, "vertical"),
    new ZombieConductor('imagenes/tren_vertical.png', 680, 20, 35, 95, 5, rangoMovConductorVertical1, 0, "vertical"),
    new ZombieConductor('imagenes/tren_horizontal.png', 20, 315, 75, 35, 15, rangoMovConductorHorizontal, 0, "horizontal")
  ]
}

/* Se cargan los recursos de las imagenes, para tener un facil acceso
a ellos. No hace falta comprender esta parte. Pero si queres agregar tus propies
imagenes tendras que poner su ruta en la lista para que pueda ser precargada como
todas las demas. */
Juego.iniciarRecursos = function() {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png',
    'imagenes/rayo.png',
    'imagenes/inmune.png',
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  /* El bucle principal del juego se llamara continuamente para actualizar
  los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
  ataques, colisiones, etc*/
  this.buclePrincipal();
};

Juego.buclePrincipal = function() {
  // Con update se actualiza la logica del juego, tanto ataques como movimientos
  this.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  this.dibujar();
  // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  this.calcularAtaques();
  this.moverEnemigos();
}
// Captura las teclas y si coincide con alguna de las flechas tiene que
// hacer que el jugador principal se mueva
Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;

  // El movimiento esta determinado por la velocidad del jugador
  if (tecla == 'izq') {
    movX = -velocidad;
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
  }
  if (tecla == 'der') {
    movX = velocidad;
  }
  if (tecla == 'abajo') {
    movY = velocidad;
  }

  // Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento
  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    /* Aca tiene que estar la logica para mover al jugador invocando alguno
    de sus metodos  */
    /* COMPLETAR */
    this.jugador.mover(movX,movY);
  }
};

Juego.dibujar = function() {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();

  /* Aca hay que agregar la logica para poder dibujar al jugador principal
  utilizando al dibujante y los metodos que nos brinda.
  "Dibujante dibuja al jugador" */
  /* Completar */
  Dibujante.dibujarEntidad(this.jugador);

  // Se recorren los obstaculos de la carretera pintandolos
  this.obstaculosCarretera.forEach(function(obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });

  // Se recorren los enemigos pintandolos
  this.enemigos.forEach(function(enemigo) {
    /* Completar */
    Dibujante.dibujarEntidad(enemigo);
  });

  // El dibujante dibuja las vidas del jugador
  var tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i
    Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
  }

  //dibuja llegada
  Dibujante.dibujarRectangulo('white',760,500,10,10);
  Dibujante.dibujarRectangulo('black',770,500,10,10);
  Dibujante.dibujarRectangulo('white',780,500,10,10);
  Dibujante.dibujarRectangulo('black',790,500,10,10);
  Dibujante.dibujarRectangulo('white',800,500,10,10);
  Dibujante.dibujarRectangulo('black',810,500,10,10);
  Dibujante.dibujarRectangulo('white',820,500,10,10);
  Dibujante.dibujarRectangulo('black',830,500,10,10);
  Dibujante.dibujarRectangulo('white',840,500,10,10);
  Dibujante.dibujarRectangulo('black',850,500,10,10);
  Dibujante.dibujarRectangulo('white',860,500,10,10);
  Dibujante.dibujarRectangulo('black',870,500,10,10);
  Dibujante.dibujarRectangulo('white',880,500,10,10);
  
  Dibujante.dibujarRectangulo('black',760,510,10,10);
  Dibujante.dibujarRectangulo('white',770,510,10,10);
  Dibujante.dibujarRectangulo('black',780,510,10,10);
  Dibujante.dibujarRectangulo('white',790,510,10,10);
  Dibujante.dibujarRectangulo('black',800,510,10,10);
  Dibujante.dibujarRectangulo('white',810,510,10,10);
  Dibujante.dibujarRectangulo('black',820,510,10,10);
  Dibujante.dibujarRectangulo('white',830,510,10,10);
  Dibujante.dibujarRectangulo('black',840,510,10,10);
  Dibujante.dibujarRectangulo('white',850,510,10,10);
  Dibujante.dibujarRectangulo('black',860,510,10,10);
  Dibujante.dibujarRectangulo('white',870,510,10,10);
  Dibujante.dibujarRectangulo('black',880,510,10,10);
};



/* Recorre los enemigos haciendo que se muevan. De la misma forma que hicimos
un recorrido por los enemigos para dibujarlos en pantalla ahora habra que hacer
una funcionalidad similar pero para que se muevan.*/
Juego.moverEnemigos = function() {
  /* COMPLETAR */
  this.enemigos.forEach(function(enemigo){
    enemigo.mover();
  });

};

/* Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.
Para chequear las colisiones estudiar el metodo posicionValida. Alli
se ven las colisiones con los obstaculos. En este caso sera con los zombies. */
Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
      /* Si el enemigo colisiona debe empezar su ataque
      COMPLETAR */
      enemigo.comenzarAtaque(this.jugador);
    } else {
      /* Sino, debe dejar de atacar
      COMPLETAR */
      enemigo.dejarDeAtacar();
    }
  }, this);
};



/* Aca se chequea si el jugador se peude mover a la posicion destino.
 Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {

      /*COMPLETAR, obstaculo debe chocar al jugador*/
      obstaculo.chocar(this.jugador);
      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el elemento2*/
Juego.intersecan = function(elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

Juego.dibujarFondo = function() {
  // Si se termino el juego hay que mostrar el mensaje de game over de fondo
  if (this.terminoJuego()) {
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
  }

  // Si se gano el juego hay que mostrar el mensaje de ganoJuego de fondo
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    document.getElementById('reiniciar').style.visibility = 'visible';
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
  }
};

Juego.terminoJuego = function() {
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function() {
  return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
