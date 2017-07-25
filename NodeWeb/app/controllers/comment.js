/**
 * Created by rogue on 2017/7/24.
 */

var Comment = require('../models/comment');

exports.save = function (req, res) {
  var _comment = req.body;
  var para_comment = new Comment({
    from: _comment.fromid,
    movie: _comment.movieid,
    content: _comment.content
  });
  
  var movieId = _comment.movieid;
  var comment = new Comment(para_comment);

  comment.save(function (err, movie) {
    if(err) {
      console.log(err);
    }

    res.redirect('/movie/' + movieId);
  });
};