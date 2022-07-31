<script>
  import { onMount } from 'svelte'

  export let html
  const refs = {}

  onMount(() => {
    const loader = setInterval(() => {
      if (!hljs) return

      refs.el.innerHTML = hljs.highlightAuto(html.trim()).value
      clearInterval(loader)
    }, 150)
  })
</script>

<pre bind:this={refs.el} class="CodeHighlighter"><slot /></pre>

<style global>
  .CodeHighlighter {
    background-color: rgb(50, 50, 50);
    color: white;
    font-family: 'Roboto Mono', monospace;
    line-height: 175%;
    overflow-x: auto;
    padding: 1rem;
  }
</style>
