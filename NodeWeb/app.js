var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sessionParser = require('express-session');
var multipart = require('connect-multiparty');
var port = process.env.PORT || 3000;
var app = express();

var mongoose = require('mongoose');
var mongooseStore = require('connect-mongo')(sessionParser);
mongoose.Promise = global.Promise;

var dbUrl = 'mongodb://localhost/imooc';
mongoose.connect(dbUrl, {useMongoClient:true});

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(multipart());
app.use(sessionParser({
  secret: 'imooc',
  store: new mongooseStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));

app.locals.moment = require('moment');
app.listen(port);

// if('development' === app.get('env')) {
//   app.set('showStackError', true);
//   app.use(express.logger(': method :url :status'));
//   app.locals.pretty = true;
//   mongoose.set('debug', true);
// }

require('./config/routes')(app);
console.log('imooc start on port ' + port);
