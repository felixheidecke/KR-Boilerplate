<script>
  import { onMount } from 'svelte';

  export let html;

  let el;

  onMount(() => {
    el.innerHTML = hljs.highlightAuto(html.trim()).value;
  });
</script>

<pre bind:this={el} data-comp><slot /></pre>

<style>
  pre {
    background-color: rgb(51, 51, 51);
    padding: 1rem;
    color: white;
    line-height: 175%;
    font-family: 'Roboto Mono', monospace;
  }
</style>
