<script>
  import { uniqueId } from 'lodash-es'
  import classnames from 'classnames'

  export let name
  export let checked = false
  export let label = false
  export let required = false
  export let value = 'on'

  const id = uniqueId(`checkbox-${name}-`)

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
    user-select: none;
    font-size: 0.85rem;
  }

  :where(.Checkbox__input) {
    margin: 0;
    padding: 0;
  }
</style>
