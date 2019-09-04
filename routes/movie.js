var express = require('express');
var router = express.Router();
let fetch = require('node-fetch');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Happy Birthday' });
});

router.get('/getMovie', function (req, res, next) {
    let name = req.query.name;

    let fetchURL = 'http://www.omdbapi.com/?apikey=86c39163&t=' + name;
    console.log(fetchURL);
    fetch(fetchURL)
        .then(r => r.json())
        .then(body => {
            let moviePage = "<h1>" + body.Title +
                "</h1><br><img src='" + body.Poster + "'>";
            res.send(moviePage);
        });
})

router.get('/searchMovie', function (req, res, next) {
    let name = req.query.name;

    let fetchURL = 'http://www.omdbapi.com/?apikey=86c39163&s=' + name;
    console.log(fetchURL);
    fetch(fetchURL)
        .then(r => r.json())
        .then(body => {
            let moviePage = "";
            body.Search.forEach(function (item) {
                moviePage += "<h1>" + item.Title +
                    "</h1><br><img src='" + item.Poster + "'>";
            })
            res.send(moviePage)
        });
});


module.exports = router;