app.controller('storelistCtrl', function ($scope, $rootScope, $window) {


    $scope.choosedFilter = '';
    $scope.filters = [
        {name: "Menor Preco", value: "price"},
        {name: "Maior Preco", value: "-price"},
        {name: "Alfabetica", value: "store"},
        {name: "Maior Avaliacao", value: "-star"},
        {name: "Menor Avaliacao", value: "star"}
    ];
    $scope.deleteStore = function (name) {
        $rootScope.storelist.forEach(function (_store) {
            if (_store.store == name)
                _store.price = -1;
        });
    };
    $scope.buyProduct = function (website) {
        $window.open(website);
    };

});
