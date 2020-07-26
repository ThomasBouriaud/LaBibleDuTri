var express = require('express');
var path = require('path');
var router = express.Router();

/* ========== ADD PAGES ========== */
router.get('/', function(req, res, next) {
    res.render('new', { title: 'New' });
});

router.post('/', function(req, res, next) {
    let nom = req.body.nom;
    let classe = req.body.classe;
    let remarque = req.body.remarque;

    let id = new Date().getTime();
    var payload = {"id": id, "nom": nom, "classe": classe, "remarque": remarque, "validated": false};

    console.log(`POST NEW : payload=${JSON.stringify(payload)}`);

    let filePath = path.join(__dirname, '..', 'public', 'data', 'data.json');

    let fs = require('fs');
    fs.readFile(filePath, function (err, data) {
        var json = JSON.parse(data);
        json.push(payload);

        fs.writeFile(filePath, JSON.stringify(json), err => { if (err) console.log(err) })
    })

    res.render('index', { title: 'Liste', message: "The element was successfully sent to the admin"});
});

module.exports = router;