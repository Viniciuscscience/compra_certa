app.controller('storelistCtrl', function ($scope, $rootScope, $window, $location) {
    $scope.pageSize = 4;
    $scope.currentPage = 0;
    $scope.numberOfPages=function(){
        return Math.ceil($rootScope.storelist.length/$scope.pageSize);                
    };
    
    $scope.x ={choosedFilter: 'price'};
    
    $rootScope.cheapest   = "...";
    $rootScope.costliest  = "...";
    
    $scope.filters = [
        {name: "Menor Preco", value: "price"},
        {name: "Maior Preco", value: "-price"},
        {name: "Alfabetica", value: "store"},
        {name: "Maior Avaliacao", value: "-star"},
        {name: "Menor Avaliacao", value: "star"}
    ];
    
    //victor, there is a search function on both files, home.html n storelist.html,
    // so u should not check the last statement here, cause this code will run 
    // only once on the first load. Only functions runs more than once. The message "Um erro Ocorreu"
    // is not for that, u should really do a empty string check while search the string.
    //
                  // Erika                            //       Victor                           Victor
   if((typeof $rootScope.globalname=="undefined") || !($rootScope.globalname) || ($rootScope.globalname == "Um erro Ocorreu")){
            $location.path("/home");
        }
        
    
    
    $scope.deleteStore = function (name) {
        $rootScope.storelist.forEach(function (_store) {
            if (_store.store == name )
                _store.price = -1;
        });
    };
    
    $scope.deleteProduct = function (name, price, descr) {
    	 var index = 0;
    	 for ( index = 0; index < $rootScope.storelist.length; index++) {
         	if ( $rootScope.storelist[index].store == name && 
         	     $rootScope.storelist[index].price == price && 
         	     $rootScope.storelist[index].description == descr ) {
         			break;
         	}
         }       
         if (index < $rootScope.storelist.length) {
    		$rootScope.storelist.splice(index,1);
    	 }
    };
   
     
    $scope.$watch('x.choosedFilter', function() {
    	var i;
    	if(!(typeof $rootScope.storelist[0] === 'undefined') ){
    		console.log("here    " + 'choosedFilter');
    		if($scope.x.choosedFilter == "price") {
    			$rootScope.storelist.sort(function (a, b) {
    				return (a.price - b.price);
    			});	
    	    	console.log("Ordenando em ordem cresente");    
    		}
        	else if($scope.x.choosedFilter == "-price") {
        		$rootScope.storelist.sort(function (a, b) {
    				return (b.price - a.price);
    			});	
        		
            	console.log("Ordenando em ordem decresente");  
        	}
    	    else if($scope.x.choosedFilter == "store") {
    	    	$rootScope.storelist.sort(function (a, b) {
    			 if(a.store.toLowerCase() < b.store.toLowerCase() ) {
    			 	return -1;
    			 }
    			 else if(a.store.toLowerCase() > b.store.toLowerCase() ) { 
    			 	return 1;
    			 }
    			 else {
    			 	return 0;
    			 }
    			});
                console.log("a.store[0] is :  " + $rootScope.storelist[0].store[0] + " /n b.store[0] is " + $rootScope.storelist[1].store[0])
                console.log("Ordenando por ordem alfabetica");      	    
    	    }
    	    else if($scope.x.choosedFilter == "star") {
    	    	$rootScope.storelist.sort(function (a, b) {
    				return (a.star - b.star);
    			});
                console.log("Ordenando em ordem crescente de avaliação");      	    
    	    }
    	    else if($scope.x.choosedFilter == "-star") {
    	    	$rootScope.storelist.sort(function (a, b) {
    				return (b.star - a.star);
    			});
                console.log("Ordenando em ordem decrescente de avaliação");      	    
    	    }
    	    else { 
    	    	console.log("ERROR:filtro não identificado");
    	    }
    	    for( i = 0; i < $rootScope.storelist.length; i++) {
    		    	console.log("price : " +  $rootScope.storelist[i].price + "\n");
    		    }
    	}
    });
    
    $scope.buyProduct = function (website) {
        $window.open(website);
    };
    

     
});
