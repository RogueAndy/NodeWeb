/**
 * Created by rogue on 2017/7/21.
 */

var User = require('../models/user');

// show signup
exports.showSignup = function (req, res) {
  res.render('signup', {
    title: '注册页面'
  });
};

// show signin
exports.showSignin = function (req, res) {
  res.render('signin', {
    title: '登录页面'
  });
};


// signup
exports.signup = function(req, res) {

  var _user = req.body;

  User.find({name: _user.name}, function (err, resUser) {
    if(err) {
      console.log(err);
    }

    if(resUser.length > 0) {
      return res.redirect('/signin');
    }

    var user = new User(_user);
    user.save(function(err, save_user) {
      if(err) {
        console.log(err);
      }

      res.redirect('/');
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
      return res.redirect('/signup');
    }

    res_user.comparePassword(password, function (err, isMatch) {
      if(err) {
        console.log(err);
      }

      if(isMatch) {
        req.session.user = res_user;
        return res.redirect('/admin/userlist');
      } else {
        return res.redirect('/signin');
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
  
  // var user = req.session.user;
  //
  // if(!user) {
  //   return res.redirect('/signin');
  // }
  //
  // if(user.role > 10) {
  //
  //   User.fetch(function(err, users) {
  //     if(err) {
  //       console.log(err);
  //     }
  //
  //     res.render('userlist', {
  //       title: 'imooc 用户列表页',
  //       users: users
  //     });
  //   });
  //
  // }
};

// signinRequired
exports.signinRequired = function (req, res, next) {
  var user = req.session.user;
  if(!user) {
    return res.redirect('/signin');
  }
  
  next();
};

// adminRequired
exports.adminRequired = function (req, res, next) {
  var user = req.session.user;
  if(user.role <= 10) {
    return res.redirect('/');
  }
  
  next();
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