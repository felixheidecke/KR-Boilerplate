<script>
  import classnames from 'classnames'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  let activeItem = writable(null)
  setContext('Accordion:active-item', activeItem)

  // --- CSS Class --------------------

  $: className = classnames('Aspect', $$props.class)
</script>

<ul class={className}>
  <slot />
</ul>

<style global>
  :where(.Accordion) {
    width: 100%;
  }
</style>
