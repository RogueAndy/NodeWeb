/**
 * Created by rogue on 2017/7/21.
 */

var _ = require('underscore');
var Movie = require('../models/movie');
var Comment = require('../models/movie');

// detail page
exports.detail = function(req, res) {
  var id = req.params.id;
  
  Movie.findById(id, function (err, movie) {
    Comment.findByMovieId(id, function (err1, comments) {
      res.render('detail', {
        title:'imooc ' + movie.title,
        movie: movie,
        comments: comments
      });
    });
  });
  
  // Movie.findById(id, function(err, movie) {
  //   Comment
  //     .find({movie: id})
  //     // .populate('users', 'name')
  //     .exec(function (err, comments) {
  //       res.render('detail', {
  //         title: 'imooc ' + movie.title,
  //         movie: movie,
  //         comments: comments
  //       });
  //   });
  // });
};

// admin page
exports.new = function(req, res) {
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
};

// admin update movie
exports.update = function(req, res) {
  var id = req.params.id;
  if(id) {
    Movie.findById(id, function(err, movie) {
      res.render('admin', {
        title: 'imooc 后台更新',
        movie: movie
      });
    });
  }
};

exports.save = function(req, res) {

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
};

exports.list = function(req, res) {

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
};

// list delete movie
exports.del = function(req,res){
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
};