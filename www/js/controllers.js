angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $window, $cordovaToast, $state) {
  // Create the agregarProducto modal that we will use later
  $ionicModal.fromTemplateUrl('templates/agregarProducto.html', {
    scope: $scope
  }).then(function(modAgregarProducto) {
    $scope.options = [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '...', value: 10 }
    ];
    $scope.cantidad = $scope.options[0];
    $scope.modAgregarProducto = modAgregarProducto;
  });
  // Triggered in the modal to close it
  $scope.closeAgregarProducto = function() {
    $scope.modAgregarProducto.hide();
  };
  // Open the modal
  $scope.verProducto = function(platillo){
    $scope.platillo=platillo;
    //$scope.platillo.subtotal=platillo.precio*document.getElementById("cantidad").value;
    $scope.modAgregarProducto.show();
  };
  //Agregar producto a pedido
  $scope.agregarPedido = function(platilloId, cantidad) {
    if (""===$rootScope.pedidosId){
      $rootScope.pedidosId="";
      $rootScope.pedidosCant="";
    }
    $rootScope.pedidosId+=platilloId+",";
    localStorage.setItem('pedidosId', $rootScope.pedidosId);
    $rootScope.pedidosCant+=cantidad+",";
    localStorage.setItem('pedidosCant', $rootScope.pedidosCant);
    $scope.modAgregarProducto.hide();
    ///***mostrar aviso producto agregado
    $cordovaToast.show('Producto agregado a Pedido', 'long', 'bottom');
    console.log("pedidosID: "+$rootScope.pedidosId);
    console.log("pedidosCant: "+$rootScope.pedidosCant);
  };

  // Create the acercade modal that we will use later
  $ionicModal.fromTemplateUrl('templates/acercade.html', {
    scope: $scope
  }).then(function(modAcercaDe) {
    $scope.modAcercaDe = modAcercaDe;
  });
  // Triggered in the login modal to close it
  $scope.closeAcercade = function() {
    $scope.modAcercaDe.hide();
  };
  // Open the login modal
  $scope.acercade = function(){
    $scope.modAcercaDe.show();
  };
  //borrar datos de localStorage
  $scope.borrarDatos = function() {
    localStorage.clear();
    $rootScope.favoritos = "";
    $rootScope.pedidosId = "";
    $rootScope.pedidosCant = "";
    $rootScope.nombreUsuario = "";
    $rootScope.nombreRecibe = "";
    $rootScope.direccion = "";
    $rootScope.direccionEntrega = "";
    $rootScope.telefono = "";
    $rootScope.telefonoEntrega = "";
    $rootScope.correo = "";
    $rootScope.nit = "";
    $state.go("app.favoritos");
    window.location.reload("true");
    $state.go("app.perfil");
    window.location.reload("true");
    $state.go("app.pedidos");
    window.location.reload("true");
    $state.go("app.productos");
    console.log("Datos borrados");
  };
})//AppCtrl

.controller('productosAlfabeticosCtrl', function($rootScope, $scope, $ionicModal, $cordovaToast, Platillos) {
  //Cargamos listado de platillos disponibles
  $scope.platillos = Platillos.allPlatillos();
  $scope.onTouchCart = function(platilloId){
    if (""===$rootScope.favoritos)
    $rootScope.favoritos="";
    if (-1===$rootScope.favoritos.search(platilloId)){
      $rootScope.favoritos+=platilloId+",";
      localStorage.setItem('favoritos', $rootScope.favoritos);
      ///***mostrar aviso producto agregado
      $cordovaToast.show('Producto agregado a Favoritos', 'long', 'bottom');
    }
  }
}) //productosAlfabeticosCtrl

.controller('productosCategoriaCtrl', function($scope, Platillos) {
  $scope.categorias = Platillos.allCategorias();
}) //productosCategoriaCtrl

.controller('favoritosCtrl', function($rootScope, $scope, Platillos, $ionicPopup, $timeout, $state) {
  $scope.$on( "$ionicView.enter", function( scopes, states ) {
    if ("" === $rootScope.favoritos){
      console.log("favoritos vacio");
      $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Agrega tus platillos a favoritos!',
          template: 'Deseas ir a Productos para agregar los que te gusten a Favoritos?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('Ir a Productos');
            $state.go('app.productos');
          } else {
            console.log('Seguir en favoritos');
          }
        });
      };//confirm dialog
      $scope.showConfirm();
    }else{ //Retornar favoritos
      var idFavoritos = $rootScope.favoritos.substring(0,$rootScope.favoritos.length-1).split(",");
      $scope.favoritos = [];
      for (var i=0; i<idFavoritos.length; i++){
        $scope.favoritos[i] = Platillos.getPlatillo(idFavoritos[i]);
      }
    }//else
  })//ionicView.enter
}) //favoritosCtrl

.controller('pedidosCtrl', function($rootScope, $scope, Platillos, $ionicPopup, $timeout, $state, $cordovaToast, $window) {
  $scope.$on( "$ionicView.enter", function( scopes, states ) {
    if ("" === $rootScope.pedidosId){
      console.log("pedidos vacio");
      $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Agrega tus platillos al Pedido!',
          template: 'Deseas ir a Productos para agregar los que deseas a tu Pedido?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('Ir a Productos');
            $state.go('app.productos');
          } else {
            console.log('Seguir en favoritos');
          }
        });
      };//confirm dialog
      $scope.showConfirm();
    }else{ //Retornar favoritos
      console.log("pedido no vacio");
      console.log($rootScope.pedidosId);
      var idPedidos = $rootScope.pedidosId.substring(0,$rootScope.pedidosId.length-1).split(",");
      var cantPedidos = $rootScope.pedidosCant.substring(0,$rootScope.pedidosCant.length-1).split(",");
      $rootScope.total=0;
      $scope.pedidos = [];
      for (var i=0; i<idPedidos.length; i++){
        var platillo = Platillos.getPlatillo(idPedidos[i]);
        $scope.pedidos[i] = {
          id : platillo.id,
          nombre : platillo.nombre,
          precio : platillo.precio,
          imagen : platillo.imagen,
          cantidad : cantPedidos[i]
        }
        $rootScope.total+=$scope.pedidos[i].precio*$scope.pedidos[i].cantidad;
      }
      console.log("total "+$rootScope.total);
    }//else
  });//ionicView.enter

  $scope.borrarPedido = function(){
    if ("" != $rootScope.pedidosId){
      console.log("borrar pedido");
      $rootScope.pedidosId = "";
      localStorage.setItem('pedidosId',"");
      $rootScope.pedidosCant = "";
      localStorage.setItem('pedidosCant',"");
      $rootScope.nombreRecibe = "";
      localStorage.setItem('nombreRecibe',"");
      $rootScope.direccionEntrega = "";
      localStorage.setItem('direccionEntrega',"");
      $rootScope.telefonoEntrega = "";
      localStorage.setItem('telefonoEntrega',"");
      $window.location.reload(true);
      $cordovaToast.show('Pedido eliminado', 'long', 'bottom');
    }
  };

  $scope.confirmarPedido = function(){
    if ("" != $rootScope.pedidosId){
      console.log("confirmar pedido");
      //verificar si existe perfil
      if ("" === $rootScope.nombreUsuario){
        $rootScope.enPedido = true;
        $state.go('app.perfilNuevo');
      }else{
        $state.go('app.datosPedido');
      }
    }
  };
}) //pedidosCtrl

.controller('perfilCtrl', function($rootScope, $scope, $ionicPopup, $timeout, $state, $cordovaToast, $window) {
  $scope.$on( "$ionicView.enter", function( scopes, states ) {
    if ("" === $rootScope.nombreUsuario){
      console.log("perfil vacio");
      $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Crea tu perfil ahora!',
          template: 'Deberas crear tu perfil para poder realizar compras. Deseas crear tu perfil ahora?'
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('Ir a PerfilNuevo');
            $rootScope.enPedido = false;
            $state.go('app.perfilNuevo');
          } else {
            console.log('Seguir en perfil');
          }
        });
      };//confirm dialog
      $scope.showConfirm();
    }else{ //
      $scope.usuario = {
        nombreUsuario : $rootScope.nombreUsuario,
        direccion : $rootScope.direccion,
        telefono : $rootScope.telefono,
        correo : $rootScope.correo,
        nit : $rootScope.nit
      }
    }//else
  })//ionicView.enter
  $scope.editarPerfil=function(){
    $rootScope.enPedido = false;
    $state.go('app.perfilNuevo');
  }
}) //perfilCtrl

.controller('perfilNuevoCtrl', function($rootScope, $scope, $state, $cordovaToast, $window) {
  $scope.usuario = {
    nombreUsuario : "",
    direccion : "",
    telefono : "",
    correo : "",
    nit : ""
  }
  $scope.$on( "$ionicView.enter", function( scopes, states ) {
    if ("" === $rootScope.nombreUsuario){
      console.log("perfil vacio");
    }else{ //Retornar favoritos
      $scope.usuario = {
        nombreUsuario : $rootScope.nombreUsuario,
        direccion : $rootScope.direccion,
        telefono : $rootScope.telefono,
        correo : $rootScope.correo,
        nit : $rootScope.nit
      }
    }//else
  })//ionicView.enter
  $scope.guardarPerfil=function(){
    $rootScope.nombreUsuario=this.usuario.nombreUsuario;
    $rootScope.direccion=this.usuario.direccion;
    $rootScope.telefono=this.usuario.telefono;
    $rootScope.correo=this.usuario.correo;
    $rootScope.nit=this.usuario.nit;
    localStorage.setItem('nombreUsuario', $rootScope.nombreUsuario);
    localStorage.setItem('direccion', $rootScope.direccion);
    localStorage.setItem('telefono', $rootScope.telefono);
    localStorage.setItem('correo', $rootScope.correo);
    localStorage.setItem('nit', $rootScope.nit);
    if ($rootScope.enPedido){
      $state.go('app.datosPedido');
    }else{
      $state.go('app.perfil');
      $cordovaToast.show('Perfil creado exitosamente', 'long', 'bottom');
    }
  }
}) //perfilNuevoCtrl

.controller('datosPedidoCtrl', function($rootScope, $scope, $state, $ionicPopup, $timeout) {
  $scope.$on( "$ionicView.enter", function( scopes, states ) {
    $scope.usuario = {
      nombreRecibe : $rootScope.nombreUsuario,
      direccionEntrega : $rootScope.direccion,
      telefonoEntrega : $rootScope.telefono
    }
  })//ionicView.enter
  $scope.guardarDatosPedido=function(){
    $rootScope.nombreRecibe=this.usuario.nombreRecibe;
    $rootScope.direccionEntrega=this.usuario.direccionEntrega;
    $rootScope.telefonoEntrega=this.usuario.telefonoEntrega;
    localStorage.setItem('nombreRecibe', $rootScope.nombreRecibe);
    localStorage.setItem('direccionEntrega', $rootScope.direccionEntrega);
    localStorage.setItem('telefonoEntrega', $rootScope.telefonoEntrega);
    $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
        title: 'Pedido realizado con éxito!',
        template: 'Su pedido ha sido procesado'
      });
      alertPopup.then(function(res) {
        $state.go('app.pedidos');
      });
    };
    $scope.showAlert();

  }
}) //datosPedidoCtrl
;
