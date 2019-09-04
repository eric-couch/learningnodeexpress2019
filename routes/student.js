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

router.get('/getStudent', function (req, res, next) {
    let name = req.query.name;
    let studentsFound = [];
    students.forEach(function (student) {
        if (student.firstName.startsWith(name)) {
            studentsFound.push(student)
        }
    })
    res.send(studentsFound);
})

// router.get('/getStudentByAge', function (req, res, next) {
//     if (req.query.minAge && req.query.maxAge) {
//         let matchingStudents = students.filter(
//             student => student.age >= req.query.minAge && student.age <= req.query.maxAge
//         );
//         let response = "";
//         matchingStudents.forEach(function (student) {
//             response += `name: ${student.firstName} ${student.lastName}<br>age: ${
//                 student.age
//                 }<br>email: ${student.email}<hr>`;
//         });
//         res.send(response);
//     } else {
//         res.send("bad input");
//     }
// });

router.get('/getStudentByAge', function (req, res, next) {
    let minAge = req.query.minAge;
    let maxAge = req.query.maxAge;
    let matchingAgeStudents = [];
    students.forEach(function (student) {
        if (student.age >= minAge && student.age <= maxAge) {
            matchingAgeStudents.push(student);
        }
    });
    res.send(matchingAgeStudents);
});

module.exports = router;