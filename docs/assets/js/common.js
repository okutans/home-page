

var APP = APP || {};

APP.GLOBAL = {

	isOLDIE: false,

	isSP: false,

	isTABLET: false,

	isPC: false,

	isSP_VIEW: false,

	SCRL_TOP: 0,

	TIME: null,

	VIEW_PORT: null,

	UA: navigator.userAgent,



	init : function(){

		var A = this;

		

		// isOLDIE

		if(A.UA.search(/msie [6.]|msie [7.]|msie [8.]/i) !=-1){

			A.isOLDIE = true;

			$('body').addClass('is-oldie');

		}



		// 各種デバイス判定 & meta viewport書き込み

		//////////////////////

		if(A.UA.search(/iphone/i) !=-1 || A.UA.search(/ipod/i) !=-1 || ( A.UA.search(/android/i) !=-1 && A.UA.search(/mobile/i) !=-1)){

		// スマホ判定

			A.isSP = true;

			$('body').addClass('is-sp');



		}else if(A.UA.search(/ipad/i) !=-1 || A.UA.search(/android/i) !=-1){

		// タブレット判定

			A.isTABLET = true;

			$('meta[name="viewport"]').remove();

			$('head').append('<meta name="viewport" content="width=1000">');

			$('body').addClass('is-tb');

		}else{

		// PC判定

			A.isPC = true;

			$('body').addClass('is-pc');

		}

		



		// output_VIEW_PORT

		var output_VIEW_PORT = function(){

			$(window).resize(function(){

				if(A.isOLDIE){

					A.VIEW_PORT = document.body.clientWidth;// IE8以下用

				}else{

					A.VIEW_PORT = window.innerWidth;// その他ブラウザ用



				}

			}).trigger('resize');

		};

		output_VIEW_PORT();



		// output_SCRL_TOP

		var output_SCRL_TOP = function() {

			$(document).scroll(function() {

				A.SCRL_TOP = ($('body').scrollTop() || $('html').scrollTop());

			}).trigger('scroll');

		};

		output_SCRL_TOP();





		// output_isSP_VIEW

		var output_isSP_VIEW = function(){

			var BREAK_POINT = 750;



			$(window).on('resize', function(){

				if( !A.isOLDIE && A.VIEW_PORT <= BREAK_POINT ){

					A.isSP_VIEW = true;

				}else{

					A.isSP_VIEW = false;

				}



			}).trigger('resize');

		};

		output_isSP_VIEW();





///////////////////////////////////

/////

/////	smooth scroll

/////

///////////////////////////////////

		var pageTopSmooth = function(){

			var modeFlag = $('body').hasClass('is-pc');





			/////	sp pagetop html create

			var page_top = $('#tpl-pagetop-box').html();

			$('#sp-pagetop-box').prepend(page_top);



			// pc tablet 用

			var pc_tab_Scrl = function(){

				$('#tpl-pagetop a[href^=#], .anchor-list a[href^=#],.anchor-list-staff a[href^=#]').click(function () {

					var headerHeig = 0;



					if( $(this).parents().hasClass('anchor-list-staff')){ //クリックされた親要素判定

						headerHeig = 200;

					} else {

						headerHeig = 60;

					}

				    var href = $(this).attr("href"),

				        target = $(href === "#" || href === "" ? 'html' : href);

				    target.velocity("scroll", { duration: 1200, offset: -headerHeig, easing: "easeOutCubic" });

				    return false;

				 });

			};



			//sp 用

			var sp_Scrl = function(){

				$('#tpl-pagetop a[href^=#], .anchor-list a[href^=#]').click(function(){

					var speed = 1000;

					var href= $(this).attr("href");

					var target = $(href == "#" || href == "" ? 'html' : href);

					var position = target.offset().top;

					$("html, body").animate({scrollTop:position}, speed, "easeOutCubic");

					return false;

				});

			};



			if(modeFlag || APP.GLOBAL.isTABLET){

				//for PC

				pc_tab_Scrl();



			}else {

				//for SP

				sp_Scrl();



			}



		};

		pageTopSmooth();











///////////////////////////////////

/////

/////	global nav fixed

/////

///////////////////////////////////



var gnavFixed = function(){



		//element

		var $headerInner = $("#tpl-header .tpl-inner-wrap");

		var $gnavWrap = $("#global-nav-wrap");

		var $header = $("#header");

		var $gnav = $("#global-nav");





$(window).on('resize.gnavFixed', function(){

	if(APP.GLOBAL.isSP_VIEW){

	/////////// SP ///////////

	$headerInner.addClass('fixed');



	}else{

	/////////// PC ///////////

	$headerInner.removeClass('fixed');



	var topFlag = $('html').hasClass('top');

	if(topFlag){

		///// top /////

		var gnavPos = $gnavWrap.offset().top + 10;



	}else{

		///// other /////

		var gnavPos = $gnavWrap.offset().top + 10;

	}



		$(window).on('scroll.pcFixed',function(){

			var scrTop = $(window).scrollTop();



			if(scrTop >= gnavPos) {

				$gnav.addClass('fixed');

			}else {

				$gnav.removeClass('fixed');

			}

		});





	}

}).trigger('resize');



};

gnavFixed();





	}





};





// 特定classで発火するお役立ち系

////////////////////////

APP.CLASS_UTIL = {

	init: function(){

		// hover_opacity

		if(!APP.GLOBAL.isOLDIE && !APP.GLOBAL.isSP && !APP.GLOBAL.isTABLET){

			var hover_opacity = function(){

				$(".hover-opacity").hover(function(){

					$(this).prepend('<div class="over"></div>');

				},function(){

					$(this).find('.over').remove();

				});

			};

			hover_opacity();

		}



		$(window).on('load',function(){

			$('.category-title .inner').addClass('animation');

		});



		// if( !APP.GLOBAL.isOLDIE ){

		// 	var hover_opacity = function(){

		// 		$(".hover-opacity").hover(function(){

		// 			$(this).prepend('<div class="over"></div>');

		// 			// $(this)	.css({

		// 			// 	"opacity": "0.7"

		// 			// });

		// 		},function(){

		// 			$(this).find('.over').remove();

		// 			// $(this)	.css({

		// 			// 	"opacity": "1.00"

		// 			// });

		// 		});

		// 	};

			// hover_opacity();

		// }



	}

};





$(function(){

	APP.GLOBAL.init();

	APP.CLASS_UTIL.init();





///////////////////////////////////

/////

/////	sp menu html create

/////

///////////////////////////////////



	var spHtmlCreate = function(){





		// html setting

		var spMenuHtml = $('<div id="sidr">' +

													'<div id="sp-global-nav-wrap">' +

													'<p class="menu-title">MENU</p>' +

													'<div id="sp-global-nav">' +

														'<nav>' +

															'<ul id="sp-nav-list">' +

															'</ul>' +
/*
															'<div id="sp-tel">' +


																'<a href="tel:0120-900-599">' +

																	'<div>' +

																		'<span class="note"></span>' +

																		'<p><span class="num"></span></p>' +

																	'</div>' +

																'</a>' +

															'</div>' +
*/
															'<div id="sp-nav-close">' +

																'<a href=""><p>閉じる</p></a>' +

															'</div>' +

														'</nav>' +

													'</div>' +

												'</div>' +

												'</div>'

											);



		// html create

		$('#tpl-footer').after(spMenuHtml);



		var gnavDom = $('#global-nav li');		// global nav

		var hdLink = $('#header-links li');		// head link

		var infoTxt = $('#info-wrap .text');	// information text

		var telNum = $('#info-wrap .tel img');		// telphone number



		// global nav append

		gnavDom.each(function(){

			var gnavElm = $(this).html();	// html取得

			$('#sp-nav-list').append('<li>'+gnavElm+'</li>');	//html出力

			// alert(gnavEl);

		});



		// headlink append

		hdLink.each(function(){

			var hdLinkElm = $(this).html();	// html取得

			$('#sp-nav-list').append('<li>'+hdLinkElm+'</li>');	//html出力

		});



		// information text append

		var infoTxtElm = infoTxt.html();	// html取得

		$('#sp-tel .note').append(infoTxtElm);	//html出力





		// telphone number

		var telNumElm = telNum.attr('alt');	// alt情報取得

		$('#sp-tel .num').append(telNumElm);	//html出力





		/////	sidr /////

		$('#sp-button').sidr({

			speed: 400,

			side: 'right',

			onOpen: function(){

        $('.sp-slide').animate({left: '-82%'}, 400);

        $('#sp-button').addClass('active');

			},

			onClose: function(){

        $('.sp-slide').animate({left: '0'}, 400);

        $('#sp-button').removeClass('active');

			}

		});



		//closeボタン

		$('#sp-nav-close').on('click', function(){

			$.sidr('close', 'sidr');

			return false;

		});





	$(window).on('resize', function(){

		if(APP.GLOBAL.isSP_VIEW){

			//SP

		}else{

			//PC

			var sidrFlag = $('body').hasClass('sidr-open');



			if(sidrFlag){

				$('body').removeClass('sidr-open').removeAttr('style');

			}



		}

	}).trigger('resize');











	};

	spHtmlCreate();



///////////////////////////////////

/////

/////	gnav current

/////

///////////////////////////////////



var path = location.pathname.split('/')[1];

var currentpath = '/'+path+'/';





$('#global-nav li a').each(function(){

	var gnav_href = $(this).attr('href');



	if(currentpath == gnav_href) {

		$(this).addClass('current');

	}

});





///////////////////////////////////

/////

/////	coming soon

/////

///////////////////////////////////



var $comingSoon = $('.coming_soon');

$comingSoon.before('<div class="no-link"></div>');



/////////////////////////////////////////

///

///	magnific-popup

///

/////////////////////////////////////////

    $('.movie-Yt').magnificPopup({

    	delegate: 'a', // ポップアップを開く子要素

			type: 'iframe',

				iframe: {

					markup: '<div class="mfp-iframe-bg">'+

									'<div class="mfp-iframe-scaler">'+

					        '<div class="mfp-close"></div>'+

					        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+

					      	'</div>'+

					      	'</div>',

					patterns: {

					   youtube: {

					       index: 'youtube.com',

					       id: 'v=',

					       src: '//www.youtube.com/embed/%id%?rel=0&autoplay=1'

					    }

					}

        },

			disableOn: 750,

			mainClass: 'mfp-fade',

			removalDelay: 300,

			preloader: false

    });



/////////////////////////////////////////

///

///	  Tel Number Link

///

/////////////////////////////////////////



	var ua = navigator.userAgent.toLowerCase();

	var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);



	if (!isMobile) {

		$('a[href^="tel:"]').on('click', function(e) {

			e.preventDefault();

		});

	}

});





