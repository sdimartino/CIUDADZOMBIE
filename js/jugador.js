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
  // Hay que agregar lo que falte al jugador: movimientos, perdida de vidas,
  // y todo lo que haga falta para que cumpla con sus responsabilidades
}
Jugador.mover = function(nx, ny) {
  this.x += nx;
  this.y += ny;
  if (ny < 0){
    this.sprite ='imagenes/auto_rojo_arriba.png';
  }
  else if (ny > 0)
  {
    this.sprite ='imagenes/auto_rojo_abajo.png';
  }
  else if (nx < 0)
  {
    this.sprite ='imagenes/auto_rojo_izquierda.png';
  }
  else if (nx > 0)
  {
    this.sprite ='imagenes/auto_rojo_derecha.png';
  }
}

Jugador.perderVida = function(){
  this.vidas -=1;
}


