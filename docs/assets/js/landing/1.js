


$(function(){
//ウィンドウの横幅を取得する
    var windowWidth = $(window).width();

//reasonのh3のスペース部分を計算
    var data = (windowWidth - 1000)/2;
    $(".reason h3").css('padding-left',data);
    $(".voice h3").css('padding-left',data);
    $(".formArea h2").css('padding-left',data);

//スマホのキービジュアル動画の高さ領域を確保する
    if(windowWidth　< 768){
        var w = document.getElementById('movie').clientWidth;
        w = w/16*9;
        $(".keyVisual li").css("height",w)
    }
});

//スクロールが到達したら表示する
$(function(){
    //初期状態は隠す
    $('.contents').css({opacity:"0", 'marginTop':'1em'});

    $(window).scroll(function () {
        var selectors = $('.contents');
        var scroll = $(window).scrollTop();

        selectors.each(function () {
            var position = $(this).offset().top - $(window).height() / 1.5;
            if (position < scroll) {

                $(this).closest('.contents').each(function(i){
                    $(this).delay(500 * i).animate({opacity:"1", 'marginTop':'0em'},1000);
                });
            }
        });
    });
});

//アンカーリンクにスムーススクロールをつける
$(function(){
	$('a[href^=#]').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
});

//スライダー部分
$(window).load(function() {
    var datas = $('.lg'),slideSpeed = 5000;
 
    datas.each(function(){
        var self = $(this),
		// 横幅を拾う
        selfWidth = self.innerWidth(),
		// ulタグを見つける
        findUl = self.find('ul'),
		// liタグを見つける
        findLi = findUl.find('li'),
        listWidth = findLi.outerWidth(),
        listCount = findLi.length,
        loopWidth = listWidth * listCount;
 
        findUl.wrapAll('<div class="loopSliderWrap" />');
        var selfWrap = self.find('.loopSliderWrap');
 
        if(loopWidth > selfWidth){
            findUl.css({width:loopWidth}).clone().appendTo(selfWrap);

            // クローンを作った分2倍の範囲を取得する
            selfWrap.css({width:loopWidth*2});
 
            function loopMove(){
                selfWrap.animate({left:'-' + (loopWidth) + 'px'},slideSpeed*listCount,'linear',function(){
                    selfWrap.css({left:'0'});
                    loopMove();
                });
            };
            loopMove();
        }
    });
});

var templateFunctions = {
    init: function(){
			// Counter
			templateFunctions.counter( '.stat', '.stat-counter', false );
		},
    counter: function( container, element, loop ){

			// Create an instance of the counter
			// but prevent it from starting
			$( element ).counter({
				autoStart: false
			});

			// Loop through each container
			// and check if it's in view
			// if so star counter
			$( container ).each( function(){
				var cntr = $( this );
				cntr.horizon({
					recurring: loop,
					inView: function(){
						if( cntr.find( element ).data( 'counting' ) ) return false;
						cntr.find( element ).each( function(){
							cntr.find( element ).data( 'counting', true );
							var c = $( this ).data( 'counter' );
							c.startCounter();
						});
					},
					outOfView: function(){
						if( !loop || !cntr.find( element ).data( 'counting' ) ) return false;
						cntr.find( element ).each( function(){
							cntr.find( element ).data( 'counting', false );
							var c = $( this ).data( 'counter' );
							c.clearCounter();
						});
					}
				});
			});
		}
            };