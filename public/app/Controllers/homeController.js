app.controller('homeCtrl', function ($scope, produto, $location, $rootScope, $cookieStore) {
    $scope.productname = "";
    $rootScope.searchproduct = function (pname) {
        $rootScope.globalname = pname;
        $rootScope.storelist = [];
        $rootScope.isworking = true;
        var thereIsCookie = false;
        console.log($rootScope.productname);
        $rootScope.productsinCookies = $cookieStore.get('researched_compracerta');
        
        if ($rootScope.productsinCookies == undefined)
            $rootScope.productsinCookies = [];

        while ($rootScope.productsinCookies.length > 7) {
            $rootScope.productsinCookies.splice(0,1);
        };

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
