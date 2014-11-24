app.controller('homeCtrl', function ($scope, produto, $location, $rootScope, $cookieStore) {
    $rootScope.search = {name:""};
    $rootScope.storefilter = {name:""};
    
    $rootScope.searchproduct = function (pname) {
        $rootScope.globalname = pname;
        $rootScope.storelist = [];
        $rootScope.storefilter.name = "";
        $rootScope.isworking = true;
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
            $rootScope.productsinCookies.push(pname);
            $cookieStore.put('researched_compracerta', $rootScope.productsinCookies);
        }

        produto.getStoreList(pname).then(function (slist) {
            slist.data.sort(function (a, b) {
            	return (a.price - b.price);
            });	
            $rootScope.costliest = slist.data[slist.data.length- 1].price;
            $rootScope.cheapest  = slist.data[0].price;
            $rootScope.storelist = slist.data
            $rootScope.isworking = false;
            $rootScope.search.name = "";
            if ($rootScope.storelist.length < 1){
                 $rootScope.search.name = $rootScope.globalname;
            }
            
   
        }, function(error){
             $rootScope.search.name = "Um erro Ocorreu";
        });
   //   $rootScope.storelist.sort(function (a, b) {
   // 				return (a.price - b.price);
   // 			});	
      
        
      $location.path("/lojas");
    };


});
