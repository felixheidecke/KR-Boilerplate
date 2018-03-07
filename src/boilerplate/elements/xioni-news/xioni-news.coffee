$ "[data-xioni^='news.']:not(.xioni-prevent-default)"
    .each ->
        unique     = 'xid-' + Math.floor Math.random() * Math.pow 83, 6
        dataXioni  = $(@).data('xioni').split '.' # split id
        dataParams = false

        if $(@).data 'params'
            dataParams = $(@).data('params').replace /\'/g, '"'
            dataParams = JSON.parse dataParams

        # Add an ID
        $(@).attr 'id', unique

        # We don't need that anymore
        $(@).removeAttr 'data-xioni'

        xiNews = new Vue
            el: "##{unique}"
            data:
                items: []
                urlBase: "http://www.rheingau.de/data/"
                details: false
                params: dataParams

            computed:
                url: ->
                    "http://test1.rheingaueins.de/api/#{dataXioni[0]}.php?id=#{dataXioni[1]}"

            methods:
                dateFormat: (timestamp, format = 'LL') ->
                    moment.unix(timestamp).format format

                textile: (string) ->
                    textile string.trim()

                dataPath: (item) ->
                    if item
                        this.urlBase + item

                goTo: (id) ->
                    this.details = _.filter(this.items, ['id', id])[0]
                    window.location = "##{id}"
                    this.scrollTop()

                goBack: ->
                    this.details = false
                    window.location = '#'

                scrollTop: ->
                    $('body,html').animate
                        scrollTop: $("##{unique}").offset().top
                    , 500

            mounted: ->
                ref = @
                $.getJSON @.url, (data) ->
                    ref.items = data
                    if window.location.hash
                        ref.goTo window.location.hash.replace /#/, ''

                $(window).bind 'popstate', ->
                    if window.location.hash.length == 0
                        ref.details = false
