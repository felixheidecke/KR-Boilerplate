<script>
  import { uniqueId } from 'lodash-es';
  import { toClass } from 'boilerplate/js/utils.js';

  export let name;
  export let required = false;
  export let label = false;
  export let placeholder = false;
  export let height = '8rem';

  let value = '';

  const id = uniqueId(`textarea-${name}-`);

  label = required ? label + '*' : label;

  // -- Input proplist ---

  const inputProps = {
    id,
    name,
    style: `height:${height}`,
    class: '-textarea',
    required
  };

  if (placeholder) {
    inputProps.placeholder = 'placeholder';
  }
</script>

<div class={toClass(['Textarea'], $$props)}>
  {#if label}
    <label class="-label" for={name}>{label}</label>
  {/if}
  <textarea {...inputProps} bind:value />
</div>

<style lang="scss">
  .Textarea {
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

    .-textarea {
      width: 100%;
      padding: 0.666rem;
      font-size: 1rem;
      border: 1px solid lightgray;
      border-top: 0 none;
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      outline: none;
      resize: none;
    }
  }
</style>
