<script>
  import classnames from 'classnames';
  import { isExternalLink } from '@/js/utils';
  import Icon from './Icon.svelte';

  // --- Methods ----------------------

  const trimScheme = (link) => {
    if (!isExternalLink(link)) return link;

    const { hostname, pathname } = new URL(link);
    return hostname + pathname;
  };

  // --- Data -------------------------

  export let to;
  export let target = null;
  export let icon = false;
  export let rel = 'follow';

  if (isExternalLink(to)) {
    rel = 'no-follow';
    target = '_blank';
  }

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Link';

  $: className = classnames(
    baseName,
    $$props.class,
    !icon || baseName + '--has-icon',
    isExternalLink(to) ? baseName + '--external' : baseName + '--internal'
  );
</script>

{#if icon}
  <span class={className} on:click>
    <Icon ex-class={baseName + '__icon'} name={icon} />
    <a href={to} {target} {rel}>
      {#if $$slots.default}
        <slot />
      {:else}
        {trimScheme(to)}
      {/if}
    </a>
  </span>
{:else}
  <a class={className} href={to} {target} {rel} on:click>
    {#if $$slots.default}
      <slot />
    {:else}
      {trimScheme(to)}
    {/if}
  </a>
{/if}

<style global>
  :where(.Link--has-icon) {
    cursor: pointer;
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>
