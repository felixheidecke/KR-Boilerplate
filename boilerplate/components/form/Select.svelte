<script>
  import { uniqueId } from 'lodash-es';
  import { toClass } from 'boilerplate/js/utils.js';

  export let label = false;
  export let name;
  export let options = [];
  export let required = false;
  export let values = options;
  export let value = values[0];

  const id = uniqueId(name + '-');

  // Props ------------

  const selectProps = {
    id,
    name,
    class: '-input',
    required
  };
</script>

<div class={toClass(['Select'], $$props)}>
  {#if label}
    <label class="-label" for={name}>{label}</label>
  {/if}
  <select {...selectProps} bind:value>
    {#each options as option, i}
      <option value={values[i]}>{option}</option>
    {/each}
  </select>
</div>

<style lang="scss">
  .Select {
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
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      appearance: none;
      background-color: white;
    }
  }
</style>
