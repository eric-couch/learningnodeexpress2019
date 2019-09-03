var express = require('express');
var router = express.Router();

let students = [
    {
        firstName: "Matthias",
        lastName: "Sam",
        age: 29,
        email: "msam@my.edgetechacademy.edu"
    },
    {
        firstName: "Tim",
        lastName: "Wenzel",
        age: 45,
        email: "twenzeltwenzel@outlook.com"
    },
    {
        firstName: "Joshua",
        lastName: "Carter",
        age: 32,
        email: "upsetitguy@gmail.com"
    },
    {
        firstName: "Brandon",
        lastName: "Anderson",
        age: 34,
        email: "banderson6@my.edgetechacademy.edu"
    },
    {
        firstName: "Ken",
        lastName: "Thepvongsa",
        age: 40,
        email: "thepvongsa@yahoo.com"
    },
    {
        firstName: "Marcus",
        lastName: "Beach",
        age: 36,
        email: "twistymb@gmail.com"
    },
    {
        firstName: "Tony",
        lastName: "Orozco",
        middleName: "Frank",
        age: 35,
        email: "aorozco1@my.edgetechacademy.edu"
    }
];



/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(students);
});

module.exports = router;