/**
 * Created by rogue on 2017/8/8.
 */

var http = require('http');
var AppKey = '0f29e0276ce34313a83e1566da58aca5';

exports.weatherWithAreaname = function (request, response) {

  var areaname = request.params.areaname;
  var paramEncode = encodeURI(areaname);
  var url = 'http://api.avatardata.cn/Weather/Query?key=' + AppKey + '&cityname=' + paramEncode;
  http.get(url, function (req, res) {
    var html='';
    req.on('data',function(data){
      html+=data;
    });
    req.on('end',function(){
      var code = html.error_code;
      response.json(html);
    });
  });

};