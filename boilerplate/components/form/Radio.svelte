<script>
  import { uniqueId } from 'lodash-es';
  import { toClass } from 'boilerplate/js/utils.js';

  export let label = false;
  export let name;
  export let required = false;
  export let checked = false;
  export let value;
  export let group = checked ? value : '';

  const id = uniqueId(`radio-${name}-`);

  const inputProps = {
    id,
    name,
    value,
    class: '-input',
    required,
    checked: checked ? 'checked' : undefined
  };
</script>

<label class={toClass(['Radio'], $$props)} class:--active={checked}>
  <input {...inputProps} {value} type="radio" bind:group />
  <span class="-label">{@html label}</span>
</label>

<style lang="scss" global>
  :where(.Radio) {
    position: relative;

    .-label {
      user-select: none;
      font-size: 0.85rem;
    }
  }
</style>
