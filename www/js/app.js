// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $cordovaSplashscreen, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    $rootScope.favoritos = localStorage.getItem('favoritos') || "";
    $rootScope.pedidosId = localStorage.getItem('pedidosId') || "";
    $rootScope.pedidosCant = localStorage.getItem('pedidosCant') || "";
    $rootScope.nombreUsuario = localStorage.getItem('nombreUsuario') || "";
    $rootScope.nombreRecibe = localStorage.getItem('nombreRecibe') || "";
    $rootScope.direccion = localStorage.getItem('direccion') || "";
    $rootScope.direccionEntrega = localStorage.getItem('direccionEntrega') || "";
    $rootScope.telefono = localStorage.getItem('telefono') || "";
    $rootScope.telefonoEntrega = localStorage.getItem('telefonoEntrega') || "";
    $rootScope.correo = localStorage.getItem('correo') || "";
    $rootScope.nit = localStorage.getItem('nit') || "";
    $rootScope.enPedido = false;
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.perfil', {
    url: "/perfil",
    views: {
      'menuContent' :{
        templateUrl: "templates/perfil.html",
        controller: 'perfilCtrl'
      }
    }
  })

  .state('app.perfilNuevo', {
    url: "/perfilNuevo",
    views: {
      'menuContent' :{
        templateUrl: "templates/perfilNuevo.html",
        controller: 'perfilNuevoCtrl'
      }
    }
  })

  .state('app.productos', {
    url: "/productos",
    views: {
      'menuContent' :{
        templateUrl: "templates/productos.html"
      }
    }
  })

  .state('app.productos.productosAlfabeticos', {
    url: "/productosAlfabeticos",
    views: {
      'productos-productosAlfabeticos' :{
        templateUrl: "templates/productosAlfabeticos.html",
        controller: 'productosAlfabeticosCtrl'
      }
    }
  })

  .state('app.productos.productosCategoria', {
    url: "/productosCategoria",
    views: {
      'productos-productosCategoria' :{
        templateUrl: "templates/productosCategoria.html",
        controller: 'productosCategoriaCtrl'
      }
    }
  })

  .state('app.favoritos', {
    url: "/favoritos",
    views: {
      'menuContent' :{
        templateUrl: "templates/favoritos.html",
        controller: 'favoritosCtrl'
      }
    }
  })
  .state('app.pedidos', {
    url: "/pedidos",
    views: {
      'menuContent' :{
        templateUrl: "templates/pedidos.html",
        controller: 'pedidosCtrl'
      }
    }
  })
  .state('app.datosPedido', {
    url: "/datosPedido",
    views: {
      'menuContent' :{
        templateUrl: "templates/datosPedido.html",
        controller: 'datosPedidoCtrl'
      }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/productos');
});
