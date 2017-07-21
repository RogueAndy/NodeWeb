/**
 * Created by rogue on 2017/7/20.
 */

var mongoose = require('mongoose');
var UserScheme = require('../schemas/user');
var User = mongoose.model('User', UserScheme);

module.exports = User;