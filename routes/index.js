var express = require('express');
var router = express.Router();
var request = require('request'), cheerio = require('cheerio'), async = require('async'), format = require('util').format;

var concurrency = 2;
var teste = [];
router.get('/produto/:name', function (req, res) {
    var product = req.params.name;
    var store_list = [];


    var url = format('http://www.buscape.com.br/proc_unico?id=77&kw=' + product);


    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {


            var $ = cheerio.load(body);

            var first_product = $(".bp-product-list .product").first().children('.details').children('.description').children('a').attr('href');
            if(first_product == undefined)
                first_product = "none";
            request(first_product, function (err2, response2, body2) {
                    if (!err2 && response2.statusCode == 200) {
                        var $ = cheerio.load(body2);
                        $(".bp-product-list .product").each(
                            function () {
                                var _price = $(this).children('.details').children('a').data('preco');
                                var _store = $(this).children('.details').children('a').attr('title');
                                var _link = $(this).children('.actions').children('.red').attr('href');
                                store_list.push({store: _store, price: _price, link: _link});

                            }
                        );
                        res.json(store_list);
                        console.log(store_list);
                    }else{
                        res.json(store_list);

                    }

                }
            )
            ;
        }

        /*
         $(".bp-product-list .product").each(
         function(){
         var preco = $(this).children('.details').children('a').data('preco');
         var loja = $(this).children('.details').children('a').attr('title');
         console.log("Loja: " + loja + ", o preço é: " + preco);
         }
         );
         */

    });

});


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
