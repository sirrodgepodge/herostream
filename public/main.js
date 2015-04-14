var playerScoot = 24;
var menuWidth = 285;

var menuClose = function() {
    $('.menu').animate({
      left: menuWidth*-1 + "px"
    }, 200);

    $('.player').animate({
      marginLeft: playerScoot + "px"
    }, 200);

    $('.icon-menu').animate({
      left: "0px"
    }, 200);
};

var bioClose = function() {
    $('.bio').animate({
      right: menuWidth*-1 + "px"
    }, 200);

    $('.icon-bio').animate({
      right: "0px"
    }, 200);

    $('.jumbotron').animate({
      backgroundPosition: "0px"
    }, 200);
};

var menuOpen = function() {
    $('.menu').animate({
      left: "0px"
    }, 200);

    $('.player').animate({
      marginLeft: menuWidth + playerScoot + "px"
    }, 200);

    $('.icon-menu').animate({
      left: menuWidth + "px"
    }, 200);

    bioClose();
};

var bioOpen = function() {
    $('.bio').animate({
      right: "0px"
    }, 200);

    $('.icon-bio').animate({
      right: menuWidth + "px"
    }, 200);
    
    $('.jumbotron').animate({
      backgroundPosition: menuWidth*-1 + "px"
    }, 200);

    menuClose();
};

var main = function() {
    /*open and close menu*/
    $('.icon-menu').click(menuOpen);
    $('.menu').find('.icon-close').click(menuClose);
    
    /*open and close bio*/
    $('.icon-bio').click(bioOpen);
    $('.bio').find('.icon-close').click(bioClose);

    /*Mouse Over steps*/

    $('.bottombuttons').filter('.notSelected').hover(function() {
	$(this).addClass('hover');
    },function(){
	(this).removeClass('hover');
    });

    $('.thumbs').filter('.notSelected').click(function(){
	var notSel = $(this).filter('.notSelected');
	$(this).filter('.selected').removeClass('selected').addClass('notSelected');
	notSel.addClass('selected').removeClass('notSelected');
    });

    $('#nextbutton').click(function() {
	$(this).removeClass('notSelected').addClass('selected');
	setTimeout(function(){
	    $(this).removeClass('selected').addClass('notSelected');
	}, 250);
	$('#currentvid').attr('src', '//www.youtube.com/embed/QFVsVnczYqY?rel=0&autoplay=1');
	$('.jumbotron').css('background', "url('/images/peterthiel.jpg') 0 /cover");
  });
};

var videosizer = function() {
    var cw = $('.videobox').height();
    $('.videobox').css({'width':(cw * 4/3) +'px'});
    $('#oval').css({'width':(cw * 4/3) +'px'});
    $('#oval').css({'marginTop': (cw + 10) +'px'});
    $('.player').css({'marginTop': (cw * 0.75) +'px'});
    $('.bottombuttons').css({'height': ($('#oval').height()) + 'px'});
//    var thumbwidth = $('#thumbup').width();
    var thumbwidth = 0.15;
    $('#thumbup').css({'marginLeft': (cw * 0.16) +'px'});
    $('#thumbdown').css({'marginLeft': (cw * 4/3 - cw* 4/3 * thumbwidth - cw * 0.67) +'px'});
    $('#nextbutton').css({'marginLeft': (cw * 4/3 - cw* 4/3 * thumbwidth - cw *0.33) +'px'});
    if($('.player').marginLeft != "24px") {
        $('.player').css({'visibility': 'visible'});
	$('.player').animate({
		marginLeft: "24px"
        }, 600);
    }
};

$(window).resize(videosizer);
$(window).bind('load', videosizer);
$(document).ready(main);
