// This guy doesn't seem to like
// requre.js, so let's just import it
import textile from 'textile-js'
const lang = document.querySelector('html').getAttribute('lang')

requirejs(["jquery", "vue", "moment", "lodash"], function($, Vue, moment, _) {
    moment.locale(lang);

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