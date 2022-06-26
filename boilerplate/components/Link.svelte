<script>
  import { classNameHelper as cn } from '@/js/utils';
  import Icon from './Icon.svelte';

  export let to = '';
  export let target;
  export let icon = false;

  const className = ['Link'];
  const props = {};

  if (to.indexOf('http') === 0) {
    className.push('--external');
    props.target = '_blank';
    props.rel = 'no-follow';
  } else {
    className.push('--internal');
  }

  if (target) {
    props.target = target;
  }

  if (icon) {
    className.push('--has-icon');
  }
</script>

{#if icon}
  <span class={cn(className, $$props)} on:click>
    <Icon ex-class="-icon" name={icon} />
    <a href={to} {...props}>
      <slot />
    </a>
  </span>
{:else}
  <a class={cn(className, $$props)} href={to} {...props} on:click><slot /></a>
{/if}

<style lang="scss" global>
  :where(.Link.--has-icon) {
    cursor: pointer;
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
  }
</style>
