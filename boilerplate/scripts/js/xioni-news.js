(function() {
	if (typeof $ !== "function") {
		console.error('jQuery is required for krXioniNews');
		return;
	}

    $('body').find("[data-xioni^='news.']:not(.xioni-prevent-default)").each(function() {
        var dataParams, dataXioni, unique;
        unique = 'xid-' + Math.floor(Math.random() * Math.pow(83, 6));
        dataXioni = $(this).data('xioni').split('.');
        dataParams = false;
        if ($(this).data('params')) {
            dataParams = $(this).data('params').replace(/\'/g, '"');
            dataParams = JSON.parse(dataParams);
        }
        $(this).attr('id', unique);
        $(this).removeAttr('data-xioni');
        var xiNews = new Vue({
            el: "#" + unique,
            data: {
                items: [],
                urlBase: "https://www.rheingau.de/data/",
                details: false,
                params: dataParams
            },
            computed: {
                url: function() {
                    return "https://api.klickrhein.de/" + dataXioni[0] + ".php?id=" + dataXioni[1];
                }
            },
            methods: {
                dateFormat: function(timestamp, format) {
                    if (format == null) {
                        format = 'LL';
                    }
                    return moment.unix(timestamp).format(format);
                },
                textile: function(string) {
                    return textile(string.trim());
                },
                dataPath: function(item) {
                    if (item) {
                        return this.urlBase + item;
                    }
                },
                goTo: function(id) {
                    this.details = _.filter(this.items, ['id', id])[0];
                    window.location = "#" + id;
                    this.scrollTop();
                },
                goBack: function() {
                    this.details = false;
                    window.location = '#';
                },
                scrollTop: function() {
                    $('body,html').animate({
                        scrollTop: $("#" + unique).offset().top
                    }, 500);
                }
            },
            mounted: function() {
                var ref = this;
                $.getJSON(this.url, function(data) {
                    ref.items = data;
                    if (window.location.hash) {
                        ref.goTo(window.location.hash.replace(/#/, ''));
                    }
                });
                $(window).bind('popstate', function() {
                    if (window.location.hash.length === 0) {
                        ref.details = false;
                    }
                });
            }
        });
    });
})();