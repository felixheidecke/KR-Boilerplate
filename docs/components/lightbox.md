### Beispiel

**HTML**

```HTML
<a href="images/image-2.jpg" data-lightbox="lightbox">Image #2</a>
<a href="images/image-3.jpg" data-lightbox="lightbox">Image #3</a>
<a href="images/image-4.jpg" data-lightbox="lightbox">Image #4</a>
```

**JS**

```JS
requirejs(["jquery", "lightbox2/js/lightbox.min"], function($, lightbox) {

	$('head').append($('<link>', {
		'rel'  : 'stylesheet',
		'href' : config.baseUrl + config.paths.lightbox2 + '/css/lightbox.min.css'
	}));

	lightbox.option({
		albumLabel : "Bild %1 von %2"
	});
})
```

Detailierte Dokumentation: https://lokeshdhakar.com/projects/lightbox2/
