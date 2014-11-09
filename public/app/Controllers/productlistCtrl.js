
app.controller('productlistCtrl', function($scope, $rootScope) {

$scope.deleteProduct = function (name) 
    {
        $rootScope.productlist.forEach(function(product){
        	if (product.name == name)
        		product.isRemoved = true;
        });
    	product.isRemoved = true; 
    };
    
});
