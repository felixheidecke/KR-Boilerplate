<script>
  export let images = []
</script>

<Lightbox>
  <ul class="XioniAlbum">
    {#each images as { description, image }}
      <li class="XioniAlbum__item">
        <img
          class="XioniAlbum__image"
          src={image.thumbSrc}
          data-lightbox={image.src}
          loading="lazy"
          alt={description}
        />
      </li>
    {/each}
  </ul>
</Lightbox>

<style global>
  :where(.XioniAlbum) {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    row-gap: 1rem;
  }

  :where(.XioniAlbum__item) {
    width: 120px;
  }

  :where(.XioniAlbum__image) {
    transition: transform 200ms ease;
  }

  :where(.XioniAlbum__image:hover) {
    transform: scale(1.1);
  }
</style>
