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
    <div
      class="Lightbox__navigate Lightbox__navigate--prev"
      class:$invisible={!(images.length > 2)}
      on:click={() => navigate('<')}
    >
      <Icon name="fas fa-angle-left" size="2" />
    </div>

    <div
      class="Lightbox__navigate Lightbox__navigate--next"
      class:$invisible={!(images.length > 2)}
      on:click={() => navigate('>')}
    >
      <Icon name="fas fa-angle-right" size="2" />
    </div>

    <div class="Lightbox__textbox">
      <p class="$m-0">
        {activeImage.alt}
      </p>
    </div>
    <img class="Lightbox__active-image" src={activeImage.src} alt={activeImage.alt} />
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
      padding: 1rem;
      color: white;
      text-align: center;
    }

    &__navigate {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(black, 0.666);
      color: white;
      opacity: 0.333;
      transition: opacity 333ms, padding 500ms;
      padding: 1rem;

      &:hover {
        cursor: pointer;
        opacity: 1;
        padding: {
          left: 2rem;
          right: 2rem;
        }
      }
    }

    &__navigate--prev {
      left: 0;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }

    &__navigate--next {
      right: 0;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }

    &__active-image {
      display: block;
      user-select: none;
      pointer-events: none;
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
      overflow: hidden;
    }

    img[data-lightbox] {
      cursor: pointer;
    }
  }
</style>
