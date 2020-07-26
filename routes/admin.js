var express = require('express');
var path = require('path');
let fs = require('fs');
var router = express.Router();

/* ========== ADMIN PAGES ========== */
router.get('/', function (req, res, next) {
    res.render('admin', {title: 'Admin'});
});

router.put('/:id', function (req, res, next) {
    let id = parseInt(req.params.id);
    console.log(`PUT : validate id=${id}`);

    let filePath = path.join(__dirname, '..', 'public', 'data', 'data.json');
    fs.readFile(filePath, function (err, data) {
        var json = JSON.parse(data);

        json.forEach(e => {
            console.log(e);
            if (e.id === id) {
                e.validated = true;
            }
            console.log(e);
        })

        fs.writeFile(filePath, JSON.stringify(json), err => {
            if (err) console.log(err)
        })
    })
})

router.put('/', function (req, res, next) {
    let id = parseInt(req.body.id);
    let nom = req.body.nom;
    let classe = req.body.classe;
    let remarque = req.body.remarque;
    let validated = (req.body.validated == 'true');


    console.log(`PUT : update id=${id}, nom=${nom}, classe=${classe}, remarque=${remarque}, validated=${validated}`);

    let filePath = path.join(__dirname, '..', 'public', 'data', 'data.json');
    fs.readFile(filePath, function (err, data) {
        var json = JSON.parse(data);

        json.forEach(e => {
            if (e.id === id) {
                console.log("THIS IS THE ONE")
                console.log(e);
                e.nom = nom;
                e.classe = classe;
                e.remarque = remarque;
                e.validated = validated;
                console.log(e);
            }
        })

        fs.writeFile(filePath, JSON.stringify(json), err => {
            if (err) console.log(err)
        })
    })
});

router.delete('/:id', function (req, res, next) {
    let id = parseInt(req.params.id);
    console.log(`DELETE id ${id}`);

    let filePath = path.join(__dirname, '..', 'public', 'data', 'data.json');

    fs.readFile(filePath, function (err, data) {
        var json = JSON.parse(data);
        let array = json.filter(e => e.id !== id);

        fs.writeFile(filePath, JSON.stringify(array), err => {
            if (err) console.log(err)
        })
    })
})

module.exports = router;