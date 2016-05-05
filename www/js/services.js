angular.module('starter.services', [])

/**
* A simple example service that returns some data.
*/
.factory('Platillos', function() {
  // Might use a resource here that returns a JSON array

  var platillos = [
    {
      id:0,
      nombre: "Fettuccini al pesto",
      descripcion: "El sabor y aroma concentrado de la albahaca marcan la diferencia, a esta delicia le bastará una sola vueltecita con el tenedor para enredarte en mil sensaciones..",
      precio: 94.00,
      clasificacion: "Pastas",
      imagen: "img/platillos/0.jpg",
      tiempo: ["Almuerzo", "Cena"]
    },
    {
      id:1,
      nombre: "Fettuccini Alfredo con pollo",
      descripcion: "La salsa Alfredo resalta el sabor tanto del pollo como de la pasta, haciéndola la salsa ideal para un delicioso Fettuccine.",
      precio: 90.00,
      clasificacion: "Pastas",
      imagen: "img/platillos/1.jpg",
      tiempo: ["Almuerzo", "Cena"]
    },
    {
      id:2,
      nombre: "Fusilli al pomodoro",
      descripcion: "Un delicioso plato de fideos con una salsa natural de tomates y ajo.",
      precio: 84.00,
      clasificacion: "Pastas",
      imagen: "img/platillos/2.jpg",
      tiempo: ["Almuerzo", "Cena"]
    },
    {
      id:3,
      nombre: "Lasagna ala bolognesa",
      descripcion: "Uno de los platos más famosos de la tradición boloñesa. La textura de la lasaña clásica, crujiente en la superficie y en su interior suave y suculenta..",
      precio: 86.00,
      clasificacion: "Pastas",
      imagen: "img/platillos/3.jpg",
      tiempo: ["Almuerzo", "Cena"]
    },
    {
      id:4,
      nombre: "Quattro Formaggi Lasagna",
      descripcion: "Deliciosas láminas de pasta de lasaña con queso mozaarella rallado, ricotta, parmesano y peccorino.",
      precio: 85.00,
      clasificacion: "Pastas",
      imagen: "img/platillos/4.jpg",
      tiempo: ["Almuerzo", "Cena"]
    }
  ]; //platillos

  var categorias = [
    {id:0, nombre: "Bebidas Frias"}
    ,{id:1, nombre: "Bebidas Calientes"}
    ,{id:2, nombre: "Entradas"}
    ,{id:3, nombre: "Carnes"}
    ,{id:4, nombre: "Pastas"}
    ,{id:5, nombre: "Pollo"}
    ,{id:6, nombre: "Postres"}
  ]; //categorias

  return {
    allPlatillos: function() {
      return platillos;
    },
    getPlatillo: function(platilloId) {
      // Simple index lookup
      return platillos[platilloId];
    },
    allCategorias: function() {
      return categorias;
    },
    getCategoria: function(categoriaId) {
      // Simple index lookup
      return categorias[categoriaId];
    }
  } //return
}); //Platillos
