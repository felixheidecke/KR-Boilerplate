<script context="module">
  export const load = async ({ url }) => ({ props: { url } });
</script>

<script>
  export let url;
</script>

<Boilerplate />

<header>
  <a href="/"><Logo /></a>
</header>

<Nav bar />

<Wrapper>
  <PageTransition {url}>
    <slot />
  </PageTransition>
</Wrapper>

<style lang="scss">
</style>
