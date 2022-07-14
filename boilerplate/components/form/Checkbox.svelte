<script>
  import { uniqueId } from 'lodash-es';
  import classnames from 'classnames';

  export let checked = false;
  export let label = false;
  export let name;
  export let required = false;

  const id = uniqueId(`checkbox-${name}-`);

  // Props ------------

  const inputProps = {
    id,
    name,
    required
  };

  // --- CSS Class --------------------

  const baseName = $$props['ex-class'] || 'Checkbox';

  $: className = classnames(
    baseName,
    $$props.class,
    !checked || baseName + '--active'
  );
</script>

<label class={className}>
  <input
    {...inputProps}
    class={baseName + '__input'}
    type="checkbox"
    bind:checked
  />
  <span class={baseName + 'label'}>{@html label}</span>
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
