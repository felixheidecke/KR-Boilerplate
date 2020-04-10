cdn.require(['jquery']).then( () => {

  $.fn.krNav = function(params, callback = false) {

    if ($(this).length === 0) {
      return false;
    }

    var $1a, $1li, $1ul, $2a, $2li, $2ul, $3a, $3li, $3ul, $burger, $nav, $trigger, _activate, _collapse, _deactivate, _expand, _isActive, _isExpanded, _scrollTimeout, _scrollPos;
    params = jQuery.extend({
      closeOnResize: true,
      scroll: true,
      scrollOffset: 0,
      scrollSpeed: 600,
      slideSpeed: 'slow',
      activeClass: '-is-active',
      expandedClass: '-is-expanded',
      breakpoint: 768,
      sticky: false,
      mobileDisable: false,
      detectActive: true,
      nameSpace: 'kr-nav-main'
    }, params);

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
      'class': `${params.nameSpace}-trigger`,
      'aria-hidden': 'true'
    });
    $burger = $('<button>', {
      'class': `${params.nameSpace}-burger`,
      'html': '<span>Menu</span>'
    });
    $1ul.addClass(`${params.nameSpace}-1-ul`);
    $1li.addClass(`${params.nameSpace}-1-li`);
    $1a.addClass(`${params.nameSpace}-1-a`);
    $2ul.addClass(`${params.nameSpace}-2-ul`);
    $2li.addClass(`${params.nameSpace}-2-li`);
    $2a.addClass(`${params.nameSpace}-2-a`);
    $3ul.addClass(`${params.nameSpace}-3-ul`);
    $3li.addClass(`${params.nameSpace}-3-li`);
    $3a.addClass(`${params.nameSpace}-3-a`);
    $nav.find(`.${params.nameSpace}-1-a + ul`).before($trigger);
    $3ul.prev(`.${params.nameSpace}-2-a`).addClass('-is-sub-parent');
    $nav.show();

    if (params.detectActive) {
      const filename = window.location.pathname.split('/').reverse()[0]

      setTimeout( () => {
        $nav.find(`a[href="${filename}"], a[href="/${filename}"]`).parents('li').each(function() {
          _activate($(this).children("a:not(." + params.activeClass + ")"));
        });
      }, 25)
    }

    if (params.sticky) {
      $nav.addClass('-is-sticky')
    }

    if (params.sticky === 'hide') {
      _scrollPos = 0

      $(window).on('scroll', function () {
        if (!_scrollTimeout) {
          _scrollTimeout = setTimeout( function () {
            if ( $('html').scrollTop() < _scrollPos ) {
              $nav.removeClass('-is-offset')
            } else {
              $nav.addClass('-is-offset')
            }
            _scrollTimeout = null
            _scrollPos = $('html').scrollTop()
          }, 60);
        }
      });
    }

    if (!params.mobileDisable) {

      $burger.on('click', function() {
        if (!_isActive($nav)) {
          _activate($nav);
          $1ul.slideDown(params.slideSpeed);
          if (params.scroll) {
            $('html, body').animate({
              scrollTop: $nav.offset().top + params.scrollOffset
            }, params.scrollSpeed);
          } else {
            $('html, body').scrollTop(0);
          }
        } else {
          _deactivate($nav);
          $1ul.slideUp(params.slideSpeed, function() {
            $(this).removeAttr('style');
          });
        }
      }).prependTo($nav);

      $(`.${params.nameSpace}-trigger`).on('click', function() {
        var $el;
        $el = $(this);
        _deactivate($(`.${params.nameSpace}-trigger`).not($(this)));
        _collapse($nav.find("." + params.expandedClass).not($el));
        if (!_isActive($el)) {
          _activate($el);
          _expand($el.parent('li'));
        } else {
          _deactivate($el);
          _collapse($nav.find("." + params.expandedClass));
        }
      });
    }

    $(window).on('resize', function() {
      _collapse($nav.find("." + params.expandedClass));
      if (params.closeOnResize && $nav.is('.' + params.activeClass) && $(window).width() >= params.breakpoint) {
        _deactivate($nav);
        return $1ul.removeAttr('style');
      }
    });

    _expand = function($el) {
      $el.addClass(params.expandedClass);
    };

    _collapse = function($el) {
      $el.removeClass(params.expandedClass);
    };

    _activate = function($el) {
      $el.addClass(params.activeClass);
    };

    _deactivate = function($el) {
      $el.removeClass(params.activeClass);
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

    if (typeof callback === "function")
      callback(this);
  };
})
