
app.factory("services", ['$http', function($http) {
        var serviceBase = '/compracerta/services/';
        var obj = {};

       //where u will code the api service
       
     obj.getProductList = function(pname){
            var teste = [
    		{	
    			name:       "Iphone", 
    		 	price:      2000,
    		 	isRemoved:  false,
    		 	link:       "www.google.com"
    		 	
    		},
    		{
    			name:      "Ps4",
    			price:     4000,
    			isRemoved: false,
    			link:       "www.cade.com"
    		},
    		{
    			name:      "Oculus Rift",
    			price:     3000,
    			isRemoved: false,
    			link:       "www.yahoo.com"
    		}
    	];
    	
    	return teste;
    };
    
    
    
        return obj;
    }
    ]);
