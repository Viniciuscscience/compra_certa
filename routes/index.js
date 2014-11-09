
var express = require('express');
var router = express.Router();
var request = require('request')
  , cheerio = require('cheerio')
  , async = require('async')
  , format = require('util').format;

var concurrency = 2;
var teste = [];
router.get('/produto/:name', function(req, res) {
var product = req.params.name;
console.log('O PRODUTO PESQUISADO NO BUSCAPE FOI: %s',product);

    

    var url = format('http://www.buscape.com.br/smartphone-apple-iphone-5s-16gb-desbloqueado.html?pos=1#precos');


    request(url, function (err, response, body) {
        if (err) throw err;
        var $ = cheerio.load(body);
	console.log("oi");

        $(".bp-product-list .product").each(
	function(){
		var preco = $(this).children('.details').children('a').data('preco');
		var loja = $(this).children('.details').children('a').attr('title');
		console.log("Loja: " + loja + ", o preço é: " + preco);
	}
	);
        
    });
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
