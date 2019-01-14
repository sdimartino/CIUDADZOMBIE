/* El objeto jugador es un objeto literal que se encuentra incompleto.
 Solo tiene asignadas algunas de sus propiedades y ningun metodo */
var Jugador = {
  /* el sprite contiene la ruta de la imagen
  */
  sprite: 'imagenes/auto_rojo_abajo.png',
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  modoRayo: false
  // Hay que agregar lo que falte al jugador: movimientos, perdida de vidas,
  // y todo lo que haga falta para que cumpla con sus responsabilidades
}
Jugador.mover = function(nx, ny) {
  this.x += nx;
  this.y += ny;
  if (ny < 0){
    this.sprite = this.modoRayo ? 'imagenes/rayo.png' : 'imagenes/auto_rojo_arriba.png';
    this.ancho = 15;
    this.alto = 30;
  }
  else if (ny > 0)
  {
    this.sprite = this.modoRayo ? 'imagenes/rayo.png' : 'imagenes/auto_rojo_abajo.png';
    this.ancho = 15;
    this.alto = 30;
  }
  else if (nx < 0)
  {
    this.sprite = this.modoRayo ? 'imagenes/rayo.png' : 'imagenes/auto_rojo_izquierda.png';
    this.ancho = 30;
    this.alto = 15;
  }
  else if (nx > 0)
  {
    this.sprite = this.modoRayo ? 'imagenes/rayo.png' : 'imagenes/auto_rojo_derecha.png';
    this.ancho = 30;
    this.alto = 15;
  }
}
Jugador.perderVidas = function(cantVidas, esLetal){
  if (esLetal){
    this.vidas = 0;
  }
  else {
    if (!this.modoRayo) this.vidas = this.vidas - cantVidas;
  }
}

Jugador.cambiarModoRayo = function(modo){
  if ( modo ) {
    this.modoRayo = true;
  }
  else{
    this.modoRayo = false;
  }
}