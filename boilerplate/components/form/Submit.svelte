<script>
  import classnames from 'classnames'

  // --- Data -------------------------

  export let text = 'Abschicken'
  export let disabled = false

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Submit'

  $: className = classnames(baseName, $$props.class)
</script>

<button class={className} {disabled} on:click>
  {text}
</button>

<style lang="scss" global>
  :where(.Submit) {
    background-color: white;
    border-radius: 3px;
    border: 1px solid #333;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-flex;
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.5rem;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    transition: all 0.25s;
    user-select: none;
    white-space: nowrap;
  }

  :where(.Submit:not(:disabled):hover) {
    background-color: darken(white, 5%);
    box-shadow: 0px 12px 24px -6px rgb(0 0 0 / 30%);
  }

  :where(.Submit:disabled) {
    border-color: darkgrey;
    color: darkgrey;
    cursor: not-allowed;
  }
</style>
