app.controller('storelistCtrl', function ($scope, $rootScope, $window) {
    $scope.pageSize = 4;
    $scope.currentPage = 0;
   
    
    $scope.choosedFilter = 'price';
    
    $scope.filters = [
        {name: "Menor Preco", value: "price"},
        {name: "Maior Preco", value: "-price"},
        {name: "Alfabetica", value: "store"},
        {name: "Maior Avaliacao", value: "-star"},
        {name: "Menor Avaliacao", value: "star"}
    ];
    
    $scope.deleteStore = function (name) {
        $rootScope.storelist.forEach(function (_store) {
            if (_store.store == name )
                _store.price = -1;
        });
    };
    
    $scope.deleteProduct = function (name, price, descr) {
    	 var index = 0;
    	 for ( index = 0; index < $rootScope.storelist.length; index++) {
         	if ( $rootScope.storelist[index].store == name && 
         	     $rootScope.storelist[index].price == price && 
         	     $rootScope.storelist[index].description == descr ) {
         			break;
         	}
         }       
         if (index < $rootScope.storelist.length) {
    		$rootScope.storelist.splice(index,1);
    	 }
    };
    
    $scope.buyProduct = function (website) {
        $window.open(website);
    };

});
