/**
 * Created by rogue on 2017/7/21.
 */

var _ = require('underscore');
var Index = require('../app/controllers/index');
var User = require('../app/controllers/user');
var Movie = require('../app/controllers/movie');

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
  app.get('/logout', User.logout);
  app.get('/admin/userlist', User.list);
  app.delete('/admin/userlist', User.del);

  /* Movie */
  app.post('/admin/movie', Movie.save);
  app.get('/movie/:id', Movie.detail);
  app.get('/admin/update/:id', Movie.update);
  app.get('/admin/new', Movie.new);
  app.get('/admin/list', Movie.list);
  app.delete('/admin/list', Movie.del);

};

