var assert = require('assert');

var sl = require('../public/app/Controllers/storelistController.js');

describe('Voltar para a home, se digitado link incorreto', function(){
	it("Path deve ser /home",function(){
		if(typeof sl.$rootScope.globalname == undefined){
			assert.equal("/home",sl.$location.path);
		}
	});
});
