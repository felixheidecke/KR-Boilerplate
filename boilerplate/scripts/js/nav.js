$.fn.krNav = function(params) {
	var $1a, $1li, $1ul, $2a, $2li, $2ul, $3a, $3li, $3ul, $burger, $nav, $trigger, _activate, _collapse, _deactivate, _expand, _isActive, _isExpanded;
	params = jQuery.extend({
		closeOnResize: true,
		scroll: true,
		scrollOffset: 0,
		scrollSpeed: 600,
		slideSpeed: 'slow',
		activeClass: '-is-active',
		expandedClass: '-is-expanded',
		breakpoint: 768
	}, params);
	if ($(this).length === 0) {
		return false;
	}
	$nav = $(this);
	$1ul = $nav.find('> ul');
	$1li = $nav.find('> ul > li');
	$1a  = $nav.find('> ul > li > a');
	$2ul = $nav.find('> ul > li > ul');
	$2li = $nav.find('> ul > li > ul > li');
	$2a  = $nav.find('> ul > li > ul > li > a');
	$3ul = $nav.find('> ul > li > ul > li > ul');
	$3li = $nav.find('> ul > li > ul > li > ul > li');
	$3a  = $nav.find('> ul > li > ul > li > ul > li > a');
	$trigger = $('<span>', {
		'class': 'kr-nav-main-trigger',
		'aria-hidden': 'true'
	});
	$burger = $('<button>', {
		'class': 'kr-nav-main-burger',
		'html': '<span>Menu</span>'
	});
	$1ul.addClass('kr-nav-main-1-ul');
	$1li.addClass('kr-nav-main-1-li');
	$1a.addClass('kr-nav-main-1-a');
	$2ul.addClass('kr-nav-main-2-ul');
	$2li.addClass('kr-nav-main-2-li');
	$2a.addClass('kr-nav-main-2-a');
	$3ul.addClass('kr-nav-main-3-ul');
	$3li.addClass('kr-nav-main-3-li');
	$3a.addClass('kr-nav-main-3-a');
	$nav.find(".kr-nav-main-1-a + ul").before($trigger);
	$3ul.prev('.kr-nav-main-2-a').addClass('-is-sub-parent');
	$nav.show();
	setTimeout(function() {
		return $nav.find("a." + params.activeClass).parents('li').each(function() {
			_activate($(this));
			return _activate($(this).children("a:not(." + params.activeClass + ")"));
		});
	}, 0);
	$nav.find("a." + params.activeClass).parents('li').each(function() {
		$(this).addClass(params.activeClass);
		return $(this).children("a:not(." + params.activeClass + ")").addClass(params.activeClass);
	});
	$burger.on('click', function() {
		if (!_isActive($nav)) {
			_activate($nav);
			$1ul.slideDown(params.slideSpeed);
			if (params.scroll) {
				return $('html, body').animate({
					scrollTop: $nav.offset().top + params.scrollOffset
				}, params.scrollSpeed);
			} else {
				return $('html, body').scrollTop(0);
			}
		} else {
			_deactivate($nav);
			return $1ul.slideUp(params.slideSpeed, function() {
				return $(this).removeAttr('style');
			});
		}
	}).prependTo($nav);
	$('.kr-nav-main-trigger').on('click', function() {
		var $el;
		$el = $(this);
		_deactivate($('.kr-nav-main-trigger').not($(this)));
		_collapse($nav.find("." + params.expandedClass).not($el));
		if (!_isActive($el)) {
			_activate($el);
			return _expand($el.parent('li'));
		} else {
			_deactivate($el);
			return _collapse($nav.find("." + params.expandedClass));
		}
	});
	$(window).on('resize', function() {
		_collapse($nav.find("." + params.expandedClass));
		if (params.closeOnResize && $nav.is('.' + params.activeClass) && $(window).width() >= params.breakpoint) {
			_deactivate($nav);
			return $1ul.removeAttr('style');
		}
	});
	_expand = function($el) {
		return $el.addClass(params.expandedClass);
	};
	_collapse = function($el) {
		return $el.removeClass(params.expandedClass);
	};
	_activate = function($el) {
		return $el.addClass(params.activeClass);
	};
	_deactivate = function($el) {
		return $el.removeClass(params.activeClass);
	};
	_isActive = function($el) {
		if ($el.hasClass(params.activeClass)) {
			return true;
		}
		return false;
	};
	_isExpanded = function($el) {
		if ($el.hasClass(params.expandedClass)) {
			return true;
		}
		return false;
	};
};