var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'IChangedThis' });
});

router.get('/getData', function (req, res, next) {
  res.json({ title: 'ThisIsStillJSON' });
});

router.get('/colors', function (req, res, next) {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);
  res.json({ red: red, green: green, blue: blue });
})

module.exports = router;
