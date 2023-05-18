$(function(){
  /*==================================================
  Vars
  ==================================================*/

  /*==================================================
  Functions
  ==================================================*/
  /*==========================
  UserAgentCheck
  ==========================*/
  var strUserAgent = window.navigator.userAgent.toLowerCase();
  var uaDevice;
  var uaCheck = function(){
    if((strUserAgent.indexOf('android') > 0 && strUserAgent.indexOf('mobile') < 0) || strUserAgent.indexOf('ipad') > 0){
      uaDevice = 'isMobile'; //isTablet
    } else {
      if(strUserAgent.indexOf('mobile') > 0){
        uaDevice = 'isMobile';  // isMobile
      } else {
        uaDevice = 'isDesktop';
      }
    }
    return uaDevice;
  };
  window.uaCheck = uaCheck;

  // console.log(strUserAgent);

  if( strUserAgent.match(/(msie|MSIE)/) || strUserAgent.match(/(T|t)rident/) ) {
    $('html').addClass('browser-ie');
  }
  if ( strUserAgent.indexOf('windows') > 0 && strUserAgent.indexOf('mobile') < 0 ) {
    $('html').addClass('os-windows');
  }
  if ( strUserAgent.indexOf('android') > 0 ) {
    $('html').addClass('os-android');
  }


  /*==========================
  viewModeCheck
  ==========================*/
  var viewMode = '';
  var breakPoint = 670;
  var viewModeCheck = function(){
    if(window.innerWidth > breakPoint){
      viewMode = 'isDesktop';
      $('html').addClass('device-desktop').removeClass('device-mobile');
    }
    else if(window.innerWidth <= breakPoint){
      viewMode = 'isMobile';
      $('html').addClass('device-mobile').removeClass('device-desktop');
    }
    else{
      if(uaDevice === 'isMobile'){
        viewMode = 'isMobile';
        $('html').addClass('device-mobile').removeClass('device-desktop');
      } else {
        viewMode = 'isDesktop';
        $('html').addClass('device-desktop').removeClass('device-mobile');
      }
    }
    return viewMode;
  };
  window.viewModeCheck = viewModeCheck;


  /*==========================
  ancScroll
  ==========================*/
  var href, target;
  var scroll_margin = 0;

  var ancScroll = function(target, hash){
    if(target.length === 0){ return false;}

    if(hash === "#"){
      scroll_margin = 0;
    }
    if(target.data('scroll-margin') && target.data('scroll-margin').length !== 0){
      scroll_margin = target.data('scroll-margin');
    }

    var position = target.offset().top;

    var ty = Math.min(position, $(document).height() - $(window).height());
    $('html,body').stop().animate({scrollTop: ty - scroll_margin}, 800, 'easeOutExpo');
    return false;
  };

  var ancScrollControl = function(){
    $("a[href^='#']").click(function() {
      href= $(this).attr("href");
      target = $(href === "#" || href === "" ? 'body' : href);
      ancScroll(target, href);
    });
  };

  /*==========================
  kvFadeIn
  ==========================*/
  var kvFadeIn = function(){
    var kv = $('#keyvisual');
    if(window.viewMode === 'isDesktop'){
      kv.prepend($('header'));
    }

    kv.velocity({
      'opacity' : 0
    }).velocity({
      'opacity' : 1
    }, 2400, 'easeOutQuart');

    kv.find('.copy').velocity({
      'opacity' : 1
    }, {
      duration: 2600,
      delay: 2200,
      easing: 'easeOutCubic',
    });

    $('header').css({
      'top' : '-10px'
    }).velocity({
      'opacity' : 1,
      'top' : 0
    }, {
      duration: 1600,
      delay: 4000,
      easing: 'easeOutQuint'
    });

    $('#information').velocity({
      'opacity' : 1
    }, {
      duration: 1600,
      delay: 4000,
      easing: 'easeOutQuint',
      begin: function(){
        // スライド自動切り替えスタート
        startTimer();
      }
    });

  };

  /*==========================
  scrollAnimation
  ==========================*/
  var containerTop, startLine;
  var startMargin = 250;
  var aniDelay = 0;
  var tY = 5;
  var winH = $(window).height();
  $('[data-animation]').addClass('is-hide').addClass('is-blur');

  var scrollAnimation = function(scrollTop){
    if(window.viewMode === 'isMobile'){
      startMargin = 100;
    }

    $('[data-animation]').each(function(){
      containerTop = $(this).offset().top;
      var _this = $(this);

      startLine = scrollTop + winH + startMargin;
      if( $(this).data('animation') !== true ){
        aniDelay = $(this).data('animation');
      } else {
        aniDelay = 0;
      }

      if( $(this).hasClass('is-hide') && containerTop <= startLine && !$(this).hasClass('velocity-animating') ){

        if($(this).data('animation-up') === true && window.viewMode === 'isDesktop'){ tY =  60; } else { tY = 5; }

        if($(this).data('animation-up')){
          $(this).find('[data-animation-child]').velocity({
            opacity: 0,
            translateY: 5
          }).velocity({
            opacity: 1,
            translateY: '0'
          },{
            duration: 1400,
            delay: 400,
            easing: 'easeInOutQuad'
          });
        }

        _this.addClass('is-blur-out');

        $(this).velocity({
          translateY: tY
        }).velocity({
          opacity: 1,
          translateY: '0'
        },{
          duration: 1800,
          delay: aniDelay,
          easing: 'easeInOutQuad',
          loop: false,
          complete: function(){
            $(this).removeClass('is-hide');
          }
        });
      }
    });
  };

  /*==========================
  slider
  ==========================*/
  var sliderWrapper = $('.slide-wrapper');
  var pageNation = $('.pagenation');
  var slides = sliderWrapper.find('.slides');
  var slideTargets = slides.find('li');
  var slideLength = slides.find('li').length;
  var slideWidth = slides.find('li').width();
  var slideHeight = slides.find('li').height();
  var slideCurrent = 1;
  var moveDirection;
  var touchTarget = $('#information');

  var slider = function(){
    //スライドのwidthをセット
    if(window.viewMode ==='isMobile'){
      slideWidth = touchTarget.width();
      sliderWrapper.width(slideWidth);
      slides.find('li').width(slideWidth);
    }

    // slides.width(slideWidth * slideLength);

    //ページネーションのmaxページをセット
    pageNation.find('.page-max').text(slideLength);

    //ループ用のセット
    // slides.prepend( slideTargets.last() );
    // slides.css('margin-left', -slideWidth);

    //クリックで動かす
    pageNation.on('click', '.nav-next', function(){
      stopTimer();
      moveSlide('next');
      startTimer();
    });
    pageNation.on('click', '.nav-prev', function(){
      stopTimer();
      moveSlide('prev');
      startTimer();
    });

    //スワイプで動かす
    var pos, touchPosition, movePosition;

    //スタート時の位置をセット
    touchTarget.on('touchstart', function(){
      // タイマー停止
      stopTimer();

      pos = getPosition(event);
      touchPosition = pos.x;
    });

    // 動いた方向により分岐
    touchTarget.on('touchmove', function(e){
      pos = getPosition(event);
      movePosition = pos.x;

      // スクロール時に発動しないように微量の動きは検知しない
      var scm = 5;
      if( movePosition + scm < touchPosition ){
        moveDirection = 'next';
        e.preventDefault();
      } else if( movePosition - scm > touchPosition ) {
        moveDirection = 'prev';
        e.preventDefault();
      }

      moveSlide(moveDirection, 500);
    });

    // 最後にタイマー再開
    touchTarget.on('touchend', function(){
      startTimer();
    });
  };

  var getPosition = function(e){
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
    x = Math.floor(x);
    y = Math.floor(y);
    var pos = {'x':x , 'y':y};
    return pos;
  };

  var moveFlag = false;
  var moveSlide = function(moveDirection){

    if( moveFlag === false){
      moveFlag = true;

      if( moveDirection === 'next' ){
        slides.css('opacity', 0.6);


        slides.velocity({
          'margin-top' : -(slideHeight)
        }, 600, 'easeOutSine', function(){
          slides.css('opacity', 1);
          moveFlag = false;

          slideTargets = slides.find('li');
          slides.append( slideTargets.first() );
          slides.css({ 'margin-top' : 0 });

          if(slideCurrent !== slideLength){
            slideCurrent++;
          } else {
            slideCurrent = 1;
          }
          pageNation.find('.page-current').text(slideCurrent);
        });

      } else if( moveDirection === 'prev' ){
        slides.css('opacity', 0.6);

        slideTargets = slides.find('li');
        slides.prepend( slideTargets.last() );
        slides.css({
          'margin-top' : -(slideHeight)
        }).velocity({
          'margin-top' : 0
        }, 600, 'easeOutSine', function(){
          slides.css('opacity', 1);
          moveFlag = false;

          if(slideCurrent !== 1){
            slideCurrent--;
          } else {
            slideCurrent = slideLength;
          }
          pageNation.find('.page-current').text(slideCurrent);
        });

      }
    }
  };

  /*==========================
  timer
  ==========================*/
  var slideTimer;
  var startTimer = function(){
    // console.log('start');
    slideTimer = setInterval(function(){
      // console.log('interval');
      moveSlide('next');
    }, 3000 + 600);
  };

  var stopTimer = function(){
    // console.log('stop');
    clearInterval(slideTimer);
  };

  /*==========================
  changeImgPc
  ==========================*/
  var changeImgPc = function(){
    $('[data-pc-src]').each(function(){
      $(this).attr('src', $(this).data('pc-src'));
    });
  };

  /*==================================================
  Init
  ==================================================*/
  var _scrollTop;
  var commonInit = function(){
    window.uaDevice = uaCheck();
    window.viewMode = viewModeCheck();
    ancScrollControl();
    kvFadeIn();
    slider();

    if(window.viewMode === 'isDesktop'){
      changeImgPc();
    }
  };
  commonInit();


  /*==================================================
  Event Control
  ==================================================*/
  /*==========================
  scroll
  ==========================*/
  $(window).on("scroll", function(){
    _scrollTop = $(this).scrollTop();
    scrollAnimation(_scrollTop);
  });

  /*==========================
  resize
  ==========================*/
  var commonTimer = false;
  var tmpViewMode = viewModeCheck();

  if(window.uaDevice === 'isDesktop'){

    $(window).on('resize' ,function(){
      if (commonTimer !== false) {
        clearTimeout(commonTimer);
      }
      commonTimer = setTimeout(function() {
        winH = $(window).height();
        window.viewMode = viewModeCheck();
        if(window.viewMode !== tmpViewMode){
          tmpViewMode = window.viewMode;
          location.reload();
        }
      }, 200);
    });
  } else if(window.uaDevice === 'isMobile'){
    $(window).on('orientationchange' ,function(){
      if (commonTimer !== false) {
        clearTimeout(commonTimer);
      }
      commonTimer = setTimeout(function() {
        winH = $(window).height();
        window.viewMode = viewModeCheck();
        if(window.viewMode !== tmpViewMode){
          tmpViewMode = window.viewMode;
          location.reload();
        }
      }, 200);
    });
  }

});