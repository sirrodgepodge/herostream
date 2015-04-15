//design input vars
var playerScoot = 24;
var menuWidth = 285;

var $player = $('#player')
var $videobox = $('#videobox');
var $oval = $('#oval');
var $menu = $('#menu');
var $bio = $('#bio');
var $iconMenu = $('#icon-menu');
var $iconBio = $('#icon-bio');
var $jumbotron = $('.jumbotron');
var $currentVid = $('#current-vid')
var $bottomButtons = $('#oval').find('img');
var $nextButton = $('#next-button');
var $thumbs = $('.thumbs');
var $thumbUp = $('#thumb-up');
var $thumbDown = $('#thumb-down');

var menuClose = function() {
    $menu.animate({
      left: menuWidth*-1 + "px"
    }, 200);

    $player.animate({
      marginLeft: playerScoot + "px"
    }, 200);

    $iconMenu.animate({
      left: "0px"
    }, 200);
};

var bioClose = function() {
    $bio.animate({
      right: menuWidth*-1 + "px"
    }, 200);

    $iconBio.animate({
      right: "0px"
    }, 200);

    $jumbotron.animate({
      backgroundPosition: "0px"
    }, 200);
};

var menuOpen = function() {
    $menu.animate({
      left: "0px"
    }, 200);

    $player.animate({
      marginLeft: menuWidth + playerScoot + "px"
    }, 200);

    $iconMenu.animate({
      left: menuWidth + "px"
    }, 200);

    bioClose();
};

var bioOpen = function() {
    $bio.animate({
      right: "0px"
    }, 200);

    $iconBio.animate({
      right: menuWidth + "px"
    }, 200);
    
    $jumbotron.animate({
      backgroundPosition: menuWidth*-1 + "px"
    }, 200);

    menuClose();
};

var main = function() {
    /*open and close menu*/
    $iconMenu.click(menuOpen);
    $menu.find('.icon-close').click(menuClose);
    
    /*open and close bio*/
    $iconBio.click(bioOpen);
    $bio.find('.icon-close').click(bioClose);

    /*Mouse Over steps*/

    $bottomButtons.not('.selected').hover(function() {
	$(this).addClass('hover');
    },function(){
	$(this).removeClass('hover');
    });

    $thumbs.not('.selected').click(function(){
	var notSel = $(this).not('.selected');
	$thumbs.filter('.selected').removeClass('selected');
	notSel.addClass('selected');
    });

    $nextButton.click(function() {
	$(this).addClass('selected');
	setTimeout(function(){
	    $nextButton.removeClass('selected');
	}, 250);
	$currentVid.attr('src', '//www.youtube.com/embed/QFVsVnczYqY?rel=0&autoplay=1');
	$jumbotron.css('background', "url('/images/peterthiel.jpg') 0 /cover");
  });
};

var videosizer = function() {
    var cw = $videobox.height();
    
    $videobox.css({'width':(cw * 4/3) +'px'});
    $oval.css({'width':(cw * 4/3) +'px'}).css({'marginTop': (cw + 10) +'px'});
    $player.css({'marginTop': (cw * 0.75) +'px'});
    $bottombuttons.css({'height': ($oval.height()) + 'px'});
//    var thumbwidth = $('#thumbup').width();
    var thumbwidth = 0.15;
    $thumbUp.css({'marginLeft': (cw * 0.16) +'px'});
    $thumbDown.css({'marginLeft': (cw * 4/3 - cw* 4/3 * thumbwidth - cw * 0.67) +'px'});
    $nextButton.css({'marginLeft': (cw * 4/3 - cw* 4/3 * thumbwidth - cw *0.33) +'px'});
    if($player.marginLeft != "24px") {
        $player.css({'visibility': 'visible'});
	$player.animate({
		marginLeft: "24px"
        }, 600);
    }
};

$(window).resize(videosizer);
$(window).bind('load', videosizer);
$(document).ready(main);
