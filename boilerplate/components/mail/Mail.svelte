<script>
  import './Mail.scss';
  import Icon from '../icon/Icon.svelte';

  export let to = 'max@mustermann.de';
  export let icon = 'fas fa-envelope';
  export let blank = false;

  const iconName = typeof icon === 'boolean' ? 'far fa-envelope' : icon;
  const obfuscated = to.trim().split('').join('&shy;');

  // -- CSS Classes ---------------------------------------------
  const className = !blank ? ['kr-mail'] : ['mail'];
  // ------------------------------------------------------------
</script>

<a
  name="mail"
  on:click={() => (location.href = 'mailto:' + to)}
  class={className.toClass($$props)}
  class:--has-icon={icon}
>
  {#if icon}
    <Icon name={iconName} />
  {/if}
  {@html obfuscated}
</a>
