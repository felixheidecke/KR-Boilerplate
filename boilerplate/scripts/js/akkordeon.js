$.fn.krAkkordeon = function(params) {
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
	
	var $cards    = $(this).find(params.cardItem);
	var $tabs     = $(this).find(params.tabItem);
	var $contents = $(this).find(params.contentItem);

	$(this).addClass(params.activeClass);

	if (params.initClosed) {
		$contents.hide();
	}

	if (params.initfirstOpen) {
		$(this).find(params.cardItem + ":first-of-type").addClass(params.activeClass).find(params.contentItem).show();
	}

	$tabs.on('click', function() {
		var $card    = $(this).parent(params.cardItem);
		var $content = $card.find(params.contentItem);
		
		$card.toggleClass(params.activeClass);
		
		if (!$card.hasClass(params.activeClass)) {
			$content.slideUp(params.speed);
		}
		else {
			$content.slideDown(params.speed);
			if (params.onlyOneCard) {
				$cards.not($card).removeClass(params.activeClass);
				$contents.not($content).slideUp(params.speed);
			}
		}
	});
};