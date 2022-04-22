<script>
  import { uniqueId } from 'lodash-es';
  import { toClass } from 'boilerplate/js/utils.js';

  export let name;
  export let type = 'radio';
  export let required = false;
  export let label = false;
  export let checked;

  const id = uniqueId(name + '-');

  // -- Input proplist ---

  const inputProps = { name, id };
  if (required) inputProps.required = 'required';
</script>

<div class={toClass(['Checkbox'], $$props)} on:click={() => (checked = !checked)}>
  {#if checked}
    <Icon name="fas fa-check" ex-class="-icon --checked" />
  {:else}
    <Icon name="far fa-square" ex-class="-icon" />
  {/if}
  <input {...inputProps} type="checkbox" bind:checked /> <span>{@html label}</span>
</div>

<style lang="scss" global>
  .Checkbox {
    position: relative;
    padding-left: 26px;

    .-icon {
      position: absolute;
      left: 2px;
      top: 3px;
      cursor: pointer;

      &:not(.--checked) {
        color: lightgrey;
      }
      &.--checked {
        color: green;
      }
    }

    input {
      display: none;
    }

    span {
      user-select: none;
      font-size: 0.85rem;

      a {
        text-decoration: underline;
      }
    }
  }
</style>
