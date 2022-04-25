<script>
  import { uniqueId } from 'lodash-es';
  import { toClass } from 'boilerplate/js/utils.js';

  export let checked = false;
  export let label = false;
  export let name;
  export let required = false;

  const id = uniqueId(`checkbox-${name}-`);

  // Props ------------

  const inputProps = {
    id,
    name,
    class: '-input',
    required
  };
</script>

<label class={toClass(['Checkbox'], $$props)} class:--active={checked}>
  <input {...inputProps} type="checkbox" bind:checked />
  <span class="-label">{@html label}</span>
</label>

<style lang="scss" global>
  .Checkbox {
    position: relative;

    .-label {
      user-select: none;
      font-size: 0.85rem;
    }
  }
</style>
