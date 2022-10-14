<script>
  import { uniqueId } from 'lodash-es'
  import classnames from 'classnames'

  export let checked = false
  export let label = false
  export let name = 'checkbox'
  export let required = false
  export let value = 'on'

  const id = uniqueId(`checkbox-${name}-`)

  $: if (label && required) label += '*'

  // Props ------------

  const inputProps = {
    id,
    name,
    required
  }

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Checkbox'

  $: className = classnames(baseName, $$props.class, !checked || baseName + '--active')
</script>

<label class={className}>
  <input {...inputProps} class={baseName + '__input'} type="checkbox" {value} bind:checked />
  <span class={baseName + '__label'}>{@html label}</span>
</label>

<style global>
  :where(.Checkbox) {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
  }

  :where(.Checkbox__label) {
    font-size: 0.85rem;
    width: 100%;
  }

  :where(.Checkbox__input) {
    margin: 0;
    padding: 0;
  }
</style>
