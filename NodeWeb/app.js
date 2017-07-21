var express = require('express');
var path = require('path');
var _ = require('underscore');
var Movie = require('./models/movie');
var User = require('./models/user');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sessionParser = require('express-session');
var port = process.env.PORT || 3000;
var app = express();

var mongoose = require('mongoose');
var mongooseStore = require('connect-mongo')(sessionParser);
mongoose.Promise = global.Promise;

var dbUrl = 'mongodb://localhost/imooc';
mongoose.connect(dbUrl, {useMongoClient:true});

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(sessionParser({
  secret: 'imooc',
  store: new mongooseStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));
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

// signup
app.post('/user/signup', function(req, res) {

  var _user = req.body;

  User.find({name: _user.name}, function (err, resUser) {
    if(err) {
      console.log(err);
    }

    if(resUser.length > 0) {
      return res.redirect('/');
    }

    var user = new User(_user);
    user.save(function(err, save_user) {
      if(err) {
        console.log(err);
      }

      res.redirect('/admin/userlist');
    });
  });

});

// signin

app.post('/user/signin', function(req, res) {

  var _user = req.body;
  var name = _user.name;
  var password = _user.password;

  User.findOne({name: name}, function (err, res_user) {
    if(err) {
      console.log(err);
    }

    if(!res_user) {
      return res.redirect('/');
    }

    res_user.comparePassword(password, function (err, isMatch) {
      if(err) {
        console.log(err);
      }

      if(isMatch) {
        req.session.user = res_user;
        return res.redirect('/admin/list');
      } else {
        console.log('Password is not matched');
        return res.redirect('/');
      }
    });
  });

});

// userlist page

app.get('/admin/userlist', function(req, res) {
  User.fetch(function(err, users) {
    if(err) {
      console.log(err);
    }

    res.render('userlist', {
      title: 'imooc 用户列表页',
      users: users
    });
  });
});

// userlist delete user

app.delete('admin/userlist', function (req, res) {
  var id = req.query.id;
  if(id) {
    User.remove({_id: id}, function (err, user) {
      if(err) {
        console.log(err);
        return;
      }
      console.log('删除成功');
      res.json({success: 1});
    });
  }
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
      doctor: '大钟',
      country: '中国',
      title: '变形金刚1',
      year: '1999',
      poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
      language: '汉语',
      flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
      summary: '就感到未来很无力'
    }
  });
});

// admin update movie
app.get('/admin/update/:id', function(req, res) {
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

  var movieObj = req.body;
  var _movie;
  if(movieObj._id != 'undefined') {
    Movie.findById(movieObj._id, function(err, movie) {
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

  console.log('user in session: ');
  console.log(req.session.user);
  console.log('--------- over');

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

// list delete movie
app.delete('/admin/list',function(req,res){
  var id = req.query.id;
  if(id){
    Movie.remove({_id:id},function(err,movie){
      if(err){
        console.error(err);
      }else{
        console.log('删除成功');
        res.json({success:1});
      }
    });
  }
});