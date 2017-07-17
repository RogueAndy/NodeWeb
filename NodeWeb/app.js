var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.listen(port);

console.log('imooc start on port ' + port);

// index page
app.get('/', function(req, res) {
    res.render('index', {
        title: 'imooc 首页',
        movies: [{
          title: '机械战警',
          _id: 1,
          poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
        },
          {
            title: '机械战警',
            _id: 1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
          },
          {
            title: '机械战警',
            _id: 1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
          },
          {
            title: '机械战警',
            _id: 1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
          },
          {
            title: '机械战警',
            _id: 1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
          },
          {
            title: '机械战警',
            _id: 1,
            poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
          }
          ]
    });
});

// detail page
app.get('/movie/:id', function(req, res) {
    res.render('detail', {
      title: 'imooc 详情页',
      movie: {
        doctor: '何塞帕迪里亚',
        country: '美国',
        title: '机械战警',
        year: 2014,
        poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
        language: '英语',
        flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
        summary: '想到自己将欠上140多万的债务，就感到未来很无力。2008年遇上金融危机，' +
        '坐立不安，还好遇上了四万亿。2011年给自己订的目标是到2020年将家庭负债降低到40万元内。' +
        '结果，2013年为了小孩读书又被迫举债了近百万买了学区房。这些年，但总有种对危机的恐惧' +
        '。坚持至今，虽然生活质量下降不少，但到明年此8月家庭负债基本就没有了'

      }
    });
});

// admin page
app.get('/admin/movie', function(req, res) {
    res.render('admin', {
      title: 'imooc 后台录入页',
      movie: {
        doctor: '',
        country: '',
        title: '',
        year: '',
        poster: '',
        language: '',
        flash: '',
        summary: ''
      }
    });
});

// list page
app.get('/admin/list', function(req, res) {
    res.render('list', {
      title: 'imooc 列表页',
      movies: [{
        doctor: '何塞帕迪里亚',
        country: '美国',
        title: '机械战警',
        year: 2014,
        poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
        language: '英语',
        flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
        summary: '想到自己将欠上140多万的债务，就感到未来很无力。2008年遇上金融危机，' +
        '坐立不安，还好遇上了四万亿。2011年给自己订的目标是到2020年将家庭负债降低到40万元内。' +
        '结果，2013年为了小孩读书又被迫举债了近百万买了学区房。这些年，但总有种对危机的恐惧' +
        '。坚持至今，虽然生活质量下降不少，但到明年此8月家庭负债基本就没有了'

      }]
    });
});