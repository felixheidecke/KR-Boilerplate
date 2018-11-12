define(['jquery'], function($) {
	return $.fn.krAkkordeon = function(params, callback) {
		var $cards, $contents, $tabs;
		params = jQuery.extend({
			initClosed    : true,
			initfirstOpen : false,
			speed         : 'fast',
			onlyOneCard   : true,
			cardItem      : '.card',
			tabItem       : '.tab',
			contentItem   : '.content',
			activeClass   : 'is-active'
		}, params);
		if ($(this).length === 0) {
			return false;
		}
		$cards = $(this).find(params.cardItem);
		$tabs = $(this).find(params.tabItem);
		$contents = $(this).find(params.contentItem);
		$(this).addClass(params.activeClass);
		if (params.initClosed) {
			$contents.hide();
		}
		if (params.initfirstOpen) {
			$(this).find(params.cardItem + ":first-of-type").addClass(params.activeClass).find(params.contentItem).show();
		}
		$tabs.on('click', function() {
			var $card, $content;
			$card = $(this).parent(params.cardItem);
			$content = $card.find(params.contentItem);
			$card.toggleClass(params.activeClass);
			if (!$card.hasClass(params.activeClass)) {
				return $content.slideUp(params.speed);
			} else {
				$content.slideDown(params.speed);
				if (params.onlyOneCard) {
					$cards.not($card).removeClass(params.activeClass);
					return $contents.not($content).slideUp(params.speed);
				}
			}
		});

		if (typeof callback === "function") {
			callback();
		}

		return this;
	};
});
