/**
 * Created by rogue on 2017/7/25.
 */

$(function() {
  $('.comment-user').click(function(e) {
    var target = $(this);
    var toId = target.data('tid');
    var commentId = target.data('cid');
    
    $('<input>').attr({
      type: 'hidden',
      name: 'tid',
      value: toId
    }).appendTo('#commentForm');
  
    $('<input>').attr({
      type: 'hidden',
      name: 'cid',
      value: commentId
    }).appendTo('#commentForm');
  });
});