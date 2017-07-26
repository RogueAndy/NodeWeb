/**
 * Created by rogue on 2017/7/26.
 */

var _ = require('underscore');
// var Movie = require('../models/movie');
// var Comment = require('../models/comment');
var Category = require('../models/category');

// admin page
exports.new = function(req, res) {
  res.render('category_admin', {
    title: 'imooc 后台分类录入页',
    category: {
    
    }
  });
};

exports.save = function(req, res) {
  
  var categoryObj = req.body;
  var category;
  
  category = new Category({
    name: categoryObj.name,
    movies: categoryObj.movies
  });
  
  category.save(function(err, category) {
    if(err) {
      console.log(err);
    }
    
    res.redirect('/admin/category/list');
  });
};

exports.list = function(req, res) {
  
  Category.fetch(function(err, categories) {
    if(err) {
      console.log(err);
    }
    
    res.render('categorylist', {
      title: 'imooc 分类列表页',
      categories: categories
    });
  });
};