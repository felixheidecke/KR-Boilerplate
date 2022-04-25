<script>
  import { toClass } from '@/js/utils';
  import Icon from './Icon.svelte';

  export let to;
  export let icon = 'fas fa-envelope';

  if (!to) {
    console.error('<Mail />', 'Missing "to" attribute!');
  }

  const iconName = typeof icon === 'boolean' ? 'far fa-envelope' : icon;
  const obfuscated = to.trim().split('').join('&shy;');
</script>

<a name="mail" ref="external" on:click={() => (location.href = 'mailto:' + to)} class={toClass(['Mail'], $$props)}>
  {#if icon}
    <Icon ex-class="-icon" name={iconName} />
  {/if}
  <span class="-address">
    {#if $$slots.default}
      <slot />
    {:else}
      {@html obfuscated}
    {/if}
  </span>
</a>

<style lang="scss">
  .Mail {
    @if mixin-exists(Mail-reset) {
      @include Mail-reset;
    } @else {
      cursor: pointer;
      display: inline-flex;
      gap: 0.5rem;
      align-items: center;

      .-address {
        text-decoration: underline;
      }

      @if mixin-exists(Mail) {
        @include Mail;
      }
    }
  }
</style>
