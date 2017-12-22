$ document
    .ready ->
        $body = $ 'body'
        md   = new MobileDetect window.navigator.userAgent

        if md.mobile()
            $body.attr 'data-mobile', md.mobile().toLowerCase()

        if md.os()
            $body.attr 'data-os', md.os().toLowerCase()
