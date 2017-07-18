var express = require('express');
var path = require('path');
var _ = require('underscore');
var Movie= require('./models/movie');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/imooc', {useMongoClient:true});

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('imooc start on port ' + port);

// index page
app.get('/', function(req, res) {

  Movie.fetch(function(err, movies) {
    if(err) {
      console.log(err);
    }

  });

  res.render('index', {
      title: 'imooc 首页',
      movies: []
  });
});

// detail page
app.get('/movie/:id', function(req, res) {

  var id = req.params.id;
  Movie.findById(id, function(err, movie) {
    res.render('detail', {
      title: 'imooc ' + movie.title,
      movie: movie
    });
  });

});

// admin page
app.get('/admin/movie', function(req, res) {
  res.render('admin', {
    title: 'imooc 后台录入页',
    movie: {
      doctor: '',
      country: '',
      title: '',
      year: '',
      poster: '',
      language: '',
      flash: '',
      summary: ''
    }
  });
});

// admin update movie
app.get('/admin/update:id', function(req, res) {
  var id = req.params.id;

  if(id) {
    Movie.findById(id, function(err, movie) {
      res.render('admin', {
        title: 'imooc 后台更新',
        movie: movie
      });
    });
  }
});

app.post('/admin/movie/new', function(req, res) {
  console.log('wwwwwwwww');
  return;
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  if(id != 'undefined') {
    Movie.findById(id, function(err, movie) {
      if(err) {
        console.log(err);
      }

      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie) {
        if(err) {
          console.log(err);
        }
        res.redirect('/movie/' + movie._id);
      });
    });
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    });

    _movie.save(function(err, movie) {
      if(err) {
        console.log(err);
      }

      res.redirect('/movie/' + movie._id);
    });
  }
});

app.get('/admin/list', function(req, res) {
  Movie.fetch(function(err, movies) {
    if(err) {
      console.log(err);
    }

    res.render('list', {
      title: 'imooc 列表页',
      movies: movies
    });
  });
});