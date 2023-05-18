

$(document).ready(function(){

	

	//company-navi

	var compnavi = function(){

		var path1 = window.location.pathname.split('/')[1];

		var path2 = window.location.pathname.split('/')[2];

		var pathcurrent = '/'+path1+'/'+path2+'/';



		$('.company-common-navi li a').each(function(){

			var $href = $(this).attr('href');

			if( pathcurrent.match($href)) {

				$(this).parent().addClass('current');

			} else {

				$(this).parent().removeClass('current');

			}

		});

	};

	compnavi();





	//Message

	var message = function(){

		var $wrapper = $('.company-message');



		var topics = function(){

			var $nav_btn = $wrapper.find('.message-menu a');

			var $list_wrap = $wrapper.find('.list-wrap');



			var SPEED = 200;



			$nav_btn.on('click', function(){



				if( !$(this).hasClass('is-active') ){

					var $this = $(this);

					var id = $this.attr('href');

					nav_chg( $this );

					nav_cud( $this.parents('li') );

					list_chg(id);

					message_scroll();

				}

				return false;

			});



			function nav_chg(_el){

				$wrapper.find('.is-active').removeClass('is-active');

				_el.addClass('is-active');

			}



			function nav_cud(_li){

				$wrapper.find('.current').removeClass('current');

				_li.addClass('current');

			}



			function list_chg(_id){

				$list_wrap.find('.is-visible').stop().animate({

					opacity:0

				},SPEED, function(){

					$(this).removeClass('is-visible');

					$(_id).addClass('is-visible');

					$(_id).stop().animate({

						opacity:1

					},SPEED);

				});

			}



			function message_scroll(){

				var target = $wrapper;

				var position = target.offset().top;

				$("html, body").animate({scrollTop:position});

			}



		};

		topics();



	};

	message();





	//Tel Number Link

	var ua = navigator.userAgent.toLowerCase();

	var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);



	if (!isMobile) {

		$('a[href^="tel:"]').on('click', function(e) {

			e.preventDefault();

		});

	}







});