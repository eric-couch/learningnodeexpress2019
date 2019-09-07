var express = require('express');
var router = express.Router();
let fetch = require('node-fetch');

let moviePage = [];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Happy Birthday' });
});

router.all('/getMovie', function (req, res, next) {
    let name = "";
    if (req.method == 'POST') {
        name = req.body.name;
    } else {
        name = req.query.name;
    }

    let fetchURL = 'http://www.omdbapi.com/?apikey=86c39163&t=' + name;
    console.log(fetchURL);
    fetch(fetchURL)
        .then(r => r.json())
        .then(body => {
            let moviePage = "<div style='text-align:center;width:400px'><h1>" + body.Title +
                "</h1><br>";
            //moviePage += '<br />' + body.Actors.replace(/,/g, " | ");
            moviePage += '<br><h2>Release Date: ' + body.Released + '</h2>'
            moviePage += "<br><img src='" + body.Poster + "' width=300></div>"
            res.send(moviePage);
        });
})

router.post('/getMovieList', function (req, res, next) {
    let name = req.body.name;
    let fetchURL = 'http://www.omdbapi.com/?apikey=86c39163&s=' + name;
    console.log(fetchURL);
    fetch(fetchURL)
        .then(r => r.json())
        .then(body => {
            let returnHTML = "";
            console.log(body);
            body.Search.forEach(function (item) {
                returnHTML += "<a href='/movie/getMovieByIMDB?i=" + item.imdbID + "'>" + item.Title + "<br>";
            })
            res.send(returnHTML);
        })
});

router.get('/getMovieByIMDB', function (req, res, next) {
    let imdb = req.query.i;
    let fetchURL = 'http://www.omdbapi.com/?apikey=86c39163&i=' + imdb;
    console.log(fetchURL);
    fetch(fetchURL)
        .then(r => r.json())
        .then(body => {
            let moviePage = "<div style='text-align:center;width:400px'><h1>" + body.Title +
                "</h1><br>";
            if (body.Actors.length > 0) {
                moviePage += '<br />' + body.Actors.replace(/,/g, " | ");
            }
            moviePage += '<br><h2>Release Date: ' + body.Released + '</h2>'
            moviePage += "<br><img src='" + body.Poster + "' width=300></div>"
            res.send(moviePage);
        })
});

router.get('/searchMovie', function (req, res, next) {
    let name = req.query.name;
    let fetchURL = 'http://www.omdbapi.com/?apikey=86c39163&s=' + name;
    let moviePage = [];
    console.log(fetchURL);
    fetch(fetchURL)
        .then(r => r.json())
        .then(body => {
            console.log(body);
            body.Search.forEach(function (item) {
                moviePage.push({ Title: item.Title, Poster: item.Poster, IMDB: item.imdbID });
            })
            return Promise.resolve(moviePage);
        })
        .then(body => {
            fetchURL = 'http://www.omdbapi.com/?apikey=86c39163&s=' + name + '&page=2'
            fetch(fetchURL)
                .then(r => r.json())
                .then(body => {
                    console.log(body);
                    body.Search.forEach(function (item) {
                        moviePage.push({ Title: item.Title, Poster: item.Poster, IMDB: item.imdbID });
                    })
                    res.send(moviePage);
                })

        })

});




module.exports = router;