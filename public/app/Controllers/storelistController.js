
app.controller('storelistCtrl', function($scope, $rootScope,$window) {

$scope.deleteStore = function (name)
    {
        $rootScope.storelist.forEach(function(_store){
        	if (_store.store == name)
        		_store.price = -1;
        });
    };
$scope.buyProduct = function(website){
    $window.open(website);
};
    
});
