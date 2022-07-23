<script>
  import classnames from 'classnames';
  export let type = null;
  export let title = 'Hinweis';

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Message';

  $: className = classnames(
    baseName,
    $$props.class,
    !type || baseName + '--' + type
  );
</script>

<div class={className}>
  <h5>
    {title}
  </h5>
  {#if $$slots.default}
    <slot />
  {/if}
  {#if $$slots.code}
    <pre><slot name="code" /></pre>
  {/if}
</div>

<style global>
  :where(.Error) {
    padding: 1rem;
    border-radius: 0.25rem;
    font-style: italic;
    box-shadow: 0 0 0.5rem rgba(#000, 0.25);
  }

  :where(.Message--error) {
    background: #ffe3e3;
    border: 1px solid #ffb0b0;
    color: darken(#f00, 0.666);
  }

  :where(.Message--info) {
    background: #fff8e3;
    border: 1px solid #fff3b0;
    color: lighten(rgb(0, 0, 0), 0.25);
  }

  :where(.Message--success) {
    background: #e6ffe3;
    border: 1px solid #8ee79d;
    color: lighten(rgb(0, 0, 0), 0.25);
  }
</style>
