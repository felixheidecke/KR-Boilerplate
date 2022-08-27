<script>
  import classnames from 'classnames'
  import { uniqueId } from 'lodash-es'

  export let checked = false
  export let group = checked ? value : ''
  export let label = null
  export let name
  export let required = false
  export let value

  const id = uniqueId(`radio-${name}-`)

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Radio'

  $: className = classnames(baseName, $$props.class, !checked || baseName + '--active')
</script>

<label class={className}>
  <input
    {checked}
    {id}
    {name}
    {required}
    {value}
    class={baseName + '__input'}
    type="radio"
    bind:group
  />
  <span class={baseName + '__label'}>{@html label}</span>
</label>

<style global>
  :where(.Radio) {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    cursor: pointer;
  }

  :where(.Radio__input) {
    margin: 0;
  }

  :where(.Radio__label) {
    user-select: none;
    font-size: 0.85rem;
  }
</style>
