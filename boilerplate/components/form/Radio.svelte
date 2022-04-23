<script>
  import { uniqueId } from 'lodash-es';
  import { toClass } from 'boilerplate/js/utils.js';

  export let name;
  export let required = false;
  export let label = false;
  export let value;
  export let selected;

  const id = uniqueId(`radio-${name}-`);

  const changeHandler = (event) => {
    console.log(event);
  };

  // -- Input proplist ---

  required = required ? { required } : {};
</script>

<div class={toClass(['Checkbox'], $$props)} class:--active={selected} on:click={() => (selected = !selected)}>
  {#if selected}
    <Icon name="fas fa-check" ex-class="-icon" />
  {:else}
    <Icon name="far fa-square" ex-class="-icon" />
  {/if}
  <input {id} {name} {value} class="-input" {...required} type="radio" on:change={changeHandler} />
  <span class="-label">{@html label}</span>
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
    }

    .-input {
      display: none;
    }

    .-label {
      user-select: none;
      font-size: 0.85rem;
    }
  }
</style>
