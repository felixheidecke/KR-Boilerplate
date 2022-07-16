<script>
  import { onMount } from 'svelte';

  export let html;

  let el;

  onMount(() => (el.innerHTML = hljs.highlightAuto(html.trim()).value));
</script>

<pre bind:this={el} class="CodeHighlighter"><slot /></pre>

<style global>
  .CodeHighlighter {
    background-color: rgb(51, 51, 51);
    color: white;
    font-family: 'Roboto Mono', monospace;
    line-height: 175%;
    overflow-x: scroll;
    padding: 1rem;
  }
</style>
