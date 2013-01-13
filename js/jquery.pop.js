/**
 *  jQuery Popin Plugin By Harsh
 *  
 * 
 *  
 */

(function($) {
	$.fn.pop = function(options) {
		var defaults = {
			width: 380, // max = 800
			height: 280, // max = 640
			close: false,
			closeText: '',
			closeByEscape: true,
			closeByDocument: true,
			holderClass: '',
			overlayClass: '',
			enableAnimation: false,
			onBlurContainer: '',
			openOnEvent: true,
			setEvent: 'click',
			onLoad: function() {},
			onUnload: function() {},
			template: '<p>This is Demo</p>'
		};
		var options = $.extend(defaults, options);

		return this.each(function() {
			var $this = $(this),
				body = $('body'),
				width = options.width > 800 ? 800 : options.width,
				height = options.height > 640 ? 640 : options.height,
				template = typeof options.template == 'function' ? options.template($this) : options.template;

			body.addClass('pop-ready');
			body.append('<div class="pop-overlay ' + options.overlayClass + '"></div>');				
			body.append('<div class="pop-popin ' + options.holderClass + '">' + template + '</div>');

			$('.pop-popin').css({
				'width': width + 'px',
				'height': height + 'px',
				'margin-left': '-' + (width / 2 + 10) + 'px',
				'margin-top': '-' + (height / 2 + 10) + 'px'
			});

			if (options.close) {
				$('.pop-popin').append('<a href="#" class="pop-close">' + options.closeText + '</a>');
			}

			if (options.enableAnimation) {
				$('.pop-popin').addClass('stack');
			}

			if (options.onBlurContainer != '') {
				$(options.onBlurContainer).addClass('pop-blur');
			}
			
			// close popup by clicking Esc button
			function onKeyup(e) {
				if (options.closeByEscape) {
					if (e.keyCode === 27) {
						stop();
					}
				}
			}
			
			// close popup by clicking outside it
			function onClick(e) {
				if (options.closeByDocument) {
					if ($(e.target).is('.pop-overlay, .pop-close')) {
						stop();
					}
				} else {
					if ($(e.target).is('.pop-close')) {
						stop();
					}	
				}
			}

			// show popup
			function start() {
				// check if onLoad is a function and call it before popin is active
				if (typeof options.onLoad == 'function') {
					options.onLoad.call($this);
				}

				body.bind('keyup', onKeyup);
				body.bind('click', onClick);

				body.addClass('pop-active');
			}

			// hide popup
			function stop() {
				body.unbind('keyup', onKeyup);
				body.unbind('click', onClick);

				body.removeClass('pop-active');

				// check if onUnload is a function and call it after popin is closed
				if (typeof options.onUnload == 'function') {
					options.onUnload.call($this);
				}
			}

			// init on click or custom event
			if (options.openOnEvent) {
				$this.bind(options.setEvent, function(e) {
					e.stopPropagation();
					start();
				});
			} else {
				start();
			}
		});

	}
})(jQuery)