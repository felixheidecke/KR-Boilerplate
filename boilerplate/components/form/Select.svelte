<script>
  import { uniqueId } from 'lodash-es';
  import { toClass } from 'boilerplate/js/utils.js';

  export let name;
  export let required = false;
  export let label = false;
  export let placeholder = false;
  export let options = [];

  const id = uniqueId(name + '-');
  let selected = options[0];

  // -- Input proplist ---

  const inputProps = {
    name,
    id,
    placeholder: placeholder || ''
  };

  if (required) {
    inputProps.required = 'required';
  }
</script>

<div class={toClass(['Select'], $$props)}>
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  <select {...inputProps} bind:value={selected}>
    {#each options as option, i}
      <option value={option}>{option}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  .Select {
    display: flex;
    flex-direction: column;

    label {
      display: block;
      background: #eee;
      padding: 0.25rem 0.666rem;
      font-size: 0.8rem;
      border: 1px solid lightgray;
      border-bottom: 0 none;
      border-top-left-radius: 0.333rem;
      border-top-right-radius: 0.333rem;
      user-select: none;
    }

    select {
      width: 100%;
      padding: 0.666rem;
      font-size: 1rem;
      border: 1px solid lightgray;
      border-top: 0 none;
      border-bottom-left-radius: 0.333rem;
      border-bottom-right-radius: 0.333rem;
      appearance: none;
      background-color: white;
    }
  }
</style>
