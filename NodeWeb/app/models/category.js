/**
 * Created by rogue on 2017/7/26.
 */

var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category');
var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;