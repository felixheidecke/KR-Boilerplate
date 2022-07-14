<script>
  import classnames from 'classnames';

  // --- Data -------------------------

  export let text = 'Abschicken';
  export let disabled = false;

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Submit';

  $: className = classnames(baseName, $$props.class);
</script>

<button class={className} {disabled} on:click>
  {text}
</button>

<style lang="scss" global>
  :where(.Submit) {
    width: fit-content;
    font-size: 1rem;
    background: #eee;
    padding: 0.75rem 1rem;
    border: 1px solid lightgray;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>
