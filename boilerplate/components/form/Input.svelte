<script>
  import { uniqueId } from 'lodash-es';
  import { toClass } from 'boilerplate/js/utils.js';

  export let name;
  export let type = 'text';
  export let required = false;
  export let label = false;
  export let placeholder = false;
  const id = uniqueId(name + '-');

  label = required ? label + '*' : label;

  // -- Input proplist ---

  const inputProps = {
    id,
    type,
    name,
    placeholder: placeholder || ''
  };

  if (required) {
    inputProps.required = 'required';
  }
</script>

<div class={toClass(['Input'], $$props)}>
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  <input {...inputProps} />
</div>

<style lang="scss">
  .Input {
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

    input {
      width: 100%;
      padding: 0.666rem;
      font-size: 1rem;
      border: 1px solid lightgray;
      border-top: 0 none;
      border-bottom-left-radius: 0.333rem;
      border-bottom-right-radius: 0.333rem;
    }
  }
</style>
