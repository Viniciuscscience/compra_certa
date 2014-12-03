app.controller('homeCtrl', function ($scope, produto, $location, $rootScope, $cookieStore) {
    $rootScope.search = {name:""};
    $rootScope.storefilter = {name:""};
    $rootScope.error = {hasError: false, errorMessage: ""};
  
    $rootScope.productsinCookies = $cookieStore.get('researched_compracerta');
        if ($rootScope.productsinCookies == undefined)
            $rootScope.productsinCookies = [];

    $rootScope.$watch('search.name',function(){
           if((!$rootScope.storelist) || !($rootScope.storelist.length > 0)){
        $rootScope.error.errorMessage = "";
        $rootScope.error.hasError = false;
    }
    });


    $scope.getCookies = function(pname){
        var thereIsCookie = false;

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
            if (pname && pname.length > 0)
                $rootScope.productsinCookies.push(pname);
            $cookieStore.put('researched_compracerta', $rootScope.productsinCookies);
        }

    }

    $rootScope.searchproduct = function (pname) {
        $rootScope.error.errorMessage = "";
        $rootScope.error.hasError = false;
        //victor, here I'm doing the regex for a string with only spaces
        for(var i= 0; i < pname.length && pname[i]==' '; i++);
        if(i===pname.length){
            $rootScope.search.name="";

            $rootScope.error.errorMessage = "Você deve digitar o nome de um produto!";
            $rootScope.error.hasError = true;
            return false;
        }
            

        $rootScope.globalname = pname;
        $rootScope.storelist = [];
        $rootScope.storefilter.name = "";
        $rootScope.isworking = true;
        

        produto.getStoreList(pname).then(function (slist) {

            slist.data.sort(function (a, b) {
            	return (a.price - b.price);
            });	
            //mateus, if the list is empty there will be no first or  last element
            if(slist.data.length > 0){
                $rootScope.costliest = slist.data[slist.data.length- 1].price;
                $rootScope.cheapest  = slist.data[0].price;
                $scope.getCookies(pname);
            }


            $rootScope.storelist = slist.data;

            $rootScope.isworking = false;
            $rootScope.search.name = "";
            // Funcionalidade 5 implementada
            if ($rootScope.storelist.length < 1)
                $rootScope.search.name = $rootScope.globalname;
            
            
   
        }, function(error){
            //dear lord =( I cant believe that it's happening
            $rootScope.isworking = false;
            console.log(error);
        });

      $location.path("/lojas");

    };


});
