<script>
  import './Mail.scss';
  import Icon from '../icon/Icon.svelte';

  export let to = 'max@mustermann.de';
  export let icon = 'fas fa-envelope';

  const iconName = typeof icon === 'boolean' ? 'far fa-envelope' : icon;
  const obfuscated = to.trim().split('').join('&shy;');
</script>

<a
  name="mail"
  on:click={() => (location.href = 'mailto:' + to)}
  class={['mail'].toClass($$props)}
  class:--has-icon={icon}
>
  {#if icon}
    <Icon name={iconName} />
  {/if}
  {@html obfuscated}
</a>
