var express = require('express');
var colors = require("colors");
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/success', function (req, res) {
    res.render('success', req.query);
});
app.get('/failure', function (req, res) {
    res.render('failure', req.query);
});
app.get('/pending', function (req, res) {
    res.render('pending', req.query);
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/notificaciones', function (req, res) {
    console.log("////NOTIFICACIONES////".underline.yellow);
    console.log(req.body);
    console.log(req.query);
    console.log("////FIN NOTIFICACIONES////".underline.yellow);
    res.status(200).send("Ok")
});

app.listen(port);