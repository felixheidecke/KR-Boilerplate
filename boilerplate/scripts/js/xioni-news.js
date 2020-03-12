import cdn from 'cdn-buddy'

cdn.require(["jquery", "vue", "lodash", "textile-js", 'moment.js/2.24.0/moment.min.js']).then( () => {

  // requires moment.js to be loaeded
  cdn.require(['moment.js/2.24.0/locale/de.js'])

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
                url () {
                    return "https://api.klickrhein.de/" + dataXioni[0] + ".php?id=" + dataXioni[1];
                }
            },
            methods: {
                dateFormat (timestamp, format) {
                    if (format == null) {
                        format = 'LL';
                    }
                    return moment.unix(timestamp).format(format);
                },
                textile (string) {
                    return textile(string.trim());
                },
                dataPath (item) {
                    if (item) {
                        return this.urlBase + item;
                    }
                },
                goTo (id) {
                    this.details = _.filter(this.items, ['id', id])[0];
                    window.location = "#" + id;
                    this.scrollTop();
                },
                goBack () {
                    this.details = false;
                    window.location = '#';
                },
                trimSheme (url) {
                    return url.replace(/.*:\/\//, '')
                },
                scrollTop () {
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
});