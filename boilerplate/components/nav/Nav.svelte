<script>
  import classnames from 'classnames'
  import { ROUTES } from '@/stores/routes'
  import { browser } from '$app/env'
  import { onMount } from 'svelte'

  import './styles/nav-bar.scss'
  import './styles/nav-slide.scss'

  // --- Components -------------------

  import Tree from './partials/NavTree.svelte'
  import Burger from './partials/NavBurger.svelte'

  // --- Methods ----------------------

  const hide = () => (hidden = true)

  const show = () => setTimeout(() => (hidden = false))

  // --- Data -------------------------

  const Type = { bar: 'bar', slide: 'slide' }

  export let variant = false
  export let breakpoint = '1024px'

  let active = false
  let hidden = true
  let type = variant

  // --- Lifecycle --------------------

  onMount(() => {
    if (!breakpoint || !browser || variant) return

    const media = window.matchMedia(`(max-width: ${breakpoint})`)
    type = media.matches ? Type.slide : Type.bar

    media.onchange = ({ matches }) => {
      hide()
      type = matches ? Type.slide : Type.bar
      show()
    }
  })

  // --- CSS Class --------------------

  $: baseName =
    (() => {
      if (type === Type.slide) return 'NavSlide'
      if (type === Type.bar) return 'NavBar'
    })() || 'Nav'

  $: className = classnames(
    $$props['ex-class'] || baseName,
    $$props.class,
    !active || baseName + '--active'
  )

  // Init
  show()
</script>

<nav
  class={className}
  aria-label="main navigation"
  {hidden}
  on:click={() => (active = false)}
>
  <ul class={baseName + '__ul'}>
    <Tree routes={$ROUTES} {baseName} on:click={() => (active = false)} />
  </ul>
</nav>
{#if type === Type.slide}
  <Burger {active} on:click={() => (active = !active)} />
{/if}
