app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/error', {
                title: 'ERRO',
                templateUrl: 'app/Views/error.html',
                controller: 'homeCtrl'
            })
            .when('/home', {
                title: 'COMPRA CERTA',
                templateUrl: 'app/Views/home.html',
                controller: 'homeCtrl'
            })
            .when('/lojas', {
                title: 'LISTA DE LOJAS',
                templateUrl: 'app/Views/storelist.html',
                controller: 'storelistCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }]);

