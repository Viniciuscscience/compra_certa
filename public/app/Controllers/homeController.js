
app.controller('homeCtrl', function($scope,services, $location, $rootScope) {
	$scope.productname = "";
    $scope.searchproduct = function (pname) 
    {
    	$rootScope.productlist = services.getProductList(pname);
    	$location.path("/productlist");
    };
    
    
});
