/**
 * Created by rogue on 2017/7/21.
 */

var _ = require('underscore');
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');
var Comment = require('../app/controllers/comment');
var Category = require('../app/controllers/category');

module.exports = function(app) {

  // pre handle user

  app.use(function (req, res, next) {
    var _user = req.session.user;
    app.locals.user = _user;
    next();
  });

  /* Index */
  app.get('/', Index.index);

  /* User */

  app.post('/user/signup', User.signup);
  app.post('/user/signin', User.signin);
  app.get('/signin', User.showSignin);
  app.get('/signup', User.showSignup);
  app.get('/logout', User.logout);
  app.get('/admin/userlist', User.signinRequired, User.adminRequired, User.list);
  app.delete('/admin/userlist', User.del);

  /* Movie */
  app.post('/admin/movie', User.signinRequired, User.adminRequired, Movie.savePoster, Movie.save);
  app.get('/movie/:id', Movie.detail);
  app.get('/admin/movie/update/:id', User.signinRequired, User.adminRequired, Movie.update);
  app.get('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.new);
  app.get('/admin/movie/list', Movie.list);
  app.delete('/admin/movie/list', User.signinRequired, User.adminRequired, Movie.del);
  
  /* Comment */
  app.post('/admin/user/comment', User.signinRequired, Comment.save);
  app.post('/comment/reply', User.signinRequired, Comment.replyToUser);
  
  /* Category */
  app.get('/admin/category/new', User.signinRequired, User.adminRequired, Category.new);
  app.get('/admin/category/list', User.signinRequired, User.adminRequired, Category.list);
  app.post('/admin/category', User.signinRequired, User.adminRequired, Category.save);
  
  /* results */
  app.get('/results', Index.search);
};

