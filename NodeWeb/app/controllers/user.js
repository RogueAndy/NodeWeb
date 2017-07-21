/**
 * Created by rogue on 2017/7/21.
 */

var User = require('../models/user');

// signup
exports.signup = function(req, res) {

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

};

// signin

exports.signin = function(req, res) {

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
};

// logout

exports.logout = function (req, res) {

  delete req.session.user;
  // delete app.locals.user;
  res.redirect('/');

};

// userlist page

exports.list = function(req, res) {
  User.fetch(function(err, users) {
    if(err) {
      console.log(err);
    }

    res.render('userlist', {
      title: 'imooc 用户列表页',
      users: users
    });
  });
};

// userlist delete user

exports.del = function (req, res) {
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
};