<script>
  import { uniqueId } from 'lodash-es';
  import { classNameHelper } from 'boilerplate/js/utils.js';

  export let label = false;
  export let name;
  export let placeholder = false;
  export let required = false;
  export let type = 'text';
  export let value = '';
  export let min = null;
  export let max = null;

  const id = uniqueId(name + '-');

  if (label && required) {
    label += '*';
  }

  // -- Input proplist ---

  const inputProps = {
    id,
    name,
    type,
    required,
    class: '-input'
  };

  if (placeholder) {
    inputProps.placeholder = 'placeholder';
  }

  if (type === 'number' && min) {
    inputProps.min = min;
  }

  if (type === 'number' && max) {
    inputProps.max = max;
  }
</script>

<div class={classNameHelper(['Input'], $$props)}>
  {#if label}
    <label class="-label" for={id}>{label}</label>
  {/if}
  <input {...inputProps} bind:value />
</div>

<style lang="scss" global>
  :where(.Input) {
    display: flex;
    flex-direction: column;

    .-label {
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

    .-input {
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
  }
</style>
