<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="description" content=""/>

    <title>Titel</title>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="images/favicon.png" />
    <link rel="apple-touch-icon" type="image/png" href="images/favicon.png" />

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/style.css"/>
</head>
<body hidden>
    <main>
        <p>
            <a href="link.html">Link</a><br>
            <a href="http://extern/link.html">Link Extern</a><br>
            <a href="link.pdf">PDF File</a>
        </p>
        <p>
            <span data-mailto>mail[at]wurst[dot]de</span>
        </p>
        <ul class="akkordeon">
            <li class="card">
                <h3 class="tab">
                    This is a tab
                </h3>
                <div class="content">
                    <p>
                        Hier ist Inhalt
                    </p>
                </div>
            </li>
            <li class="card">
                <h3 class="tab">
                    This is second tab
                </h3>
                <div class="content">
                    <p>
                        Hier ist auch hier
                    </p>
                </div>
            </li>
        </ul>
        <div class="foo" data-background-image="bild.gif">
            <p>
                Hier ein Hintergrund
            </p>
        </div>

        <div class="swiper"></div>
    </main>

<!--
    Webseiten Inhalte
-->

    <script data-main="js/default.js" src="https://cdn.klickrhein.de/libs/require.js/2.3.6/require.min.js"></script>
</body>
</html>