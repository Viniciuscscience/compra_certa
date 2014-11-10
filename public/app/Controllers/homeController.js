app.controller('homeCtrl', function ($scope, produto, $location, $rootScope, $cookieStore) {
    $scope.productname = "";
    $scope.searchproduct = function (pname) {
        $rootScope.storelist = [];
        $rootScope.isworking = true;
        var thereIsCookie = false;

        $rootScope.productsinCookies = $cookieStore.get('researched_compracerta');
        console.log($rootScope.productsinCookies);
        if ($rootScope.productsinCookies == undefined)
            $rootScope.productsinCookies = [];

        $rootScope.productsinCookies.forEach(function (n) {
            if (n == pname) {
                thereIsCookie = true;
            }
        });
        if (!thereIsCookie) {
            $rootScope.productsinCookies.push(pname);
            $cookieStore.put('researched_compracerta', $rootScope.productsinCookies);
        }

        produto.getStoreList(pname).then(function (slist) {
            $rootScope.storelist = slist.data
            $rootScope.isworking = false;
        });
        $location.path("/lojas");
    };


});
