
app.controller('homeCtrl', function($scope,produto, $location, $rootScope) {
	$scope.productname = "";
    $scope.searchproduct = function (pname) 
    {
        $rootScope.storelist = [];
        $rootScope.isworking = true;
    	produto.getStoreList(pname).then(function(slist){
            $rootScope.storelist = slist.data
            $rootScope.isworking = false;
        });
    	$location.path("/lojas");
    };
    
    
});
