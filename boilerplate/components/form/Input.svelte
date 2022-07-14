<script>
  import classnames from 'classnames';
  import { uniqueId } from 'lodash-es';

  export let label = false;
  export let max = null;
  export let min = null;
  export let name;
  export let placeholder = false;
  export let required = false;
  export let type = 'text';
  export let value = '';

  const id = uniqueId(name + '-');

  if (label && required) label += '*';

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Input';

  $: className = classnames(baseName, $$props.class);
</script>

<div class={className}>
  {#if label}
    <label class={baseName + '__label'} for={id}>{label}</label>
  {/if}
  <input
    class={baseName + '__input'}
    {id}
    {max}
    {min}
    {name}
    {placeholder}
    {required}
    {type}
    bind:value
  />
</div>

<style global>
  :where(.Input) {
    display: flex;
    flex-direction: column;
  }

  :where(.Input__label) {
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

  :where(.Input__input) {
    width: 100%;
    padding: 0.666rem;
    font-size: 1rem;
    border: 1px solid lightgray;
    border-top: 0 none;
    outline: none;
    background-color: white;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
  }
</style>
