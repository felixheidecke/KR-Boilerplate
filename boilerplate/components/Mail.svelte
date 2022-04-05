<script>
  import Icon from './Icon.svelte';

  export let to;
  export let icon = 'fas fa-envelope';

  if (!to) {
    console.error('<Mail />', 'Missing "to" attribute!');
  }

  const iconName = typeof icon === 'boolean' ? 'far fa-envelope' : icon;
  const obfuscated = to.trim().split('').join('&shy;');
</script>

<a
  name="mail"
  on:click={() => (location.href = 'mailto:' + to)}
  class={['Mail'].toClass($$props)}
  class:--has-icon={icon}
>
  {#if icon}
    <Icon ex-class="-icon" name={iconName} />
  {/if}
  {@html obfuscated}
</a>
