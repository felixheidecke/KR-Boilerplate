<script>
  import classnames from 'classnames'
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'

  let activeItem = writable(1)
  setContext('Accordion:activeItem', activeItem)

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
