<script>
  import classnames from 'classnames';
  import Aspect from './Aspect.svelte';

  export let ratio = '16:9';
  export let id;
  export let allow = [
    'autoplay',
    'clipboard-write',
    'encrypted-media',
    'picture-in-picture'
  ];

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'YouTube';

  $: className = classnames(baseName, $$props.class);
</script>

<Aspect class={className} {ratio}>
  <iframe
    class={baseName + '__iframe'}
    src={'https://www.youtube-nocookie.com/embed/' + id}
    title="YouTube video player"
    frameborder="0"
    allow={allow.join('; ')}
    allowfullscreen
  />
</Aspect>

<style>
  :where(.YouTube__iframe) {
    width: 100%;
    height: 100%;
  }
</style>
