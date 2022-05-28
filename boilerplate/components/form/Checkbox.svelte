<script>
  import { uniqueId } from 'lodash-es';
  import { classNameHelper } from 'boilerplate/js/utils.js';

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

<label class={classNameHelper(['Checkbox'], $$props)} class:--active={checked}>
  <input {...inputProps} type="checkbox" bind:checked />
  <span class="-label">{@html label}</span>
</label>

<style lang="scss" global>
  :where(.Checkbox) {
    position: relative;

    .-label {
      user-select: none;
      font-size: 0.85rem;
    }
  }
</style>
