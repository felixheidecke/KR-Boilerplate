<script>
  export let on = false;
  export let bar = false;
  export let slide = false;
</script>

{#if bar}
  <NavBar {on} />
{:else if slide}
  <NavSlide {on} />
{:else}
  <NavBar on="DESKTOP_UP" />
  <NavSlide on="TABLET_DOWN" />
{/if}
