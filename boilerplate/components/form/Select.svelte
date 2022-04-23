<script>
  import { uniqueId } from 'lodash-es';
  import { toClass } from 'boilerplate/js/utils.js';
  import { createEventDispatcher } from 'svelte';

  export let name;
  export let required = false;
  export let label = false;
  export let options = [];
  export let selected = options[0];

  const id = uniqueId(name + '-');

  // Props ------------

  const selectProps = {
    id,
    name,
    class: '-input',
    required
  };

  // Events -----------

  const dispatch = createEventDispatcher();
  $: dispatch('selected', selected);
</script>

<div class={toClass(['Select'], $$props)}>
  {#if label}
    <label class="-label" for={name}>{label}</label>
  {/if}
  <select {...selectProps} bind:value={selected}>
    <!-- <option value="0">Bitte wählen</option> -->
    {#each options as value}
      <option {value}>{value}</option>
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
