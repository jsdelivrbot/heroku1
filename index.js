var express = require('express'),
    fs = require('fs'),
    cors = require('cors'),

    morgan = require('morgan'),
    config = require('./config'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    //User = require('./models/userModel');

var app = express();
var port = process.env.PORT || 5000;

app.set('port', port);

app.use(cors());

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

app.get('/getCup', function(req, res) {
    fs.readFile('./public/data/worldcup.json', 'utf-8', function(err, data) {
        if (err)
            throw err;

        var jsonArr = JSON.parse(data);
        res.send(JSON.stringify(jsonArr));
    })
})


// use morgan to log requests to the console
app.use(morgan('dev'));

mongoose.connect(config.db_dev); // connect to database
// TREE API ROUTES -----------------------------------------------------------
var apiRoutes = express.Router();

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


apiRoutes.post('/addUser', function(req, res) {
    var user = new User({
        email: req.body.email,
        pass: req.body.pass,
        name: req.body.name
    });
    console.log(user.email, user.pass);

    user.save(function(err) {
        if (err) {
            res.json({ error: user });
            throw err;
        }
        console.log('User saved successfully');
        res.json({ success: true });
    })
});

// apply the routes to our app with the /api prefix
app.use('/api', apiRoutes);




app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
    console.log('CORS-enabled web server listening on port  ' + port);
});