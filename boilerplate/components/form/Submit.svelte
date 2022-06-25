<script>
  import { classNameHelper } from '@/js/utils.js';
  export let text = 'Abschicken';
  export let disabled = false;
</script>

<button class={classNameHelper(['Submit'], $$props)} on:click {disabled}>{text}</button>

<style lang="scss" global>
  :where(.Submit) {
    width: fit-content;
    font-size: 1rem;
    background: #eee;
    padding: 0.75rem 1rem;
    border: 1px solid lightgray;
    border-radius: 0.25rem;
    cursor: pointer;
  }
</style>
