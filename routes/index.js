var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'IChangedThis' });
});

router.get('/getData', function (req, res, next) {
  res.json({ title: 'ThisIsStillJSON' });
});

module.exports = router;
