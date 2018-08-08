(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Browser fixes.

			// IE: Flexbox min-height bug.
				if (skel.vars.browser == 'ie')
					(function() {

						var flexboxFixTimeoutId;

						$window.on('resize.flexbox-fix', function() {

							var $x = $('.fullscreen');

							clearTimeout(flexboxFixTimeoutId);

							flexboxFixTimeoutId = setTimeout(function() {

								if ($x.prop('scrollHeight') > $window.height())
									$x.css('height', 'auto');
								else
									$x.css('height', '100vh');

							}, 250);

						}).triggerHandler('resize.flexbox-fix');

					})();

			// Object fit workaround.
				if (!skel.canUse('object-fit'))
					(function() {

						$('.banner .image, .spotlight .image').each(function() {

							var $this = $(this),
								$img = $this.children('img'),
								positionClass = $this.parent().attr('class').match(/image-position-([a-z]+)/);

							// Set image.
								$this
									.css('background-image', 'url("' + $img.attr('src') + '")')
									.css('background-repeat', 'no-repeat')
									.css('background-size', 'cover');

							// Set position.
								switch (positionClass.length > 1 ? positionClass[1] : '') {

									case 'left':
										$this.css('background-position', 'left');
										break;

									case 'right':
										$this.css('background-position', 'right');
										break;

									default:
									case 'center':
										$this.css('background-position', 'center');
										break;

								}

							// Hide original.
								$img.css('opacity', '0');

						});

					})();

	});

})(jQuery);