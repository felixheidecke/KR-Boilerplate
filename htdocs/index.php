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
    <link rel="stylesheet" href="css/vendor.min.css"/>
    <link rel="stylesheet" href="css/style.css"/>

</head>
<body>

<!--
    Webseiten Inhalte
-->

<script src="js/vendor.min.js"></script>
<?php if (file_exists('./js/default.min.js')) : ?>
<script src="js/default.min.js"></script>
<?php elseif (file_exists('./js/default.js')) : ?>
<script src="js/default.js"></script>
<?php elseif (file_exists('./js/default.es6.js')) : ?>
<script src="js/default.es6.js"></script>
<?php endif; ?>

</body>
</html>
