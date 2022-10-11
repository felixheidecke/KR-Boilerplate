<script>
  import classnames from 'classnames'
  import { ROUTES, initialise as INIT_ROUTES } from '@/stores/routes'
  import { browser } from '$app/env'
  import { onMount } from 'svelte'
  import { throttle } from 'lodash-es'

  import './styles/nav-bar.scss'
  import './styles/nav-slide.scss'

  // --- Components -------------------

  import Tree from './partials/NavTree.svelte'
  import Burger from './partials/NavBurger.svelte'

  // --- Methods ----------------------

  const hide = () => (hidden = true)

  const show = () => setTimeout(() => (hidden = false))

  const handleOffset = throttle(() => {
    if (!sticky || type === Type.slide) return

    const className = baseName + '--offset'
    const isOffset = nav.getBoundingClientRect().top === 0

    if (isOffset && !nav.classList.contains(className)) {
      nav.classList.add(className)
    } else if ((!isOffset && nav.classList.contains(className)) || window.pageYOffset === 0) {
      nav.classList.remove(className)
    }
  }, 250)

  // --- Data -------------------------

  const Type = { bar: 'bar', slide: 'slide' }

  export let variant = false
  export let breakpoint = '1024px'
  export let sticky = false

  let nav
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
    !active || baseName + '--active',
    !sticky || baseName + '--sticky'
  )

  // Init
  INIT_ROUTES()
  show()
</script>

<svelte:window on:scroll|passive={handleOffset} />

<nav
  bind:this={nav}
  class={className}
  aria-label="main navigation"
  class:$hidden={hidden}
  on:click={() => (active = false)}
>
  <ul class={baseName + '__ul'}>
    <Tree routes={$ROUTES} {baseName} on:click={() => (active = false)} />
  </ul>
</nav>
{#if type === Type.slide}
  <Burger {active} on:click={() => (active = !active)} />
{/if}
