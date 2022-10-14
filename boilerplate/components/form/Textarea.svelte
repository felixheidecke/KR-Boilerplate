<script>
  import classnames from 'classnames'
  import { uniqueId } from 'lodash-es'

  // --- Data -------------------------

  export let label = false
  export let name = 'textarea'
  export let placeholder = null
  export let required = false
  export let rows = 4
  export let value = ''
  label = required ? label + '*' : label

  const id = uniqueId(`textarea-${name}-`)

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Textarea'

  $: className = classnames(baseName, $$props.class)
</script>

<div class={className}>
  {#if label}
    <label class={baseName + '__label'} for={name}>{label}</label>
  {/if}
  <textarea class={baseName + '__input'} {required} {id} {name} {rows} {placeholder} bind:value />
</div>

<style global>
  :where(.Textarea) {
    display: flex;
    flex-direction: column;
  }

  :where(.Textarea__label) {
    display: block;
    background: #eee;
    padding: 0.25rem 0.666rem;
    font-size: 0.8rem;
    border: 1px solid lightgray;
    border-bottom: 0 none;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    user-select: none;
  }

  :where(.Textarea__label + .Textarea__input) {
    border-top: 0 none;
  }

  :where(.Textarea__input) {
    width: 100%;
    padding: 0.666rem;
    margin: 0;
    font-size: 1rem;
    font-family: sans-serif;
    border: 1px solid lightgray;
    border-radius: 0;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    outline: none;
    resize: none;
  }
</style>
