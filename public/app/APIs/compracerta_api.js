app.factory("produto", ['$http', function ($http) {
    var serviceBase = 'http://localhost:3000/produto/';
    var obj = {};

    //where u will code the api service

    obj.getStoreList = function (pname) {
        return $http.get(serviceBase + pname);
    };


    return obj;
}
]);
