### Beispiel

**HTML**

```HTML
<section class="swiper">
    <div class="swiper-wrapper">
        <img src="images/swiper/bild1.jpg" alt="Bild Eins" class="swiper-slide"/>
        <img src="images/swiper/bild2.jpg" alt="Bild Zwei" class="swiper-slide"/>
        <img src="images/swiper/bild3.jpg" alt="Bild Drei" class="swiper-slide"/>
    </div>
    <button class="swiper-button swiper-button--left">left</button>
    <button class="swiper-button swiper-button--right">right</button>
</section>
```

**JS**

```JS
cdn.require(['swiper']).then(() => {
    new Swiper('.swiper', {
        speed: 1500,
        autoplay: false,
        navigation: {
            prevEl: '.swiper-main-button.chevron-left',
            nextEl: '.swiper-main-button.chevron-right'
        }
    })
})
```

Detailierte Dokumentation: https://idangero.us/swiper/api/
