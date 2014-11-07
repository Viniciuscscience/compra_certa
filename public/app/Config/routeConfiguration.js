app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/error',{
                title: 'ERRO',
                templateUrl: 'app/Views/error.html',
                controller: 'homeCtrl'
            })
                .when('/home', {
                    title: 'HOME',
                    templateUrl: 'app/Views/home.html',
                    controller: 'homeCtrl'
                })
                .when('/productlist', {
                	title: 'LISTA',
                	templateUrl: 'app/Views/productlist.html',
                	controller: 'productlistCtrl'
                })	
                .otherwise({
                    redirectTo: '/home'
                });
    }]);

