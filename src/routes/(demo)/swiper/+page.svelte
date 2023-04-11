<script>
	const swiperData = {
		autoplay: 2500,
		images: [1, 2, 3, 4, 5].map(index => ({
			src: `https://picsum.photos/960/680?random=${index}`,
			alt: `Zufälliges Bild Nr. ${index}`
		}))
	}
</script>

<h1>Swiper</h1>

<Swiper {...swiperData} />
