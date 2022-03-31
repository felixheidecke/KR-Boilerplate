<script>
  import Aspect from '../aspect/Aspect.svelte';

  export let ratio = '16:9';
  export let id;
</script>

<Aspect {ratio}>
  <iframe
    src={'https://www.youtube.com/embed/' + id}
    title="YouTube video player"
    frameborder="0"
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
    allowfullscreen
  />
</Aspect>
