var menuClose = function() {
    $('.menu').animate({
      left: "-285px"
    }, 200);

    $('.player').animate({
      marginLeft: "24px"
    }, 200);

    $('.icon-menu').animate({
      left: "0px"
    }, 200);
}

var bioClose = function() {
    $('.bio').animate({
      right: "-285px"
    }, 200);

    $('.icon-bio').animate({
      right: "0px"
    }, 200);

    $('.jumbotron').animate({
      backgroundPosition: "0px"
    }, 200);
}

var menuOpen = function() {
    $('.menu').animate({
      left: "0px"
    }, 200);

    $('.player').animate({
      marginLeft: "309px"
    }, 200);

    $('.icon-menu').animate({
      left: "285px"
    }, 200);

    bioClose();
}

var bioOpen = function() {
    $('.bio').animate({
      right: "0px"
    }, 200);

    $('.icon-bio').animate({
      right: "285px"
    }, 200);

    $('.jumbotron').animate({
      backgroundPosition: "-285px"
    }, 200);

    menuClose();
}

var main = function() {
/* Push the body and the nav over by 285px over */
  $('.icon-menu').click(menuOpen());

  /* Then push them back */
  $('.menu .icon-close').click(menuClose());
  
  /* Push the body and the nav over by 285px over */
  $('.icon-bio').click(bioOpen());

  /* Then push them back */
  $('.bio .icon-close').click(bioClose());

/*Mouse Over steps*/

  $('.bottombuttons').mouseenter(function() {
    if ($(this).css('background-color') === 'rgb(255, 255, 255)') {
        $(this).css('background-color', 'lightblue')
        }
    }
  );

  $('.bottombuttons').mouseleave(function() {
    if ($(this).css('background-color') === 'rgb(173, 216, 230)') {
        $(this).css('background-color', 'white')
        }
    }
  );

  $('#thumbup').click(
      function() {
          if ($('#thumbdown').css('background-color') === 'rgb(115, 106, 255)') {
              $('#thumbdown').css('background-color', 'white')
          }

          if ($('#thumbup').css('background-color') === 'rgb(173, 216, 230)') {
              $('#thumbup').css('background-color', '#736AFF')
          }
          else {
              $('#thumbup').css('background-color', 'lightblue')
          }
      }
  );

  $('#thumbdown').click(
      function() {
          if ($('#thumbup').css('background-color') === 'rgb(115, 106, 255)') {
              $('#thumbup').css('background-color', 'white')
          }

          if ($('#thumbdown').css('background-color') === 'rgb(173, 216, 230)') {
              $('#thumbdown').css('background-color', '#736AFF')
          }
          else {
              $('#thumbdown').css('background-color', 'lightblue')
          }
      }
  );

  $('#nextbutton').click(function() {
      setTimeout($('#nextbutton').css('background-color', '#736AFF'), 155);
      $('#currentvid').attr('src', '//www.youtube.com/embed/QFVsVnczYqY?rel=0&autoplay=1');
      $('.jumbotron').css('background', "url('/images/peterthiel.jpg')");
  });
};

var videosizer = function() {
    var cw = $('.videobox').height();
    $('.videobox').css({'width':(cw * 4/3) +'px'});
    $('#oval').css({'width':(cw * 4/3) +'px'})
    $('#oval').css({'marginTop': (cw + 10) +'px'});
    $('.player').css({'marginTop': (cw *.75) +'px'});
    $('.bottombuttons').css({'height': ($('#oval').height()) + 'px'})
//    var thumbwidth = $('#thumbup').width();
    var thumbwidth = .15;
    $('#thumbup').css({'marginLeft': (cw * .16) +'px'})
    $('#thumbdown').css({'marginLeft': (cw * 4/3 - cw* 4/3 * thumbwidth - cw * .67) +'px'})
    $('#nextbutton').css({'marginLeft': (cw * 4/3 - cw* 4/3 * thumbwidth - cw * .33) +'px'})
    if($('.player').marginLeft != "24px") {
        $('.player').css({'visibility': 'visible'})
	$('.player').animate({
		marginLeft: "24px"
        }, 600);
    }
}


$(window).resize(videosizer);
$(window).bind('load', videosizer);
$(document).ready(main, videosizer);
