var express = require('express'),
    fs = require('fs');
var cool = require('cool-ascii-faces');
// cors = require('cors'),
// mongoose = require('mongoose'),
// bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/getCup', function(req, res) {
    fs.readFile('./public/users.json', 'utf-8', function(err, data) {
        if (err) throw err;

        var jsonArr = JSON.parse(data);
        // var newUser = {
        // 	name: 'pablito',
        // 	email: 'pablo.ciento@gmail.com'
        // }
        // jsonArr.users.push(newUser);
        console.log(jsonArr);

        fs.writeFile('./public/users.json', JSON.stringify(jsonArr), 'utf-8', function(err) {
            if (err) throw err;
            console.log('Done!')
        })
    })
})

app.get('/surprise', function(req, res) {
    res.send('Paweł przesyła Basi moc buziaków!  cmok! cmok! cmok!!!');
})

app.get('/czykocha', function(req, res) {
    res.send('Paweł kocha bardzo Basię!!!');
})

app.get('/oczy', function(req, res) {
    res.send(cool());
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});