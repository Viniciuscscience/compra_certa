var assert = require('assert');

var sl = require('../public/app/Controllers/storelistController.js');

describe('Filtro padrão deve ser menor preço',function(){
	it('choosedFilter deve ser igual a price',function(){
		assert.equal('',sl.$scope.choosedFilter);
	});
});
