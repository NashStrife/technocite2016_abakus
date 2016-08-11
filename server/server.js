let express = require('express');
let bodyParser = require('body-parser');

let api = require('./api/api');
let logger = require(`${process.cwd()}/server/utils/logger`);
// get the db module
let db = require(`${process.cwd()}/server/utils/db`);
// use the config module to check if we are in dev mode or not
let config = require(`${process.cwd()}/server/config/config`);
let app = express();
// launch the connection to the db thanks to utils/db.js once for all the app
db.config();
// if "seed" is set to "true" in the config module
if (config.seed) {
    logger.log("--- SERVER : Config Seed");
    // use the seed module to add some data to the db
    require('./utils/seed');
}

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// if we use a static route
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser());
app.use(bodyParser.json());

app.use('/api', api);

// we go to the / url and not /api/...
app.use('/', function(req, res){
    res.status(200);
  	res.sendFile(`${process.cwd()}/public/index.html`);
});



app.use(function(err,req,res,next){
   logger.warn(err.message);
   res.status(500).send('Oops server is in a bad mood !'); 
});

module.exports = app;

