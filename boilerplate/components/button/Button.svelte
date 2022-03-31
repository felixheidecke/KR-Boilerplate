<script>
  import CN from '@/js/className';
  import Icon from 'bp.icon';

  export let icon = false;
  export let iconRight = false;

  const hasIcon = icon || iconRight;

  // -- CSS Classes -------------------

  export let blank = false;
  if (!blank) require('./Button.scss');

  const cn = new CN($$props.class);
  cn.addClass = !blank ? 'kr-button' : 'button';
</script>

<button class={cn.render()} class:hasIcon>
  {#if icon}
    <Icon class="-pr-sm" name={icon} />
  {/if}
  <slot />
  {#if iconRight}
    <Icon class="-pl-sm" name={iconRight} />
  {/if}
</button>
