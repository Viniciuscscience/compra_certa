app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
                .when('/home', {
                    title: 'HOME',
                    templateUrl: 'app/Views/home.html',
                    controller: 'homeCtrl'
                })
                .otherwise({
                    redirectTo: '/error'
                });
    }]);

