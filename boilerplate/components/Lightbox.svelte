<script>
  import { onMount } from 'svelte'

  // Refs
  let lightbox
  let modal

  // --- Data -------------------------

  let images = []
  let index = 0
  let isMobile = true

  $: activeImage = images[index] || {}

  // --- Methods ----------------------

  const getImages = () => {
    lightbox.querySelectorAll('img[data-lightbox]').forEach((image, i) => {
      images = [
        ...images,
        {
          src: image.dataset.lightbox,
          alt: image.getAttribute('alt') || ''
        }
      ]

      image.addEventListener('click', () => {
        index = i

        modal.open()
      })
    })
  }

  const navigate = (dir) => {
    if (dir === '>') {
      index = index + 1 >= images.length ? 0 : index + 1
      return
    }
    if (dir === '<') {
      index = index === 0 ? images.length - 1 : index - 1
      return
    }
  }

  // Init
  onMount(() => {
    if (window.innerWidth < 620) return
    getImages()
    isMobile = false
  })
</script>

<div class="Lightbox">
  <div bind:this={lightbox}>
    <slot />
  </div>
  <Modal bind:this={modal}>
    <div class="Lightbox__textbox">
      <div class:$invisible={!(images.length > 2)}>
        <Icon
          class="$p $pointer"
          on:click={() => navigate('<')}
          name="fas fa-angle-left"
        />
      </div>
      <p class="$m-0">
        {activeImage.alt}
      </p>
      <div class:$invisible={!(images.length > 2)}>
        <Icon
          class="$p $pointer"
          on:click={() => navigate('>')}
          name="fas fa-angle-right"
        />
      </div>
    </div>
    <img
      class="Lightbox__active-image"
      src={activeImage.src}
      alt={activeImage.alt}
    />
  </Modal>

  {#if !isMobile}
    {#each images as { src, alt }}
      <img {src} {alt} hidden aria-hidden />
    {/each}
  {/if}
</div>

<style lang="scss">
  //--- Component styling -------------

  .Lightbox {
    &__textbox {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(black, 0.666);
      padding: 0.5rem;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__active-image {
      display: block;
    }
  }

  // --- Gobal ------------------------

  .Lightbox :global {
    .Modal__wrapper {
      width: fit-content;
      height: fit-content;
    }

    .Modal__body {
      padding: 0;
    }

    img[data-lightbox] {
      cursor: pointer;
    }
  }
</style>
