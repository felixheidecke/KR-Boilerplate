<script>
  import classnames from 'classnames'
  import { uniqueId } from 'lodash-es'

  // --- Data -------------------------

  export let label = false
  export let name
  export let options = []
  export let required = false
  export let values = options
  export let value = values[0]

  const id = uniqueId(name + '-')

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Select'

  $: className = classnames(baseName, $$props.class)
</script>

<div class={className}>
  {#if label}
    <label class={baseName + '__label'} for={name}>{label}</label>
  {/if}
  <select {id} {name} {required} class={baseName + '__input'} bind:value>
    {#each options as option, i}
      <option value={values[i]}>{option}</option>
    {/each}
  </select>
</div>

<style>
  :where(.Select) {
    display: flex;
    flex-direction: column;
  }

  :where(.Select__label) {
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

  :where(.Select__input) {
    width: 100%;
    padding: 0.666rem;
    font-size: 1rem;
    border: 1px solid lightgray;
    border-radius: 0.25rem;
    appearance: none;
    background-color: white;
  }

  :where(.Select__label + .Select__input) {
    border-top: 0 none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
