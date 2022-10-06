<script>
  let code = `
<Swiper autoplay="3500">
  <img src="https://picsum.photos/id/1011/1280/720" alt="Kajak" />
  <img src="https://picsum.photos/id/1015/1280/720" alt="Fjord" />
  <img src="https://picsum.photos/id/1025/1280/720" alt="Pug" />
</Swiper>`
</script>

<svelte:head>
  <title>Swiper | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>

  <Code {code} />

  <Swiper autoplay="3500">
    <img src="https://picsum.photos/id/1011/1280/720" alt="Kajak" />
    <img src="https://picsum.photos/id/1015/1280/720" alt="Fjord" />
    <img src="https://picsum.photos/id/1025/1280/720" alt="Pug" />
  </Swiper>
</div>
