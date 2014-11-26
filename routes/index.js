var express = require('express');
var router = express.Router();
var request = require('request'), cheerio = require('cheerio'), async = require('async'), format = require('util').format;

var concurrency = 2;
var teste = [];
router.get('/produto/:name', function (req, res) {
    var product = req.params.name;
    var store_list = [];


    var url = format('http://buscape.com.br/cprocura/' + product + '.html');


    request(url, function (err, response, body) {
        if (!err && response.statusCode == 200) {
            var $ = cheerio.load(body);
            var first_product = $(".bp-product-list .product").first().children('.details').children('.description').children('a').attr('href');
            if (first_product == undefined)
                first_product = "none";
            request(first_product, function (err2, response2, body2) {
                    if (!err2 && response2.statusCode == 200) {
                        var $ = cheerio.load(body2);
                        $(".bp-product-list .product").each(
                            function () {
                                var _price = $(this).children('.details').children('a').data('preco');
                                var _store = $(this).children('.details').children('a').children('img').attr('alt');
                                var _image = $(this).children('.details').children('a').children('img').attr('src');
                                var _starfull = $(this).find('.ebit-more-info div.stars span.starfull').length;
                                var _starhalf = $(this).find('.ebit-more-info div.stars span.starhalf').length;
                                var _star = _starfull + _starhalf / 2;
                                var _description = $(this).children('.description').first().text();
                                var _link = $(this).children('.actions').children('.red').attr('href');
                                if(_store !== undefined){
                                    store_list.push({
                                        store: _store,
                                        price: _price,
                                        link: _link,
                                        image: _image,
                                        description: _description.substr(0,_description.length-8),
                                        star: _star
                                    });
                                }
                            }
                        );
                        res.json(store_list);
                    } else {
                        res.json(store_list);

                    }

                }
            )
            ;
        } else{
             res.json(store_list);
        }

    });

});


/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
