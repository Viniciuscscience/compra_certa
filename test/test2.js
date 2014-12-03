var assert = require('assert');

var hc = require('../public/app/Controllers/homeController.js');

describe('Nao mostra produto quando busca nao encontra',function(){
	it('Variavel storelist deve ser nula',function(){
		if(!(hc.$rootScope.searchproduct(pname))){
			assert.equal(undefined,hc.$rootScope.storelist);
		}
	});
});
