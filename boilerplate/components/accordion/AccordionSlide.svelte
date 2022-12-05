<script>
  import { getContext } from 'svelte'
  import { slide } from 'svelte/transition'

  export let title

  const id = Math.random()
  const activeItem = getContext('Accordion:active-item')

  $: collapsed = id !== $activeItem

  const handleClick = () => {
    activeItem.set($activeItem === id ? null : id)
  }
</script>

<li class="AccordionSlide" on:click={handleClick}>
  <h5 class="AccordionSlide__title">
    {title}
  </h5>
  {#if !collapsed}
    <div in:slide out:slide class="AccordionSlide__content">
      <slot />
    </div>
  {/if}
</li>

<style global>
  :where(.AccordionSlide) {
    border: 1px solid lightgray;
    margin-bottom: 1rem;
  }

  :where(.AccordionSlide__title) {
    background: lightgray;
    padding: 0.25rem 0.5rem;
    margin: 0;
    cursor: pointer;
  }

  :where(.AccordionSlide__content) {
    padding: 1rem;
  }
</style>
