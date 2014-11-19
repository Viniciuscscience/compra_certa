app.controller('storelistCtrl', function ($scope, $rootScope, $window) {
    $scope.pageSize = 4;
    $scope.currentPage = 0;
    $scope.numberOfPages=function(){
        return Math.ceil($rootScope.storelist.length/$scope.pageSize);                
    };
    
    $scope.choosedFilter = '';
    
    $scope.filters = [
        {name: "Menor Preco", value: "price"},
        {name: "Maior Preco", value: "-price"},
        {name: "Alfabetica", value: "store"},
        {name: "Maior Avaliacao", value: "-star"},
        {name: "Menor Avaliacao", value: "star"}
    ];
    
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
    /* remember to change this sorting algorithm to use javascript's .sort*/
    $scope.sort = function (list,isAscending) {
    	
    	var  lowerThan    =  [];
    	var  greaterThan  =  [];
    	var  sortedArray  =  [];
    	var  pivot        =  list[0];
    	var  j            =  0;
    	var  i            =  0;
    	
    	if(list.length == 0 )
    	return [];
    	for( i = 1; i < list.length; i++) {
    		if( list[i].price <= pivot.price) {
    			lowerThan[j++] = list[i];
    		}
    	}
    	j = 0;
    	for( i = 1; i < list.length; i++) {
    		if( list[i].price > pivot.price) {
    			greaterThan[j++] = list[i];
    		}
    	}
    	if(isAscending) {
    		return sortedArray.concat($scope.sort(lowerThan,isAscending ), pivot, $scope.sort(greaterThan,isAscending) );
    	}	    
        else {
           return sortedArray.concat($scope.sort(greaterThan,isAscending) ,pivot, $scope.sort(lowerThan,isAscending) );	
        }   
    };
    
    $scope.$watch('choosedFilter', function() {
    	var i;
    	if(!(typeof $rootScope.storelist[0] === 'undefined') ){
    		console.log("here    " + 'choosedFilter');
    		if($scope.choosedFilter == "price") {
    			$rootScope.storelist = $scope.sort($rootScope.storelist, true);
    	    	console.log("Ordenando em ordem cresente");    
    		}
        	else {
        		$rootScope.storelist = $scope.sort($rootScope.storelist, false);
            	console.log("Ordenando em ordem decresente");  
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
