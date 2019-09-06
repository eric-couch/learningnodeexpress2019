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

router.get('/searchMovie', function (req, res, next) {
    let name = req.query.name;
    let fetchURL = 'http://www.omdbapi.com/?apikey=86c39163&s=' + name;
    console.log(fetchURL);
    fetch(fetchURL)
        .then(r => r.json())
        .then(body => {
            body.Search.forEach(function (item) {
                moviePage.push({ Title: item.Title, Poster: item.Poster, IMDB: item.imdbID });
            })
            return Promise.resolve(moviePage);
        })
        .then(body => {
            //let movies = [];
            body.forEach(function (item) {
                let detailURL = 'http://www.omdbapi.com/?apikey=86c39163&i=' + item.IMDB;
                console.log(detailURL);
                fetch(detailURL)
                    .then(r => r.json())
                    .then(body => {
                        // let movies = "";
                        // movies += body.Title + '<br>' + body.Actors + '<img src="' + body.Poster + '">';
                        //item.Actors = body.Actors;
                        moviePage.push({ Title: body.Title, Poster: body.Poster, Actors: body.Actors });
                    })
                return Promise.resolve(moviePage);
                // .then(body => res.send(body));
            })
            res.send(body)
        });

});


module.exports = router;