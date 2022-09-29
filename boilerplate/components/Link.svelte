<script>
  import classnames from 'classnames'
  import { isExternalLink } from '@/js/utils'
  import Icon from './Icon.svelte'

  // --- Methods ----------------------

  const trimScheme = (link) => {
    if (!isExternalLink(link)) return link

    const { hostname } = new URL(link)
    return hostname
  }

  // --- Data -------------------------

  export let to = ''
  export let target = null
  export let icon = false
  export let rel = 'follow'
  export let tag = 'a'

  if (isExternalLink(to)) {
    rel = 'no-follow'
    target = '_blank'
  }

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Link'

  $: className = classnames(
    baseName,
    $$props.class,
    !icon || baseName + '--has-icon',
    isExternalLink(to) ? baseName + '--external' : baseName + '--internal'
  )
</script>

{#if icon}
  <span class={className}>
    <Icon ex-class={baseName + '__icon'} name={icon} />
    <svelte:element this={tag} href={to} {target} {rel} on:click>
      {#if $$slots.default}
        <slot />
      {:else}
        {trimScheme(to)}
      {/if}
    </svelte:element>
  </span>
{:else}
  <svelte:element this={tag} class={className} href={to} {target} {rel} on:click>
    {#if $$slots.default}
      <slot />
    {:else}
      {trimScheme(to)}
    {/if}
  </svelte:element>
{/if}

<style global>
  :where(.Link) {
    cursor: pointer;
  }

  :where(.Link--has-icon) {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>
