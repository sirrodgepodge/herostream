//design input vars
var playerScoot = 24;
var menuWidth = 285;

//jQuery object vars
var $playerBox = $('#player-box');
var $videoBox = $('#video-box');
var $oval = $('#oval');
var $menu = $('#menu');
var $bio = $('#bio');
var $iconMenu = $('#icon-menu');
var $iconBio = $('#icon-bio');
var $jumbotron = $('.jumbotron');
var $bottomButtons = $('#oval').find('img');
var $nextButton = $('#next-button');
var $thumbs = $('.thumbs');
var $thumbUp = $('#thumb-up');
var $thumbDown = $('#thumb-down');

//handle opening and closing menus
var menuClose = function() {
    $menu.animate({
      left: menuWidth*-1 + "px"
    }, 200);

    $playerBox.animate({
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

    $playerBox.animate({
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

//Creates interactive UI
var main = function() {
    //Open and close menu
    $iconMenu.on('click', menuOpen);
    $menu.on('click', '.icon-close', menuClose);
    
    //Open and close bio
    $iconBio.on('click', bioOpen);
    $bio.on('click', '.icon-close', bioClose);

    //Handle like and dislike selection
    $thumbs.not('.selected').click(function(){
	$thumbs.each(function() {
	    $(this).toggleClass('selected');
	});
    });
};
$(document).ready(main);

//Handles playerbox sizing
var videosizer = function(callback) {
    var cw = +$videoBox.height();
    $videoBox.css({'width':(cw * 4/3) +'px'});
    $oval.css({'width':(cw * 4/3) +'px'}).css({'marginTop': (cw + 10) +'px'});
    $playerBox.css({'marginTop': (cw * 0.75) +'px'});
    $bottomButtons.css({'height': ($oval.height()) + 'px'});
//    var thumbwidth = $('#thumbup').width();
    var thumbwidth = 0.15;
    $thumbUp.css({'marginLeft': (cw * 0.16) +'px'});
    $thumbDown.css({'marginLeft': (cw * 4/3 - cw* 4/3 * thumbwidth - cw * 0.67) +'px'});
    $nextButton.css({'marginLeft': (cw * 4/3 - cw* 4/3 * thumbwidth - cw *0.33) +'px'});
    if(typeof callback==='function') callback();
};

//Animates playerbox entrance
var playerScootch = function() {
    $playerBox.css({'visibility': 'visible'});
    $playerBox.animate({
        marginLeft: "24px"
    }, 600);
};

$(window).resize(videosizer);
$(window).bind('load', videosizer(playerScootch));

//Handles changing videos
function onYoutubeIframeAPIReady() {
    /*
    //Once player is loaded
      function onPlayerReady(event) {
      }
    */

    //When current video finishes
    function onPlayerStateChange(event) {
        if(event.date == 0){
            nextVid();
        }
    }

    //Create video player objects
    var playerEvents = {
        events: {
            //'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': nextVid
        }
    };
    
    //store two player objects in an array for pre-loading purposes
    var player = [new YT.Player('vid1', playerEvents),
                  new YT.Player('vid2', playerEvents)];

    //variable to track which player is currently displayed
    var whichVid = 0;

    //go to next video
    var nextVid = function(callback) {
	////handle css
	//shows pre-loaded player, hides current player
	$videoBox.find('iframe').each(function() {
	    $(this).toggleClass('next-vid');
	});
	//switches background image
	//////figure out how to pre-load background images and swap!!!!
	$jumbotron.css('background', "url('/images/peterthiel.jpg') 0 /cover");
        
        ////handles player API
	//stop current video in current player
	player[whichVid].stopVideo();
	//pre-loads next after next
        player[whichVid].loadVideoById({
            videoId: 'NU7W7qe2R0A',
            startSeconds: 0,
            endSeconds: 10
        });
	//switches selected player
	whichVid = 1-whichVid;
	//play next
	player[whichVid].playVideo();

	//run callback if provided
	typeof callback === 'function' && callback();
    };
    
    //handles clicking next button
    $nextButton.on('click', function() {
	$this = $(this);
	$this.addClass('selected');
	nextVid($this.removeClass('selected'));
    });
}
