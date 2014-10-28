
app.controller('homeCtrl', function($scope, services, $rootScope, $location) {
    $rootScope.home=true;
$rootScope.logout = false;
$rootScope.register = false;
$rootScope.listUser = false;
    if (!$rootScope.logged || $rootScope.logged === false) {
        $rootScope.authMsg = "USUARIO NAO AUTORIZADO A ESTA AREA";
        $location.path("/");
    } else {
        $rootScope.authMsg = "";
    }
    if ($rootScope.returnMsg)
        $scope.returnMsg = $rootScope.returnMsg;
    else
        $scope.returnMsg = "";

});
