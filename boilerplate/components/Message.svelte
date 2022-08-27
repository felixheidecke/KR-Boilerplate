<script>
  import classnames from 'classnames'
  export let type = null
  export let title = 'Hinweis'

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Message'

  $: className = classnames(baseName, $$props.class, !type || baseName + '--' + type)
</script>

<div class={className}>
  {#if title}
    <h4 class={baseName + '__title'}>
      {title}
    </h4>
  {/if}
  {#if $$slots.default}
    <slot />
  {/if}
  {#if $$slots.code}
    <pre><slot name="code" /></pre>
  {/if}
</div>

<style global>
  :where(.Message) {
    padding: 1rem;
    border-radius: 0.25rem;
    font-style: italic;
    box-shadow: 0 0 0.5rem rgba(#000, 0.25);
    background: #dfdfdf;
    border: 1px solid #7c7c7c;
    color: darken(rgb(34, 34, 34), 0.666);
  }

  :where(.Message__title) {
    margin: 0 0 1rem;
    padding: 0;
    text-align: center;
  }

  :where(.Message--error) {
    background: #ffe3e3;
    border: 1px solid #ffb0b0;
  }

  :where(.Message--info) {
    background: #fff8e3;
    border: 1px solid #fff3b0;
  }

  :where(.Message--success) {
    background: #e6ffe3;
    border: 1px solid #8ee79d;
  }
</style>
