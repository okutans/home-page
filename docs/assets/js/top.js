$(function(){

/////////////////////////////////////////
///
///	topvideo area
///
/////////////////////////////////////////

	/////	topvideo height resize /////
	$(window).on('load resize', function(){
		if(APP.GLOBAL.isSP_VIEW){
			//SP
			$('#topvideo-wrap').css('height', 'auto');
		}else{
			//PC
			var winH = $(window).height();
			var addSize = winH-40;

			$('#topvideo-wrap').css('height', addSize);
		}
	}).trigger('resize');



 /////	topvideo movie triming /////
	function trimMovie(){
			var $list_wrap = $('#topvideo-wrap');

			var stageW = $list_wrap.width();
			var stageH = $list_wrap.height();
			var $iframe = $list_wrap.find('#topvideo-video');


			var fixH = ( stageW*0.56 )*1.05;
			var fixW = ( stageH*1.78 )*1.05;

			if( stageW >= stageH  ){
			// stageがヨコ長の場合
				if( fixH <= stageH  ){
				// stageの高さが、Wから算出したHより大きい場合
					$iframe.width( fixW );
					$iframe.height( '105%' );
				}else{
					$iframe.width( '105%' );
					$iframe.height( fixH );
				}

			}else{
			// stageがタテ長の場合
				$('#topvideo-video').width( fixW );
				$('#topvideo-video').height( '105%' );
			}


			// 最後に、#topvideo-videoのx,y座標を中心に
			var thisW = $('#topvideo-video').width();
			var thisH = $('#topvideo-video').height();

			var centerPosX = (stageW - thisW) /2;
			var centerPosY = (stageH - thisH) /2;
			// console.log( 'centerPos:'+centerPos );
			$iframe.css({
				left: centerPosX,
				top: centerPosY
			});

	} // trimMovie()

	$(window).on('resize', function(){
			trimMovie();
	}).trigger('resize');


	/////	sp topvideo slider /////
	$('#sp-topvideo-slider').slick({
		dots:false,
		fade: true,
		autoplay: true,
		speed: 1200,
		autoplaySpeed: 4000,
		easing: 'swing'
	});


	/////	movie preload /////
	$(window).on('resize', function(){
		if(APP.GLOBAL.isSP_VIEW){
			//SP
			$('#topvideo-video').attr('preload', 'metadata');
		}else{
			//PC
			$('#topvideo-video').attr('preload', 'auto');
		}
	}).trigger('resize');

	/////	tablet bg /////
	var tabletFlag = $('body').hasClass('is-tb');

	if(tabletFlag){
		$('#topvideo-video').before('<div class="tablet-bg"></div>');
	}



	/////////////////////////////////////////
	///
	///	pickup area
	///
	/////////////////////////////////////////

		/////	pickup animation /////
		var $pickup_Tag= $('#pickup ul');
		$pickup_Tag.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView){
			//ブラウザの表示域に表示されたときに実行する処理
				//レスポンシブ処理
				$(window).on('resize', function(){
					if(APP.GLOBAL.isSP_VIEW){
						//SP
					}else{
						//PC
					  var i = 0;
					  $pickup_Tag.find('.item').each(function(){
					      $(this).delay(500*i).queue(function() {
					          // alert($(this).text());
					          $(this).addClass('show').dequeue();
					      });
					      i++;
					  });
					}
				}).trigger('resize');

		 }else {
		 	//ブラウザの表示域から外れたときに実行する処理
		 	$($pickup_Tag).off('inview');
		 }
		});


		/////	staff slider /////

		//ランダム処理＆配置
		$("#staff-slider").each(function(){
			var arr = [];
			$(this).children('li').each(function(){
				arr.push($(this).html());
			});
		  arr.sort(function() {
		      return Math.random() - Math.random();
		  });
		  $(this).empty();
		  for(i=0; i < arr.length; i++) {
		      $(this).append('<li>' + arr[i] + '</li>');
		  }
		});

		//スライド処理
		$('#staff-slider').slick({
			dots:false,
			autoplay:true,
			autoplaySpeed: 5000,
			speed: 2000,
			fade: true,
			arrows: false,
			draggable: false,
			swipe: false,
			touchMove: false,
			accessibility: false
		});


/////////////////////////////////////////
///
///	main slider area
///
/////////////////////////////////////////
/*
	/////	main animation /////
	var $mainSlide_Tag= $('.pannel-text-contents');
	$mainSlide_Tag.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
		//ブラウザの表示域に表示されたときに実行する処理
			//レスポンシブ処理

			$(window).on('resize', function(){
				if(APP.GLOBAL.isSP_VIEW){
					//SP
				}else{
					//PC
					$('#main-slider').slick('slickPlay');
					TweenMax.staggerTo(".first-pannel .item" , 0.5 , {opacity: 1,}, 0.3);
				}
			}).trigger('resize');

		}else {
		//ブラウザの表示域から外れたときに実行する処理
			$($mainSlide_Tag).off('inview');
	 }
	});




	/////	main slider /////

	//初期化後設定
	$('#main-slider').on('init', function(event, slick){
		$('#main-slider .slick-active').addClass('first-pannel');
	});

	//スライド設定
	$('#main-slider').slick({
		dots:true,
		appendArrows: $('#main-slider-arrows'),
		appendDots:$('.pagenation'),
		autoplay: false,
		speed: 1200,
		autoplaySpeed: 5000,
		centerMode: true,
		centerPadding: 0,
		easing: 'swing'
		// easing: 'easeOutCubic'
	});


	//// load時 ////
	//次のスライドのelementを取得
  var $nextElement = $('#main-slider-wrap .slick-active').next();
	//次のスライドの[pannel-main]の画像のパスを取得
	var nextImg = $nextElement.find('.pannel-main img').attr('src');
	//[next-slide-bg]に次のスライドの[pannel-main]の画像を背景表示
	$('#main-slider-arrows .next-slide-bg').css({
		'background' : 'url("'+nextImg+'") left top no-repeat',
		'background-size' : 'cover'
	});

	//次のスライドの[title]（マンション名）のテキストを取得
	var nextTxt = $nextElement.find('.title').html();
	//次のスライドの[title]（マンション名）を[next-slide-txt]へ表示
	$('.next-slide-txt').html(nextTxt);


	//// nextボタン・pagenationボタン クリック時 ////
	// スライドが切り替わった後に
	$('#main-slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
		//次のスライドのelementを取得
	  var $nextElement = $('#main-slider-wrap .slick-active').next();
	  //次のスライドの[pannel-main]の画像のパスを取得
	  var nextImg = $nextElement.find('.pannel-main img').attr('src');

	  //[next-slide-bg]に次のスライドの[pannel-main]の画像を背景表示
		$('#main-slider-arrows .next-slide-bg').css({
			'background' : 'url("'+nextImg+'") left top no-repeat',
			'background-size' : 'cover'
		});

		//次のスライドの[title]（マンション名）のテキストを取得
		var nextTxt = $nextElement.find('.title').html();
		//次のスライドの[title]（マンション名）を[next-slide-txt]へ表示
		$('.next-slide-txt').html(nextTxt);

	});


	/////	small loop slide /////
	// ランダム処理＆配置
	$(".pannel-top-list, .pannel-bottom-list").each(function(){
		var arr = [];
		$(this).children('li').each(function(){
			arr.push($(this).html());
		});
	  arr.sort(function() {
	      return Math.random() - Math.random();
	  });
	  $(this).empty();
	  for(i=0; i < arr.length; i++) {
	      $(this).append('<li>' + arr[i] + '</li>');
	  }
	});

	//フェード処理（パネル上）
	var $setElm = $('.pannel-top'),
	fadeSpeed = 1000,
	switchDelay = 3000;

	$setElm.each(function(){
	    var targetObj = $(this);
	    var findUl = targetObj.find('ul');
	    var findLi = targetObj.find('li');
	    var findLiFirst = targetObj.find('li:first');

	    findLi.css({display:'block',opacity:'0',zIndex:'99'});
	    findLiFirst.css({zIndex:'100'}).stop().animate({opacity:'1'},fadeSpeed);

	    setInterval(function(){
	        findUl.find('li:first-child').animate({opacity:'0'},fadeSpeed).next('li').css({zIndex:'100'}).animate({opacity:'1'},fadeSpeed).end().appendTo(findUl).css({zIndex:'99'});
	    },switchDelay);
	});

	//フェード処理（パネル下）
	var $setElm = $('.pannel-bottom'),
	fadeSpeed = 1000,
	switchDelay = 4000;

	$setElm.each(function(){
	    var targetObj = $(this);
	    var findUl = targetObj.find('ul');
	    var findLi = targetObj.find('li');
	    var findLiFirst = targetObj.find('li:first');

	    findLi.css({display:'block',opacity:'0',zIndex:'99'});
	    findLiFirst.css({zIndex:'100'}).stop().animate({opacity:'1'},fadeSpeed);

	    setInterval(function(){
	        findUl.find('li:first-child').animate({opacity:'0'},fadeSpeed).next('li').css({zIndex:'100'}).animate({opacity:'1'},fadeSpeed).end().appendTo(findUl).css({zIndex:'99'});
	    },switchDelay);
	});
*/
	/////////////////////////////////////////
	///
	///	information area
	///
	/////////////////////////////////////////

		/////	information animation /////
		// title animation
		var $info_Tag= $('#information h2');
		$info_Tag.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView){
			//ブラウザの表示域に表示されたときに実行する処理
				//レスポンシブ処理

				$(window).on('resize', function(){
					if(APP.GLOBAL.isSP_VIEW){
						//SP
					}else{
						//PC
						TweenMax.to($info_Tag , 2 , {opacity: 1});
					}
				}).trigger('resize');

			}else {
			//ブラウザの表示域から外れたときに実行する処理
				$($info_Tag).off('inview');
		 }
		});


		//// news animation
		var $news_Tag= $('.news');
		$news_Tag.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView){
			//ブラウザの表示域に表示されたときに実行する処理
				//レスポンシブ処理
				$(window).on('resize', function(){
					if(APP.GLOBAL.isSP_VIEW){
						//SP
					}else{
						//PC
					  var i = 0;
					  $news_Tag.find('dl').each(function(){
					      $(this).delay(800*i).queue(function() {
					          // alert($(this).text());
					          $(this).addClass('show').dequeue();
					      });
					      i++;
					  });
					}
				}).trigger('resize');

		 }else {
		 	//ブラウザの表示域から外れたときに実行する処理
		 	$($news_Tag).off('inview');
		 }
		});


		//// arrow animation
		var $arw_Tag = $('#bnr-slider-wrap');

		$arw_Tag.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView){
			//ブラウザの表示域に表示されたときに実行する処理
				//レスポンシブ処理
				$(window).on('resize', function(){
					if(APP.GLOBAL.isSP_VIEW){
						//SP
					}else{
						//PC
					  TweenMax.to('#bnr-slide-arrows' , 0.5, {opacity: 1});
					}
				}).trigger('resize');

		 }else {
		 	//ブラウザの表示域から外れたときに実行する処理
		 	$($arw_Tag).off('inview');
		 }
		});


		//// bnr-slide animation
		var $bnr_Tag= $('#bnr-slider-wrap');
		$bnr_Tag.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
			if(isInView){
			//ブラウザの表示域に表示されたときに実行する処理
				//レスポンシブ処理

				$(window).on('resize', function(){
					if(APP.GLOBAL.isSP_VIEW){
						//SP
					}else{
						//PC
						$('#bnr-slider').slick('slickPlay');

						var i = 0;
						$bnr_Tag.find('.slick-active').each(function(){
						    $(this).delay(500*i).queue(function() {
						        // alert($(this).text());
						        $(this).addClass('show').dequeue();
						    });
						    i++;
						});
					}
				}).trigger('resize');

		 }else {
	 	//ブラウザの表示域から外れたときに実行する処理
	 		// $('#bnr-slider').slick('slickPause');
		 	$($bnr_Tag).off('inview');
		 }
		});


		/////	banner slider /////
		//初期化後設定
		$('#bnr-slider').on('init', function(event, slick){
			$('#bnr-slider .slick-active').addClass('first-pannel');
		});

		//スライド設定
		$('#bnr-slider').slick({
			dots:false,
			appendArrows: $('#bnr-slide-arrows'),
			autoplay: false,
			speed: 1200,
			autoplaySpeed: 5000,
			slidesToShow: 3,
			slidesToScroll: 1,
			easing: 'swing',
			responsive:[{
				breakpoint: 750,
				settings: {
					slidesToShow: 1,
					appendArrows: $('#bnr-slide-arrows'),
					autoplay:true,
					centerMode: true,
					centerPadding: '15%'
				}
			}]
		});





/////////////////////////////////////////
///
///	gallery area
///
/////////////////////////////////////////
/*
	/////	gallery animation /////
  var $bdr_Tag= $('#gallery .link');

	$bdr_Tag.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
	 	var timeLine = new TimelineMax();

	 	var $top = $('#gallery .top');
	 	var $right = $('#gallery .right');
	 	var $bottom = $('#gallery .bottom');
	 	var $left = $('#gallery .left');
	 	var $all = $('#gallery .top, #gallery .right, #gallery .bottom, #gallery .left');

	 	if(isInView){
		//ブラウザの表示域に表示されたときに実行する処理
			//レスポンシブ処理
			$(window).on('resize', function(){
				if(APP.GLOBAL.isSP_VIEW){
					//SP
				}else{
					//PC
					timeLine.to($top , 0 , {opacity: 1})
									.to($top , 0.5 , {width: "100%"})
									.to($right , 0 , {opacity: 1})
									.to($right , 0.5 , {height: "100%"})
									.to($bottom , 0 , {opacity: 1})
									.to($bottom , 0.5 , {width: "100%"})
									.to($left , 0 , {opacity: 1})
									.to($left , 0.5 , {height: "100%"});
				}
			}).trigger('resize');

	   }else {
	   	//ブラウザの表示域から外れたときに実行する処理
	   	$($bdr_Tag).off('inview');
	   }
	 });


	/////	background image switch /////
  $("#gallery").backstretch([
    "/top/img/gallery/bgimg_gallery01.jpg",
    "/top/img/gallery/bgimg_gallery02.jpg",
    "/top/img/gallery/bgimg_gallery03.jpg"
  ], {duration: 5000, fade: 3000});

*/


/////////////////////////////////////////
///
///	banner area
///
/////////////////////////////////////////

	/////	big banner animation /////
        /*
	var $bigbnr_Tag= $('#big-banner');
	$bigbnr_Tag.on('inview', function(event, isInView, visiblePartX, visiblePartY) {
		if(isInView){
		//ブラウザの表示域に表示されたときに実行する処理
			//レスポンシブ処理
			$(window).on('resize', function(){
				if(APP.GLOBAL.isSP_VIEW){
					//SP
				}else{
					//PC
					TweenMax.staggerFromTo("#big-banner img" , 2 , {opacity: 0} , {opacity: 1});
				}
			}).trigger('resize');

	 }else {
	 	//ブラウザの表示域から外れたときに実行する処理
	 	$($bigbnr_Tag).off('inview');
	 }
	});


        */




});
