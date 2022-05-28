<script>
  import { classNameHelper } from '@/js/utils';
  import Aspect from './Aspect.svelte';

  export let ratio = '16:9';
  export let id;
</script>

<Aspect {ratio}>
  <iframe
    class={classNameHelper(['YouTube'], $$props)}
    src={'https://www.youtube-nocookie.com/embed/' + id}
    title="YouTube video player"
    frameborder="0"
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
    allowfullscreen
  />
</Aspect>
