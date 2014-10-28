app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
                when('/', {
                    title: 'home',
                    templateUrl: 'app/Views/home.html',
                    controller: 'loginCtrl'
                })

                .when('/home', {
                    title: 'HOME',
                    templateUrl: 'app/Views/home.html',
                    controller: 'homeCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);

